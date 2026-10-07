import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "careers_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "_careers_v_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "pages_rels" ADD COLUMN "users_id" integer;
ALTER TABLE "_pages_v_rels" ADD COLUMN "users_id" integer;
DO $$ BEGIN
 ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_careers_v_rels" ADD CONSTRAINT "_careers_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "_locales" AS ENUM('en', 'ar', 'fr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "careers_rels" DROP CONSTRAINT "careers_rels_users_fk";

ALTER TABLE "_careers_v_rels" DROP CONSTRAINT "_careers_v_rels_users_fk";

ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_users_fk";

ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_users_fk";

ALTER TABLE "careers_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "_careers_v_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "users_id";
ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "users_id";`);

};
