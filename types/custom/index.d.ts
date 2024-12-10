import type { Struct, Schema } from "@strapi/strapi";

type UserAccountDetails = {
  odooId: string;
  userPricingLevel: "SMALL" | "MID-SIZED" | "VIP";
};
export type UserApprovalRequestInput = {
  data: {
    email: string;
    accountStatus: "REVIEWING" | "APPROVED" | "DENIED";
    user: UserAccountDetails;
  };
};

