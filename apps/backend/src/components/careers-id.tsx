import React, { useMemo } from "react";
import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";

const CareersId: React.FC<{ id?: string }> = ({ id }) => {
  const document = useDocumentInfo();

  const formLink = useMemo(() => {
    let formId = id ? id : document?.id?.toString();

    return formId;
  }, [id]);

  return <p>{formLink}</p>;
};

export default CareersId;
