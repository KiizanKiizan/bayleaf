import { TAX } from "./Tax";

export const M_PLAN_IDS = {
  CASUAL: 1,
  BUSINESS: 3,
  LIGHT: 11,
  SRTANDARD: 12,
  PREMIUM: 13,
};

export type TPlanIds = typeof M_PLAN_IDS[keyof typeof M_PLAN_IDS];

export const UWEAR_PLAN_IDS = [
  M_PLAN_IDS.LIGHT,
  M_PLAN_IDS.SRTANDARD,
  M_PLAN_IDS.PREMIUM,
] as const;

export const LIGHT_PLAN = {
  id: M_PLAN_IDS.LIGHT,
  jpName: "ライト",
  enName: "light",
  price: {
    withTax: 6800 + 6800 * TAX,
    withoutTax: 6800,
  },
  coordinateNum: 1,
  itemNum: 3,
  topsNum: 2,
  bottomsNum: 1,
  description: "お試しではじめてみたい方",
  isJacketAvailable: false,
  point: 500,
} as const;

export const STANDARD_PLAN = {
  id: M_PLAN_IDS.SRTANDARD,
  jpName: "スタンダード",
  enName: "standard",
  price: {
    withTax: 9800 + 9800 * TAX,
    withoutTax: 9800,
  },
  coordinateNum: 1,
  itemNum: 4,
  topsNum: 2,
  bottomsNum: 1,
  description: "幅広いシーンで着たい方",
  isJacketAvailable: true,
  point: 1000,
};

export const PREMIUM_PLAN = {
  id: M_PLAN_IDS.PREMIUM,
  jpName: "プレミアム",
  enName: "premium",
  price: {
    withTax: 14800 + 14800 * TAX,
    withoutTax: 14800,
  },
  coordinateNum: 2,
  itemNum: 7,
  topsNum: 4,
  bottomsNum: 2,
  description: "お得にたくさん着回したい方",
  isJacketAvailable: true,
  point: 2000,
};

export const CASUAL_PLAN = {
  id: M_PLAN_IDS.CASUAL,
  jpName: "カジュアル",
  enName: "casual",
  price: {
    withTax: 7800 + 7800 * TAX,
    withoutTax: 7800,
  },
  coordinateNum: 1,
  itemNum: 4,
  topsNum: 3,
  bottomsNum: 1,
  description: "",
  isJacketAvailable: false,
  point: 500,
};

export const BUSINESS_PLAN = {
  id: M_PLAN_IDS.BUSINESS,
  jpName: "ジャケパン",
  enName: "business",
  price: {
    withTax: 13800 + 13800 * TAX,
    withoutTax: 13800,
  },
  coordinateNum: 1,
  itemNum: 4,
  topsNum: 3,
  bottomsNum: 1,
  description: "",
  isJacketAvailable: true,
  point: 1600,
};

export type TPlan =
  | typeof LIGHT_PLAN
  | typeof STANDARD_PLAN
  | typeof PREMIUM_PLAN
  | typeof CASUAL_PLAN
  | typeof BUSINESS_PLAN;

export const findPlanById = (planId: number): TPlan => {
  if (planId === LIGHT_PLAN.id) {
    return LIGHT_PLAN;
  }
  if (planId === STANDARD_PLAN.id) {
    return STANDARD_PLAN;
  }
  if (planId === PREMIUM_PLAN.id) {
    return PREMIUM_PLAN;
  }
  if (planId === CASUAL_PLAN.id) {
    return CASUAL_PLAN;
  }
  if (planId === BUSINESS_PLAN.id) {
    return BUSINESS_PLAN;
  }
  throw Error("存在しないプランです");
};
