import { Button, Container, Stack, Theme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getService } from "../../../api/service.ts";
import { ServiceDetailsHeading } from "../../../components/service-heading/ServiceDetailsHeading.tsx";
import { ServiceDetails } from "../../../components/service-details";
import { ServiceStatus } from "../../../types/service.ts";

export const ServiceDetailsScreen = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { serviceId = "" } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["service-details", serviceId],
    queryFn: () => getService(serviceId),
    enabled: !!serviceId,
  });

  const showAction =
    !isError &&
    !isLoading &&
    !!data?.status &&
    [ServiceStatus.Draft, ServiceStatus.Open].includes(data?.status);

  return (
    <>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <ServiceDetailsHeading showAction={showAction} serviceId={data?.id} />

        <Container
          sx={{
            maxWidth: { xs: "100%", lg: "620px" },
            px: { xs: 2, lg: 0 },
            py: 3,
            pt: { xs: 0, lg: "100px" },
          }}
        >
          <Stack gap={2}>
            {isError && <ErrorInfo message={error?.message} />}
            {isLoading && <Loading />}
            {data && <ServiceDetails data={data} />}

            {isMobile && showAction && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to={`/services/edit/${serviceId}`}
              >
                Edit
              </Button>
            )}
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
