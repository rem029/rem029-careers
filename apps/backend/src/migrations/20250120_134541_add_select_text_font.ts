import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "t_f" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "pages_blocks_block_text_editor" ADD COLUMN "text_font" "t_f";
ALTER TABLE "_pages_v_blocks_block_text_editor" ADD COLUMN "text_font" "t_f";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" ADD COLUMN "text_font" "t_f";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" ADD COLUMN "text_font" "t_f";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_font";
ALTER TABLE "_pages_v_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_font";
ALTER TABLE "careers_list_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_font";
ALTER TABLE "careers_info_settings_blocks_block_text_editor" DROP COLUMN IF EXISTS "text_font";`);

};
