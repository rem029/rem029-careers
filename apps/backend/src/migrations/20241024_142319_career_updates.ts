import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers" ADD COLUMN "description_rt" jsonb;
ALTER TABLE "_careers_v" ADD COLUMN "version_description_rt" jsonb;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers" DROP COLUMN IF EXISTS "description_rt";
ALTER TABLE "_careers_v" DROP COLUMN IF EXISTS "version_description_rt";`);

};
