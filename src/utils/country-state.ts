import { State } from "country-state-city";

export const getStates = (countryIsoCode?: string | null) => {
  if (countryIsoCode) {
    return State.getStatesOfCountry(countryIsoCode);
  } else {
    return [];
  }
};
