import { TEvent } from 'utils/types/timeline';
import { TimelineEventType, TimelineType } from 'utils/enums';

export interface IUpdateTimelineEvent {
  data: {
    current_event_item: TEvent;
    event_clock: number | null;
    event_duration: number | null;
    event_name: string;
  };
}

export interface IUpdateWeddingDate {
  data: {
    weddingDate: number;
  };
}

type TAddEvent = {
  event_name: string;
  event_type: TimelineEventType;
};
export interface IAddTimelineEvent {
  data: {
    event: TAddEvent | null;
    duration: number | null;
    timeline_type: TimelineType | null;
  };
}
export interface IDeleteTimelineEvent {
  data: {
    event_item: TEvent;
  };
}
