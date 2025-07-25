import {
  TextField,
  Button,
  Box,
  InputLabel,
  Stack,
  Typography,
  Grid2,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { luggageCategories } from "./util.ts";
import { OrderFormValues } from "../../types/order.ts";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PhotoInput } from "../photo-input";

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
            <TextField id="origin" variant="outlined" {...field} fullWidth />
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
            <TextField id="receiver" variant="outlined" {...field} fullWidth />
          </Box>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="address">Delivery Address</InputLabel>
            <TextField id="address" variant="outlined" {...field} fullWidth />
          </Box>
        )}
      />

      <Typography variant="subtitle2" color="text.secondary" fontWeight="300">
        Upload Information
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "solid 1px",
          borderColor: "grey.300",
          borderRadius: 2,
          px: 2.5,
          py: 2,
        }}
      >
        <Stack alignItems="center" gap={0.75} direction="row">
          <Typography color="text.secondary">Picture</Typography>

          <Typography sx={{ color: "grey.900" }}>Attach File</Typography>
        </Stack>

        <FileUploadIcon sx={{ color: "text.primary" }} />
      </Stack>

      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
      </Grid2>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
  );
};
