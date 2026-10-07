import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_button_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_button_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_block_button" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"variant" "enum_pages_blocks_block_button_variant",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_button" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"url" varchar,
	"variant" "enum__pages_v_blocks_block_button_variant",
	"_uuid" varchar,
	"block_name" varchar
);

ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "show_sub_title" boolean;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "show_sub_title" boolean;
CREATE INDEX IF NOT EXISTS "pages_blocks_block_button_order_idx" ON "pages_blocks_block_button" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_button_parent_id_idx" ON "pages_blocks_block_button" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_button_path_idx" ON "pages_blocks_block_button" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_button_order_idx" ON "_pages_v_blocks_block_button" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_button_parent_id_idx" ON "_pages_v_blocks_block_button" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_button_path_idx" ON "_pages_v_blocks_block_button" ("_path");
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "has_cta_button";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_title";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_link";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_variant";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "has_cta_button";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_title";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_link";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "cta_info_variant";
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_button" ADD CONSTRAINT "pages_blocks_block_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_button" ADD CONSTRAINT "_pages_v_blocks_block_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_section_cta_info_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_section_cta_info_variant" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DROP TABLE "pages_blocks_block_button";
DROP TABLE "_pages_v_blocks_block_button";
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "has_cta_button" boolean;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_title" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_link" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "cta_info_variant" "enum_pages_blocks_block_section_cta_info_variant";
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "has_cta_button" boolean;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_title" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_link" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "cta_info_variant" "enum__pages_v_blocks_block_section_cta_info_variant";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "show_sub_title";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "show_sub_title";`);

};
