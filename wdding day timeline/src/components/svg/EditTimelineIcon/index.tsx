type Prop = {
  color: string;
};

export default function EditTimelineIcon({ color }: Prop) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.84185 5.8125H3.33674C2.717 5.8125 2.12264 6.05869 1.68442 6.49692C1.24619 6.93514 1 7.5295 1 8.14924V18.6646C1 19.2843 1.24619 19.8787 1.68442 20.3169C2.12264 20.7551 2.717 21.0013 3.33674 21.0013H13.8521C14.4718 21.0013 15.0662 20.7551 15.5044 20.3169C15.9426 19.8787 16.1888 19.2843 16.1888 18.6646V15.1595"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.83594 15.1622H10.3411L20.2722 5.23105C20.737 4.76624 20.9981 4.13583 20.9981 3.47849C20.9981 2.82115 20.737 2.19074 20.2722 1.72593C19.8074 1.26113 19.177 1 18.5196 1C17.8623 1 17.2319 1.26113 16.7671 1.72593L6.83594 11.6571V15.1622Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0234 3.48438L18.5286 6.98949"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
