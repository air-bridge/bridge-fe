import { Pagination, Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { ServiceList } from "../../../components/service-list";
import { ServiceFilters } from "../../../components/service-filters";
import { useQuery } from "@tanstack/react-query";
import { ServiceSearchResponse } from "../../../types/service.ts";
import { getServices } from "../../../api/service.ts";
import { useServiceSearchContext } from "../../../context/services-search/util.ts";
import { Loading } from "../../../components/loading";

const ServicesListScreen = () => {
  const { payload, setPayload } = useServiceSearchContext();
  const { limit, offset, status, page } = payload;

  const { data, isPending } = useQuery<ServiceSearchResponse>({
    queryKey: ["services", limit, offset, page, status],
    queryFn: () => getServices(payload),
  });

  const services = data?.data || [];
  const servicesCount = data?.pagination?.total_items || 0;
  const isEmpty = servicesCount === 0;
  const paginationCount =
    servicesCount === 0 ? 0 : Math.ceil(servicesCount / Number(limit));

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <HomepageTabs showAction={!isEmpty} />
      <ServiceFilters />
      <Stack gap={3}>
        {isPending && <Loading />}

        {isEmpty ? <EmptyService /> : <ServiceList data={services} />}

        <Stack sx={{ direction: "row", alignItems: "flex-end" }}>
          <Pagination
            count={paginationCount}
            variant="outlined"
            color="primary"
            page={Number(page)}
            onChange={(_, p) => {
              const newOffset = (p - 1) * Number(limit);
              setPayload({
                page: p.toString(),
                offset: newOffset.toString(),
              });
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ServicesListScreen;
