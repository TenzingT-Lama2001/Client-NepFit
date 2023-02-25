import {
  Stack,
  useTheme,
  Typography,
  Box,
  CardProps,
  Card,
} from "@mui/material";

interface Props extends CardProps {
  title: string;
  total: number;
}

export default function AppWidgetSummary({
  title,
  total,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex", alignItems: "center", p: 3, ...sx }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h3">{total}</Typography>
      </Box>
    </Card>
  );
}
