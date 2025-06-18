import { pgTable, serial, text, integer, boolean, varchar, json, PgTable } from "drizzle-orm/pg-core";

export const User_TABLE = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  isMember: boolean("is_member").default(false),
  customerId: varchar("customer_Id", { length: 255 }),


});

export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id", { length: 255 }).notNull(),
  courseType: varchar("course_type", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  difficultyLevel: varchar("difficulty_level", { length: 255 }).default('Easy'),
  courseLayout: json("course_layout"),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).default('Generating'),
});

export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes', {
  id: serial('id').primaryKey(),
  courseId: varchar('course_id', { length: 255 }).notNull(),
  chapterId: integer('chapter_id').notNull(),
  notes: text('notes').notNull(),
});

export const STUDY_TYPE_CONTENT_TABLE = pgTable("studyTypeContent", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  content: json("content").notNull(),
  status: varchar("status", { length: 255 }).default('Generating'),
});

export const PAYMENT_RECORD_TABLE=pgTable("paymentRecords", {
  id: serial("id").primaryKey(),
  customerId: varchar("customer_Id", { length: 255 }),
  sessionId: varchar("session_Id", { length: 255 }),

});