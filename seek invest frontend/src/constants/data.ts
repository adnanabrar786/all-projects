import {
  ActiveHappy,
  ActiveNatural,
  ActiveSad,
  ActiveVeryHappy,
  ActiveVerySad,
  CheckCrossIcon,
  ClientSquareIcon,
  ClientsOutlinedIcon,
  CodeIcon,
  EmailIcon,
  FacebookIcon,
  FossilFuelIcon,
  Happy,
  HelpingHandIcon,
  LinkDarkExternalIcon,
  LinkedinIcon,
  MultiSelectIcon,
  Natural,
  OpenTextIcon,
  RatingScaleIcon,
  RocketBlackIcon,
  Sad,
  SingleSelectIcon,
  StemCellsIcon,
  TobaccoIcon,
  TwitterIcon,
  VeryHappy,
  VerySad,
  alcohol,
  barChart,
  circleLightGreyCheckboxIcon,
  codepen,
  downRedArrow,
  nuclearEnergy2,
  nuclearEnergy3,
  nuclearEnergy4,
  nuclearEnergy5,
  smile,
  upGreenArrow,
  wealth,
  zap,
} from "constants/images.routes";

import { EQuestionType } from "enums/assessment";
import {
  BONUSDATA,
  EPricePlan,
  FINANCIALGOAL,
  FINANCIALINHERITANCEITEM,
  RISKPERSONDATA,
} from "enums/enums";

import {
  FINANCIALCUSTOMEMOJIQUESTION,
  FINANCIALCUSTOMQUESTION,
  FINANCIALPREFERENCELIST,
} from "interfaces/assessment";
import { IClientUploadImageDrawerData } from "interfaces/common";

const { OPEN_TEXT, MULTI_CHOICE, RATING_SCALE, SINGLE_CHOICE, AGREE_DISAGREE } =
  EQuestionType;

export const addQuestionsType = [
  {
    title: "Agree or Disagree",
    icon: CheckCrossIcon,
    type: AGREE_DISAGREE,
  },
  {
    title: "Open Text",
    icon: OpenTextIcon,
    type: OPEN_TEXT,
  },
  {
    title: "Multiple Choice Single Select",
    icon: SingleSelectIcon,
    type: SINGLE_CHOICE,
  },
  {
    title: "Multiple Choice Multi Select",
    icon: MultiSelectIcon,
    type: MULTI_CHOICE,
  },
  {
    title: "Rating Scale",
    icon: RatingScaleIcon,
    type: RATING_SCALE,
  },
];

export const shareFHA = [
  {
    icon: RocketBlackIcon,
    primaryText: "Launch now",
    secText: "Click launch to open your assessment in a new tab",
    component: "launch",
  },
  {
    icon: ClientsOutlinedIcon,
    primaryText: "Send email",
    secText: "Send your assessment to your client or prospect via email",
    component: "clients",
  },
  {
    icon: LinkDarkExternalIcon,
    primaryText: "Share link",
    secText: "Send your assessment to your client or prospect via link",
    component: "shareLink",
  },
  {
    icon: CodeIcon,
    primaryText: "Embed link",
    secText: "Embed your assessment on your website or landing page",
    component: "embedLink",
  },
];

export const shareSocialIcons = [
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
];

export const clientsGroups = [
  {
    name: "High Value Clients",
    value: "15",
  },
  {
    name: "Mid Value Clients",
    value: "15",
  },
  {
    name: "Small Value Clients",
    value: "15",
  },
  {
    name: "Old Clients",
    value: "15",
  },
  {
    name: "Others",
    value: "15",
  },
];

export const clients = [
  {
    name: "Olivia Parker",
    email: "olivia@mail.com",
    id: "1",
  },
  {
    name: "Steve Edgar",
    email: "steveedgar@mail.com",
    id: "2",
  },
  {
    name: "Olivia Parker",
    email: "olivia@mail.com",
    id: "3",
  },
  {
    name: "Brace Will",
    email: "brace@mail.com",
    id: "4",
  },
  {
    name: "Olivia Parker",
    email: "olivia@mail.com",
    id: "5",
  },
];

export const proposalValuesProfile = [
  { name: "All Values", value: "4" },
  { name: "Embrace", value: "2" },
  { name: "Oppose and Engage", value: "2" },
];

export const riskProfile = [
  { name: "Overall", value: "Moderate" },
  { name: "Risk Need", value: "Low" },
  { name: "Risk Perception", value: "Moderate" },
  { name: "Risk Tolerance", value: "High" },
];

