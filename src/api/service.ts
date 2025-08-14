import { postAPI, putAPI } from "./api.ts";
import { Service, ServiceFormValues } from "../types/service.ts";
import { mockCompletedService, mockDraftService } from "../mocks/service.ts";

export const createService = async (payload: ServiceFormValues) => {
  const res = await postAPI("passengers/services", payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.message || "Unable to create service. Please try again!",
    );
  }

  const response = (await res.json()) as { data: Service };

  return response.data;
};

export const updateService = async (
  serviceId: string,
  payload: ServiceFormValues,
) => {
  // TODO: allow package type update when BE is fixed
  const refinedPayload: Record<
    string,
    string | number | boolean | string[] | File | null
  > = {};
  for (const [key, value] of Object.entries(payload)) {
    if (["image1", "image2", "image3"].includes(key)) {
      refinedPayload[key] = value;
    } else if (value) {
      refinedPayload[key] = value;
    }
  }

  const res = await putAPI(`passengers/services/${serviceId}`, {
    ...refinedPayload,
    package_type: undefined,
  });

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.message || "Unable to create service. Please try again!",
    );
  }

  const response = (await res.json()) as { data: Service };

  return response.data;
};

export const getService = async (id: string) => {
  // TODO: integrate services when ready

  return id ? mockDraftService : mockCompletedService;
  // const res = await getAPI(`passengers/services/${id}`);
  //
  // if (!res.ok) {
  //   const errorData = (await res.json()) as {
  //     message: string;
  //     error: string;
  //   };
  //
  //   throw new Error(
  //     errorData.error ||
  //       errorData.message ||
  //       "Fail to fetch service data, please try again!",
  //   );
  // }
  //
  // const response: {
  //   data: Service;
  // } = await res.json();
  //
  // return response.data;
};
