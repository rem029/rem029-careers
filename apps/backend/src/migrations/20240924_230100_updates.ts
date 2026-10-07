import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE IF EXISTS "careers_info_settings_blocks_block_careers_listing" CASCADE;`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_order_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_order");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_parent_id_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_parent_id");
CREATE INDEX IF NOT EXISTS "careers_info_settings_blocks_block_careers_listing_path_idx" ON "careers_info_settings_blocks_block_careers_listing" ("_path");
DO $$ BEGIN
 ALTER TABLE "careers_info_settings_blocks_block_careers_listing" ADD CONSTRAINT "careers_info_settings_blocks_block_careers_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "careers_info_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
