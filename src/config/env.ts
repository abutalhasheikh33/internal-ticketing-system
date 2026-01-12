import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  process.exit(1);
}

export type AppConfig = z.infer<typeof envSchema>;
export const config: AppConfig = parsed.data;
