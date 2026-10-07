import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_nav_menu_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_nav_menu_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_image_carousel_variant" AS ENUM('images', 'cards', 'videos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_section_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'custom', 'img');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_section_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_button_variant" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_heading_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_heading_variant_element" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_heading_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_heading_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_image_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_text_editor_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_nav_menu_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_collections_collection" AS ENUM('pages', 'category');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'custom', 'img');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_inner_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_inner_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'custom', 'img');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_container_inner_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_header_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_footer_bg_option" AS ENUM('transparent', 'primary', 'secondary', 'accent', 'neutral', 'custom', 'img');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_footer_bg_object_fit" AS ENUM('fill', 'contain', 'cover', 'none', 'scale-down');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_nav_menu_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_nav_menu_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_block_nav_menu_dropdown_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_nav_menu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_pages_blocks_block_nav_menu_type",
	"ext_url_external_title" varchar,
	"ext_url" varchar,
	"dropdown_label" varchar,
	"buttons_button_text" varchar,
	"buttons_url" varchar,
	"buttons_button_style" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_nav_menu_dropdown_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_nav_menu" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__pages_v_blocks_block_nav_menu_type",
	"ext_url_external_title" varchar,
	"ext_url" varchar,
	"dropdown_label" varchar,
	"buttons_button_text" varchar,
	"buttons_url" varchar,
	"buttons_button_style" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_image_carousel_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"url" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_image_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"variant" "enum_menus_blocks_block_image_carousel_variant",
	"max_height" numeric,
	"slides_per_view" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_button" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"button_id" varchar,
	"variant" "enum_menus_blocks_block_button_variant",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_heading" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar,
	"full_width" boolean,
	"font_bold" boolean,
	"text_alignment" "enum_menus_blocks_block_heading_text_alignment",
	"variant_element" "enum_menus_blocks_block_heading_variant_element",
	"text_size" "enum_menus_blocks_block_heading_text_size",
	"color_value" "enum_menus_blocks_block_heading_color_value",
	"color_custom" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"max_height" numeric,
	"object_fit" "enum_menus_blocks_block_image_object_fit",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_text_editor" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb,
	"full_width" boolean,
	"color_value" "enum_menus_blocks_block_text_editor_color_value",
	"color_custom" varchar,
	"text_font" "t_f",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_embed" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_spacer" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"full_height" boolean,
	"num_height" numeric,
	"full_width" boolean,
	"num_width" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_nav_menu_dropdown_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_nav_menu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_menus_blocks_block_nav_menu_type",
	"ext_url_external_title" varchar,
	"ext_url" varchar,
	"dropdown_label" varchar,
	"buttons_button_text" varchar,
	"buttons_url" varchar,
	"buttons_button_style" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"show_search" boolean,
	"show_job_count" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_collections" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"collection" "enum_menus_blocks_block_collections_collection",
	"collection_select_all" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_container_inner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_menus_blocks_container_inner_direction",
	"align_items" "s_a_i",
	"justify_content" "s_j_c",
	"bg_option" "enum_menus_blocks_container_inner_bg_option",
	"bg_opacity" "op",
	"bg_color" varchar,
	"bg_object_fit" "enum_menus_blocks_container_inner_bg_object_fit",
	"bg_overlay" boolean,
	"bg_ov_option" "opt",
	"bg_ov_solid_option" "opt_sld",
	"bg_ov_solid_custom" varchar,
	"bg_ov_solid_opacity" numeric,
	"bg_ov_gradient_degrees" numeric,
	"bg_ov_gradient_from_opacity" numeric,
	"bg_ov_gradient_to_opacity" numeric,
	"bg_ov_gradient_from" "grdnt_frm",
	"bg_ov_gradient_from_custom" varchar,
	"bg_ov_gradient_to" "grdnt_to",
	"bg_ov_gradient_to_custom" varchar,
	"max_width_full" boolean,
	"max_width_max" numeric,
	"min_height" numeric,
	"num_gap" numeric,
	"margin_desktop_left" numeric,
	"margin_desktop_top" numeric,
	"margin_desktop_right" numeric,
	"margin_desktop_bottom" numeric,
	"margin_mobile_left" numeric,
	"margin_mobile_top" numeric,
	"margin_mobile_right" numeric,
	"margin_mobile_bottom" numeric,
	"padding_desktop_left" numeric,
	"padding_desktop_top" numeric,
	"padding_desktop_right" numeric,
	"padding_desktop_bottom" numeric,
	"padding_mobile_left" numeric,
	"padding_mobile_top" numeric,
	"padding_mobile_right" numeric,
	"padding_mobile_bottom" numeric,
	"responsive_show_mobile" boolean,
	"responsive_show_desktop" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_container" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_menus_blocks_container_direction",
	"align_items" "s_a_i",
	"justify_content" "s_j_c",
	"bg_option" "enum_menus_blocks_container_bg_option",
	"bg_opacity" "op",
	"bg_color" varchar,
	"bg_object_fit" "enum_menus_blocks_container_bg_object_fit",
	"bg_overlay" boolean,
	"bg_ov_option" "opt",
	"bg_ov_solid_option" "opt_sld",
	"bg_ov_solid_custom" varchar,
	"bg_ov_solid_opacity" numeric,
	"bg_ov_gradient_degrees" numeric,
	"bg_ov_gradient_from_opacity" numeric,
	"bg_ov_gradient_to_opacity" numeric,
	"bg_ov_gradient_from" "grdnt_frm",
	"bg_ov_gradient_from_custom" varchar,
	"bg_ov_gradient_to" "grdnt_to",
	"bg_ov_gradient_to_custom" varchar,
	"max_width_full" boolean,
	"max_width_max" numeric,
	"min_height" numeric,
	"num_gap" numeric,
	"margin_desktop_left" numeric,
	"margin_desktop_top" numeric,
	"margin_desktop_right" numeric,
	"margin_desktop_bottom" numeric,
	"margin_mobile_left" numeric,
	"margin_mobile_top" numeric,
	"margin_mobile_right" numeric,
	"margin_mobile_bottom" numeric,
	"padding_desktop_left" numeric,
	"padding_desktop_top" numeric,
	"padding_desktop_right" numeric,
	"padding_desktop_bottom" numeric,
	"padding_mobile_left" numeric,
	"padding_mobile_top" numeric,
	"padding_mobile_right" numeric,
	"padding_mobile_bottom" numeric,
	"responsive_show_mobile" boolean,
	"responsive_show_desktop" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"bg_option" "enum_menus_blocks_block_section_bg_option",
	"bg_opacity" "op",
	"bg_color" varchar,
	"bg_object_fit" "enum_menus_blocks_block_section_bg_object_fit",
	"bg_overlay" boolean,
	"bg_ov_option" "opt",
	"bg_ov_solid_option" "opt_sld",
	"bg_ov_solid_custom" varchar,
	"bg_ov_solid_opacity" numeric,
	"bg_ov_gradient_degrees" numeric,
	"bg_ov_gradient_from_opacity" numeric,
	"bg_ov_gradient_to_opacity" numeric,
	"bg_ov_gradient_from" "grdnt_frm",
	"bg_ov_gradient_from_custom" varchar,
	"bg_ov_gradient_to" "grdnt_to",
	"bg_ov_gradient_to_custom" varchar,
	"max_width_full" boolean,
	"max_width_max" numeric,
	"min_height" numeric,
	"num_gap" numeric,
	"margin_desktop_left" numeric,
	"margin_desktop_top" numeric,
	"margin_desktop_right" numeric,
	"margin_desktop_bottom" numeric,
	"margin_mobile_left" numeric,
	"margin_mobile_top" numeric,
	"margin_mobile_right" numeric,
	"margin_mobile_bottom" numeric,
	"padding_desktop_left" numeric,
	"padding_desktop_top" numeric,
	"padding_desktop_right" numeric,
	"padding_desktop_bottom" numeric,
	"padding_mobile_left" numeric,
	"padding_mobile_top" numeric,
	"padding_mobile_right" numeric,
	"padding_mobile_bottom" numeric,
	"responsive_show_mobile" boolean,
	"responsive_show_desktop" boolean,
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"max_width_full" boolean,
	"max_width_max" numeric,
	"min_height" numeric,
	"num_gap" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu_dropdown_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_careers_list_settings_blocks_block_nav_menu_type" NOT NULL,
	"ext_url_external_title" varchar,
	"ext_url" varchar,
	"dropdown_label" varchar,
	"buttons_button_text" varchar,
	"buttons_url" varchar,
	"buttons_button_style" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu_dropdown_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_careers_info_settings_blocks_block_nav_menu_type" NOT NULL,
	"ext_url_external_title" varchar,
	"ext_url" varchar,
	"dropdown_label" varchar,
	"buttons_button_text" varchar,
	"buttons_url" varchar,
	"buttons_button_style" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

