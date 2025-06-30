import {
  TextField,
  Button,
  Box,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { luggageCategories } from "./util.ts";
import { OrderFormValues } from "../../types/order.ts";

const schema: yup.ObjectSchema<OrderFormValues> = yup.object({
  title: yup.string().required("Title is required"),
  luggageType: yup.string().required("Luggage Type is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be a number")
    .nullable()
    .notRequired(),
  origin: yup.string().nullable().notRequired(),
  destination: yup.string().nullable().notRequired(),
  receiver: yup.string().nullable().notRequired(),
  address: yup.string().nullable().notRequired(),
});

const initialValues: OrderFormValues = {
  title: "",
  luggageType: "box",
  weight: undefined,
  origin: "",
  destination: "",
  receiver: "",
  address: "",
};
export const OrderForm = () => {
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    console.log(data);
  };

  const luggageType = watch("luggageType");

  return (
    <Stack
      gap={{ xs: 2, lg: 3 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Box>
        <InputLabel>Luggage Type</InputLabel>
        <Stack direction="row" spacing={1}>
          {luggageCategories.map((category) => (
            <Button
              key={category.value}
              variant="outlined"
              color={luggageType === category.value ? "primary" : "secondary"}
              size="small"
              startIcon={<category.icon />}
              onClick={() => setValue("luggageType", category.value)}
            >
              {category.name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="title">
              Order Title (e.g I want to deliver a 3kg box)
            </InputLabel>
            <TextField
              id="title"
              variant="outlined"
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="weight">Package weight (KG)</InputLabel>
            <TextField
              {...field}
              id="weight"
              variant="outlined"
              type="number"
              error={!!errors.weight}
              helperText={errors.weight?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Typography variant="subtitle2">Destination</Typography>

      <Controller
        name="origin"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="origin">From (Pickup address)</InputLabel>
            <TextField
              id="origin"
              variant="outlined"
              {...field}
              error={!!errors.origin}
              helperText={errors.origin?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Controller
        name="destination"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="destination">To (Country)</InputLabel>
            <TextField
              id="destination"
              variant="outlined"
              {...field}
              error={!!errors.destination}
              helperText={errors.destination?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Typography variant="subtitle2">Receiver</Typography>

      <Controller
        name="receiver"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="receiver">Full name</InputLabel>
            <TextField
              id="receiver"
              variant="outlined"
              {...field}
              error={!!errors.receiver}
              helperText={errors.receiver?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="address">Delivery Address</InputLabel>
            <TextField
              id="address"
              variant="outlined"
              {...field}
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
            />
          </Box>
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
  );
};
