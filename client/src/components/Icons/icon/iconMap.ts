import { SVGAttributes } from "react";
import {
  CakeSvg,
  EyeSvg,
  GenderSvg,
  HairSvg,
  HeightSvg,
  MovieSvg,
  PlanetSvg,
  SkinSvg,
  WeightSvg,
} from "../svgs";

export const IconMap = {
  birth: CakeSvg,
  eye: EyeSvg,
  gender: GenderSvg,
  hair: HairSvg,
  height: HeightSvg,
  movie: MovieSvg,
  planet: PlanetSvg,
  skin: SkinSvg,
  weight: WeightSvg,
};

export interface IconProps extends SVGAttributes<any> {
  icon: keyof typeof IconMap;
}
