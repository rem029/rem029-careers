import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "_locales" AS ENUM('en', 'ar', 'fr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_printemps_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__careers_printemps_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_category_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__category_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_careers_questions_type" AS ENUM('Text', 'TextArea', 'Number', 'Dropdown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "careers_printemps_responsibilities" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_printemps_qualifications" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_printemps_questions" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"required" boolean
);

CREATE TABLE IF NOT EXISTS "careers_printemps" (
	"id" varchar PRIMARY KEY NOT NULL,
	"code" varchar,
	"title" varchar,
	"description" varchar,
	"active" boolean,
	"expires_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_careers_printemps_status"
);

CREATE TABLE IF NOT EXISTS "careers_printemps_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" varchar NOT NULL,
	"path" varchar NOT NULL,
	"category_id" integer,
	"careers_work_type_id" integer,
	"careers_questions_id" integer
);

CREATE TABLE IF NOT EXISTS "_careers_printemps_v_version_responsibilities" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_careers_printemps_v_version_qualifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"sub_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_careers_printemps_v_version_questions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"required" boolean,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_careers_printemps_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_code" varchar,
	"version_title" varchar,
	"version_description" varchar,
	"version_active" boolean,
	"version_expires_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__careers_printemps_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_careers_printemps_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"careers_printemps_id" varchar,
	"category_id" integer,
	"careers_work_type_id" integer,
	"careers_questions_id" integer
);

CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"subtitle" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_category_status"
);

CREATE TABLE IF NOT EXISTS "category_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "_category_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_subtitle" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__category_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_category_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"category_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_application_printemps_career_questions" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"response" varchar
);

CREATE TABLE IF NOT EXISTS "careers_application_printemps" (
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

CREATE TABLE IF NOT EXISTS "careers_application_printemps_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" varchar NOT NULL,
	"path" varchar NOT NULL,
	"careers_media_id" integer,
	"careers_printemps_id" varchar,
	"careers_questions_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

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

CREATE TABLE IF NOT EXISTS "careers_work_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"enable_a_p_i_key" boolean,
	"api_key" varchar,
	"api_key_index" varchar,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "users_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"user_access_id" integer
);

CREATE TABLE IF NOT EXISTS "user_access_access" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"hidden" boolean,
	"read" boolean,
	"create" boolean,
	"update" boolean,
	"admin" boolean,
	"delete" boolean,
	"access" boolean
);

CREATE TABLE IF NOT EXISTS "user_access" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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

CREATE TABLE IF NOT EXISTS "careers_email_settings_recipients" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"key" varchar,
	"email" varchar
);

CREATE TABLE IF NOT EXISTS "careers_email_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"password" varchar,
	"host" varchar,
	"port" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE INDEX IF NOT EXISTS "careers_printemps_responsibilities_order_idx" ON "careers_printemps_responsibilities" ("_order");
