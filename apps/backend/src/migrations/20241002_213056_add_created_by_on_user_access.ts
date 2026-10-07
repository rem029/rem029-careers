import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "careers_email_settings_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

ALTER TABLE "menus_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "careers_list_settings_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "careers_info_settings_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "logos_rels" ADD COLUMN "users_id" integer;
CREATE INDEX IF NOT EXISTS "careers_email_settings_rels_order_idx" ON "careers_email_settings_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_email_settings_rels_parent_idx" ON "careers_email_settings_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_email_settings_rels_path_idx" ON "careers_email_settings_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_list_settings_rels" ADD CONSTRAINT "careers_list_settings_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_info_settings_rels" ADD CONSTRAINT "careers_info_settings_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "logos_rels" ADD CONSTRAINT "logos_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_email_settings_rels" ADD CONSTRAINT "careers_email_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_email_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_email_settings_rels" ADD CONSTRAINT "careers_email_settings_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "careers_email_settings_rels";
ALTER TABLE "menus_rels" DROP CONSTRAINT "menus_rels_users_fk";

ALTER TABLE "careers_list_settings_rels" DROP CONSTRAINT "careers_list_settings_rels_users_fk";

ALTER TABLE "careers_info_settings_rels" DROP CONSTRAINT "careers_info_settings_rels_users_fk";

ALTER TABLE "logos_rels" DROP CONSTRAINT "logos_rels_users_fk";

ALTER TABLE "menus_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "careers_list_settings_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "careers_info_settings_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "logos_rels" DROP COLUMN IF EXISTS "users_id";`);

};
