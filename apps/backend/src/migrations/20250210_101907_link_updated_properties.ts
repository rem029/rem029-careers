import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_link" ADD COLUMN "font_bold" boolean;
ALTER TABLE "pages_blocks_block_link" ADD COLUMN "font_underline" boolean;
ALTER TABLE "_pages_v_blocks_block_link" ADD COLUMN "font_bold" boolean;
ALTER TABLE "_pages_v_blocks_block_link" ADD COLUMN "font_underline" boolean;
ALTER TABLE "menus_blocks_block_link" ADD COLUMN "font_bold" boolean;
ALTER TABLE "menus_blocks_block_link" ADD COLUMN "font_underline" boolean;
ALTER TABLE "careers_list_settings_blocks_block_link" ADD COLUMN "font_bold" boolean;
ALTER TABLE "careers_list_settings_blocks_block_link" ADD COLUMN "font_underline" boolean;
ALTER TABLE "careers_info_settings_blocks_block_link" ADD COLUMN "font_bold" boolean;
ALTER TABLE "careers_info_settings_blocks_block_link" ADD COLUMN "font_underline" boolean;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_link" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "pages_blocks_block_link" DROP COLUMN IF EXISTS "font_underline";
ALTER TABLE "_pages_v_blocks_block_link" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "_pages_v_blocks_block_link" DROP COLUMN IF EXISTS "font_underline";
ALTER TABLE "menus_blocks_block_link" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "menus_blocks_block_link" DROP COLUMN IF EXISTS "font_underline";
ALTER TABLE "careers_list_settings_blocks_block_link" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "careers_list_settings_blocks_block_link" DROP COLUMN IF EXISTS "font_underline";
ALTER TABLE "careers_info_settings_blocks_block_link" DROP COLUMN IF EXISTS "font_bold";
ALTER TABLE "careers_info_settings_blocks_block_link" DROP COLUMN IF EXISTS "font_underline";`);

};
