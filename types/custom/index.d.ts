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

type  = "SMALL" | "MID-SIZED" | "VIP" | "WHOLESALE"

export type ProductInputArgs = {
  documentId: string;
  data: {
    name: string;
    description: string;
    odoo_product_id: string;
    product_catergory: string;
    vendor: string;
    collection: string[];
    tags: string[];
    specification: any[]
    price_list: {price: number; sale_price: number; min_quantity: number; max_quantity: number; user_level: UserLevel}[]
    inventory: {location: string; quantity: number}[]
    key_features: {feature: string}[]
    files: string[];
    images: string[];
  }
}

export type PaginationInputArgs = { limit: number; page: number; pageSize: number; start: number;}
export type SortInputArgs = string[]