import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "pages_blocks_block_embed" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_embed" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_embed" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_embed" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar NOT NULL,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "pages_blocks_block_embed_order_idx" ON "pages_blocks_block_embed" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_embed_parent_id_idx" ON "pages_blocks_block_embed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_embed_path_idx" ON "pages_blocks_block_embed" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_embed_order_idx" ON "_pages_v_blocks_block_embed" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_embed_parent_id_idx" ON "_pages_v_blocks_block_embed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_embed_path_idx" ON "_pages_v_blocks_block_embed" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_embed_order_idx" ON "careers_list_settings_blocks_block_embed" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_embed_parent_id_idx" ON "careers_list_settings_blocks_block_embed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_embed_path_idx" ON "careers_list_settings_blocks_block_embed" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_embed_order_idx" ON "careers_info_settings_blocks_block_embed" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_embed_parent_id_idx" ON "careers_info_settings_blocks_block_embed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_embed_path_idx" ON "careers_info_settings_blocks_block_embed" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_embed" ADD CONSTRAINT "pages_blocks_block_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_embed" ADD CONSTRAINT "_pages_v_blocks_block_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_embed" ADD CONSTRAINT "careers_list_settings_blocks_block_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_embed" ADD CONSTRAINT "careers_info_settings_blocks_block_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_embed";
DROP TABLE "_pages_v_blocks_block_embed";
DROP TABLE "careers_list_settings_blocks_block_embed";
DROP TABLE "careers_info_settings_blocks_block_embed";`);

};
