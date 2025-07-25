import { CreateOrderHeading } from "../../../components/order-heading/CreateOrderHeading.tsx";
import { OrderForm } from "../../../components/order-form";
import { Container, Stack } from "@mui/material";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { OrderFormValues } from "../../../types/order.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { OrderDetails } from "../../../components/order-form/order-details.tsx";
import { boolean } from "yup";

const schema: yup.ObjectSchema<OrderFormValues> = yup.object({
  title: yup.string().required("Title is required"),
  package_type: yup.string().required("Package Type is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be a positive number"),
  destination_address: yup.string().required("Destination address is required"),
  destination_state: yup.string().required("Destination state is required"),
  destination_country: yup.string().required("Destination country is required"),
  pickup_address: yup.string().required("Pickup address is required"),
  pickup_state: yup.string().required("Pickup state is required"),
  pickup_country: yup.string().required("Pickup country is required"),
  receiver_firstname: yup.string().required("Receiver first name is required"),
  receiver_lastname: yup.string().required("Receiver last name is required"),
  receiver_phone: yup.string().required("Receiver phone is required"),
  terms: boolean()
    .required("You need to agree to our terms & condition to continue")
    .oneOf([true], "You need to agree to our terms & condition to continue"),
  delivery_note: yup.string().nullable().notRequired(),
  image1: yup.mixed<File | string>().nullable().notRequired(),
  image2: yup.mixed<File | string>().nullable().notRequired(),
  image3: yup.mixed<File | string>().nullable().notRequired(),
});

const initialValues: OrderFormValues = {
  title: "",
  package_type: "box",
  weight: null,
  destination_address: "",
  destination_country: "",
  destination_state: "",
  pickup_address: "",
  pickup_country: "",
  pickup_state: "",
  receiver_firstname: "",
  receiver_lastname: "",
  receiver_phone: "",
  delivery_note: "",
  terms: true,
  image1: null,
  image2: null,
  image3: null,
};

export const CreateOrderScreen = () => {
  const [showReview, setShowReview] = useState(false);
  const methods = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    console.log(data);
  };

  const handleShowReview = async () => {
    const isValidForm = await methods.trigger();
    if (isValidForm) {
      setShowReview(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap={{ xs: 2, lg: 3 }}>
          <CreateOrderHeading
            showReview={showReview}
            onSetShowReview={handleShowReview}
            onBack={() => setShowReview(false)}
          />

          <Container
            sx={{
              maxWidth: { xs: "100%", lg: "620px" },
              px: { xs: 2, lg: 0 },
              py: 3,
              pt: { xs: 0, lg: "100px" },
            }}
          >
            {showReview ? <OrderDetails /> : <OrderForm />}
          </Container>
        </Stack>
      </form>
    </FormProvider>
  );
};
