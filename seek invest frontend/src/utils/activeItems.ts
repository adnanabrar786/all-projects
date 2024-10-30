import {
  ASSESSMENTS,
  CLIENTS,
  HOME,
  MODELS,
  SETTINGS,
} from "constants/pages.routes";

export const getActiveItem = (pathname?: string) => {
  if (pathname?.includes(ASSESSMENTS)) {
    return "Assessments";
  } else if (pathname?.includes(SETTINGS)) {
    return "Settings";
  } else if (pathname?.includes(CLIENTS)) {
    return "Clients";
  } else if (pathname?.includes(HOME)) {
    return "Home";
  } else if (pathname?.includes(MODELS)) {
    return "Models";
  }
};
