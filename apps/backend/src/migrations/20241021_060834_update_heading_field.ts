import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "full_width" boolean;
ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "text_alignment" "enum_pages_blocks_block_heading_text_alignment";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "full_width" boolean;
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "text_alignment" "enum__pages_v_blocks_block_heading_text_alignment";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "full_width" boolean;
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "text_alignment" "enum_careers_list_settings_blocks_block_heading_text_alignment";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "full_width" boolean;
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "text_alignment" "enum_careers_info_settings_blocks_block_heading_text_alignment";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "text_alignment";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "text_alignment";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_alignment";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_alignment";`);

};
