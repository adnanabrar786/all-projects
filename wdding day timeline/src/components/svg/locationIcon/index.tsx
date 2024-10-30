type Prop = {
  color: string;
};
export default function LocationIcon({ color }: Prop) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99219 12.9922C11.649 12.9922 12.9922 11.649 12.9922 9.99219C12.9922 8.33533 11.649 6.99219 9.99219 6.99219C8.33533 6.99219 6.99219 8.33533 6.99219 9.99219C6.99219 11.649 8.33533 12.9922 9.99219 12.9922Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
