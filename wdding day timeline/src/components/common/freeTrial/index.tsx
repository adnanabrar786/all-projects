import { ButtonText } from 'utils/enums/text';

type Prop = {
  color: string;
  text: string;
  onClick: () => void;
  textColor: string;
};

export default function FreeTrialBanner({ color, text, onClick, textColor }: Prop) {
  return (
    <div
      className={`relative isolate flex items-center gap-x-6 overflow-hidden ${color} px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className={`text-sm leading-6 ${textColor}`}>{text}</p>
      </div>
      <div className="flex justify-end flex-1">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={onClick}>
          <span className="sr-only">{ButtonText.DISMISS}</span>
          <div className="w-3 h-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19" fill="none">
              <path
                d="M17 17.1792L1 1.1055M17 1.10547L1.00002 17.1792"
                stroke={textColor === 'text-black' ? 'black' : ' white'}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
