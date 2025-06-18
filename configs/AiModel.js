import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});


const generationConfig = {
  responseMimeType: "text/plain",
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};


export async function generateCourseOutline({ topic, studyType, difficultyLevel }) {
  const prompt = `
    You are an expert AI that outputs only JSON. Do NOT include any text or explanation.
    Generate a study material for "${topic}" for "${studyType}" learners with "${difficultyLevel}" difficulty.
    Include:
      - A "summary" (string),
      - A "chapters" array, where each chapter has:
        - "title" (string)
        - "summary" (string)
        - "topics" (array of strings)

    Respond ONLY with pure JSON.
`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Failed to parse JSON from Gemini:", err);
    console.warn("🔍 Raw Gemini output:\n", text);
    return text;
  }
}



export const generateNotesAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            "Generate exam material detail content for each chapter. " +
            "Make sure to include all topic points in HTML format. " +
            "Do not include HTML, Head, Title, or Meta tags.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text:
            "<h2>Introduction to Atoms</h2>\n<h3>What are atoms?</h3>\n<p>Atoms are the fundamental building blocks of matter...</p>",
        },
      ],
    },
  ],
});

export const GenerateStudyTypeContentAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate the flashcard on topic: React, User Interface (UI) development, Basic App Navigation. Format the output in JSON with 'front' and 'back' keys. Maximum 15 flashcards."
          }
        ]
      },
      {
        role: "model",
        parts: [
          {
            text: "```json\n[\n  {\n    \"front\": \"What is React's main purpose in UI development?\",\n    \"back\": \"To build user interfaces declaratively using reusable components.\"\n  },\n  {\n    \"front\": \"What is JSX in React?\",\n    \"back\": \"JSX is a syntax extension that allows writing HTML-like code in JavaScript.\"\n  },\n  {\n    \"front\": \"What are components in React?\",\n    \"back\": \"Independent, reusable pieces of UI.\"\n  },\n  {\n    \"front\": \"What are props in React?\",\n    \"back\": \"Props are inputs passed to components that help render dynamic content.\"\n  },\n  {\n    \"front\": \"What does the useState hook do?\",\n    \"back\": \"It allows you to manage local state in functional components.\"\n  },\n  {\n    \"front\": \"What does the useEffect hook do?\",\n    \"back\": \"It lets you run side effects in function components.\"\n  },\n  {\n    \"front\": \"What is React Router used for?\",\n    \"back\": \"For handling navigation and routing in single-page React apps.\"\n  },\n  {\n    \"front\": \"Name a common React Router component for links.\",\n    \"back\": \"<Link> or <NavLink>\"\n  },\n  {\n    \"front\": \"What is the role of <Route> in React Router?\",\n    \"back\": \"Defines which component to render for a given path.\"\n  },\n  {\n    \"front\": \"How do you programmatically navigate in React Router?\",\n    \"back\": \"Using the useNavigate hook.\"\n  },\n  {\n    \"front\": \"What is a Single Page Application (SPA)?\",\n    \"back\": \"A web app that loads a single HTML page and updates dynamically without full reloads.\"\n  },\n  {\n    \"front\": \"What does <BrowserRouter> do?\",\n    \"back\": \"Enables routing in React using the browser history API.\"\n  },\n  {\n    \"front\": \"What is useParams used for?\",\n    \"back\": \"To extract dynamic URL parameters in a route.\"\n  },\n  {\n    \"front\": \"What happens when state updates in React?\",\n    \"back\": \"The component and its children re-render.\"\n  },\n  {\n    \"front\": \"Why are keys important in lists?\",\n    \"back\": \"They help React identify which items changed, are added, or removed.\"\n  }\n]\n```"
          }
        ]
      }
    ]
  });

  export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
Generate a quiz on the topic: React, User Interface (UI) development, Basic App Navigation.

Each quiz item should be an object with the following keys:
- "question": the question text (string)
- "answer": the correct answer (string)
- "options": an array of 4 answer options (strings), including the correct answer.

Return exactly 10 questions in a JSON array.

Do NOT include any explanations or text outside the JSON.

Respond ONLY with pure JSON.
`
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `\`json
[
  {
    "question": "What is React's main purpose?",
    "answer": "To build UIs with reusable components.",
    "options": [
      "To build UIs with reusable components.",
      "To manage backend servers.",
      "To write SQL queries.",
      "To design mobile apps."
    ]
  },
  {
    "question": "What is JSX in React?",
    "answer": "HTML-like syntax inside JavaScript.",
    "options": [
      "HTML-like syntax inside JavaScript.",
      "A CSS preprocessor.",
      "A type checker.",
      "A database connector."
    ]
  }
]

\``
        }
      ]
    }
  ]
});

