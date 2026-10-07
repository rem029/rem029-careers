import { fontPrimary } from "@/app/fonts";
import { MenuGroupedItems } from "@/payload-types";
import { RendererMenuItems } from "../renderer-menu-items";

export interface RendererMenuGroupedItemsProps {
  menuGroupedItems: MenuGroupedItems;
}

export function RendererMenuGroupedItems({
  menuGroupedItems,
}: RendererMenuGroupedItemsProps) {
  return (
    <>
      {menuGroupedItems?.map((groupedItem, index) => {
        const key = `render-grouped-menu-items-idx-${groupedItem?.id || index}`;
        return (
          <div key={key} className="flex flex-col gap-2 ">
            <p
              className={`text-lg ${fontPrimary.className} text-secondary max-md:text-lg opacity-75`}
            >
              {groupedItem.name}
            </p>
            <div className="flex flex-col max-md:flex-col max-md:flex-wrap gap-2 max-md:gap-2">
              <RendererMenuItems menuItems={groupedItem.menu} location="footer" />
            </div>
          </div>
        );
      })}
    </>
  );
}
