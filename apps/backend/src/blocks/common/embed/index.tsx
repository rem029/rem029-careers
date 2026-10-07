import { Block } from "payload/types";

const EmbedBlock: Block = {
  slug: "block-embed",
  labels: { plural: "Embeds", singular: "Embed" },
  interfaceName: "BlockEmbed",
  fields: [{ name: "code", type: "code", required: true }],
};

export default EmbedBlock;
