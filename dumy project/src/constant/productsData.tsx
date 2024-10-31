import { IProduct } from "@/api/interfaces/interfaces";

export const cartogoriesList: Array<{
  id: number;
  name: string;
  size: number;
}> = [
  {
    id: 0,
    name: "Hino",
    size: 10,
  },
  {
    id: 1,
    name: "Isuzu",
    size: 10,
  },
  {
    id: 2,
    name: "Nissan UD",
    size: 10,
  },
  {
    id: 3,
    name: "Mitsubishi",
    size: 10,
  },
  {
    id: 4,
    name: "Trailer & Universal Parts",
    size: 10,
  },
];

export const cartogoriesTypes: Array<{
  id: number;
  name: string;
  size: number;
}> = [
  {
    id: 0,
    name: "Plastic parts",
    size: 10,
  },
  {
    id: 1,
    name: "Cables",
    size: 10,
  },
  {
    id: 2,
    name: "Lights",
    size: 10,
  },
  {
    id: 3,
    name: "Matel parts",
    size: 10,
  },
  {
    id: 4,
    name: "Window Regulator & Handle",
    size: 10,
  },

  {
    id: 5,
    name: "Plastic parts 2",
    size: 10,
  },
  {
    id: 6,
    name: "Cables 2",
    size: 10,
  },
  {
    id: 7,
    name: "Lights 2",
    size: 10,
  },
  {
    id: 8,
    name: "Matel parts 2",
    size: 10,
  },

  {
    id: 9,
    name: "Window Regulator & Handle 2",
    size: 10,
  },
  {
    id: 10,
    name: "Plastic parts 3",
    size: 10,
  },
  {
    id: 11,
    name: "Cables 3",
    size: 10,
  },
  {
    id: 12,
    name: "Lights 3",
    size: 10,
  },
  {
    id: 13,
    name: "Matel parts 3",
    size: 10,
  },
  {
    id: 14,
    name: "Window Regulator & Handle 3",
    size: 10,
  },
];

export const products: IProduct[] = [
  {
    id: 0,
    name: "Lights",
    img: "/parts1.png",
    category: "Hino",
    type: "Lights",
  },
  {
    id: 1,
    name: "Door Locks & Hinges",
    img: "/parts1.png",
    category: "Trailer & Universal Parts",
    type: "Lights",
  },
  {
    id: 2,
    name: "Arm Rest & Door Sheet",
    img: "/parts1.png",
    category: "Trailer & Universal Parts",
    type: "Lights",
  },
  {
    id: 3,
    name: "Window Regulator & Handle",
    img: "/parts1.png",
    category: "Hino",
    type: "Lights",
  },
  {
    id: 4,
    name: "Type 5",
    img: "/parts1.png",
    category: "Trailer & Universal Parts",
    type: "Lights",
  },
  {
    id: 5,
    name: "Wiper",
    img: "/parts1.png",
    category: "Nissan UD",
    type: "Lights",
  },
  {
    id: 6,
    name: "Tanks",
    img: "/parts1.png",
    category: "Hino",
    type: "Lights",
  },
  {
    id: 7,
    name: "Others - Cabin",
    img: "/parts1.png",
    category: "Nissan UD",
    type: "Lights",
  },
  {
    id: 8,
    name: "Monogram",
    img: "/parts1.png",
    category: "Mitsubishi",
    type: "Lights",
  },

  {
    id: 9,
    name: "Outside & Inside Handle",
    img: "/parts1.png",
    category: "Isuzu",
    type: "Cables",
  },
  {
    id: 10,
    name: "Plastic Parts",
    img: "/parts1.png",
    category: "Hino",
    type: "Cables",
  },
  {
    id: 11,
    name: "Matel Parts",
    img: "/parts1.png",
    category: "Isuzu",
    type: "Cables",
  },

  {
    id: 12,
    name: "Wiper",
    img: "/parts1.png",
    category: "Mitsubishi",
    type: "Cables",
  },

  {
    id: 13,
    name: "Rubber",
    img: "/parts1.png",
    category: "Isuzu",
    type: "Cables",
  },
  {
    id: 14,
    name: "Tanks",
    img: "/parts1.png",
    category: "Hino",
    type: "Cables",
  },
  {
    id: 15,
    name: "Others - Cabin",
    img: "/parts1.png",
    category: "Hino",
    type: "Cables",
  },
];
