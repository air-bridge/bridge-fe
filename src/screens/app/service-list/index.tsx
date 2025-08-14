import { Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { ServiceList } from "../../../components/service-list";
import { mockServices } from "../../../mocks/service.ts";
import { ServiceTabs } from "../../../components/service-tabs";

const ServicesListScreen = () => {
  const servicesCount = mockServices.length || 0;
  const isEmpty = servicesCount === 0;

  return (
    <Stack gap={2}>
      <HomepageTabs showAction={!isEmpty} />
      <ServiceTabs />
      <Stack gap={4}>
        {isEmpty ? <EmptyService /> : <ServiceList data={mockServices} />}
      </Stack>
    </Stack>
  );
};

export default ServicesListScreen;
