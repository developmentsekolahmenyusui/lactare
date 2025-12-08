import { sql } from 'drizzle-orm';
import { ulid } from 'ulid';

import {
  customType,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const tsvector = customType<{ data: string; driverData: string }>({
  dataType: () => 'tsvector',
});

export const transactions = pgTable(
  'transactions',
  {
    id: varchar('id', { length: 26 })
      .$defaultFn(() => ulid())
      .primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    certificateName: varchar('certificate_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 32 }).notNull(),
    lastEducation: varchar('last_education', { length: 255 }).notNull(),
    motherAge: integer('mother_age').notNull(),
    pregnancyAge: integer('pregnancy_age'),
    childAge: integer('child_age'),
    address: text('address').notNull(),
    amount: integer('amount').notNull(),
    paymentStatus: varchar('payment_status', { length: 32 })
      .notNull()
      .default('pending'),
    paymentAt: timestamp('payment_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    searchVector: tsvector('search_vector')
      .generatedAlwaysAs(
        sql`setweight(to_tsvector('english', coalesce(full_name, '')), 'A') || setweight(to_tsvector('english', coalesce(email, '')), 'B') || setweight(to_tsvector('english', coalesce(phone_number, '')), 'C')`
      )
      .notNull(),
  },
  (t) => [
    index('transactions_full_name_idx').on(t.fullName),
    index('transactions_email_idx').on(t.email),
    index('transactions_phone_number_idx').on(t.phoneNumber),
    index('transactions_search_vector_idx').using('gin', t.searchVector),
    index('transactions_updated_at_idx').on(t.updatedAt),
  ]
);

export type Transaction = typeof transactions.$inferSelect;

export type InsertTransaction = typeof transactions.$inferInsert;
