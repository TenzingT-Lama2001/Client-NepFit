import { useState } from "react";
import { useRouter } from "next/router";
// @mui
import { List, Collapse, Link } from "@mui/material";
//

import { getActive, NavListProps } from "..";
import NavItem from "./NavItem";

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChildren: boolean;
  isCollapse?: boolean;
};

export default function NavList({
  data,
  depth,
  hasChildren,
}: NavListRootProps) {
  const { pathname, asPath, push } = useRouter();

  const active = getActive(data.path, pathname, asPath);

  const [open, setOpen] = useState(active);
  const handleClickItem = () => {
    if (!hasChildren) {
      push(data.path);
    }
    setOpen(!open);
  };

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        onClick={handleClickItem}
      />
      {hasChildren && (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            <NavSubList data={data.children} depth={depth} />
          </List>
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
        />
      ))}
    </>
  );
}
