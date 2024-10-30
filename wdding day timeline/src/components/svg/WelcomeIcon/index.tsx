type Prop = {
  color: string;
};

export default function WelcomeIcon({ color }: Prop) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1H3.2C1.98497 1 1 1.98497 1 3.2V20.8C1 22.015 1.98497 23 3.2 23H16.4C17.615 23 18.6 22.015 18.6 20.8V7.6L12 1Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 1V7.6H18.6" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.1999 13.0998H5.3999" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.1999 17.5002H5.3999" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.5999 8.6999H6.4999H5.3999"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
