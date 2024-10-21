import { FC } from "react";
import { IconMap } from "../../Icons/icon/iconMap";
import { Icon } from "../../Icons/icon";

interface ComparisonAttributeProps {
  primary: string;
  secondary: string;
  description: string;
  title: string;
  icon: keyof typeof IconMap;
}

export const ComparissonAttribute: FC<ComparisonAttributeProps> = ({
  primary,
  secondary,
  description,
  icon,
  title,
}) => {
  return (
    <div className="attribute-column">
      <div className="attribute-entry">
        <Icon icon={icon} className="characteristic" />
        <p className="characteristic">{title}:</p>
        <p>
          {primary} - {secondary}
        </p>
      </div>

      <div className="attribute-column">
        <p>
          <span className="characteristic">Comparison: </span> {description}
        </p>
      </div>
    </div>
  );
};
