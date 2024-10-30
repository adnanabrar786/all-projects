type prop = {
  onClick: () => void;
};
export default function ShowIcon({ onClick }: prop) {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: "pointer" }}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="19" height="19" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_199_50" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_199_50"
          width="128"
          height="128"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAAXNSR0IB2cksfwAAAAlwSFlzAAADsQAAA7EB9YPtSQAAAsdQTFRFAAAAm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYm5iYd6q2JAAAAO10Uk5TAAmL2/G9PQzB//o8wrzwCr7YiAjEDQYcLzMuG1N+p87r6qZSCx1kqeOoYymA1NJ/KBJw0W8RNaP3orNNAcNVNLr4z4R1ZkdETmmhx/LFIqr+3pZWBFqY1wV49fy5bSYh/Tl72Q6s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"
        />
      </defs>
    </svg>
  );
}
