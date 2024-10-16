import { FC } from "react";
import { Icon } from "../../Icons/icon";
import { IconMap } from "../../Icons/icon/iconMap";

interface CharacterAttributesProps {
  icon: keyof typeof IconMap;
  attribute: string;
  value: string;
}

export const CharacterAttribute: FC<CharacterAttributesProps> = ({
  icon = "weight",
  attribute,
  value,
}) => {
  return (
    <div className="attribute">
      <Icon icon={icon} />
      <p>
        <b>{attribute}: </b>
        {value}
      </p>
    </div>
  );
};
