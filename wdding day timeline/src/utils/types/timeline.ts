import { TimelineType } from 'utils/enums';

export type EventItem = {
  EVENT_NAME: string;
  EVENT_TYPE: string;
  DURATION: number;
  TIMELINE_TYPE: string[];
};

export type TLocationWithAddress = {
  name?: string;
  address?: string;
  lat: number;
  long: number;
};

export type TEvent = {
  event_name: string;
  event_name_hidden: string;
  event_type: string;
  event_duration: number;
  start_time: number;
  end_time: number;
  timeline_type?: TimelineType;
  origin?: TLocationWithAddress | null;
  dest?: TLocationWithAddress | null;
  user_id?: string | null;
  user_type?: string | null;
  couple_id?: number | null;
  couple_type?: string | null;
  user_first_name?: string | null;
  user_last_name?: string | null;
  ordering?: number;
  id?: string;
  is_pinned?: boolean;
  is_midnight?: boolean;
  buffer?: number;
};
