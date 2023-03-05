import { ReactElement } from "react";
import { BoxProps } from "@mui/material";
export type NavListProps = {
  title: string;
  path: string;
  icon?: ReactElement;
  info?: ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export type NavItemProps = {
  item: NavListProps;
  open: boolean;
  active: boolean;
  depth: number;
};

export interface NavSectionProps extends BoxProps {
  nav: {
    items: NavListProps[];
  }[];
}
