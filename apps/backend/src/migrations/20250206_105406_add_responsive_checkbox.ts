import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_menus_header_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'custom', 'img');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_header_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "pages_blocks_container" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "pages_blocks_container" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "menus" ADD COLUMN "header_bg_option" "enum_menus_header_bg_option";
ALTER TABLE "menus" ADD COLUMN "header_bg_opacity" "op";
ALTER TABLE "menus" ADD COLUMN "header_bg_color" varchar;
ALTER TABLE "menus" ADD COLUMN "header_bg_object_fit" "enum_menus_header_bg_object_fit";
ALTER TABLE "menus" ADD COLUMN "header_bg_overlay" boolean;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_option" "opt";
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_solid_option" "opt_sld";
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_solid_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_solid_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_degrees" numeric;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_from_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_to_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_from" "grdnt_frm";
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_from_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_to" "grdnt_to";
ALTER TABLE "menus" ADD COLUMN "header_bg_ov_gradient_to_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "header_max_width_full" boolean;
ALTER TABLE "menus" ADD COLUMN "header_max_width_max" numeric;
ALTER TABLE "menus" ADD COLUMN "header_min_height" numeric;
ALTER TABLE "menus" ADD COLUMN "header_num_gap" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_desktop_left" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_desktop_top" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_desktop_right" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_desktop_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_mobile_left" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_mobile_top" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_mobile_right" numeric;
ALTER TABLE "menus" ADD COLUMN "header_margin_mobile_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_desktop_left" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_desktop_top" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_desktop_right" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_desktop_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_mobile_left" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_mobile_top" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_mobile_right" numeric;
ALTER TABLE "menus" ADD COLUMN "header_padding_mobile_bottom" numeric;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "responsive_show_desktop" boolean;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "responsive_show_mobile" boolean;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "responsive_show_desktop" boolean;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_color";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_object_fit";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_overlay";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_solid_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_solid_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_solid_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_degrees";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_from_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_to_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_from";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_from_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_to";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_bg_ov_gradient_to_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_max_width_full";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_max_width_max";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_min_height";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_num_gap";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_desktop_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_desktop_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_desktop_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_desktop_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_mobile_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_mobile_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_mobile_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_margin_mobile_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_desktop_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_desktop_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_desktop_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_desktop_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_mobile_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_mobile_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_mobile_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_padding_mobile_bottom";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "responsive_show_desktop";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_mobile";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "responsive_show_desktop";`);

};
