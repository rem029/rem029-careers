import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";
import { UserAccess } from "payload/generated-types";
import { uuid } from "uuidv4";

const defaultAccess = {
  read: true,
  admin: true,
  create: true,
  hidden: false,
  update: true,
  delete: true,
  access: true,
};

const ACCESS_ADMIN = "Admin Access";

export async function up({ req, payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  const cp = req?.payload ? req.payload : payload;
  req.payload.logger.info(`@payload.up cp ${cp.collections}`);

  const accessCreateDate = new Date().toISOString();
  const accessConfigCollections = [...Object.keys(cp.collections)].map((slug) => ({
    name: slug,
    ...defaultAccess,
  }));

  const accessConfigGlobals = cp.globals.config.map((g) => ({
    name: g.slug,
    ...defaultAccess,
  }));

  const accessItem: UserAccess = {
    id: 1,
    name: ACCESS_ADMIN,
    access: [...accessConfigCollections, ...accessConfigGlobals],
    createdAt: accessCreateDate,
    updatedAt: accessCreateDate,
  };

  payload.logger.info(`@payload.up ${JSON.stringify(accessItem, null, 4)}`);
  const { rows } = await payload.db.drizzle.execute(
    sql`
    INSERT INTO public.user_access
    (name, created_at, updated_at)
    VALUES
     (
        ${accessItem.name},
        ${accessItem.updatedAt},
        ${accessItem.createdAt}
      )
    RETURNING id;
    `,
  );

  const createdId = rows[0]?.id;

  let order = 1;
  for (const item of accessItem.access) {
    const customID = uuid();
    await payload.db.drizzle.execute(
      sql`
      INSERT INTO public.user_access_access
      (_order, _parent_id, id, "name", "hidden", "read", "create", "update", "admin", "delete", "access")
      VALUES
       (${order},
       ${createdId},
       ${customID},
       ${item.name},
       ${item.hidden},
       ${item.read},
       ${item.create},
       ${item.update},
       ${item.admin},
       ${item.delete},
       ${item.access})      
      `,
    );
    order++;
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
  payload.logger.info("@payload.down");
  await payload.db.drizzle.execute(
    sql`
    DELETE FROM public.user_access
    WHERE name = ${ACCESS_ADMIN}
    `,
  );
}