ALTER TABLE "menus_header_menu" ALTER COLUMN "item_type" DROP NOT NULL;
ALTER TABLE "menus_footer_grouped_menu_menu" ALTER COLUMN "item_type" DROP NOT NULL;
ALTER TABLE "menus_footer_grouped_menu" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "menus" ADD COLUMN "header_use_layout" boolean;
ALTER TABLE "menus" ADD COLUMN "header_color_value" "enum_menus_header_color_value";
ALTER TABLE "menus" ADD COLUMN "header_color_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "footer_use_layout" boolean;
ALTER TABLE "menus" ADD COLUMN "footer_bg_option" "enum_menus_footer_bg_option";
ALTER TABLE "menus" ADD COLUMN "footer_bg_opacity" "op";
ALTER TABLE "menus" ADD COLUMN "footer_bg_color" varchar;
ALTER TABLE "menus" ADD COLUMN "footer_bg_object_fit" "enum_menus_footer_bg_object_fit";
ALTER TABLE "menus" ADD COLUMN "footer_bg_overlay" boolean;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_option" "opt";
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_solid_option" "opt_sld";
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_solid_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_solid_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_degrees" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_from_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_to_opacity" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_from" "grdnt_frm";
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_from_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_to" "grdnt_to";
ALTER TABLE "menus" ADD COLUMN "footer_bg_ov_gradient_to_custom" varchar;
ALTER TABLE "menus" ADD COLUMN "footer_max_width_full" boolean;
ALTER TABLE "menus" ADD COLUMN "footer_max_width_max" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_min_height" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_num_gap" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_desktop_left" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_desktop_top" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_desktop_right" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_desktop_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_mobile_left" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_mobile_top" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_mobile_right" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_margin_mobile_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_desktop_left" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_desktop_top" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_desktop_right" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_desktop_bottom" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_mobile_left" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_mobile_top" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_mobile_right" numeric;
ALTER TABLE "menus" ADD COLUMN "footer_padding_mobile_bottom" numeric;
ALTER TABLE "menus_rels" ADD COLUMN "category_id" integer;
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_menu_dropdown_submenu_order_idx" ON "pages_blocks_block_nav_menu_dropdown_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_menu_dropdown_submenu_parent_id_idx" ON "pages_blocks_block_nav_menu_dropdown_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_menu_order_idx" ON "pages_blocks_block_nav_menu" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_menu_parent_id_idx" ON "pages_blocks_block_nav_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_order_idx" ON "pages_blocks_block_nav" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_parent_id_idx" ON "pages_blocks_block_nav" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_nav_path_idx" ON "pages_blocks_block_nav" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_menu_dropdown_submenu_order_idx" ON "_pages_v_blocks_block_nav_menu_dropdown_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_menu_dropdown_submenu_parent_id_idx" ON "_pages_v_blocks_block_nav_menu_dropdown_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_menu_order_idx" ON "_pages_v_blocks_block_nav_menu" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_menu_parent_id_idx" ON "_pages_v_blocks_block_nav_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_order_idx" ON "_pages_v_blocks_block_nav" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_parent_id_idx" ON "_pages_v_blocks_block_nav" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_nav_path_idx" ON "_pages_v_blocks_block_nav" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_carousel_items_order_idx" ON "menus_blocks_block_image_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_carousel_items_parent_id_idx" ON "menus_blocks_block_image_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_carousel_order_idx" ON "menus_blocks_block_image_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_carousel_parent_id_idx" ON "menus_blocks_block_image_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_carousel_path_idx" ON "menus_blocks_block_image_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_button_order_idx" ON "menus_blocks_block_button" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_button_parent_id_idx" ON "menus_blocks_block_button" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_button_path_idx" ON "menus_blocks_block_button" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_heading_order_idx" ON "menus_blocks_block_heading" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_heading_parent_id_idx" ON "menus_blocks_block_heading" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_heading_path_idx" ON "menus_blocks_block_heading" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_order_idx" ON "menus_blocks_block_image" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_parent_id_idx" ON "menus_blocks_block_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_image_path_idx" ON "menus_blocks_block_image" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_text_editor_order_idx" ON "menus_blocks_block_text_editor" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_text_editor_parent_id_idx" ON "menus_blocks_block_text_editor" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_text_editor_path_idx" ON "menus_blocks_block_text_editor" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_embed_order_idx" ON "menus_blocks_block_embed" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_embed_parent_id_idx" ON "menus_blocks_block_embed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_embed_path_idx" ON "menus_blocks_block_embed" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_spacer_order_idx" ON "menus_blocks_block_spacer" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_spacer_parent_id_idx" ON "menus_blocks_block_spacer" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_spacer_path_idx" ON "menus_blocks_block_spacer" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_menu_dropdown_submenu_order_idx" ON "menus_blocks_block_nav_menu_dropdown_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_menu_dropdown_submenu_parent_id_idx" ON "menus_blocks_block_nav_menu_dropdown_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_menu_order_idx" ON "menus_blocks_block_nav_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_menu_parent_id_idx" ON "menus_blocks_block_nav_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_order_idx" ON "menus_blocks_block_nav" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_parent_id_idx" ON "menus_blocks_block_nav" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_nav_path_idx" ON "menus_blocks_block_nav" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_categories_order_idx" ON "menus_blocks_block_categories" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_categories_parent_id_idx" ON "menus_blocks_block_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_categories_path_idx" ON "menus_blocks_block_categories" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_collections_order_idx" ON "menus_blocks_block_collections" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_collections_parent_id_idx" ON "menus_blocks_block_collections" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_collections_path_idx" ON "menus_blocks_block_collections" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_inner_order_idx" ON "menus_blocks_container_inner" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_inner_parent_id_idx" ON "menus_blocks_container_inner" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_inner_path_idx" ON "menus_blocks_container_inner" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_order_idx" ON "menus_blocks_container" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_parent_id_idx" ON "menus_blocks_container" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_container_path_idx" ON "menus_blocks_container" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_section_order_idx" ON "menus_blocks_block_section" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_section_parent_id_idx" ON "menus_blocks_block_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_section_path_idx" ON "menus_blocks_block_section" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_hero_order_idx" ON "menus_blocks_block_hero" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_hero_parent_id_idx" ON "menus_blocks_block_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_hero_path_idx" ON "menus_blocks_block_hero" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu_dropdown_submenu_order_idx" ON "careers_list_settings_blocks_block_nav_menu_dropdown_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu_dropdown_submenu_parent_id_idx" ON "careers_list_settings_blocks_block_nav_menu_dropdown_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu_order_idx" ON "careers_list_settings_blocks_block_nav_menu" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_menu_parent_id_idx" ON "careers_list_settings_blocks_block_nav_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_order_idx" ON "careers_list_settings_blocks_block_nav" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_parent_id_idx" ON "careers_list_settings_blocks_block_nav" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_nav_path_idx" ON "careers_list_settings_blocks_block_nav" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu_dropdown_submenu_order_idx" ON "careers_info_settings_blocks_block_nav_menu_dropdown_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu_dropdown_submenu_parent_id_idx" ON "careers_info_settings_blocks_block_nav_menu_dropdown_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu_order_idx" ON "careers_info_settings_blocks_block_nav_menu" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_menu_parent_id_idx" ON "careers_info_settings_blocks_block_nav_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_order_idx" ON "careers_info_settings_blocks_block_nav" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_parent_id_idx" ON "careers_info_settings_blocks_block_nav" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_nav_path_idx" ON "careers_info_settings_blocks_block_nav" ("_path");
DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_nav_menu_dropdown_submenu" ADD CONSTRAINT "pages_blocks_block_nav_menu_dropdown_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_block_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_nav_menu" ADD CONSTRAINT "pages_blocks_block_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_block_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_nav" ADD CONSTRAINT "pages_blocks_block_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_nav_menu_dropdown_submenu" ADD CONSTRAINT "_pages_v_blocks_block_nav_menu_dropdown_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_block_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_nav_menu" ADD CONSTRAINT "_pages_v_blocks_block_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_block_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_nav" ADD CONSTRAINT "_pages_v_blocks_block_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_image_carousel_items" ADD CONSTRAINT "menus_blocks_block_image_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_blocks_block_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_image_carousel" ADD CONSTRAINT "menus_blocks_block_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_button" ADD CONSTRAINT "menus_blocks_block_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_heading" ADD CONSTRAINT "menus_blocks_block_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_image" ADD CONSTRAINT "menus_blocks_block_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_text_editor" ADD CONSTRAINT "menus_blocks_block_text_editor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_embed" ADD CONSTRAINT "menus_blocks_block_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_spacer" ADD CONSTRAINT "menus_blocks_block_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_nav_menu_dropdown_submenu" ADD CONSTRAINT "menus_blocks_block_nav_menu_dropdown_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_blocks_block_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_nav_menu" ADD CONSTRAINT "menus_blocks_block_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_blocks_block_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_nav" ADD CONSTRAINT "menus_blocks_block_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_categories" ADD CONSTRAINT "menus_blocks_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_collections" ADD CONSTRAINT "menus_blocks_block_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_container_inner" ADD CONSTRAINT "menus_blocks_container_inner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_container" ADD CONSTRAINT "menus_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_section" ADD CONSTRAINT "menus_blocks_block_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_hero" ADD CONSTRAINT "menus_blocks_block_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_nav_menu_dropdown_submenu" ADD CONSTRAINT "careers_list_settings_blocks_block_nav_menu_dropdown_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings_blocks_block_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_nav_menu" ADD CONSTRAINT "careers_list_settings_blocks_block_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings_blocks_block_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_nav" ADD CONSTRAINT "careers_list_settings_blocks_block_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_nav_menu_dropdown_submenu" ADD CONSTRAINT "careers_info_settings_blocks_block_nav_menu_dropdown_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings_blocks_block_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_nav_menu" ADD CONSTRAINT "careers_info_settings_blocks_block_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings_blocks_block_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_nav" ADD CONSTRAINT "careers_info_settings_blocks_block_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_nav_menu_dropdown_submenu";
DROP TABLE "pages_blocks_block_nav_menu";
DROP TABLE "pages_blocks_block_nav";
DROP TABLE "_pages_v_blocks_block_nav_menu_dropdown_submenu";
DROP TABLE "_pages_v_blocks_block_nav_menu";
DROP TABLE "_pages_v_blocks_block_nav";
DROP TABLE "menus_blocks_block_image_carousel_items";
DROP TABLE "menus_blocks_block_image_carousel";
DROP TABLE "menus_blocks_block_button";
DROP TABLE "menus_blocks_block_heading";
DROP TABLE "menus_blocks_block_image";
DROP TABLE "menus_blocks_block_text_editor";
DROP TABLE "menus_blocks_block_embed";
DROP TABLE "menus_blocks_block_spacer";
DROP TABLE "menus_blocks_block_nav_menu_dropdown_submenu";
DROP TABLE "menus_blocks_block_nav_menu";
DROP TABLE "menus_blocks_block_nav";
DROP TABLE "menus_blocks_block_categories";
DROP TABLE "menus_blocks_block_collections";
DROP TABLE "menus_blocks_container_inner";
DROP TABLE "menus_blocks_container";
DROP TABLE "menus_blocks_block_section";
DROP TABLE "menus_blocks_block_hero";
DROP TABLE "careers_list_settings_blocks_block_nav_menu_dropdown_submenu";
DROP TABLE "careers_list_settings_blocks_block_nav_menu";
DROP TABLE "careers_list_settings_blocks_block_nav";
DROP TABLE "careers_info_settings_blocks_block_nav_menu_dropdown_submenu";
DROP TABLE "careers_info_settings_blocks_block_nav_menu";
DROP TABLE "careers_info_settings_blocks_block_nav";
ALTER TABLE "menus_rels" DROP CONSTRAINT "menus_rels_category_fk";

ALTER TABLE "menus_header_menu" ALTER COLUMN "item_type" SET NOT NULL;
ALTER TABLE "menus_footer_grouped_menu_menu" ALTER COLUMN "item_type" SET NOT NULL;
ALTER TABLE "menus_footer_grouped_menu" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_use_layout";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_color_value";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "header_color_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_use_layout";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_color";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_object_fit";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_overlay";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_solid_option";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_solid_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_solid_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_degrees";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_from_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_to_opacity";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_from";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_from_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_to";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_bg_ov_gradient_to_custom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_max_width_full";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_max_width_max";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_min_height";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_num_gap";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_desktop_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_desktop_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_desktop_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_desktop_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_mobile_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_mobile_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_mobile_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_margin_mobile_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_desktop_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_desktop_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_desktop_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_desktop_bottom";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_mobile_left";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_mobile_top";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_mobile_right";
ALTER TABLE "menus" DROP COLUMN IF EXISTS "footer_padding_mobile_bottom";
ALTER TABLE "menus_rels" DROP COLUMN IF EXISTS "category_id";`);

};
