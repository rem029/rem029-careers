import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_menus_header_menu_item_type" AS ENUM('internal', 'external', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_footer_menu_item_type" AS ENUM('internal', 'external', 'dropdown', 'button');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "menus_header_menu_item_dropdown_group_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_label" varchar,
	"item_url" varchar
);

CREATE TABLE IF NOT EXISTS "menus_header_menu" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item_type" "enum_menus_header_menu_item_type" NOT NULL,
	"item_external_group_url_external_title" varchar,
	"item_external_group_url" varchar,
	"item_button_group_button_text" varchar,
	"item_button_group_url" varchar,
	"item_button_group_button_style" varchar
);

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

CREATE TABLE IF NOT EXISTS "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "menus_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"media_id" integer
);

DROP TABLE "careers_content_application_printemps" CASCADE;
DROP TABLE "careers_content_application_printemps_rels" CASCADE;
DROP TABLE "careers_content_application_form_printemps" CASCADE;
DROP TABLE "careers_content_application_form_printemps_rels" CASCADE;
CREATE INDEX IF NOT EXISTS "menus_header_menu_item_dropdown_group_submenu_order_idx" ON "menus_header_menu_item_dropdown_group_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_header_menu_item_dropdown_group_submenu_parent_id_idx" ON "menus_header_menu_item_dropdown_group_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_header_menu_order_idx" ON "menus_header_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_header_menu_parent_id_idx" ON "menus_header_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_item_dropdown_group_submenu_order_idx" ON "menus_footer_menu_item_dropdown_group_submenu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_item_dropdown_group_submenu_parent_id_idx" ON "menus_footer_menu_item_dropdown_group_submenu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_order_idx" ON "menus_footer_menu" ("_order");
CREATE INDEX IF NOT EXISTS "menus_footer_menu_parent_id_idx" ON "menus_footer_menu" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_rels_order_idx" ON "menus_rels" ("order");
CREATE INDEX IF NOT EXISTS "menus_rels_parent_idx" ON "menus_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "menus_rels_path_idx" ON "menus_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "menus_header_menu_item_dropdown_group_submenu" ADD CONSTRAINT "menus_header_menu_item_dropdown_group_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus_header_menu"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_header_menu" ADD CONSTRAINT "menus_header_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "careers_content_application_printemps" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "careers_content_application_printemps_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_content_application_form_printemps" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "careers_content_application_form_printemps_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

DROP TABLE "menus_header_menu_item_dropdown_group_submenu" CASCADE;
DROP TABLE "menus_header_menu";
DROP TABLE "menus_footer_menu_item_dropdown_group_submenu" CASCADE;
DROP TABLE "menus_footer_menu" CASCADE;
DROP TABLE "menus" CASCADE;
DROP TABLE "menus_rels" CASCADE;
CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_order_idx" ON "careers_content_application_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_parent_idx" ON "careers_content_application_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_path_idx" ON "careers_content_application_printemps_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_order_idx" ON "careers_content_application_form_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_parent_idx" ON "careers_content_application_form_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_path_idx" ON "careers_content_application_form_printemps_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "careers_content_application_printemps_rels" ADD CONSTRAINT "careers_content_application_printemps_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_content_application_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_content_application_printemps_rels" ADD CONSTRAINT "careers_content_application_printemps_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_content_application_form_printemps_rels" ADD CONSTRAINT "careers_content_application_form_printemps_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_content_application_form_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_content_application_form_printemps_rels" ADD CONSTRAINT "careers_content_application_form_printemps_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
