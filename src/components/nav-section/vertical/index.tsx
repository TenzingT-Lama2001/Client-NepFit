import { NavListProps, NavSectionProps } from "../types";
import { Box, List, ListItem, Link, Collapse } from "@mui/material";
import { getActive } from "..";
import { useRouter } from "next/router";
import { useState } from "react";
import NavItem from "./NavItem";
import NavList from "./NavList";

export default function NavSectionVertical({ nav, ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      {nav.map((group) => (
        <List key={group.items[0].title} disablePadding sx={{ px: 2 }}>
          {group.items.map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChildren={!!list.children}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}
