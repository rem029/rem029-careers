import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_image_carousel" ADD COLUMN "max_height" numeric;
ALTER TABLE "_pages_v_blocks_block_image_carousel" ADD COLUMN "max_height" numeric;
ALTER TABLE "careers_list_settings_blocks_block_image_carousel" ADD COLUMN "max_height" numeric;
ALTER TABLE "careers_info_settings_blocks_block_image_carousel" ADD COLUMN "max_height" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_block_image_carousel" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "_pages_v_blocks_block_image_carousel" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "careers_list_settings_blocks_block_image_carousel" DROP COLUMN IF EXISTS "max_height";
ALTER TABLE "careers_info_settings_blocks_block_image_carousel" DROP COLUMN IF EXISTS "max_height";`);

};
