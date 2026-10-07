import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
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

CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_order_idx" ON "careers_content_application_printemps_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_parent_idx" ON "careers_content_application_printemps_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_content_application_printemps_rels_path_idx" ON "careers_content_application_printemps_rels" ("path");
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
`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE "careers_content_application_printemps" CASCADE;
DROP TABLE "careers_content_application_printemps_rels" CASCADE; `);
}
