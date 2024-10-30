export interface ICreateShareTimelineBody {
  data: {
    wedding_id: number;
    message: string;
    vendors: string[];
    members: string[];
  };
}
