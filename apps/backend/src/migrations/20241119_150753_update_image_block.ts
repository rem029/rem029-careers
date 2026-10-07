import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_image_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_image_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_image_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_image_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_image" ADD COLUMN "max_height" numeric;
ALTER TABLE "pages_blocks_block_image" ADD COLUMN "object_fit" "enum_pages_blocks_block_image_object_fit";
ALTER TABLE "_pages_v_blocks_block_image" ADD COLUMN "max_height" numeric;
ALTER TABLE "_pages_v_blocks_block_image" ADD COLUMN "object_fit" "enum__pages_v_blocks_block_image_object_fit";
ALTER TABLE "careers_list_settings_blocks_block_image" ADD COLUMN "max_height" numeric;
ALTER TABLE "careers_list_settings_blocks_block_image" ADD COLUMN "object_fit" "enum_careers_list_settings_blocks_block_image_object_fit";
ALTER TABLE "careers_info_settings_blocks_block_image" ADD COLUMN "max_height" numeric;
ALTER TABLE "careers_info_settings_blocks_block_image" ADD COLUMN "object_fit" "enum_careers_info_settings_blocks_block_image_object_fit";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_image" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "pages_blocks_block_image" DROP COLUMN IF EXISTS "object_fit";
ALTER TABLE "_pages_v_blocks_block_image" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "_pages_v_blocks_block_image" DROP COLUMN IF EXISTS "object_fit";
ALTER TABLE "careers_list_settings_blocks_block_image" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "careers_list_settings_blocks_block_image" DROP COLUMN IF EXISTS "object_fit";
ALTER TABLE "careers_info_settings_blocks_block_image" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "careers_info_settings_blocks_block_image" DROP COLUMN IF EXISTS "object_fit";`);

};
