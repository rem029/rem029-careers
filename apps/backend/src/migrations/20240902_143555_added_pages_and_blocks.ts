import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_block_image_carousel_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"action_title" varchar,
	"action_description" varchar,
	"action_url" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_image_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" jsonb,
	"show_search" boolean,
	"show_job_count" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_block_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"is_homepage" boolean,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status"
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_image_carousel_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"action_title" varchar,
	"action_description" varchar,
	"action_url" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_image_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" jsonb,
	"show_search" boolean,
	"show_job_count" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_is_homepage" boolean,
	"version_seo_meta_title" varchar,
	"version_seo_meta_description" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"media_id" integer
);

CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_carousel_items_order_idx" ON "pages_blocks_block_image_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_carousel_items_parent_id_idx" ON "pages_blocks_block_image_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_carousel_order_idx" ON "pages_blocks_block_image_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_carousel_parent_id_idx" ON "pages_blocks_block_image_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_carousel_path_idx" ON "pages_blocks_block_image_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_categories_order_idx" ON "pages_blocks_block_categories" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_categories_parent_id_idx" ON "pages_blocks_block_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_categories_path_idx" ON "pages_blocks_block_categories" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_section_order_idx" ON "pages_blocks_block_section" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_section_parent_id_idx" ON "pages_blocks_block_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_section_path_idx" ON "pages_blocks_block_section" ("_path");
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" ("_status");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_carousel_items_order_idx" ON "_pages_v_blocks_block_image_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_carousel_items_parent_id_idx" ON "_pages_v_blocks_block_image_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_carousel_order_idx" ON "_pages_v_blocks_block_image_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_carousel_parent_id_idx" ON "_pages_v_blocks_block_image_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_carousel_path_idx" ON "_pages_v_blocks_block_image_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_categories_order_idx" ON "_pages_v_blocks_block_categories" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_categories_parent_id_idx" ON "_pages_v_blocks_block_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_categories_path_idx" ON "_pages_v_blocks_block_categories" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_section_order_idx" ON "_pages_v_blocks_block_section" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_section_parent_id_idx" ON "_pages_v_blocks_block_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_section_path_idx" ON "_pages_v_blocks_block_section" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_image_carousel_items" ADD CONSTRAINT "pages_blocks_block_image_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_block_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_image_carousel" ADD CONSTRAINT "pages_blocks_block_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_categories" ADD CONSTRAINT "pages_blocks_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_section" ADD CONSTRAINT "pages_blocks_block_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_image_carousel_items" ADD CONSTRAINT "_pages_v_blocks_block_image_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_block_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_image_carousel" ADD CONSTRAINT "_pages_v_blocks_block_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_categories" ADD CONSTRAINT "_pages_v_blocks_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_section" ADD CONSTRAINT "_pages_v_blocks_block_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_image_carousel_items" CASCADE;
DROP TABLE "pages_blocks_block_image_carousel" CASCADE;
DROP TABLE "pages_blocks_block_categories" CASCADE;
DROP TABLE "pages_blocks_block_section" CASCADE;
DROP TABLE "pages" CASCADE;
DROP TABLE "pages_rels" CASCADE;
DROP TABLE "_pages_v_blocks_block_image_carousel_items" CASCADE;
DROP TABLE "_pages_v_blocks_block_image_carousel" CASCADE;
DROP TABLE "_pages_v_blocks_block_categories" CASCADE;
DROP TABLE "_pages_v_blocks_block_section" CASCADE;
DROP TABLE "_pages_v" CASCADE;
DROP TABLE "_pages_v_rels" CASCADE; `);
}
