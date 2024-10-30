import { DateTime } from "luxon";

export function getCurrentEpoch() {
  return DateTime.now().toUnixInteger();
}
