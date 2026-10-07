import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TYPE "enum_pages_blocks_block_heading_text_color" ADD VALUE 'accent';
ALTER TYPE "enum__pages_v_blocks_block_heading_text_color" ADD VALUE 'accent';
ALTER TYPE "enum_careers_list_settings_blocks_block_heading_text_color" ADD VALUE 'accent';
ALTER TYPE "enum_careers_info_settings_blocks_block_heading_text_color" ADD VALUE 'accent';
ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "font_bold" boolean;
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "full_width" boolean;
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "text_color" "enum_pages_blocks_block_text_editor_text_color";
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "num_gap" numeric;
ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "num_gap" numeric;
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "font_bold" boolean;
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "full_width" boolean;
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "text_color" "enum__pages_v_blocks_block_text_editor_text_color";
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "num_gap" numeric;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "font_bold" boolean;
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "full_width" boolean;
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "text_color" "enum_careers_list_settings_blocks_block_text_editor_text_color";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_list_settings_blocks_block_hero" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "font_bold" boolean;
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "full_width" boolean;
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "text_color" "enum_careers_info_settings_blocks_block_text_editor_text_color";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_info_settings_blocks_block_hero" ADD COLUMN "num_gap" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_list_settings_blocks_block_hero" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "full_width";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_info_settings_blocks_block_hero" DROP COLUMN IF EXISTS "num_gap";`);

};
