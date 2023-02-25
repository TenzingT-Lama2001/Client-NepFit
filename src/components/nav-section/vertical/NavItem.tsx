import { NavItemProps } from "../types";
import { Box, Tooltip, ListItemButtonProps } from "@mui/material";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";
import Iconify from "../../Iconify";
import RoleBasedGuard from "../../../guards/RoleBasedGuard";

type Props = NavItemProps & ListItemButtonProps;

export default function NavItem({ item, active, open, ...other }: Props) {
  const { title, icon, info, children, disabled, caption, roles } = item;

  const renderContent = (
    <ListItemStyle active={active} disabled={disabled} {...other}>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          variant: active ? "subtitle2" : "body2",
        }}
      />
    </ListItemStyle>
  );
  return <RoleBasedGuard roles={roles}>{renderContent}</RoleBasedGuard>;
}
