// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Divider,
  Typography,
  Stack,
  Button,
} from "@mui/material";
// utils
import cssStyles from "../../../../utils/cssStyles";

// @types

// components
import Image from "../../../../components/Image";
import SvgIconStyle from "../../../../components/SvgIconStyle";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../../../hooks/useAuth";

// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}));

// ----------------------------------------------------------------------

export default function ProgramCard({ program }: any) {
  const { _id, name, description, image } = program;
  const { currentPlan, setCurrentPlan } = useAuth();
  console.log("current plan", currentPlan);

  const handleOnClick = async () => {
    setCurrentPlan((prevPlan: any) => ({
      ...prevPlan,
      currentProgram: name,
      currentProgramId: _id,
    }));
  };
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar
          alt={name}
          src={image?.secure_url}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        <OverlayStyle />
        <Image src={image?.secure_url} alt={image?.secure_url} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: "2rem" }}>
        {description}
      </Typography>

      <Divider sx={{ borderStyle: "dashed" }} />

      {currentPlan?.currentProgram && currentPlan?.currentProgram === name ? (
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: "1rem", mb: "5px" }}
          disabled
        >
          Current Program
        </Button>
      ) : (
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: "1rem", mb: "5px" }}
          onClick={() => handleOnClick()}
        >
          Select Program
        </Button>
      )}
    </Card>
  );
}
