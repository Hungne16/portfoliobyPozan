import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const admins = sqliteTable('admins', {
  userId: text('user_id').primaryKey(),
  email: text('email').notNull(),
  createdAt: text('created_at').notNull(),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  category: text('category').notNull(),
  year: text('year').notNull(),
  brief: text('brief').notNull(),
  role: text('role').notNull(),
  process: text('process').notNull(),
  result: text('result').notNull(),
  imageKey: text('image_key'),
  status: text('status', { enum: ['draft', 'published'] }).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
