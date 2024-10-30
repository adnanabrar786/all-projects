import { ETicker } from "enums/enums";

export const sortAndMoveCashToEnd = (array) => {
  array.sort((a, b) => {
    if (a.name === ETicker.$CASH) return 1; // "$CASH" goes to the end
    if (b.name === ETicker.$CASH) return -1; // "$CASH" goes to the end
    return 0; // No change for other elements
  });
};

export const sortAndMoveCashToEndTicker = (array) => {
  array.sort((a, b) => {
    if (a.ticker === ETicker.$CASH) return 1; // "$CASH" goes to the end
    if (b.ticker === ETicker.$CASH) return -1; // "$CASH" goes to the end
    return 0; // No change for other elements
  });
};
