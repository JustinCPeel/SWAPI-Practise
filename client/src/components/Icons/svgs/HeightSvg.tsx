import { FC, SVGAttributes } from "react";

export const HeightSvg: FC<SVGAttributes<any>> = ({
  width,
  height,
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <path
        d="M12 22V2M12 22L8 18M12 22L16 18M12 2L8 6M12 2L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
