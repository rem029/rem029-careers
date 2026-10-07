import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "op" AS ENUM('bg-opacity-0', 'bg-opacity-5', 'bg-opacity-10', 'bg-opacity-15', 'bg-opacity-20', 'bg-opacity-25', 'bg-opacity-30', 'bg-opacity-35', 'bg-opacity-40', 'bg-opacity-45', 'bg-opacity-50', 'bg-opacity-55', 'bg-opacity-60', 'bg-opacity-65', 'bg-opacity-70', 'bg-opacity-75', 'bg-opacity-80', 'bg-opacity-85', 'bg-opacity-90', 'bg-opacity-95', 'bg-opacity-100');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_section_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_section_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_text_editor_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_inner_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_inner_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_section_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_section_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_text_editor_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_inner_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_inner_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_section_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_section_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_text_editor_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_inner_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_inner_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_section_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_section_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_text_editor_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_inner_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'img', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_inner_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "color_value" "enum_pages_blocks_block_heading_color_value";
ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "color_custom" varchar;
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "color_value" "enum_pages_blocks_block_text_editor_color_value";
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "color_custom" varchar;
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "bg_option" "enum_pages_blocks_container_inner_bg_option";
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "bg_color" varchar;
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "bg_object_fit" "enum_pages_blocks_container_inner_bg_object_fit";
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "min_height" numeric;
ALTER TABLE "pages_blocks_container" ADD COLUMN "bg_option" "enum_pages_blocks_container_bg_option";
ALTER TABLE "pages_blocks_container" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "pages_blocks_container" ADD COLUMN "bg_color" varchar;
ALTER TABLE "pages_blocks_container" ADD COLUMN "bg_object_fit" "enum_pages_blocks_container_bg_object_fit";
ALTER TABLE "pages_blocks_container" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "pages_blocks_container" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "pages_blocks_container" ADD COLUMN "min_height" numeric;
ALTER TABLE "pages_blocks_container" ADD COLUMN "num_gap" numeric;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "bg_option" "enum_pages_blocks_block_section_bg_option";
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "bg_color" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "bg_object_fit" "enum_pages_blocks_block_section_bg_object_fit";
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "min_height" numeric;
ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "min_height" numeric;
ALTER TABLE "pages" ADD COLUMN "bg_option" "enum_pages_bg_option";
ALTER TABLE "pages" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "pages" ADD COLUMN "bg_color" varchar;
ALTER TABLE "pages" ADD COLUMN "bg_object_fit" "enum_pages_bg_object_fit";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "color_value" "enum__pages_v_blocks_block_heading_color_value";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "color_custom" varchar;
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "color_value" "enum__pages_v_blocks_block_text_editor_color_value";
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "color_custom" varchar;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "bg_option" "enum__pages_v_blocks_container_inner_bg_option";
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "bg_color" varchar;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "bg_object_fit" "enum__pages_v_blocks_container_inner_bg_object_fit";
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "min_height" numeric;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "bg_option" "enum__pages_v_blocks_container_bg_option";
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "bg_color" varchar;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "bg_object_fit" "enum__pages_v_blocks_container_bg_object_fit";
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "min_height" numeric;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "num_gap" numeric;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "bg_option" "enum__pages_v_blocks_block_section_bg_option";
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "bg_color" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "bg_object_fit" "enum__pages_v_blocks_block_section_bg_object_fit";
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "min_height" numeric;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "min_height" numeric;
ALTER TABLE "_pages_v" ADD COLUMN "version_bg_option" "enum__pages_v_version_bg_option";
ALTER TABLE "_pages_v" ADD COLUMN "version_bg_opacity" "op";
ALTER TABLE "_pages_v" ADD COLUMN "version_bg_color" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_bg_object_fit" "enum__pages_v_version_bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "color_value" "enum_careers_list_settings_blocks_block_heading_color_value";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "color_custom" varchar;
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "color_value" "enum_careers_list_settings_blocks_block_text_editor_color_value";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "color_custom" varchar;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "bg_option" "enum_careers_list_settings_blocks_container_inner_bg_option";
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "bg_object_fit" "enum_careers_list_settings_blocks_container_inner_bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "bg_option" "enum_careers_list_settings_blocks_container_bg_option";
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "bg_object_fit" "enum_careers_list_settings_blocks_container_bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "bg_option" "enum_careers_list_settings_blocks_block_section_bg_option";
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "bg_object_fit" "enum_careers_list_settings_blocks_block_section_bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_list_settings_blocks_block_hero" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_list_settings_blocks_block_hero" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_list_settings_blocks_block_hero" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_list_settings" ADD COLUMN "bg_option" "enum_careers_list_settings_bg_option";
ALTER TABLE "careers_list_settings" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_list_settings" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_list_settings" ADD COLUMN "bg_object_fit" "enum_careers_list_settings_bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "color_value" "enum_careers_info_settings_blocks_block_heading_color_value";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "color_custom" varchar;
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "color_value" "enum_careers_info_settings_blocks_block_text_editor_color_value";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "color_custom" varchar;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "bg_option" "enum_careers_info_settings_blocks_container_inner_bg_option";
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "bg_object_fit" "enum_careers_info_settings_blocks_container_inner_bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "bg_option" "enum_careers_info_settings_blocks_container_bg_option";
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "bg_object_fit" "enum_careers_info_settings_blocks_container_bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "num_gap" numeric;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "bg_option" "enum_careers_info_settings_blocks_block_section_bg_option";
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "bg_object_fit" "enum_careers_info_settings_blocks_block_section_bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_info_settings_blocks_block_hero" ADD COLUMN "max_width_full" boolean;
ALTER TABLE "careers_info_settings_blocks_block_hero" ADD COLUMN "max_width_max" numeric;
ALTER TABLE "careers_info_settings_blocks_block_hero" ADD COLUMN "min_height" numeric;
ALTER TABLE "careers_info_settings" ADD COLUMN "bg_option" "enum_careers_info_settings_bg_option";
ALTER TABLE "careers_info_settings" ADD COLUMN "bg_opacity" "op";
ALTER TABLE "careers_info_settings" ADD COLUMN "bg_color" varchar;
ALTER TABLE "careers_info_settings" ADD COLUMN "bg_object_fit" "enum_careers_info_settings_bg_object_fit";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "background";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "background";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "background";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_color";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "custom_color";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "background";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_text_editor_text_color" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "text_color" "enum_pages_blocks_block_heading_text_color";
ALTER TABLE "pages_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "text_color" "enum_pages_blocks_block_text_editor_text_color";
ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "background" "enum_pages_blocks_block_section_background";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "text_color" "enum__pages_v_blocks_block_heading_text_color";
ALTER TABLE "_pages_v_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "text_color" "enum__pages_v_blocks_block_text_editor_text_color";
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "background" "enum__pages_v_blocks_block_section_background";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "text_color" "enum_careers_list_settings_blocks_block_heading_text_color";
ALTER TABLE "careers_list_settings_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "text_color" "enum_careers_list_settings_blocks_block_text_editor_text_color";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "background" "enum_careers_list_settings_blocks_block_section_background";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "text_color" "enum_careers_info_settings_blocks_block_heading_text_color";
ALTER TABLE "careers_info_settings_blocks_block_heading" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "text_color" "enum_careers_info_settings_blocks_block_text_editor_text_color";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "custom_color" varchar;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "background" "enum_careers_info_settings_blocks_block_section_background";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "pages_blocks_block_heading" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "_pages_v_blocks_block_heading" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_bg_option";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_bg_opacity";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_bg_color";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "careers_list_settings_blocks_block_heading" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_list_settings_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_list_settings_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_list_settings_blocks_block_hero" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_list_settings" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "careers_info_settings_blocks_block_heading" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_value";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "color_custom";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "num_gap";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "bg_object_fit";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_info_settings_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_full";
ALTER TABLE "careers_info_settings_blocks_block_hero" DROP COLUMN IF EXISTS "max_width_max";
ALTER TABLE "careers_info_settings_blocks_block_hero" DROP COLUMN IF EXISTS "min_height";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "bg_option";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "bg_opacity";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "bg_color";
ALTER TABLE "careers_info_settings" DROP COLUMN IF EXISTS "bg_object_fit";`);

};
