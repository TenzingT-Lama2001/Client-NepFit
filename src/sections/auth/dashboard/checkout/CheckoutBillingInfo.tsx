// @mui
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";
// redux

// components
import Iconify from "../../../../components/Iconify";
import useAuth from "../../../../hooks/useAuth";

// ----------------------------------------------------------------------

type Props = {
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ onBackStep }: Props) {
  const { productState, setProductState, auth } = useAuth();

  const { name, email, address } = auth ?? {};

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Billing Address" />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {name}&nbsp;
        </Typography>

        <Typography variant="body2" gutterBottom>
          Boudha,Kathmandu
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          9823090405
        </Typography>
      </CardContent>
    </Card>
  );
}
