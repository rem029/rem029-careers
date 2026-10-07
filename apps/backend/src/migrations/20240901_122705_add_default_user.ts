import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

const ACCESS_ADMIN = "Admin Access";
const DEFAULT_USER = {
  email: "default@payload.com",
  id: 1,
  salt: "2265c9c8d703bfda5b205cdb96ef4d49701a4213784ba57713287295d6c3fc85",
  hash: "0917913daec340461d4f774fca250f0f9fbb7403e3b8326d3926c3682bdd2d9d79574cddd1a503665769e7ac63f9912750db1b82ac5df588086a8ce11867fb7eae4673c190417523b6ba10c7c8ff04ab4482160fcfe87496dc2c53fb6e1119ee2de805fca9059a72b8f622462accd141793033ddc6ab2b675988bb67341cbbec24d0e344c9136d893b589e8bb217f379e4e516667078e5c4de20d38062a5a6409188e9b599b3eb01232643e483919d5159e38e80b8e2c5c9e56132f9a3b9ac1e0d7d0a13746928d77a716e6f498e104f32060c616a806e1333c43b01d1506b5f97f719fea653fd78960ac8ca4d02cc64b5fb59436e3962e10bd7666e0c7850d715973c5fb5b63bf0325400faad4e89bdb29edc0be462321c1df4e14b529002df1bcfd93512ccbe932763a347081ae6dbf81932a846b04cafed792a6e19d7842c8385daab13db001037a11d0926121a796ad2e957244ce04b8f0d7f05c28fb9208e30afe30d30c7c41aa9f150c2cefde04a299484a3b69b700ac7371f5ba05beae9e400906ad95455c516db51c3b19d589ee6786566b4e5f3e9f1ede09d0c19dd083ef3a7d1f3d28f1a2b4288ce88c4eeada91fe879b81d87065bbd95b81fb18167b5e3c257cd4105408fd279a49abd102e4dbdf07110f959ecce22edf858c3c9cf4d7c9b3f0b34650342a4d88178374db2de9470d14ef106f5f5c9862dffb4e4",
};

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { rows: userData } = await payload.db.drizzle.execute(
    sql`
    INSERT INTO public.users
    (id, email, salt, hash)
    VALUES
     (
        ${DEFAULT_USER.id},
        ${DEFAULT_USER.email},
        ${DEFAULT_USER.salt},
        ${DEFAULT_USER.hash}
      )
    RETURNING id;
    `,
  );

  const userId = userData[0]?.id;

  payload.logger.info(`payload.up userData: ${userData}`);
  payload.logger.info(`payload.up userId: ${userId}`);

  const { rows: accessData } = await payload.db.drizzle.execute(
    sql`
    SELECT id FROM public.user_access
    WHERE name = ${ACCESS_ADMIN}
    `,
  );

  const adminAccessId = accessData[0]?.id;

  payload.logger.info(`payload.up accessData: ${accessData}`);
  payload.logger.info(`payload.up adminAccessId: ${adminAccessId}`);

  await payload.db.drizzle.execute(
    sql`
    INSERT INTO public.users_rels
    (id, parent_id, user_access_id, path)
    VALUES
     (
        1,
        ${userId},
        ${adminAccessId},
        'access'
      )
    `,
  );
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(
    sql`
    DELETE FROM  public.users
    WHERE email = ${DEFAULT_USER.email};    
    `,
  );
}
