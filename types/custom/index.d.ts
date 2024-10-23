import type { Struct, Schema } from '@strapi/strapi';

type UserAccountDetails = {
  odooId: string; 
  userPricingLevel: "SMALL" | "MID-SIZED" | "VIP"; 
}
export type UserApprovalRequestInput = {
  data: {
    email: string; 
    accountStatus: 'REVIEWING' | 'APPROVED' | "DENIED"; 
    role: 0 | 1 | 2;
    confirmed: boolean;
    user: UserAccountDetails
  }
}