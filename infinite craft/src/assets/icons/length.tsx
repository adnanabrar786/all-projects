export const LengthIcon = ({ length }: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21L8 17L9.4 15.6L11 17.175V6.825L9.4 8.4L8 7L12 3L16 7L14.6 8.425L13 6.825V17.175L14.6 15.6L16 17L12 21Z"
        fill={`${length}`}
      />
    </svg>
  );
};
