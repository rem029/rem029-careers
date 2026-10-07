import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "_locales" AS ENUM('en', 'ar', 'fr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "careers" ADD COLUMN "responsibilities_rt" jsonb;
ALTER TABLE "careers" ADD COLUMN "qualifications_rt" jsonb;
ALTER TABLE "_careers_v" ADD COLUMN "version_responsibilities_rt" jsonb;
ALTER TABLE "_careers_v" ADD COLUMN "version_qualifications_rt" jsonb;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers" DROP COLUMN IF EXISTS "responsibilities_rt";
ALTER TABLE "careers" DROP COLUMN IF EXISTS "qualifications_rt";
ALTER TABLE "_careers_v" DROP COLUMN IF EXISTS "version_responsibilities_rt";
ALTER TABLE "_careers_v" DROP COLUMN IF EXISTS "version_qualifications_rt";`);

};
