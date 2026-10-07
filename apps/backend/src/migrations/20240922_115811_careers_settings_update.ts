import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_image_carousel_variant" AS ENUM('images', 'cards', 'videos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_collections_collection" AS ENUM('pages', 'category');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_block_button_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_section_background" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_image_carousel_variant" AS ENUM('images', 'cards', 'videos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_collections_collection" AS ENUM('pages', 'category');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_block_button_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"url" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"variant" "enum_careers_list_settings_blocks_block_image_carousel_variant",
	"slides_per_view" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"show_search" boolean,
	"show_job_count" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_collections" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"collection" "enum_careers_list_settings_blocks_block_collections_collection",
	"collection_select_all" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_button" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"variant" "enum_careers_list_settings_blocks_block_button_variant",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"background" "enum_careers_list_settings_blocks_block_section_background",
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_careers_listing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_careers_info" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"has_featured_image" boolean,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"pages_id" integer,
	"category_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"url" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"variant" "enum_careers_info_settings_blocks_block_image_carousel_variant",
	"slides_per_view" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"show_search" boolean,
	"show_job_count" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_collections" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"collection" "enum_careers_info_settings_blocks_block_collections_collection",
	"collection_select_all" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_button" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"variant" "enum_careers_info_settings_blocks_block_button_variant",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"background" "enum_careers_info_settings_blocks_block_section_background",
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"show_sub_title" boolean,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_careers_info" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"has_featured_image" boolean,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"pages_id" integer,
	"category_id" integer
);

CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_items_order_idx" ON "careers_list_settings_blocks_block_image_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_items_parent_id_idx" ON "careers_list_settings_blocks_block_image_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_order_idx" ON "careers_list_settings_blocks_block_image_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_parent_id_idx" ON "careers_list_settings_blocks_block_image_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_carousel_path_idx" ON "careers_list_settings_blocks_block_image_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_order_idx" ON "careers_list_settings_blocks_block_image" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_parent_id_idx" ON "careers_list_settings_blocks_block_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_image_path_idx" ON "careers_list_settings_blocks_block_image" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_categories_order_idx" ON "careers_list_settings_blocks_block_categories" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_categories_parent_id_idx" ON "careers_list_settings_blocks_block_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_categories_path_idx" ON "careers_list_settings_blocks_block_categories" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_collections_order_idx" ON "careers_list_settings_blocks_block_collections" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_collections_parent_id_idx" ON "careers_list_settings_blocks_block_collections" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_collections_path_idx" ON "careers_list_settings_blocks_block_collections" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_button_order_idx" ON "careers_list_settings_blocks_block_button" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_button_parent_id_idx" ON "careers_list_settings_blocks_block_button" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_button_path_idx" ON "careers_list_settings_blocks_block_button" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_section_order_idx" ON "careers_list_settings_blocks_block_section" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_section_parent_id_idx" ON "careers_list_settings_blocks_block_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_section_path_idx" ON "careers_list_settings_blocks_block_section" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_hero_order_idx" ON "careers_list_settings_blocks_block_hero" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_hero_parent_id_idx" ON "careers_list_settings_blocks_block_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_hero_path_idx" ON "careers_list_settings_blocks_block_hero" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_listing_order_idx" ON "careers_list_settings_blocks_block_careers_listing" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_listing_parent_id_idx" ON "careers_list_settings_blocks_block_careers_listing" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_listing_path_idx" ON "careers_list_settings_blocks_block_careers_listing" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_info_order_idx" ON "careers_list_settings_blocks_block_careers_info" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_info_parent_id_idx" ON "careers_list_settings_blocks_block_careers_info" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_careers_info_path_idx" ON "careers_list_settings_blocks_block_careers_info" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_rels_order_idx" ON "careers_list_settings_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_rels_parent_idx" ON "careers_list_settings_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_rels_path_idx" ON "careers_list_settings_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_items_order_idx" ON "careers_info_settings_blocks_block_image_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_items_parent_id_idx" ON "careers_info_settings_blocks_block_image_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_order_idx" ON "careers_info_settings_blocks_block_image_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_parent_id_idx" ON "careers_info_settings_blocks_block_image_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_carousel_path_idx" ON "careers_info_settings_blocks_block_image_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_order_idx" ON "careers_info_settings_blocks_block_image" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_parent_id_idx" ON "careers_info_settings_blocks_block_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_image_path_idx" ON "careers_info_settings_blocks_block_image" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_categories_order_idx" ON "careers_info_settings_blocks_block_categories" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_categories_parent_id_idx" ON "careers_info_settings_blocks_block_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_categories_path_idx" ON "careers_info_settings_blocks_block_categories" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_collections_order_idx" ON "careers_info_settings_blocks_block_collections" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_collections_parent_id_idx" ON "careers_info_settings_blocks_block_collections" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_collections_path_idx" ON "careers_info_settings_blocks_block_collections" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_button_order_idx" ON "careers_info_settings_blocks_block_button" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_button_parent_id_idx" ON "careers_info_settings_blocks_block_button" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_button_path_idx" ON "careers_info_settings_blocks_block_button" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_section_order_idx" ON "careers_info_settings_blocks_block_section" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_section_parent_id_idx" ON "careers_info_settings_blocks_block_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_section_path_idx" ON "careers_info_settings_blocks_block_section" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_hero_order_idx" ON "careers_info_settings_blocks_block_hero" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_hero_parent_id_idx" ON "careers_info_settings_blocks_block_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_hero_path_idx" ON "careers_info_settings_blocks_block_hero" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_order_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_parent_id_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_path_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_info_order_idx" ON "careers_info_settings_blocks_block_careers_info" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_info_parent_id_idx" ON "careers_info_settings_blocks_block_careers_info" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_info_path_idx" ON "careers_info_settings_blocks_block_careers_info" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_rels_order_idx" ON "careers_info_settings_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_rels_parent_idx" ON "careers_info_settings_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_rels_path_idx" ON "careers_info_settings_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_image_carousel_items" ADD CONSTRAINT "careers_list_settings_blocks_block_image_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings_blocks_block_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_image_carousel" ADD CONSTRAINT "careers_list_settings_blocks_block_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_image" ADD CONSTRAINT "careers_list_settings_blocks_block_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_categories" ADD CONSTRAINT "careers_list_settings_blocks_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_collections" ADD CONSTRAINT "careers_list_settings_blocks_block_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_button" ADD CONSTRAINT "careers_list_settings_blocks_block_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_section" ADD CONSTRAINT "careers_list_settings_blocks_block_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_hero" ADD CONSTRAINT "careers_list_settings_blocks_block_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_careers_listing" ADD CONSTRAINT "careers_list_settings_blocks_block_careers_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_careers_info" ADD CONSTRAINT "careers_list_settings_blocks_block_careers_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_rels" ADD CONSTRAINT "careers_list_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_rels" ADD CONSTRAINT "careers_list_settings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_rels" ADD CONSTRAINT "careers_list_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_rels" ADD CONSTRAINT "careers_list_settings_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_image_carousel_items" ADD CONSTRAINT "careers_info_settings_blocks_block_image_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings_blocks_block_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_image_carousel" ADD CONSTRAINT "careers_info_settings_blocks_block_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_image" ADD CONSTRAINT "careers_info_settings_blocks_block_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_categories" ADD CONSTRAINT "careers_info_settings_blocks_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_collections" ADD CONSTRAINT "careers_info_settings_blocks_block_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_button" ADD CONSTRAINT "careers_info_settings_blocks_block_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_section" ADD CONSTRAINT "careers_info_settings_blocks_block_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_hero" ADD CONSTRAINT "careers_info_settings_blocks_block_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_careers_listing" ADD CONSTRAINT "careers_info_settings_blocks_block_careers_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_careers_info" ADD CONSTRAINT "careers_info_settings_blocks_block_careers_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_rels" ADD CONSTRAINT "careers_info_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_rels" ADD CONSTRAINT "careers_info_settings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_rels" ADD CONSTRAINT "careers_info_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_rels" ADD CONSTRAINT "careers_info_settings_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE IF EXISTS "careers_list_settings_blocks_block_image_carousel_items" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_image_carousel" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_image" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_categories" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_collections" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_button" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_section" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_hero" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_careers_listing" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_blocks_block_careers_info";
DROP TABLE IF EXISTS "careers_list_settings" CASCADE;
DROP TABLE IF EXISTS "careers_list_settings_rels" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_image_carousel_items" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_image_carousel" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_image" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_categories" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_collections" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_button" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_section" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_hero" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_careers_listing" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_blocks_block_careers_info" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings" CASCADE;
DROP TABLE IF EXISTS "careers_info_settings_rels" CASCADE;`);
}
