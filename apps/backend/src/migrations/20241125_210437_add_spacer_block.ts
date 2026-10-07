import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "pages_blocks_block_spacer" (
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

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_block_spacer" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"full_height" boolean,
	"num_height" numeric,
	"full_width" boolean,
	"num_width" numeric,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_block_spacer" (
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

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_spacer" (
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

CREATE INDEX IF NOT EXISTS "pages_blocks_block_spacer_order_idx" ON "pages_blocks_block_spacer" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_spacer_parent_id_idx" ON "pages_blocks_block_spacer" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_block_spacer_path_idx" ON "pages_blocks_block_spacer" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_spacer_order_idx" ON "_pages_v_blocks_block_spacer" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_spacer_parent_id_idx" ON "_pages_v_blocks_block_spacer" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_block_spacer_path_idx" ON "_pages_v_blocks_block_spacer" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_spacer_order_idx" ON "careers_list_settings_blocks_block_spacer" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_spacer_parent_id_idx" ON "careers_list_settings_blocks_block_spacer" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_block_spacer_path_idx" ON "careers_list_settings_blocks_block_spacer" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_spacer_order_idx" ON "careers_info_settings_blocks_block_spacer" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_spacer_parent_id_idx" ON "careers_info_settings_blocks_block_spacer" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_spacer_path_idx" ON "careers_info_settings_blocks_block_spacer" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_block_spacer" ADD CONSTRAINT "pages_blocks_block_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_block_spacer" ADD CONSTRAINT "_pages_v_blocks_block_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_block_spacer" ADD CONSTRAINT "careers_list_settings_blocks_block_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_spacer" ADD CONSTRAINT "careers_info_settings_blocks_block_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_block_spacer";
DROP TABLE "_pages_v_blocks_block_spacer";
DROP TABLE "careers_list_settings_blocks_block_spacer";
DROP TABLE "careers_info_settings_blocks_block_spacer";`);

};
