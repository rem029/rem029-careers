import { GlobalConfig } from "payload/types";
import { User } from "payload/generated-types";
import { _getAccess, _isHidden } from "../../../helper/access";
import CareersApplicationChart from "../../../components/dashboard/careers";

const COLLECTION_NAME = "reportings-careers";

const ReportingsCareersGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Careers",
  access: {
    read: async ({ req }) =>
      await _getAccess(req, "read", undefined, COLLECTION_NAME),
    update: () => false,
    readVersions: () => false,
  },
  endpoints: false,
  admin: {
    group: {
      Careers: "Reporting",
    },
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    components: {
      views: {
        Edit: CareersApplicationChart,
      },
    },
  },
  fields: [],
};

export default ReportingsCareersGlobal;
