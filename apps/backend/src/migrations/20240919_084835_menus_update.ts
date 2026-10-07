import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_menus_footer_grouped_menu_menu_item_type" AS ENUM('internal', 'external', 'career categories', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TYPE "enum_menus_header_menu_item_type" ADD VALUE 'career categories';
CREATE TABLE IF NOT EXISTS "menus_footer_grouped_menu_menu_item_dropdown_group_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "menus_footer_grouped_menu_menu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_type" "enum_menus_footer_grouped_menu_menu_item_type" NOT NULL,
	"item_external_group_url_external_title" varchar,
	"item_external_group_url" varchar,
	"item_dropdown_group_label" varchar,
	"item_button_group_button_text" varchar,
	"item_button_group_url" varchar,
	"item_button_group_button_style" varchar
);

CREATE TABLE IF NOT EXISTS "menus_footer_grouped_menu" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);

DROP TABLE IF EXISTS "menus_footer_menu_item_dropdown_group_submenu" CASCADE;
DROP TABLE IF EXISTS "menus_footer_menu" CASCADE;
ALTER TABLE "menus_header_menu" ADD COLUMN "item_dropdown_group_label" varchar;
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_menu_item_dropdown_group_submenu_order_idx" ON "menus_footer_grouped_menu_menu_item_dropdown_group_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_menu_item_dropdown_group_submenu_parent_id_idx" ON "menus_footer_grouped_menu_menu_item_dropdown_group_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_menu_order_idx" ON "menus_footer_grouped_menu_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_menu_parent_id_idx" ON "menus_footer_grouped_menu_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_order_idx" ON "menus_footer_grouped_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_grouped_menu_parent_id_idx" ON "menus_footer_grouped_menu" ("_parent_id");
DO $$ BEGIN
 ALTER TABLE "menus_footer_grouped_menu_menu_item_dropdown_group_submenu" ADD CONSTRAINT "menus_footer_grouped_menu_menu_item_dropdown_group_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_footer_grouped_menu_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_footer_grouped_menu_menu" ADD CONSTRAINT "menus_footer_grouped_menu_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_footer_grouped_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_footer_grouped_menu" ADD CONSTRAINT "menus_footer_grouped_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_menus_footer_menu_item_type" AS ENUM('internal', 'external', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "menus_footer_menu_item_dropdown_group_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "menus_footer_menu" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_type" "enum_menus_footer_menu_item_type" NOT NULL,
	"item_external_group_url_external_title" varchar,
	"item_external_group_url" varchar,
	"item_button_group_button_text" varchar,
	"item_button_group_url" varchar,
	"item_button_group_button_style" varchar
);

DROP TABLE IF EXISTS "menus_footer_grouped_menu_menu_item_dropdown_group_submenu" CASCADE;
DROP TABLE IF EXISTS "menus_footer_grouped_menu_menu" CASCADE;
DROP TABLE IF EXISTS "menus_footer_grouped_menu" CASCADE;
CREATE INDEX IF NOT EXISTS "menus_footer_menu_item_dropdown_group_submenu_order_idx" ON "menus_footer_menu_item_dropdown_group_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_item_dropdown_group_submenu_parent_id_idx" ON "menus_footer_menu_item_dropdown_group_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_order_idx" ON "menus_footer_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_parent_id_idx" ON "menus_footer_menu" ("_parent_id");
ALTER TABLE "menus_header_menu" DROP COLUMN IF EXISTS "item_dropdown_group_label";
DO $$ BEGIN
 ALTER TABLE "menus_footer_menu_item_dropdown_group_submenu" ADD CONSTRAINT "menus_footer_menu_item_dropdown_group_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_footer_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_footer_menu" ADD CONSTRAINT "menus_footer_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
