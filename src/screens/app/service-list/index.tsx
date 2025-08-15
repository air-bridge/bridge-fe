import { Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { ServiceList } from "../../../components/service-list";
import { mockServices } from "../../../mocks/service.ts";
import { ServiceFilters } from "../../../components/service-filters";
import { ServiceSearchContextProvider } from "../../../context/services-search";

const ServicesListScreen = () => {
  const servicesCount = mockServices.length || 0;
  const isEmpty = servicesCount === 0;

  return (
    <ServiceSearchContextProvider>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <HomepageTabs showAction={!isEmpty} />
        <ServiceFilters />
        <Stack gap={4}>
          {isEmpty ? <EmptyService /> : <ServiceList data={mockServices} />}
        </Stack>
      </Stack>
    </ServiceSearchContextProvider>
  );
};

export default ServicesListScreen;
