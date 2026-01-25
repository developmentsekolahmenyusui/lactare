import { ulid } from 'ulid';

import { boolean, index, integer, jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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
    paymentStatus: varchar('payment_status', { length: 32 }).notNull().default('pending'),
    paymentLink: text('payment_link'),
    paymentAt: timestamp('payment_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('transactions_full_name_idx').on(t.fullName),
    index('transactions_email_idx').on(t.email),
    index('transactions_phone_number_idx').on(t.phoneNumber),
    index('transactions_payment_status_idx').on(t.paymentStatus),
    index('transactions_created_at_idx').on(t.createdAt),
    index('transactions_updated_at_idx').on(t.updatedAt),
  ],
);
export type Transaction = typeof transactions.$inferSelect;

export const transactionLogs = pgTable(
  'transaction_logs',
  {
    id: varchar('id', { length: 26 })
      .$defaultFn(() => ulid())
      .primaryKey(),
    transactionId: varchar('transaction_id', { length: 26 }).notNull(),
    type: varchar('type', { length: 32 }).notNull(),
    payload: jsonb('payload').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('transaction_logs_created_at_idx').on(t.createdAt)],
);
export type TransactionLog = typeof transactionLogs.$inferSelect;

export const registrationConfigs = pgTable(
  'registration_configs',
  {
    id: varchar('id', { length: 26 })
      .$defaultFn(() => ulid())
      .primaryKey(),
    batchTitle: varchar('batch_title', { length: 255 }).notNull(),
    price: integer('price').notNull(),
    whatsappGroupLink: text('whatsapp_group_link').notNull(),
    whatsappAdminLink: text('whatsapp_admin_link').notNull(),
    benefits: jsonb('benefits').$type<string[]>().notNull().default([]),
    isFormOpen: boolean('is_form_open').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('registration_configs_created_at_idx').on(t.createdAt)],
);
export type RegistrationConfig = typeof registrationConfigs.$inferSelect;
