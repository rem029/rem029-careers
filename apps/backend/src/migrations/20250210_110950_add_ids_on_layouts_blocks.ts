import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_container_inner" ADD COLUMN "inner_container_id" varchar;
ALTER TABLE "pages_blocks_container" ADD COLUMN "container_id" varchar;
ALTER TABLE "pages_blocks_block_section" ADD COLUMN "section_id" varchar;
ALTER TABLE "pages_blocks_block_hero" ADD COLUMN "hero_id" varchar;
ALTER TABLE "_pages_v_blocks_container_inner" ADD COLUMN "inner_container_id" varchar;
ALTER TABLE "_pages_v_blocks_container" ADD COLUMN "container_id" varchar;
ALTER TABLE "_pages_v_blocks_block_section" ADD COLUMN "section_id" varchar;
ALTER TABLE "_pages_v_blocks_block_hero" ADD COLUMN "hero_id" varchar;
ALTER TABLE "menus_blocks_container_inner" ADD COLUMN "inner_container_id" varchar;
ALTER TABLE "menus_blocks_container" ADD COLUMN "container_id" varchar;
ALTER TABLE "menus_blocks_block_section" ADD COLUMN "section_id" varchar;
ALTER TABLE "menus_blocks_block_hero" ADD COLUMN "hero_id" varchar;
ALTER TABLE "careers_list_settings_blocks_container_inner" ADD COLUMN "inner_container_id" varchar;
ALTER TABLE "careers_list_settings_blocks_container" ADD COLUMN "container_id" varchar;
ALTER TABLE "careers_list_settings_blocks_block_section" ADD COLUMN "section_id" varchar;
ALTER TABLE "careers_list_settings_blocks_block_hero" ADD COLUMN "hero_id" varchar;
ALTER TABLE "careers_info_settings_blocks_container_inner" ADD COLUMN "inner_container_id" varchar;
ALTER TABLE "careers_info_settings_blocks_container" ADD COLUMN "container_id" varchar;
ALTER TABLE "careers_info_settings_blocks_block_section" ADD COLUMN "section_id" varchar;
ALTER TABLE "careers_info_settings_blocks_block_hero" ADD COLUMN "hero_id" varchar;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages_blocks_container_inner" DROP COLUMN IF EXISTS "inner_container_id";
ALTER TABLE "pages_blocks_container" DROP COLUMN IF EXISTS "container_id";
ALTER TABLE "pages_blocks_block_section" DROP COLUMN IF EXISTS "section_id";
ALTER TABLE "pages_blocks_block_hero" DROP COLUMN IF EXISTS "hero_id";
ALTER TABLE "_pages_v_blocks_container_inner" DROP COLUMN IF EXISTS "inner_container_id";
ALTER TABLE "_pages_v_blocks_container" DROP COLUMN IF EXISTS "container_id";
ALTER TABLE "_pages_v_blocks_block_section" DROP COLUMN IF EXISTS "section_id";
ALTER TABLE "_pages_v_blocks_block_hero" DROP COLUMN IF EXISTS "hero_id";
ALTER TABLE "menus_blocks_container_inner" DROP COLUMN IF EXISTS "inner_container_id";
ALTER TABLE "menus_blocks_container" DROP COLUMN IF EXISTS "container_id";
ALTER TABLE "menus_blocks_block_section" DROP COLUMN IF EXISTS "section_id";
ALTER TABLE "menus_blocks_block_hero" DROP COLUMN IF EXISTS "hero_id";
ALTER TABLE "careers_list_settings_blocks_container_inner" DROP COLUMN IF EXISTS "inner_container_id";
ALTER TABLE "careers_list_settings_blocks_container" DROP COLUMN IF EXISTS "container_id";
ALTER TABLE "careers_list_settings_blocks_block_section" DROP COLUMN IF EXISTS "section_id";
ALTER TABLE "careers_list_settings_blocks_block_hero" DROP COLUMN IF EXISTS "hero_id";
ALTER TABLE "careers_info_settings_blocks_container_inner" DROP COLUMN IF EXISTS "inner_container_id";
ALTER TABLE "careers_info_settings_blocks_container" DROP COLUMN IF EXISTS "container_id";
ALTER TABLE "careers_info_settings_blocks_block_section" DROP COLUMN IF EXISTS "section_id";
ALTER TABLE "careers_info_settings_blocks_block_hero" DROP COLUMN IF EXISTS "hero_id";`);

};
