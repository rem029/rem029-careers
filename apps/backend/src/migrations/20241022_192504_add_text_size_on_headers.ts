import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "text_size" "enum_pages_blocks_block_heading_text_size";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "text_size" "enum__pages_v_blocks_block_heading_text_size";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "text_size" "enum_careers_list_settings_blocks_block_heading_text_size";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "text_size" "enum_careers_info_settings_blocks_block_heading_text_size";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "text_size";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "text_size";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_size";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_size";`);

};
