type Prop = {
  color: string;
};
export default function SubscriptionIcon({ color }: Prop) {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.0027 7.00106C16.0027 5.40948 15.3704 3.88309 14.245 2.75767C13.1196 1.63225 11.5932 1 10.0016 1C8.41001 1 6.88362 1.63225 5.7582 2.75767C4.63278 3.88309 4.00053 5.40948 4.00053 7.00106C4.00053 14.0023 1 16.0027 1 16.0027H19.0032C19.0032 16.0027 16.0027 14.0023 16.0027 7.00106Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7316 20.0034C11.5558 20.3065 11.3034 20.5582 10.9997 20.7331C10.696 20.908 10.3517 21.0001 10.0013 21.0001C9.65086 21.0001 9.30657 20.908 9.0029 20.7331C8.69923 20.5582 8.44684 20.3065 8.271 20.0034"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
