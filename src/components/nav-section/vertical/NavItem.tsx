import { NavItemProps } from "../types";
import { Box, Tooltip, ListItemButtonProps } from "@mui/material";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";
import Iconify from "../../Iconify";
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
import useAuth from "../../../hooks/useAuth";

type Props = NavItemProps & ListItemButtonProps;

export default function NavItem({
  item,
  active,
  open,
  depth,
  ...other
}: Props) {
  const { title, icon, info, children, disabled, caption, roles } = item;

  const renderContent = (
    <ListItemStyle depth={depth} active={active} disabled={disabled} {...other}>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      {depth !== 1 && <DotIcon active={active && depth !== 1} />}
      <ListItemTextStyle
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          variant: active ? "subtitle2" : "body2",
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          icon={
            open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"
          }
          sx={{ width: 16, height: 16, ml: 1, flexShrink: 0 }}
        />
      )}
    </ListItemStyle>
  );
  return <RoleBasedGuard roles={roles}>{renderContent}</RoleBasedGuard>;
}
type DotIconProps = {
  active: boolean;
};

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
}
