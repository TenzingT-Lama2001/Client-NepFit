import axios from "../utils/axios";

export const createCustomer = async (email: string) => {
  console.log("calling request using email", email);
  const { data } = await axios.post(`/api/stripe/create-customer`, { email });
  return data;
};

type CreateProduct = {
  name: string;
  description: string;
  price: string;
  currency: string;
};
export const createProduct = async (productDetails: CreateProduct) => {
  const { data } = await axios.post(
    `/api/stripe/create-product`,
    productDetails
  );
  return data;
};

export const createPrice = async (priceDetails: any) => {
  const { data } = await axios.post(`/api/stripe/create-price`, priceDetails);
  return data;
};
export const createSubscription = async ({
  priceId,
  programId,
  trainerId,
}: any) => {
  const { data } = await axios.post(`/api/stripe/create-subscription`, {
    priceId,
    programId,
    trainerId,
  });
  return data;
};

export const invoicePreview = async ({ customerId, subscriptionId }: any) => {
  const { data } = await axios.get(`/api/stripe/invoice-preview`, {
    params: {
      customerId,
      subscriptionId,
    },
  });
  return data;
};
export const invoiceList = async () => {
  const { data } = await axios.get(`/api/stripe/invoice-list`);
  return data;
};

export const createPaymentIntent = async ({
  amount,
  stripeProductIdArray,
  stripeProductPriceIdArray,
  stripeProductQty,
  memberId,
}: any) => {
  console.log("sending amount", amount);
  const { data } = await axios.get(`/api/stripe/create-payment-intent`, {
    params: {
      amount,
      stripeProductIdArray,
      stripeProductPriceIdArray,
      stripeProductQty,
      memberId,
    },
  });
  return data;
};
