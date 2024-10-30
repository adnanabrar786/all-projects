import { USER_EMAIL_KEY } from 'constants/localStorage';
import LogRocket from 'logrocket';

const initializeLogRocket = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'app.weddingdaytimeline.com') {
    LogRocket.init('e5q0me/wedding-day-timeline');
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('_lr_id_');
      if (id) {
        const userId = JSON.parse(id);
        LogRocket.identify(userId.userID, {
          email: localStorage.getItem(USER_EMAIL_KEY) ?? '',
        });
      }
    }
  }
};

export default initializeLogRocket;
