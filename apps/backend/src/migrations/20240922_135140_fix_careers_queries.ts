import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_careers_queries_type" AS ENUM('Text', 'TextArea', 'Number', 'Dropdown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "careers_career_queries" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"required" boolean
);

CREATE TABLE IF NOT EXISTS "_careers_v_version_career_queries" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"required" boolean,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "careers_application_career_queries" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"response" varchar
);

CREATE TABLE IF NOT EXISTS "careers_queries_options" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar
);

CREATE TABLE IF NOT EXISTS "careers_queries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"type" "enum_careers_queries_type",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "careers_rels" ADD COLUMN "careers_queries_id" integer;
ALTER TABLE "_careers_v_rels" ADD COLUMN "careers_queries_id" integer;
ALTER TABLE "careers_application_rels" ADD COLUMN "careers_queries_id" integer;
CREATE INDEX IF NOT EXISTS "careers_career_queries_order_idx" ON "careers_career_queries" ("_order");
CREATE INDEX IF NOT EXISTS "careers_career_queries_parent_id_idx" ON "careers_career_queries" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_careers_v_version_career_queries_order_idx" ON "_careers_v_version_career_queries" ("_order");
CREATE INDEX IF NOT EXISTS "_careers_v_version_career_queries_parent_id_idx" ON "_careers_v_version_career_queries" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_application_career_queries_order_idx" ON "careers_application_career_queries" ("_order");
CREATE INDEX IF NOT EXISTS "careers_application_career_queries_parent_id_idx" ON "careers_application_career_queries" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_queries_options_order_idx" ON "careers_queries_options" ("_order");
CREATE INDEX IF NOT EXISTS "careers_queries_options_parent_id_idx" ON "careers_queries_options" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_queries_created_at_idx" ON "careers_queries" ("created_at");
DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_careers_queries_fk" FOREIGN KEY ("careers_queries_id") REFERENCES "careers_queries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_careers_queries_fk" FOREIGN KEY ("careers_queries_id") REFERENCES "careers_queries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_rels" ADD CONSTRAINT "careers_application_rels_careers_queries_fk" FOREIGN KEY ("careers_queries_id") REFERENCES "careers_queries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_career_queries" ADD CONSTRAINT "careers_career_queries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_version_career_queries" ADD CONSTRAINT "_careers_v_version_career_queries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_application_career_queries" ADD CONSTRAINT "careers_application_career_queries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_queries_options" ADD CONSTRAINT "careers_queries_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_queries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "careers_career_queries";
DROP TABLE "_careers_v_version_career_queries";
DROP TABLE "careers_application_career_queries";
DROP TABLE "careers_queries_options";
DROP TABLE "careers_queries";
ALTER TABLE "careers_rels" DROP CONSTRAINT "careers_rels_careers_queries_fk";

ALTER TABLE "_careers_v_rels" DROP CONSTRAINT "_careers_v_rels_careers_queries_fk";

ALTER TABLE "careers_application_rels" DROP CONSTRAINT "careers_application_rels_careers_queries_fk";

ALTER TABLE "careers_rels" DROP COLUMN IF EXISTS "careers_queries_id";
ALTER TABLE "_careers_v_rels" DROP COLUMN IF EXISTS "careers_queries_id";
ALTER TABLE "careers_application_rels" DROP COLUMN IF EXISTS "careers_queries_id";`);

};
