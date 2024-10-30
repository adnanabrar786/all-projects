type Prop = {
  color: string;
};
export default function ShareTimelineIcon({ color }: Prop) {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9994 6.99883C17.6559 6.99883 18.9988 5.65594 18.9988 3.99941C18.9988 2.34288 17.6559 1 15.9994 1C14.3429 1 13 2.34288 13 3.99941C13 5.65594 14.3429 6.99883 15.9994 6.99883Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99941 13.9988C5.65594 13.9988 6.99883 12.6559 6.99883 10.9994C6.99883 9.34288 5.65594 8 3.99941 8C2.34288 8 1 9.34288 1 10.9994C1 12.6559 2.34288 13.9988 3.99941 13.9988Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9994 20.9988C17.6559 20.9988 18.9988 19.6559 18.9988 17.9994C18.9988 16.3429 17.6559 15 15.9994 15C14.3429 15 13 16.3429 13 17.9994C13 19.6559 14.3429 20.9988 15.9994 20.9988Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.58594 12.5078L13.4146 16.487"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4046 5.50781L6.58594 9.48703"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
