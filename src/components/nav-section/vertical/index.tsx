import { NavListProps, NavSectionProps } from "../types";
import { Box, List, ListItem, Link } from "@mui/material";
import { getActive } from "..";
import { useRouter } from "next/router";
import { useState } from "react";
import NavItem from "./NavItem";

type NavListRootProps = {
  data: NavListProps;
};
export default function NavSectionVertical({
  data,
  ...other
}: NavListRootProps) {
  const { pathname, asPath, push } = useRouter();

  const active = getActive(data.path, pathname, asPath);
  console.log({ active });
  const [open, setOpen] = useState(active);

  const handleClickItem = () => {
    push(data.path);

    setOpen(!open);
  };
  return (
    <>
      <NavItem
        item={data}
        open={open}
        active={active}
        onClick={handleClickItem}
      />
    </>
  );
}
