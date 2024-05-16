import { ICategory } from "@/components/screens/create/create.interface";

export const typeAndCategories: ICategory[] = [
  {
    type: "Phisical item",
    categoryArr: [
      {
        type: "Transport",
        categoryArr: [
          {
            type: "Auto",
            categoryArr: [
              {
                type: "Running",
                categoryArr: [],
              },
              {
                type: "New",
                categoryArr: [],
              },
            ],
          },
          {
            type: "Bike",
            categoryArr: [
              {
                type: "Dune buggy",
                categoryArr: [],
              },
              {
                type: "Landrover",
                categoryArr: [],
              },
              {
                type: "ATVs",
                categoryArr: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "Digital art",
    categoryArr: [
      {
        type: "3D",
        categoryArr: [
          {
            type: "Nature",
            categoryArr: [
              {
                type: "Animate",
                categoryArr: [],
              },
              {
                type: "Static",
                categoryArr: [],
              },
            ],
          },
          {
            type: "Character",
            categoryArr: [
              {
                type: "From the game",
                categoryArr: [],
              },
              {
                type: "From the cartoon",
                categoryArr: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "Service",
    categoryArr: [
      {
        type: "Lawyer",
        categoryArr: [
          {
            type: "Civil Lawyer",
            categoryArr: [
              {
                type: "Inheritance",
                categoryArr: [],
              },
            ],
          },
          {
            type: "Сleaning master",
            categoryArr: [
              {
                type: "Office cleaning",
                categoryArr: [],
              },
              {
                type: "Сleaning of the apartment",
                categoryArr: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
