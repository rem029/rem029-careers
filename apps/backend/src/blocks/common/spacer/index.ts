import { Block } from "payload/types";
import { CheckFullHeight } from "../../../fields/checkbox-full-height";
import { CheckFullWidth } from "../../../fields/checkbox-full-width";
import { NumberWidth } from "../../../fields/number-width";
import { NumberHeight } from "../../../fields/number-height";

const Spacer: Block = {
  slug: "block-spacer",
  interfaceName: "BlockSpacer",
  labels: { plural: "Spacer", singular: "Spacers" },
  fields: [
    CheckFullHeight,
    {
      ...NumberHeight,
      admin: {
        condition: (_, currentValue, __) => {
          return !currentValue.full_height;
        },
      },
    },
    CheckFullWidth,
    {
      ...NumberWidth,
      admin: {
        condition: (_, currentValue, __) => {
          return !currentValue.full_width;
        },
      },
    },
  ],
};

export default Spacer;
