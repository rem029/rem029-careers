import { BlockCollections, Category, Media, Page } from "@/payload-types";
import { CardsWithContent } from "../../common/cards-with-content";

export default function CollectionsFeature({ block }: CollectionsFeatureProps) {
  const collectionPages = block.collection_pages as Page[];
  const collectionCategories = block.collection_categories as Category[];

  return (
    <div className="w-full flex flex-col gap-20">
      {block.collection === "pages" &&
        collectionPages?.map((p, index) => {
          const featuredImage = p.featured_image as Media;
          const key = `collection_pages_idx${p.id}`;
          return (
            <CardsWithContent
              key={key}
              reverse={index % 2 === 0}
              image={p.has_featured_image ? featuredImage : undefined}
              title={p.title}
              description={p?.description || ""}
              slug={p.slug}
            />
          );
        })}

      {block.collection === "category" &&
        collectionCategories?.map((p, index) => {
          const featuredImage = p?.image as Media;
          const key = `collection_category_idx${p.id}`;
          return (
            <CardsWithContent
              key={key}
              reverse={index % 2 === 0}
              image={featuredImage}
              title={p.title}
              description={p?.subtitle || ""}
            />
          );
        })}
    </div>
  );
}

export interface CollectionsFeatureProps {
  block: BlockCollections;
}
