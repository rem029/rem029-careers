import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_container_inner_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_container_inner_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_list_settings_blocks_container_inner_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_info_settings_blocks_container_inner_direction" AS ENUM('row', 'column');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_blocks_container_inner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_pages_blocks_container_inner_direction",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_container" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_pages_blocks_container_direction",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_container_inner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"direction" "enum__pages_v_blocks_container_inner_direction",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_container" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"direction" "enum__pages_v_blocks_container_direction",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_container_inner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_careers_list_settings_blocks_container_inner_direction" NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_list_settings_blocks_container" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_careers_list_settings_blocks_container_direction" NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_container_inner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_careers_info_settings_blocks_container_inner_direction" NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_container" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"direction" "enum_careers_info_settings_blocks_container_direction" NOT NULL,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "pages_blocks_container_inner_order_idx" ON "pages_blocks_container_inner" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_container_inner_parent_id_idx" ON "pages_blocks_container_inner" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_container_inner_path_idx" ON "pages_blocks_container_inner" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_container_order_idx" ON "pages_blocks_container" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_container_parent_id_idx" ON "pages_blocks_container" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_container_path_idx" ON "pages_blocks_container" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_inner_order_idx" ON "_pages_v_blocks_container_inner" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_inner_parent_id_idx" ON "_pages_v_blocks_container_inner" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_inner_path_idx" ON "_pages_v_blocks_container_inner" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_order_idx" ON "_pages_v_blocks_container" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_parent_id_idx" ON "_pages_v_blocks_container" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_container_path_idx" ON "_pages_v_blocks_container" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_inner_order_idx" ON "careers_list_settings_blocks_container_inner" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_inner_parent_id_idx" ON "careers_list_settings_blocks_container_inner" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_inner_path_idx" ON "careers_list_settings_blocks_container_inner" ("_path");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_order_idx" ON "careers_list_settings_blocks_container" ("_order");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_parent_id_idx" ON "careers_list_settings_blocks_container" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_list_settings_blocks_container_path_idx" ON "careers_list_settings_blocks_container" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_inner_order_idx" ON "careers_info_settings_blocks_container_inner" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_inner_parent_id_idx" ON "careers_info_settings_blocks_container_inner" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_inner_path_idx" ON "careers_info_settings_blocks_container_inner" ("_path");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_order_idx" ON "careers_info_settings_blocks_container" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_parent_id_idx" ON "careers_info_settings_blocks_container" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_container_path_idx" ON "careers_info_settings_blocks_container" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_container_inner" ADD CONSTRAINT "pages_blocks_container_inner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_container" ADD CONSTRAINT "pages_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_container_inner" ADD CONSTRAINT "_pages_v_blocks_container_inner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_container" ADD CONSTRAINT "_pages_v_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_container_inner" ADD CONSTRAINT "careers_list_settings_blocks_container_inner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_blocks_container" ADD CONSTRAINT "careers_list_settings_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_list_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_container_inner" ADD CONSTRAINT "careers_info_settings_blocks_container_inner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_container" ADD CONSTRAINT "careers_info_settings_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_blocks_container_inner";
DROP TABLE "pages_blocks_container";
DROP TABLE "_pages_v_blocks_container_inner";
DROP TABLE "_pages_v_blocks_container";
DROP TABLE "careers_list_settings_blocks_container_inner";
DROP TABLE "careers_list_settings_blocks_container";
DROP TABLE "careers_info_settings_blocks_container_inner";
DROP TABLE "careers_info_settings_blocks_container";`);

};
