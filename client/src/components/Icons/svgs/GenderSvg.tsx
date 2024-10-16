import { FC, SVGAttributes } from "react";

export const GenderSvg: FC<SVGAttributes<any>> = ({
  width,
  height,
  ...rest
}) => {
  return (
    <svg
      fill="currentColor"
      width={width}
      height={height}
      viewBox="0 0 200 200"
      id="Layer_1"
      {...rest}
    >
      <title />
      <path d="M178.25,26.34c-.5-4-4-7-7.5-8l-26.5-5.5c-5.5-1-10.5,2.5-12,8s2.5,10.5,8,12l8,1.5-23.5,23.5a44.64,44.64,0,0,0-48,0l-2-2,8-8a9.9,9.9,0,0,0-14-14l-8,8-7.5-7.5,7-1.5a10.2,10.2,0,1,0-4-20l-26.5,5.5a10.85,10.85,0,0,0-8,8l-5.5,26.5c-1,5.5,2.5,10.5,8,12,5.5,1,10.5-2.5,12-8l2-9.5,8.5,8.5-8,8a9.9,9.9,0,0,0,14,14l8-8,2,2a43.59,43.59,0,0,0-7,24,45.08,45.08,0,0,0,35,44v7.5h-20a10,10,0,0,0,0,20h20v10a10,10,0,1,0,20,0v-10h20a10,10,0,0,0,0-20h-20v-7.5a45.08,45.08,0,0,0,35-44,43.59,43.59,0,0,0-7-24l23.5-23.5,1.5,8a10.25,10.25,0,0,0,12,8,9.76,9.76,0,0,0,8-11.5Zm-77.5,94.5a25,25,0,1,1,25-25A24.76,24.76,0,0,1,100.75,120.84Z" />
    </svg>
  );
};
