import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_block_image_carousel_variant" AS ENUM('images', 'cards', 'videos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_block_image_carousel_variant" AS ENUM('images', 'cards', 'videos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_block_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "action_title" TO "title";
ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "action_description" TO "description";
ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "action_url" TO "url";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "action_title" TO "title";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "action_description" TO "description";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "action_url" TO "url";
ALTER TABLE "pages_blocks_block_image_carousel" ADD COLUMN "variant" "enum_pages_blocks_block_image_carousel_variant";
ALTER TABLE "pages_blocks_block_image_carousel" ADD COLUMN "slides_per_view" numeric;
ALTER TABLE "_pages_v_blocks_block_image_carousel" ADD COLUMN "variant" "enum__pages_v_blocks_block_image_carousel_variant";
ALTER TABLE "_pages_v_blocks_block_image_carousel" ADD COLUMN "slides_per_view" numeric;
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_order_idx" ON "pages_blocks_block_image" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_parent_id_idx" ON "pages_blocks_block_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_image_path_idx" ON "pages_blocks_block_image" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_order_idx" ON "_pages_v_blocks_block_image" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_parent_id_idx" ON "_pages_v_blocks_block_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_image_path_idx" ON "_pages_v_blocks_block_image" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_image" ADD CONSTRAINT "pages_blocks_block_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_image" ADD CONSTRAINT "_pages_v_blocks_block_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE IF EXISTS "pages_blocks_block_image" CASCADE;
DROP TABLE  IF EXISTS "_pages_v_blocks_block_image" CASCADE;
ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "title" TO "action_title";
ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "description" TO "action_description";
ALTER TABLE "pages_blocks_block_image_carousel_items" RENAME COLUMN "url" TO "action_url";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "title" TO "action_title";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "description" TO "action_description";
ALTER TABLE "_pages_v_blocks_block_image_carousel_items" RENAME COLUMN "url" TO "action_url";
ALTER TABLE "pages_blocks_block_image_carousel" DROP COLUMN IF EXISTS "variant";
ALTER TABLE "pages_blocks_block_image_carousel" DROP COLUMN IF EXISTS "slides_per_view";
ALTER TABLE "_pages_v_blocks_block_image_carousel" DROP COLUMN IF EXISTS "variant";
ALTER TABLE "_pages_v_blocks_block_image_carousel" DROP COLUMN IF EXISTS "slides_per_view";`);
}
