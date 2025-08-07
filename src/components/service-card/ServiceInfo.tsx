import { Service } from "../../types/service.ts";
import { Stack, Typography } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { ServiceTimeline } from "./ServiceTimeline.tsx";
import lockedImage from "../../assets/images/locked-info.png";

type Props = {
  data: Service;
};
export const ServiceInfo = ({ data }: Props) => {
  return (
    <Stack gap={3}>
      <img src={lockedImage} width={250} alt="locked info" />

      <Stack
        gap={3}
        pt={2}
        pb={4}
        sx={{
          borderTop: "solid 1px",
          borderTopColor: "divider",
          borderBottom: "solid 1px",
          borderBottomColor: "divider",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 5,
            bgcolor: "info.light",
            width: "fit-content",
          }}
        >
          <Typography variant="subtitle2">
            {`${data.price_per_kg} ${data.currency} per KG`}
          </Typography>
          <LocalAtmIcon />
        </Stack>

        <Stack>
          <Typography variant="body2">Available Weight</Typography>
          <Typography variant="subtitle1">{`${data.weight} KG`}</Typography>
        </Stack>

        <ServiceTimeline data={data} />

        <Stack alignItems="center" gap={1} direction="row" minHeight={20}>
          {data.package_type.length > 0 && (
            <>
              <Typography color="text.secondary" variant="body2">
                Package type:
              </Typography>

              <Stack direction="row" alignItems="center" gap={0.5}>
                {data.package_type.map((c, index) => (
                  <Typography
                    variant="caption"
                    key={index}
                    sx={{
                      borderRadius: 1.5,
                      px: 0.5,
                      py: 0.25,
                      bgcolor: "success.light",
                      textTransform: "capitalize",
                    }}
                  >
                    {c}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
