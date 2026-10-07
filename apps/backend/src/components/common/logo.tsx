import React, { useState, useEffect } from "react";
import { OPERATOR } from "../../utils/constant";

const Logo: React.FC = () => {
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const logoPath = await import(`../../assets/${OPERATOR.key}-logo.png`).then(
          (module) => module.default,
        );
        setLogo(logoPath);
      } catch (error) {
        // Fallback to default logo
        const fallback = await import(`../../assets/${OPERATOR.key}-logo.png`).then(
          (module) => module.default,
        );
        setLogo(fallback);
      }
    };
    loadLogo();
  }, []);

  return <img style={{ width: "240px" }} src={logo} alt={`${OPERATOR.key}-logo`} />;
};

export default Logo;
