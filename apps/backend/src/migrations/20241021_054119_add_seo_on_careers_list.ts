import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_heading_variant_element" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_heading_variant_element" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_heading_variant_element" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_heading_variant_element" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TYPE "enum_pages_blocks_block_button_variant" ADD VALUE 'default';
ALTER TYPE "enum__pages_v_blocks_block_button_variant" ADD VALUE 'default';
ALTER TYPE "enum_careers_list_settings_blocks_block_button_variant" ADD VALUE 'default';
ALTER TYPE "enum_careers_info_settings_blocks_block_button_variant" ADD VALUE 'default';
CREATE TABLE IF NOT EXISTS "pages_blocks_block_heading" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar,
	"variant_element" "enum_pages_blocks_block_heading_variant_element",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_text_editor" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_heading" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar,
	"variant_element" "enum__pages_v_blocks_block_heading_variant_element",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_text_editor" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_heading" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar,
	"variant_element" "enum_careers_list_settings_blocks_block_heading_variant_element",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_text_editor" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_locales" (
	"meta_title" varchar,
	"meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "careers_list_settings_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_heading" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar,
	"variant_element" "enum_careers_info_settings_blocks_block_heading_variant_element",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_text_editor" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb,
	"block_name" varchar
);

ALTER TABLE "careers_list_settings_rels" ADD COLUMN "locale" "_locales";
CREATE INDEX IF NOT EXISTS "pages_blocks_block_heading_order_idx" ON "pages_blocks_block_heading" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_heading_parent_id_idx" ON "pages_blocks_block_heading" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_heading_path_idx" ON "pages_blocks_block_heading" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_text_editor_order_idx" ON "pages_blocks_block_text_editor" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_text_editor_parent_id_idx" ON "pages_blocks_block_text_editor" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_text_editor_path_idx" ON "pages_blocks_block_text_editor" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_heading_order_idx" ON "_pages_v_blocks_block_heading" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_heading_parent_id_idx" ON "_pages_v_blocks_block_heading" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_heading_path_idx" ON "_pages_v_blocks_block_heading" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_text_editor_order_idx" ON "_pages_v_blocks_block_text_editor" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_text_editor_parent_id_idx" ON "_pages_v_blocks_block_text_editor" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_text_editor_path_idx" ON "_pages_v_blocks_block_text_editor" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_heading_order_idx" ON "careers_list_settings_blocks_block_heading" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_heading_parent_id_idx" ON "careers_list_settings_blocks_block_heading" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_heading_path_idx" ON "careers_list_settings_blocks_block_heading" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_text_editor_order_idx" ON "careers_list_settings_blocks_block_text_editor" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_text_editor_parent_id_idx" ON "careers_list_settings_blocks_block_text_editor" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_text_editor_path_idx" ON "careers_list_settings_blocks_block_text_editor" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_heading_order_idx" ON "careers_info_settings_blocks_block_heading" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_heading_parent_id_idx" ON "careers_info_settings_blocks_block_heading" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_heading_path_idx" ON "careers_info_settings_blocks_block_heading" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_text_editor_order_idx" ON "careers_info_settings_blocks_block_text_editor" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_text_editor_parent_id_idx" ON "careers_info_settings_blocks_block_text_editor" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_text_editor_path_idx" ON "careers_info_settings_blocks_block_text_editor" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_rels_locale_idx" ON "careers_list_settings_rels" ("locale");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_heading" ADD CONSTRAINT "pages_blocks_block_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_text_editor" ADD CONSTRAINT "pages_blocks_block_text_editor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_heading" ADD CONSTRAINT "_pages_v_blocks_block_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_text_editor" ADD CONSTRAINT "_pages_v_blocks_block_text_editor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_heading" ADD CONSTRAINT "careers_list_settings_blocks_block_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD CONSTRAINT "careers_list_settings_blocks_block_text_editor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_locales" ADD CONSTRAINT "careers_list_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_heading" ADD CONSTRAINT "careers_info_settings_blocks_block_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD CONSTRAINT "careers_info_settings_blocks_block_text_editor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_heading";
DROP TABLE "pages_blocks_block_text_editor";
DROP TABLE "_pages_v_blocks_block_heading";
DROP TABLE "_pages_v_blocks_block_text_editor";
DROP TABLE "careers_list_settings_blocks_block_heading";
DROP TABLE "careers_list_settings_blocks_block_text_editor";
DROP TABLE "careers_list_settings_locales";
DROP TABLE "careers_info_settings_blocks_block_heading";
DROP TABLE "careers_info_settings_blocks_block_text_editor";
DROP INDEX IF EXISTS "careers_list_settings_rels_locale_idx";
ALTER TABLE "careers_list_settings_rels" DROP COLUMN IF EXISTS "locale";`);

};
