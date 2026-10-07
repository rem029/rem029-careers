import { GlobalConfig } from "payload/types";
import { User } from "payload/generated-types";
import { _getAccess, _isHidden } from "../../../helper/access";
import PageViewChart from "../../../components/dashboard/page";

const COLLECTION_NAME = "reportings-page";

const ReportingsPageGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Page Views",
  access: {
    read: async ({ req }) =>
      await _getAccess(req, "read", undefined, COLLECTION_NAME),
    update: () => false,
    readVersions: () => false,
  },
  endpoints: false,
  admin: {
    group: {
      "Page Views": "Reporting",
    },
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    components: {
      views: {
        Edit: PageViewChart,
      },
    },
  },
  fields: [],
};

export default ReportingsPageGlobal;
