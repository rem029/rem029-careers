import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "seo_meta_title";
ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "seo_meta_description";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "seo_meta_title";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "seo_meta_description";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_list_settings" ADD COLUMN "seo_meta_title" varchar;
ALTER TABLE "careers_list_settings" ADD COLUMN "seo_meta_description" varchar;
ALTER TABLE "careers_info_settings" ADD COLUMN "seo_meta_title" varchar;
ALTER TABLE "careers_info_settings" ADD COLUMN "seo_meta_description" varchar;`);

};
