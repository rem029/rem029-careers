import React, { Fragment } from "react";

export interface Content {
  label: string;
  value: string;
}

const textView: React.FC<{ contents: Content[]; direction: "col" | "row" }> = ({
  contents,
  direction,
}) => {
  return (
    <div className={`flex flex-${direction} text-left gap-1 h-full flex-1`}>
      {contents.map((content, index) => {
        return (
          <Fragment key={`employee-whistle-blower-index-${index}`}>
            <p className="p-0 m-0 font-bold text-xs opacity-50">
              {content.label.toUpperCase()}
            </p>
            <p className="p-0 m-0 text-xs">{content.value ? content.value : "NA"}</p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default textView;