export const riskFeeRatioYield = [
  { name: "Advisory fee", value: "10%" },
  { name: "Expense Ratio", value: "5.4%" },
  { name: "Dividend Yield", value: "2.1%" },
];

export const compareGraphs = [
  {
    name: "Workforce Diversity",
    icon: ClientSquareIcon,
    value: 20,
    fillColor: "var(--green-medium)",
  },
  {
    name: "Ecosystem Preservation",
    icon: HelpingHandIcon,
    value: 30,
    fillColor: "var(--green-medium)",
  },
  {
    name: "Fossil Fuel",
    icon: FossilFuelIcon,
    value: 30,
    fillColor: "var(--mikado-yellow)",
  },
  {
    name: "Tobacco",
    icon: TobaccoIcon,
    value: 20,
    fillColor: "var(--mikado-yellow)",
  },
  {
    name: "Stem Cell Research",
    icon: StemCellsIcon,
    value: 10,
    fillColor: "var(--carnelian)",
  },
];

export const getProposalValueType = (type: string | null) => {
  switch (type) {
    case "overview":
      return [
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 30,
          fillColor: "var(--green-medium)",
        },
      ];

    default:
      return [
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 30,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "var(--mikado-yellow)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 30,
          fillColor: "var(--mikado-yellow)",
        },

        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "red",
        },
      ];
  }
};

export const getProposalDetailsValueType = (type: string | null) => {
  switch (type) {
    case "overview":
      return [
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 75,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 35,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 65,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 0,
          fillColor: "var(--green-medium)",
        },
      ];

    default:
      return [
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 30,
          fillColor: "var(--green-medium)",
        },
        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "var(--mikado-yellow)",
        },
        {
          name: "Ecosystem Preservation",
          icon: HelpingHandIcon,
          value: 30,
          fillColor: "var(--mikado-yellow)",
        },

        {
          name: "Workforce Diversity",
          icon: ClientSquareIcon,
          value: 20,
          fillColor: "red",
        },
      ];
  }
};

export const financialPreferenceList: FINANCIALPREFERENCELIST[] = [
  {
    category: "TABOO",
    topics: "Tobacco",
    icon: alcohol,
    bgColor: "var(--pink-medium-light)",
    score: 0,
  },
  {
    category: "ENERGY SOURCE",
    topics: "Fossil Fuel",
    icon: alcohol,
    bgColor: "var(--blue-light)",
    score: 0,
  },
  {
    category: "PLANET",
    topics: "Ecosystem Preservation",
    icon: alcohol,
    bgColor: "var(--green-medium)",
    score: 0,
  },
  {
    category: "Workforce Diversity",
    topics: "Workforce Diversity",
    icon: alcohol,
    bgColor: "var(--gray-400)",
    score: 0,
  },
  {
    category: "BiOETHICS AND RIGHTS",
    topics: "Stem Cell Research",
    icon: alcohol,
    bgColor: "var(--purple-medium-light)",
    score: 0,
  },
];

export const dataPricePlan = [
  {
    title: EPricePlan.MONTHLY,
    heading: "Pro plan",
    pricePara: "per seat per month",
    para: "All prices are in US dollars and exclude all form of taxes (US Sales or VAT)",
  },
  {
    title: EPricePlan.YEARLY,
    heading: "Pro plan",
    pricePara: "per seat per year",
    para: "All prices are in US dollars and exclude all form of taxes (US Sales or VAT)",
  },
];

export const financialCustomQuestion: FINANCIALCUSTOMQUESTION[] = [
  {
    id: 1,
    title: "1",
  },
  {
    id: 2,
    title: "2",
  },
  {
    id: 3,
    title: "3",
  },

  {
    id: 4,
    title: "4",
  },
  {
    id: 5,
    title: "5",
  },
];

export const financialCustomEmojiQuestion: FINANCIALCUSTOMEMOJIQUESTION[] = [
  {
    id: 1,
    img: VerySad,
    activeImg: ActiveVerySad,
    bgColor: "#FEF3F2",
  },
  {
    id: 2,
    img: Sad,
    activeImg: ActiveSad,
    bgColor: "#FFFAEB",
  },
  {
    id: 3,
    img: Natural,
    activeImg: ActiveNatural,
    bgColor: "var(--ghost-white)",
  },

  {
    id: 4,
    img: Happy,
    activeImg: ActiveHappy,
    bgColor: "#F0F9FF",
  },
  {
    id: 5,
    img: VeryHappy,
    activeImg: ActiveVeryHappy,
    bgColor: "#ECFDF3",
  },
];

