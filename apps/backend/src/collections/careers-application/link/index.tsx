import React, { useEffect, useState } from "react";
import { Props } from "payload/components/views/Cell";
import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";
import { useConfig } from "payload/dist/admin/components/utilities/Config";
import {} from "payload";
import axios from "axios";
import { CareersMedia } from "payload/generated-types";

const CustomLink: React.FC<Props> = (props) => {
  const { cellData, className } = props;
  const config = useConfig();

  const [careerMedia, setCareerMedia] = useState<CareersMedia>();

  const fetchResumeURL = async () => {
    const response = await axios({
      method: "get",
      url: `${config.routes.api}/careers-media/${cellData}`,
    });

    if (response.status !== 200) {
      setCareerMedia(undefined);
      return;
    }

    setCareerMedia(response.data);
  };

  useEffect(() => {
    if (cellData) {
      fetchResumeURL();
    }
  }, []);

  return (
    <a
      className={className}
      href={careerMedia?.url || ""}
      target="_blank"
      rel="noreferrer "
    >
      {careerMedia?.filename || ""}
    </a>
  );
};

export default CustomLink;
