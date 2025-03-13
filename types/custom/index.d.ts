import type { Struct, Schema } from "@strapi/strapi";

export type RegisterUserInput = {
  email: string;
  username: string;
  password: string;
  businessName: string;
  businessNumber: string;
  userType: string;
  phone: string;
  street1: string;
  street2: string;
  state: string;
  city: string;
  country: string;
  zipCode: string;
};

type UserAccountDetails = {
  odooId: string;
  userPricingLevel: string;
};

export type UserApprovalRequestInput = {
  accountStatus: "APPROVED" | "DENIED" | "CREATE_APPROVED";
  odooUserId: string;
  userLevel: "SMALL" | "MID-SIZED" | "VIP";
  userType: string;
};

type = "SMALL" | "MID-SIZED" | "VIP" | "WHOLESALE";

export type ProductInputArgs = {
  documentId: string;
  data: {
    name: string;
    description: string;
    odoo_product_id: string;
    category: string;
    vendor: string;
    collection: string[];
    tags: string[];
    specification: any[];
    price_list: {
      price: number;
      sale_price: number;
      min_quantity: number;
      max_quantity: number;
      user_level: UserLevel;
    }[];
    inventory: { location: string; quantity: number }[];
    key_features: { feature: string }[];
    files: string[];
    images: string[];
  };
};

export type PaginationInputArgs = {
  limit: number;
  page: number;
  pageSize: number;
  start: number;
};
export type SortInputArgs = string[];
