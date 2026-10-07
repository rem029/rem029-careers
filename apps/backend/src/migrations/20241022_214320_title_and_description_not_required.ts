import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_list_settings" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "careers_list_settings" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "careers_info_settings" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "careers_info_settings" ALTER COLUMN "description" DROP NOT NULL;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_list_settings" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "careers_list_settings" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "careers_info_settings" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "careers_info_settings" ALTER COLUMN "description" SET NOT NULL;`);

};
