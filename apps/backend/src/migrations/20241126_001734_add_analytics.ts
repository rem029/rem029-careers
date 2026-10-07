import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_button" ADD COLUMN "button_id" varchar;
ALTER TABLE "_pages_v_blocks_block_button" ADD COLUMN "button_id" varchar;
ALTER TABLE "careers_list_settings_blocks_block_button" ADD COLUMN "button_id" varchar;
ALTER TABLE "careers_info_settings_blocks_block_button" ADD COLUMN "button_id" varchar;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_button" DROP COLUMN IF EXISTS "button_id";
ALTER TABLE "_pages_v_blocks_block_button" DROP COLUMN IF EXISTS "button_id";
ALTER TABLE "careers_list_settings_blocks_block_button" DROP COLUMN IF EXISTS "button_id";
ALTER TABLE "careers_info_settings_blocks_block_button" DROP COLUMN IF EXISTS "button_id";`);

};
