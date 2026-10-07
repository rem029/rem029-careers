import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "text_color" "enum_pages_blocks_block_heading_text_color";
ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "text_color" "enum__pages_v_blocks_block_heading_text_color";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "text_color" "enum_careers_list_settings_blocks_block_heading_text_color";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "text_color" "enum_careers_info_settings_blocks_block_heading_text_color";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "custom_color" varchar;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";`);

};
