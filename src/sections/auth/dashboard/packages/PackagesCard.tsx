import { ReactElement } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Card, Button, Typography, Box, Stack } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { createCustomer, createSubscription } from "../../../../api/stripe";
// components

// import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

// type Props = {
//   card: {
//     subscription: string;
//     price: number;
//     caption: string;
//     icon: ReactElement;
//     labelAction: string;
//     lists: {
//       text: string;
//       isAvailable: boolean;
//     }[];
//   };
//   index: number;
// };

export default function PackagesCard({ card, index }: any) {
  const {
    name,
    description,
    price,
    duration,
    durationUnit,
    stripePackageId,
    stripePackagePriceId,
  } = card;
  const {
    auth,
    setAuth,
    currentPlan,
    setCurrentPlan,
    stripeDetails,
    setStripeDetails,
  } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const handleOnClick = async () => {
    try {
      setCurrentPlan((prevPlan: any) => ({
        ...prevPlan,
        currentPackage: name,
      }));

      setStripeDetails((prev: any) => ({
        ...prev,
        stripePackageId,
        stripePackagePriceId,
      }));
      const email = auth?.email;
      const planId = stripeDetails?.planId;

      const programId: any = currentPlan?.currentProgramId;
      console.log({ auth });
      console.log({ email });
      console.log({ currentPlan });
      console.log({ programId });
      // createCustomerMutation.mutate(email);
      createSubscriptionMutation.mutate({
        priceId: stripePackagePriceId,
        programId: programId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log("currentPlanLatest", currentPlan);

  const createCustomerMutation = useMutation(
    (data: any) => createCustomer(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.members.list);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.response.data.message ??
            err.message ??
            err.data.message ??
            "Something went wrong",
          { variant: "error" }
        );
      },
    }
  );

  const createSubscriptionMutation = useMutation(
    (data: any) => createSubscription(data),
    {
      onSuccess(data) {
        console.log({ data });
        setStripeDetails((prev: any) => ({
          ...prev,
          subscriptionId: data.subscriptionId,
          clientSecret: data.clientSecret,
        }));
        console.log({ stripeDetails });
        push(PATH_DASHBOARD.dashboard.member.checkout);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.response.data.message ??
            err.message ??
            err.data.message ??
            "Something went wrong",
          { variant: "error" }
        );
      },
    }
  );
  return (
    <RootStyle>
      <Typography variant="overline" sx={{ color: "text.secondary" }}>
        {name}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          $
        </Typography>
        <Typography variant="h2" sx={{ mx: 1 }}>
          {price === 0 ? "Free" : price}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", my: "2rem" }}
        >
          {duration} {durationUnit}
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", my: "2rem" }}
      >
        {description}
      </Typography>

      {currentPlan?.currentProgram ? (
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => handleOnClick()}
        >
          Choose {name}
        </Button>
      ) : (
        <Button fullWidth size="large" variant="contained" disabled>
          Choose a program
        </Button>
      )}
    </RootStyle>
  );
}
