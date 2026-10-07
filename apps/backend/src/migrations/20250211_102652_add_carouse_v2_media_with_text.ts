import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "carousel-v2-type" AS ENUM('media_with_text', 'text_only');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "carousel-v2-media-type" AS ENUM('image', 'video', 'html');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "select-color-value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_v2_media_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-media-type",
	"html" varchar,
	"title" varchar,
	"sub_title" varchar,
	"button_title" varchar,
	"button_link" varchar,
	"button_button_id" varchar,
	"has_divider" boolean,
	"divider_props_color_value" "select-color-value",
	"divider_props_color_custom" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_v2_text_only_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-type",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_v2_media_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "carousel-v2-media-type",
	"html" varchar,
	"title" varchar,
	"sub_title" varchar,
	"button_title" varchar,
	"button_link" varchar,
	"button_button_id" varchar,
	"has_divider" boolean,
	"divider_props_color_value" "select-color-value",
	"divider_props_color_custom" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_v2_text_only_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "carousel-v2-type",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_carousel_v2_media_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-media-type",
	"html" varchar,
	"title" varchar,
	"sub_title" varchar,
	"button_title" varchar,
	"button_link" varchar,
	"button_button_id" varchar,
	"has_divider" boolean,
	"divider_props_color_value" "select-color-value",
	"divider_props_color_custom" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_carousel_v2_text_only_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-type",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_media_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-media-type",
	"html" varchar,
	"title" varchar,
	"sub_title" varchar,
	"button_title" varchar,
	"button_link" varchar,
	"button_button_id" varchar,
	"has_divider" boolean,
	"divider_props_color_value" "select-color-value",
	"divider_props_color_custom" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_text_only_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-type",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_media_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-media-type",
	"html" varchar,
	"title" varchar,
	"sub_title" varchar,
	"button_title" varchar,
	"button_link" varchar,
	"button_button_id" varchar,
	"has_divider" boolean,
	"divider_props_color_value" "select-color-value",
	"divider_props_color_custom" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_text_only_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "carousel-v2-type",
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_media_items_order_idx" ON "pages_blocks_carousel_v2_media_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_media_items_parent_id_idx" ON "pages_blocks_carousel_v2_media_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_text_only_items_order_idx" ON "pages_blocks_carousel_v2_text_only_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_text_only_items_parent_id_idx" ON "pages_blocks_carousel_v2_text_only_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_order_idx" ON "pages_blocks_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_parent_id_idx" ON "pages_blocks_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_v2_path_idx" ON "pages_blocks_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_media_items_order_idx" ON "_pages_v_blocks_carousel_v2_media_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_media_items_parent_id_idx" ON "_pages_v_blocks_carousel_v2_media_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_text_only_items_order_idx" ON "_pages_v_blocks_carousel_v2_text_only_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_text_only_items_parent_id_idx" ON "_pages_v_blocks_carousel_v2_text_only_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_order_idx" ON "_pages_v_blocks_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_parent_id_idx" ON "_pages_v_blocks_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_v2_path_idx" ON "_pages_v_blocks_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_media_items_order_idx" ON "menus_blocks_carousel_v2_media_items" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_media_items_parent_id_idx" ON "menus_blocks_carousel_v2_media_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_text_only_items_order_idx" ON "menus_blocks_carousel_v2_text_only_items" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_text_only_items_parent_id_idx" ON "menus_blocks_carousel_v2_text_only_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_order_idx" ON "menus_blocks_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_parent_id_idx" ON "menus_blocks_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_carousel_v2_path_idx" ON "menus_blocks_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_media_items_order_idx" ON "careers_list_settings_blocks_carousel_v2_media_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_media_items_parent_id_idx" ON "careers_list_settings_blocks_carousel_v2_media_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_text_only_items_order_idx" ON "careers_list_settings_blocks_carousel_v2_text_only_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_text_only_items_parent_id_idx" ON "careers_list_settings_blocks_carousel_v2_text_only_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_order_idx" ON "careers_list_settings_blocks_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_parent_id_idx" ON "careers_list_settings_blocks_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_carousel_v2_path_idx" ON "careers_list_settings_blocks_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_media_items_order_idx" ON "careers_info_settings_blocks_carousel_v2_media_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_media_items_parent_id_idx" ON "careers_info_settings_blocks_carousel_v2_media_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_text_only_items_order_idx" ON "careers_info_settings_blocks_carousel_v2_text_only_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_text_only_items_parent_id_idx" ON "careers_info_settings_blocks_carousel_v2_text_only_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_order_idx" ON "careers_info_settings_blocks_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_parent_id_idx" ON "careers_info_settings_blocks_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_carousel_v2_path_idx" ON "careers_info_settings_blocks_carousel_v2" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_carousel_v2_media_items" ADD CONSTRAINT "pages_blocks_carousel_v2_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_carousel_v2_text_only_items" ADD CONSTRAINT "pages_blocks_carousel_v2_text_only_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_carousel_v2" ADD CONSTRAINT "pages_blocks_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_carousel_v2_media_items" ADD CONSTRAINT "_pages_v_blocks_carousel_v2_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_carousel_v2_text_only_items" ADD CONSTRAINT "_pages_v_blocks_carousel_v2_text_only_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_carousel_v2" ADD CONSTRAINT "_pages_v_blocks_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_carousel_v2_media_items" ADD CONSTRAINT "menus_blocks_carousel_v2_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_carousel_v2_text_only_items" ADD CONSTRAINT "menus_blocks_carousel_v2_text_only_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_carousel_v2" ADD CONSTRAINT "menus_blocks_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_carousel_v2_media_items" ADD CONSTRAINT "careers_list_settings_blocks_carousel_v2_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_carousel_v2_text_only_items" ADD CONSTRAINT "careers_list_settings_blocks_carousel_v2_text_only_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_carousel_v2" ADD CONSTRAINT "careers_list_settings_blocks_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_carousel_v2_media_items" ADD CONSTRAINT "careers_info_settings_blocks_carousel_v2_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_carousel_v2_text_only_items" ADD CONSTRAINT "careers_info_settings_blocks_carousel_v2_text_only_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings_blocks_carousel_v2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_carousel_v2" ADD CONSTRAINT "careers_info_settings_blocks_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_carousel_v2_media_items";
DROP TABLE "pages_blocks_carousel_v2_text_only_items";
DROP TABLE "pages_blocks_carousel_v2";
DROP TABLE "_pages_v_blocks_carousel_v2_media_items";
DROP TABLE "_pages_v_blocks_carousel_v2_text_only_items";
DROP TABLE "_pages_v_blocks_carousel_v2";
DROP TABLE "menus_blocks_carousel_v2_media_items";
DROP TABLE "menus_blocks_carousel_v2_text_only_items";
DROP TABLE "menus_blocks_carousel_v2";
DROP TABLE "careers_list_settings_blocks_carousel_v2_media_items";
DROP TABLE "careers_list_settings_blocks_carousel_v2_text_only_items";
DROP TABLE "careers_list_settings_blocks_carousel_v2";
DROP TABLE "careers_info_settings_blocks_carousel_v2_media_items";
DROP TABLE "careers_info_settings_blocks_carousel_v2_text_only_items";
DROP TABLE "careers_info_settings_blocks_carousel_v2";`);

};