export const financialGoal: FINANCIALGOAL[] = [
  {
    title: "Capital appreciation .",
    description: "I want to increase the value of my investment over time",
    icon: barChart,
  },
  {
    title: "Wealth preservation.",
    subTitle: "Yes! I’m conservative",
    description:
      "I want to preserve my wealth from erosion caused by inflation, market downturns, or economic uncertainties.",
    icon: wealth,
  },
  {
    title: "Generate income ",
    subTitle: "Make me more moolah!",
    description:
      "I want a consistent cash flow, such as dividend-paying stocks, bonds, rental properties, or income-focused funds.",
    icon: zap,
  },

  {
    title: "Diversification",
    subTitle: "Spread it all out",
    description:
      "I want to achieve a balance between risk and potential returns by allocating my investments across various categories.",
    icon: codepen,
  },

  {
    title: "Long term financial security",
    subTitle: "I’ll rather be patient.",
    description:
      "I want to focus on accumulating wealth and growing my investments over an extended period to secure my retirement, fund education expenses, or achieve specific financial milestones.",
    icon: smile,
  },
];

export const goalQuestion = [
  "I need to take extremely little to no financial risk to accomplish my goal",
  "I need to take a little financial risk to accomplish my goal",
  "I need to take a moderate amount of financial risk to accomplish my goal",
  "I need to take considerable financial risk to accomplish my goal",
];

export const financialInheritanceItem: FINANCIALINHERITANCEITEM[] = [
  {
    image: `${circleLightGreyCheckboxIcon}`,
    title: "A savings account or money market fund",
  },
  {
    image: `${circleLightGreyCheckboxIcon}`,
    title: "A mutual fund that holds stocks and bonds",
  },
  {
    image: `${circleLightGreyCheckboxIcon}`,
    title: "A portfolio of 15 common stocks",
  },
  {
    image: `${circleLightGreyCheckboxIcon}`,
    title: "Commodities like gold, silver and oil",
  },
];

export const financialRelativeData: FINANCIALINHERITANCEITEM[] = [
  {
    image: nuclearEnergy2,
    title: "A savings account or money market fund",
  },
  {
    image: nuclearEnergy3,
    title: "A mutual fund that holds stocks and bonds",
  },
  {
    image: nuclearEnergy4,
    title: "A portfolio of 15 common stocks",
  },
  {
    image: nuclearEnergy5,
    title: "Commodities like gold, silver and oil",
  },
];

export const bonusData: BONUSDATA[] = [
  {
    id: 0,
    items: [
      {
        title: "Best case",
        bonus: "$10,000",
        icon: upGreenArrow,
      },
      {
        title: "Average case",
        bonus: "$0",
      },
      {
        title: "Worst case",
        bonus: "$4,500",
        icon: downRedArrow,
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        title: "Best case",
        bonus: "$10,000",
        icon: upGreenArrow,
      },
      {
        title: "Average case",
        bonus: "$0",
      },
      {
        title: "Worst case",
        bonus: "$4,500",
        icon: downRedArrow,
      },
    ],
  },

  {
    id: 2,
    items: [
      {
        title: "Best case",
        bonus: "$10,000",
        icon: upGreenArrow,
      },
      {
        title: "Average case",
        bonus: "$0",
      },
      {
        title: "Worst case",
        bonus: "$4,500",
        icon: downRedArrow,
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        title: "Best case",
        bonus: "$10,000",
        icon: upGreenArrow,
      },
      {
        title: "Average case",
        bonus: "$0",
      },
      {
        title: "Worst case",
        bonus: "$4,500",
        icon: downRedArrow,
      },
    ],
  },
];

export const riskPersonData: RISKPERSONDATA[] = [
  {
    title: "Overall",
    status: "Moderate",
  },
  {
    title: "Risk Need",
    status: "Low",
  },
  {
    title: "Risk Perception",
    status: "Moderate",
  },
  {
    title: "Risk Tolerance",
    status: "High",
  },
];

export const clientUploadImageDrawerData: IClientUploadImageDrawerData[] = [
  {
    id: 0,
    name: "First name",
    subName: "FirstName",
    list: ["First name", "First name", "First name"],
  },
  {
    id: 1,
    name: "Last name",
    subName: "LastName",
    list: ["Last name", "Last name ", "Last name"],
  },
  {
    id: 2,
    name: "Email",
    subName: "Email",
    list: ["Email", "Email", "Email"],
  },
  {
    id: 3,
    name: "Phone number",
    subName: "Number",
    list: ["Number", "Number", "Number"],
  },
];
