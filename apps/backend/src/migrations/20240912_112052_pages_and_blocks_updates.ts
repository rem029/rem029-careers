import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
	DO $$ BEGIN
	CREATE TYPE "enum_pages_blocks_block_section_background" AS ENUM('primary', 'secondary');
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	CREATE TYPE "enum_pages_blocks_block_collections_collection" AS ENUM('pages', 'category');
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	CREATE TYPE "enum__pages_v_blocks_block_section_background" AS ENUM('primary', 'secondary');
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	CREATE TYPE "enum__pages_v_blocks_block_collections_collection" AS ENUM('pages', 'category');
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	CREATE TABLE IF NOT EXISTS "pages_blocks_block_collections" (
		"_order" integer NOT NULL,
		"_parent_id" integer NOT NULL,
		"_path" text NOT NULL,
		"id" varchar PRIMARY KEY NOT NULL,
		"collection" "enum_pages_blocks_block_collections_collection",
		"collection_select_all" boolean,
		"block_name" varchar
	);

	CREATE TABLE IF NOT EXISTS "pages_blocks_block_hero" (
		"_order" integer NOT NULL,
		"_parent_id" integer NOT NULL,
		"_path" text NOT NULL,
		"id" varchar PRIMARY KEY NOT NULL,
		"title" varchar,
		"sub_title" jsonb,
		"block_name" varchar
	);

	CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_collections" (
		"_order" integer NOT NULL,
		"_parent_id" integer NOT NULL,
		"_path" text NOT NULL,
		"id" serial PRIMARY KEY NOT NULL,
		"collection" "enum__pages_v_blocks_block_collections_collection",
		"collection_select_all" boolean,
		"_uuid" varchar,
		"block_name" varchar
	);

	CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_hero" (
		"_order" integer NOT NULL,
		"_parent_id" integer NOT NULL,
		"_path" text NOT NULL,
		"id" serial PRIMARY KEY NOT NULL,
		"title" varchar,
		"sub_title" jsonb,
		"_uuid" varchar,
		"block_name" varchar
	);

	ALTER TABLE "pages_blocks_block_section" ADD COLUMN "background" "enum_pages_blocks_block_section_background";
	ALTER TABLE "pages_blocks_block_section" ADD COLUMN "show_sub_title" boolean;
	ALTER TABLE "pages" ADD COLUMN "description" varchar;
	ALTER TABLE "pages" ADD COLUMN "has_featured_image" boolean;
	ALTER TABLE "pages_rels" ADD COLUMN "pages_id" integer;
	ALTER TABLE "pages_rels" ADD COLUMN "category_id" integer;
	ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "background" "enum__pages_v_blocks_block_section_background";
	ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "show_sub_title" boolean;
	ALTER TABLE "_pages_v" ADD COLUMN "version_description" varchar;
	ALTER TABLE "_pages_v" ADD COLUMN "version_has_featured_image" boolean;
	ALTER TABLE "_pages_v_rels" ADD COLUMN "category_id" integer;
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_collections_order_idx" ON "pages_blocks_block_collections" ("_order");
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_collections_parent_id_idx" ON "pages_blocks_block_collections" ("_parent_id");
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_collections_path_idx" ON "pages_blocks_block_collections" ("_path");
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_hero_order_idx" ON "pages_blocks_block_hero" ("_order");
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_hero_parent_id_idx" ON "pages_blocks_block_hero" ("_parent_id");
	CREATE INDEX IF NOT EXISTS "pages_blocks_block_hero_path_idx" ON "pages_blocks_block_hero" ("_path");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_collections_order_idx" ON "_pages_v_blocks_block_collections" ("_order");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_collections_parent_id_idx" ON "_pages_v_blocks_block_collections" ("_parent_id");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_collections_path_idx" ON "_pages_v_blocks_block_collections" ("_path");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_hero_order_idx" ON "_pages_v_blocks_block_hero" ("_order");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_hero_parent_id_idx" ON "_pages_v_blocks_block_hero" ("_parent_id");
	CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_hero_path_idx" ON "_pages_v_blocks_block_hero" ("_path");
	DO $$ BEGIN
	ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	ALTER TABLE "pages_blocks_block_categories" DROP COLUMN IF EXISTS "title";
	ALTER TABLE "pages_blocks_block_categories" DROP COLUMN IF EXISTS "sub_title";
	ALTER TABLE "_pages_v_blocks_block_categories" DROP COLUMN IF EXISTS "title";
	ALTER TABLE "_pages_v_blocks_block_categories" DROP COLUMN IF EXISTS "sub_title";
	DO $$ BEGIN
	ALTER TABLE "pages_blocks_block_collections" ADD CONSTRAINT "pages_blocks_block_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	ALTER TABLE "pages_blocks_block_hero" ADD CONSTRAINT "pages_blocks_block_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	ALTER TABLE "_pages_v_blocks_block_collections" ADD CONSTRAINT "_pages_v_blocks_block_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;

	DO $$ BEGIN
	ALTER TABLE "_pages_v_blocks_block_hero" ADD CONSTRAINT "_pages_v_blocks_block_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
	EXCEPTION
	WHEN duplicate_object THEN null;
	END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
		DROP TABLE IF EXISTS "pages_blocks_block_collections" CASCADE;
		DROP TABLE IF EXISTS "pages_blocks_block_hero" CASCADE;
		DROP TABLE IF EXISTS "_pages_v_blocks_block_collections" CASCADE;
		DROP TABLE IF EXISTS "_pages_v_blocks_block_hero" CASCADE;
		ALTER TABLE IF EXISTS "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";

		ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_category_fk";

		ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_category_fk";

		ALTER TABLE "pages_blocks_block_categories" ADD COLUMN "title" varchar;
		ALTER TABLE "pages_blocks_block_categories" ADD COLUMN "sub_title" jsonb;
		ALTER TABLE "_pages_v_blocks_block_categories" ADD COLUMN "title" varchar;
		ALTER TABLE "_pages_v_blocks_block_categories" ADD COLUMN "sub_title" jsonb;
		ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "background";
		ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "show_sub_title";
		ALTER TABLE "pages" DROP COLUMN IF EXISTS "description";
		ALTER TABLE "pages" DROP COLUMN IF EXISTS "has_featured_image";
		ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "pages_id";
		ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "category_id";
		ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "background";
		ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "show_sub_title";
		ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_description";
		ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_has_featured_image";
		ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "category_id";
	`);
}
