import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_link_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_link_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_link_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_link_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_link_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_link_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_link_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_link_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_blocks_block_link_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_link_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_link_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_link_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_link_color_value" AS ENUM('primary', 'secondary', 'success', 'warning', 'information', 'error', 'accent', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_link_text_size" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_link_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_block_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"link_id" varchar,
	"color_value" "enum_pages_blocks_block_link_color_value",
	"color_custom" varchar,
	"text_size" "enum_pages_blocks_block_link_text_size",
	"text_font" "t_f",
	"full_width" boolean,
	"text_alignment" "enum_pages_blocks_block_link_text_alignment",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"link_id" varchar,
	"color_value" "enum__pages_v_blocks_block_link_color_value",
	"color_custom" varchar,
	"text_size" "enum__pages_v_blocks_block_link_text_size",
	"text_font" "t_f",
	"full_width" boolean,
	"text_alignment" "enum__pages_v_blocks_block_link_text_alignment",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"link_id" varchar,
	"color_value" "enum_menus_blocks_block_link_color_value",
	"color_custom" varchar,
	"text_size" "enum_menus_blocks_block_link_text_size",
	"text_font" "t_f",
	"full_width" boolean,
	"text_alignment" "enum_menus_blocks_block_link_text_alignment",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "menus_blocks_block_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"link_id" varchar,
	"color_value" "enum_careers_list_settings_blocks_block_link_color_value",
	"color_custom" varchar,
	"text_size" "enum_careers_list_settings_blocks_block_link_text_size",
	"text_font" "t_f",
	"full_width" boolean,
	"text_alignment" "enum_careers_list_settings_blocks_block_link_text_alignment",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_link" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"link_id" varchar,
	"color_value" "enum_careers_info_settings_blocks_block_link_color_value",
	"color_custom" varchar,
	"text_size" "enum_careers_info_settings_blocks_block_link_text_size",
	"text_font" "t_f",
	"full_width" boolean,
	"text_alignment" "enum_careers_info_settings_blocks_block_link_text_alignment",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_carousel_v2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "pages_blocks_block_link_order_idx" ON "pages_blocks_block_link" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_link_parent_id_idx" ON "pages_blocks_block_link" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_link_path_idx" ON "pages_blocks_block_link" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_carousel_v2_order_idx" ON "pages_blocks_block_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_carousel_v2_parent_id_idx" ON "pages_blocks_block_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_carousel_v2_path_idx" ON "pages_blocks_block_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_link_order_idx" ON "_pages_v_blocks_block_link" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_link_parent_id_idx" ON "_pages_v_blocks_block_link" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_link_path_idx" ON "_pages_v_blocks_block_link" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_carousel_v2_order_idx" ON "_pages_v_blocks_block_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_carousel_v2_parent_id_idx" ON "_pages_v_blocks_block_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_carousel_v2_path_idx" ON "_pages_v_blocks_block_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_link_order_idx" ON "menus_blocks_block_link" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_link_parent_id_idx" ON "menus_blocks_block_link" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_link_path_idx" ON "menus_blocks_block_link" ("_path");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_carousel_v2_order_idx" ON "menus_blocks_block_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_carousel_v2_parent_id_idx" ON "menus_blocks_block_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_blocks_block_carousel_v2_path_idx" ON "menus_blocks_block_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_link_order_idx" ON "careers_list_settings_blocks_block_link" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_link_parent_id_idx" ON "careers_list_settings_blocks_block_link" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_link_path_idx" ON "careers_list_settings_blocks_block_link" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_carousel_v2_order_idx" ON "careers_list_settings_blocks_block_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_carousel_v2_parent_id_idx" ON "careers_list_settings_blocks_block_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_carousel_v2_path_idx" ON "careers_list_settings_blocks_block_carousel_v2" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_link_order_idx" ON "careers_info_settings_blocks_block_link" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_link_parent_id_idx" ON "careers_info_settings_blocks_block_link" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_link_path_idx" ON "careers_info_settings_blocks_block_link" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_carousel_v2_order_idx" ON "careers_info_settings_blocks_block_carousel_v2" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_carousel_v2_parent_id_idx" ON "careers_info_settings_blocks_block_carousel_v2" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_carousel_v2_path_idx" ON "careers_info_settings_blocks_block_carousel_v2" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_link" ADD CONSTRAINT "pages_blocks_block_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_carousel_v2" ADD CONSTRAINT "pages_blocks_block_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_link" ADD CONSTRAINT "_pages_v_blocks_block_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_carousel_v2" ADD CONSTRAINT "_pages_v_blocks_block_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_link" ADD CONSTRAINT "menus_blocks_block_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_blocks_block_carousel_v2" ADD CONSTRAINT "menus_blocks_block_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_link" ADD CONSTRAINT "careers_list_settings_blocks_block_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_carousel_v2" ADD CONSTRAINT "careers_list_settings_blocks_block_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_link" ADD CONSTRAINT "careers_info_settings_blocks_block_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_carousel_v2" ADD CONSTRAINT "careers_info_settings_blocks_block_carousel_v2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_link";
DROP TABLE "pages_blocks_block_carousel_v2";
DROP TABLE "_pages_v_blocks_block_link";
DROP TABLE "_pages_v_blocks_block_carousel_v2";
DROP TABLE "menus_blocks_block_link";
DROP TABLE "menus_blocks_block_carousel_v2";
DROP TABLE "careers_list_settings_blocks_block_link";
DROP TABLE "careers_list_settings_blocks_block_carousel_v2";
DROP TABLE "careers_info_settings_blocks_block_link";
DROP TABLE "careers_info_settings_blocks_block_carousel_v2";`);

};
