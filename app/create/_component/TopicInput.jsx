import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopicInput({ setTopic, setDifficultyLevel }) {
  return (
    <div>
      <h2>Enter topic or paste the content for which you want to generate study material</h2>
      <Textarea
        placeholder='Start Writing here...'
        className='mt-3'
        onChange={(event) => setTopic(event.target.value)}
      />
      <h2 className='mt-5 mb-4'>Select the difficulty level</h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
