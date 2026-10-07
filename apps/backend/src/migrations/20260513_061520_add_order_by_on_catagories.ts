import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "order_by" numeric;
ALTER TABLE "_category_v" ADD COLUMN IF NOT EXISTS "version_order_by" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "category" DROP COLUMN IF EXISTS "order_by";
ALTER TABLE "_category_v" DROP COLUMN IF EXISTS "version_order_by";`);

};
