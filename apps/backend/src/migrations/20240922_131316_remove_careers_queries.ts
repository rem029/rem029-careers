import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_careers_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__careers_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "careers_responsibilities" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_qualifications" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar,
	"title" varchar,
	"description" varchar,
	"active" boolean,
	"expires_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_careers_status"
);

CREATE TABLE IF NOT EXISTS "careers_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" varchar NOT NULL,
	"path" varchar NOT NULL,
	"category_id" integer,
	"careers_work_type_id" integer
);

CREATE TABLE IF NOT EXISTS "_careers_v_version_responsibilities" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_careers_v_version_qualifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_careers_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_code" varchar,
	"version_title" varchar,
	"version_description" varchar,
	"version_active" boolean,
	"version_expires_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__careers_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_careers_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"careers_id" varchar,
	"category_id" integer,
	"careers_work_type_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_application" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"nationality" varchar NOT NULL,
	"country_of_residence" varchar NOT NULL,
	"national_id_passport_number" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "careers_application_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" varchar NOT NULL,
	"path" varchar NOT NULL,
	"careers_media_id" integer,
	"careers_id" varchar
);

DROP TABLE IF EXISTS "careers_questions_options";
DROP TABLE IF EXISTS "careers_questions";
CREATE INDEX IF NOT EXISTS "careers_responsibilities_order_idx" ON "careers_responsibilities" ("_order");
CREATE INDEX IF NOT EXISTS "careers_responsibilities_parent_id_idx" ON "careers_responsibilities" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_qualifications_order_idx" ON "careers_qualifications" ("_order");
CREATE INDEX IF NOT EXISTS "careers_qualifications_parent_id_idx" ON "careers_qualifications" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_created_at_idx" ON "careers" ("created_at");
CREATE INDEX IF NOT EXISTS "careers__status_idx" ON "careers" ("_status");
CREATE INDEX IF NOT EXISTS "careers_rels_order_idx" ON "careers_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_rels_parent_idx" ON "careers_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_rels_path_idx" ON "careers_rels" ("path");
CREATE INDEX IF NOT EXISTS "_careers_v_version_responsibilities_order_idx" ON "_careers_v_version_responsibilities" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_v_version_responsibilities_parent_id_idx" ON "_careers_v_version_responsibilities" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_v_version_qualifications_order_idx" ON "_careers_v_version_qualifications" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_v_version_qualifications_parent_id_idx" ON "_careers_v_version_qualifications" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_v_version_version_created_at_idx" ON "_careers_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_careers_v_version_version__status_idx" ON "_careers_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_careers_v_created_at_idx" ON "_careers_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_careers_v_updated_at_idx" ON "_careers_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_careers_v_latest_idx" ON "_careers_v" ("latest");
CREATE INDEX IF NOT EXISTS "_careers_v_rels_order_idx" ON "_careers_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_careers_v_rels_parent_idx" ON "_careers_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_careers_v_rels_path_idx" ON "_careers_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_application_created_at_idx" ON "careers_application" ("created_at");
CREATE INDEX IF NOT EXISTS "careers_application_rels_order_idx" ON "careers_application_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_application_rels_parent_idx" ON "careers_application_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_application_rels_path_idx" ON "careers_application_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "careers_responsibilities" ADD CONSTRAINT "careers_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_qualifications" ADD CONSTRAINT "careers_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_careers_work_type_fk" FOREIGN KEY ("careers_work_type_id") REFERENCES "careers_work_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_version_responsibilities" ADD CONSTRAINT "_careers_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_version_qualifications" ADD CONSTRAINT "_careers_v_version_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_careers_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_careers_work_type_fk" FOREIGN KEY ("careers_work_type_id") REFERENCES "careers_work_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_rels" ADD CONSTRAINT "careers_application_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_rels" ADD CONSTRAINT "careers_application_rels_careers_media_fk" FOREIGN KEY ("careers_media_id") REFERENCES "careers_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_rels" ADD CONSTRAINT "careers_application_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_careers_questions_type" AS ENUM('Text', 'TextArea', 'Number', 'Dropdown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "careers_questions_options" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"type" "enum_careers_questions_type",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DROP TABLE IF EXISTS "careers_responsibilities" CASCADE;
DROP TABLE IF EXISTS "careers_qualifications" CASCADE;
DROP TABLE IF EXISTS "careers" CASCADE;
DROP TABLE IF EXISTS "careers_rels" CASCADE;
DROP TABLE IF EXISTS "_careers_v_version_responsibilities" CASCADE;
DROP TABLE IF EXISTS "_careers_v_version_qualifications" CASCADE;
DROP TABLE IF EXISTS "_careers_v" CASCADE;
DROP TABLE IF EXISTS "_careers_v_rels" CASCADE;
DROP TABLE IF EXISTS "careers_application" CASCADE;
DROP TABLE IF EXISTS "careers_application_rels" CASCADE;
CREATE INDEX IF NOT EXISTS "careers_questions_options_order_idx" ON "careers_questions_options" ("_order");
CREATE INDEX IF NOT EXISTS "careers_questions_options_parent_id_idx" ON "careers_questions_options" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_questions_created_at_idx" ON "careers_questions" ("created_at");
DO $$ BEGIN
 ALTER TABLE "careers_questions_options" ADD CONSTRAINT "careers_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
