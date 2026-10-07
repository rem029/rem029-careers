import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TYPE "enum_careers_queries_type" ADD VALUE 'File';
ALTER TABLE "careers_queries" ADD COLUMN "file_max_size" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_queries" DROP COLUMN IF EXISTS "file_max_size";`);

};
