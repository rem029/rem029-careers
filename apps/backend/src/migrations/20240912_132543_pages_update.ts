import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_section_cta_info_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_section_cta_info_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_section" ADD COLUMN "has_cta_button" boolean;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_title" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_link" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_variant" "enum_pages_blocks_block_section_cta_info_variant";
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "has_cta_button" boolean;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_title" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_link" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_variant" "enum__pages_v_blocks_block_section_cta_info_variant";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "has_cta_button";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_title";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_link";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_variant";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "has_cta_button";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_title";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_link";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_variant";`);

};
