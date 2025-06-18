import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_qyxWT3DUzmo9@ep-lively-king-a4wsa3xc-pooler.us-east-1.aws.neon.tech/ai-lms?sslmode=require'
  }
});
