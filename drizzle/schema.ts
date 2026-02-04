import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Intake form submissions table
 * Stores all parent/guardian inquiries with child information and service preferences
 */
export const intakeSubmissions = mysqlTable("intake_submissions", {
  id: int("id").autoincrement().primaryKey(),
  childName: varchar("childName", { length: 255 }),
  ageRange: varchar("ageRange", { length: 50 }),
  diagnosisStatus: varchar("diagnosisStatus", { length: 100 }),
  observationTimeframe: varchar("observationTimeframe", { length: 100 }),
  childNeeds: text("childNeeds"), // JSON array stored as text
  servicesInterested: text("servicesInterested"), // JSON array stored as text
  deliveryPreference: varchar("deliveryPreference", { length: 100 }),
  mainGoal: text("mainGoal"),
  parentEmotion: varchar("parentEmotion", { length: 100 }),
  parentName: varchar("parentName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  location: varchar("location", { length: 255 }),
  consent: int("consent").default(0).notNull(), // 0 or 1 for boolean
  status: mysqlEnum("status", ["pending", "contacted", "completed", "archived"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type InsertIntakeSubmission = typeof intakeSubmissions.$inferInsert;