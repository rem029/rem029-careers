import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "careers_locales" (
	"meta_title" varchar,
	"meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "careers_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_careers_v_locales" (
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_careers_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pages_locales" (
	"meta_title" varchar,
	"meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_pages_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

ALTER TABLE "careers_rels" ADD COLUMN "locale" "_locales";
ALTER TABLE "careers_rels" ADD COLUMN "media_id" integer;
ALTER TABLE "_careers_v_rels" ADD COLUMN "locale" "_locales";
ALTER TABLE "_careers_v_rels" ADD COLUMN "media_id" integer;
ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
CREATE INDEX IF NOT EXISTS "careers_rels_locale_idx" ON "careers_rels" ("locale");
CREATE INDEX IF NOT EXISTS "_careers_v_rels_locale_idx" ON "_careers_v_rels" ("locale");
CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" ("locale");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_locale_idx" ON "_pages_v_rels" ("locale");
DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_locales" ADD CONSTRAINT "_careers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_careers_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "careers_locales";
DROP TABLE "_careers_v_locales";
DROP TABLE "pages_locales";
DROP TABLE "_pages_v_locales";
ALTER TABLE "careers_rels" DROP CONSTRAINT "careers_rels_media_fk";

ALTER TABLE "_careers_v_rels" DROP CONSTRAINT "_careers_v_rels_media_fk";

DROP INDEX IF EXISTS "careers_rels_locale_idx";
DROP INDEX IF EXISTS "_careers_v_rels_locale_idx";
DROP INDEX IF EXISTS "pages_rels_locale_idx";
DROP INDEX IF EXISTS "_pages_v_rels_locale_idx";
ALTER TABLE "careers_rels" DROP COLUMN IF EXISTS "locale";
ALTER TABLE "careers_rels" DROP COLUMN IF EXISTS "media_id";
ALTER TABLE "_careers_v_rels" DROP COLUMN IF EXISTS "locale";
ALTER TABLE "_careers_v_rels" DROP COLUMN IF EXISTS "media_id";
ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "locale";
ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "locale";`);

};
