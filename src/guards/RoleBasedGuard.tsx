import { Box, Typography, Container } from "@mui/material";
import { ForbiddenIllustration } from "../assets";
import { Roles } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};
export default function RoleBasedGuard({
  hasContent,
  roles,
  children,
}: RoleBasedGuardProp) {
  const { auth } = useAuth();

  const currentRole = auth?.role;
  console.log("In guard currentrole", currentRole);
  console.log("Passed role", roles);
  if (typeof roles !== "undefined" && !roles.includes(currentRole as Roles)) {
    return hasContent ? (
      <Container sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ color: "text.secondary" }}>
            You do not have permission to access this page
          </Typography>
        </Box>

        <Box>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </Box>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
