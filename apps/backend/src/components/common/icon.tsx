import React, { useState, useEffect } from "react";
import { OPERATOR } from "../../utils/constant";

const Icon: React.FC = () => {
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const logoPath = await import(`../../assets/${OPERATOR.key}-icon.png`).then(
          (module) => module.default,
        );
        setLogo(logoPath);
      } catch (error) {
        const fallback = await import(`../../assets/${OPERATOR.key}-icon.png`).then(
          (module) => module.default,
        );
        setLogo(fallback);
      }
    };
    loadLogo();
  }, []);

  return (
    <img
      style={{
        width: "100%",
        maxWidth: OPERATOR.key === "dohaoasis" ? "96px" : "24px",
        height: "auto",
      }}
      src={logo}
      alt={`${OPERATOR.key}-logo`}
    />
  );
};

export default Icon;