CREATE INDEX IF NOT EXISTS "careers_printemps_responsibilities_parent_id_idx" ON "careers_printemps_responsibilities" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_printemps_qualifications_order_idx" ON "careers_printemps_qualifications" ("_order");
CREATE INDEX IF NOT EXISTS "careers_printemps_qualifications_parent_id_idx" ON "careers_printemps_qualifications" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_printemps_questions_order_idx" ON "careers_printemps_questions" ("_order");
CREATE INDEX IF NOT EXISTS "careers_printemps_questions_parent_id_idx" ON "careers_printemps_questions" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_printemps_created_at_idx" ON "careers_printemps" ("created_at");
CREATE INDEX IF NOT EXISTS "careers_printemps__status_idx" ON "careers_printemps" ("_status");
CREATE INDEX IF NOT EXISTS "careers_printemps_rels_order_idx" ON "careers_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_printemps_rels_parent_idx" ON "careers_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_printemps_rels_path_idx" ON "careers_printemps_rels" ("path");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_responsibilities_order_idx" ON "_careers_printemps_v_version_responsibilities" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_responsibilities_parent_id_idx" ON "_careers_printemps_v_version_responsibilities" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_qualifications_order_idx" ON "_careers_printemps_v_version_qualifications" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_qualifications_parent_id_idx" ON "_careers_printemps_v_version_qualifications" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_questions_order_idx" ON "_careers_printemps_v_version_questions" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_questions_parent_id_idx" ON "_careers_printemps_v_version_questions" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_version_created_at_idx" ON "_careers_printemps_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_version_version__status_idx" ON "_careers_printemps_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_created_at_idx" ON "_careers_printemps_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_updated_at_idx" ON "_careers_printemps_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_latest_idx" ON "_careers_printemps_v" ("latest");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_rels_order_idx" ON "_careers_printemps_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_rels_parent_idx" ON "_careers_printemps_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_careers_printemps_v_rels_path_idx" ON "_careers_printemps_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "category_created_at_idx" ON "category" ("created_at");
CREATE INDEX IF NOT EXISTS "category__status_idx" ON "category" ("_status");
CREATE INDEX IF NOT EXISTS "category_rels_order_idx" ON "category_rels" ("order");
CREATE INDEX IF NOT EXISTS "category_rels_parent_idx" ON "category_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "category_rels_path_idx" ON "category_rels" ("path");
CREATE INDEX IF NOT EXISTS "_category_v_version_version_created_at_idx" ON "_category_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_category_v_version_version__status_idx" ON "_category_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_category_v_created_at_idx" ON "_category_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_category_v_updated_at_idx" ON "_category_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_category_v_latest_idx" ON "_category_v" ("latest");
CREATE INDEX IF NOT EXISTS "_category_v_rels_order_idx" ON "_category_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_category_v_rels_parent_idx" ON "_category_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_category_v_rels_path_idx" ON "_category_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_career_questions_order_idx" ON "careers_application_printemps_career_questions" ("_order");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_career_questions_parent_id_idx" ON "careers_application_printemps_career_questions" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_created_at_idx" ON "careers_application_printemps" ("created_at");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_rels_order_idx" ON "careers_application_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_rels_parent_idx" ON "careers_application_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_application_printemps_rels_path_idx" ON "careers_application_printemps_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_media_created_at_idx" ON "careers_media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "careers_media_filename_idx" ON "careers_media" ("filename");
CREATE INDEX IF NOT EXISTS "careers_questions_options_order_idx" ON "careers_questions_options" ("_order");
CREATE INDEX IF NOT EXISTS "careers_questions_options_parent_id_idx" ON "careers_questions_options" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_questions_created_at_idx" ON "careers_questions" ("created_at");
CREATE INDEX IF NOT EXISTS "careers_work_type_created_at_idx" ON "careers_work_type" ("created_at");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" ("order");
CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" ("path");
CREATE INDEX IF NOT EXISTS "user_access_access_order_idx" ON "user_access_access" ("_order");
CREATE INDEX IF NOT EXISTS "user_access_access_parent_id_idx" ON "user_access_access" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_access_name_idx" ON "user_access" ("name");
CREATE INDEX IF NOT EXISTS "user_access_created_at_idx" ON "user_access" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_order_idx" ON "careers_content_application_form_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_parent_idx" ON "careers_content_application_form_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_content_application_form_printemps_rels_path_idx" ON "careers_content_application_form_printemps_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_email_settings_recipients_order_idx" ON "careers_email_settings_recipients" ("_order");
CREATE INDEX IF NOT EXISTS "careers_email_settings_recipients_parent_id_idx" ON "careers_email_settings_recipients" ("_parent_id");
DO $$ BEGIN
 ALTER TABLE "careers_printemps_responsibilities" ADD CONSTRAINT "careers_printemps_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_qualifications" ADD CONSTRAINT "careers_printemps_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_questions" ADD CONSTRAINT "careers_printemps_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_rels" ADD CONSTRAINT "careers_printemps_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_rels" ADD CONSTRAINT "careers_printemps_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_rels" ADD CONSTRAINT "careers_printemps_rels_careers_work_type_fk" FOREIGN KEY ("careers_work_type_id") REFERENCES "careers_work_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_printemps_rels" ADD CONSTRAINT "careers_printemps_rels_careers_questions_fk" FOREIGN KEY ("careers_questions_id") REFERENCES "careers_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_version_responsibilities" ADD CONSTRAINT "_careers_printemps_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_printemps_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_version_qualifications" ADD CONSTRAINT "_careers_printemps_v_version_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_printemps_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_version_questions" ADD CONSTRAINT "_careers_printemps_v_version_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_printemps_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_rels" ADD CONSTRAINT "_careers_printemps_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_careers_printemps_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_rels" ADD CONSTRAINT "_careers_printemps_v_rels_careers_printemps_fk" FOREIGN KEY ("careers_printemps_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_rels" ADD CONSTRAINT "_careers_printemps_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_rels" ADD CONSTRAINT "_careers_printemps_v_rels_careers_work_type_fk" FOREIGN KEY ("careers_work_type_id") REFERENCES "careers_work_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_printemps_v_rels" ADD CONSTRAINT "_careers_printemps_v_rels_careers_questions_fk" FOREIGN KEY ("careers_questions_id") REFERENCES "careers_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "category_rels" ADD CONSTRAINT "category_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "category_rels" ADD CONSTRAINT "category_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_category_v_rels" ADD CONSTRAINT "_category_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_category_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_category_v_rels" ADD CONSTRAINT "_category_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_category_v_rels" ADD CONSTRAINT "_category_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_printemps_career_questions" ADD CONSTRAINT "careers_application_printemps_career_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_application_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_printemps_rels" ADD CONSTRAINT "careers_application_printemps_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_application_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_printemps_rels" ADD CONSTRAINT "careers_application_printemps_rels_careers_media_fk" FOREIGN KEY ("careers_media_id") REFERENCES "careers_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_printemps_rels" ADD CONSTRAINT "careers_application_printemps_rels_careers_printemps_fk" FOREIGN KEY ("careers_printemps_id") REFERENCES "careers_printemps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_printemps_rels" ADD CONSTRAINT "careers_application_printemps_rels_careers_questions_fk" FOREIGN KEY ("careers_questions_id") REFERENCES "careers_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_questions_options" ADD CONSTRAINT "careers_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_user_access_fk" FOREIGN KEY ("user_access_id") REFERENCES "user_access"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_access_access" ADD CONSTRAINT "user_access_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "user_access"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
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

DO $$ BEGIN
 ALTER TABLE "careers_email_settings_recipients" ADD CONSTRAINT "careers_email_settings_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_email_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE "careers_printemps_responsibilities" CASCADE;
DROP TABLE "careers_printemps_qualifications" CASCADE;
DROP TABLE "careers_printemps_questions" CASCADE;
DROP TABLE "careers_printemps" CASCADE;
DROP TABLE "careers_printemps_rels" CASCADE;
DROP TABLE "_careers_printemps_v_version_responsibilities" CASCADE;
DROP TABLE "_careers_printemps_v_version_qualifications" CASCADE;
DROP TABLE "_careers_printemps_v_version_questions" CASCADE;
DROP TABLE "_careers_printemps_v" CASCADE;
DROP TABLE "_careers_printemps_v_rels" CASCADE;
DROP TABLE "category" CASCADE;
DROP TABLE "category_rels" CASCADE;
DROP TABLE "_category_v" CASCADE;
DROP TABLE "_category_v_rels" CASCADE;
DROP TABLE "careers_application_printemps_career_questions" CASCADE;
DROP TABLE "careers_application_printemps" CASCADE;
DROP TABLE "careers_application_printemps_rels" CASCADE;
DROP TABLE "careers_media" CASCADE;
DROP TABLE "careers_questions_options" CASCADE;
DROP TABLE "careers_questions" CASCADE;
DROP TABLE "careers_work_type" CASCADE;
DROP TABLE "media" CASCADE;
DROP TABLE "users" CASCADE;
DROP TABLE "users_rels" CASCADE;
DROP TABLE "user_access_access" CASCADE;
DROP TABLE "user_access" CASCADE;
DROP TABLE "payload_preferences" CASCADE;
DROP TABLE "payload_preferences_rels" CASCADE;
DROP TABLE "payload_migrations" CASCADE;
DROP TABLE "careers_content_application_form_printemps" CASCADE;
DROP TABLE "careers_content_application_form_printemps_rels" CASCADE;
DROP TABLE "careers_email_settings_recipients" CASCADE;
DROP TABLE "careers_email_settings" CASCADE;`);
}
