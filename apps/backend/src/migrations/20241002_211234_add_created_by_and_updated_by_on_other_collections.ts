import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "careers_queries_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_media_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "careers_work_type_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "media_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "user_access_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

ALTER TABLE "careers_application_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "category_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "_category_v_rels" ADD COLUMN "users_id" integer;
CREATE INDEX IF NOT EXISTS "careers_queries_rels_order_idx" ON "careers_queries_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_queries_rels_parent_idx" ON "careers_queries_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_queries_rels_path_idx" ON "careers_queries_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_media_rels_order_idx" ON "careers_media_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_media_rels_parent_idx" ON "careers_media_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_media_rels_path_idx" ON "careers_media_rels" ("path");
CREATE INDEX IF NOT EXISTS "careers_work_type_rels_order_idx" ON "careers_work_type_rels" ("order");
CREATE INDEX IF NOT EXISTS "careers_work_type_rels_parent_idx" ON "careers_work_type_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "careers_work_type_rels_path_idx" ON "careers_work_type_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_rels_order_idx" ON "media_rels" ("order");
CREATE INDEX IF NOT EXISTS "media_rels_parent_idx" ON "media_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "media_rels_path_idx" ON "media_rels" ("path");
CREATE INDEX IF NOT EXISTS "user_access_rels_order_idx" ON "user_access_rels" ("order");
CREATE INDEX IF NOT EXISTS "user_access_rels_parent_idx" ON "user_access_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "user_access_rels_path_idx" ON "user_access_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "careers_application_rels" ADD CONSTRAINT "careers_application_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "category_rels" ADD CONSTRAINT "category_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_category_v_rels" ADD CONSTRAINT "_category_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_queries_rels" ADD CONSTRAINT "careers_queries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_queries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_queries_rels" ADD CONSTRAINT "careers_queries_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_media_rels" ADD CONSTRAINT "careers_media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_media_rels" ADD CONSTRAINT "careers_media_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_work_type_rels" ADD CONSTRAINT "careers_work_type_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "careers_work_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_work_type_rels" ADD CONSTRAINT "careers_work_type_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_access_rels" ADD CONSTRAINT "user_access_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "user_access"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_access_rels" ADD CONSTRAINT "user_access_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "careers_queries_rels";
DROP TABLE "careers_media_rels";
DROP TABLE "careers_work_type_rels";
DROP TABLE "media_rels";
DROP TABLE "user_access_rels";
ALTER TABLE "careers_application_rels" DROP CONSTRAINT "careers_application_rels_users_fk";

ALTER TABLE "category_rels" DROP CONSTRAINT "category_rels_users_fk";

ALTER TABLE "_category_v_rels" DROP CONSTRAINT "_category_v_rels_users_fk";

ALTER TABLE "careers_application_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "category_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "_category_v_rels" DROP COLUMN IF EXISTS "users_id";`);

};
