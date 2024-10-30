import CouplesService from 'services/couples.service';
import { WeddingService } from 'services/wedding.service';
import { TEvent } from './types/timeline';

// TODO : if data is late page is redirecting to onboarding page (if open console)

export const getCoupleAndWeddingData = async () => {
  const coupleService = new CouplesService();
  const weddingService = new WeddingService();
  const notFound = {
    WeddingDetails: null,
    data: [],
    timeline: [],
  };
  try {
    const {
      data: { data },
    } = await coupleService.GetCouple();

    const { data: timelineData } = await weddingService.GetWeddingTimeline();
    if (data.length) {
      const weddingDetails = data[0].wedding;
      return {
        data: data,
        WeddingDetails: weddingDetails,
        timeline: timelineData.data.timeline as TEvent[],
      };
    }

    return notFound;
  } catch (err) {
    return notFound;
  }
};
