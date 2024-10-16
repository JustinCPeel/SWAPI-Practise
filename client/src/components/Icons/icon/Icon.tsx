import { FC } from "react";
import { IconMap, IconProps } from "./iconMap";

export const Icon: FC<IconProps> = ({
  icon,
  width = 18,
  height = 18,
  ...rest
}) => {
  const Icon = IconMap[icon];
  return <Icon width={width} height={height} {...rest} />;
};
