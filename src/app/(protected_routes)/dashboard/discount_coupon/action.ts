import api from "@/src/hooks/useApi";
import { Coupon } from "@/src/types";

export const getAllCoupons = async (token: string) => {
  const response = await api.get("/coupons", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadDiscountCoupon = async (
  DiscountCouponDto: Coupon,
  token: string
) => {
  const response = await api.post("/coupons", DiscountCouponDto, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateDiscountCoupon = async (
  id: string,
  DiscountCouponDto: Coupon,
  token: string
) => {
  const response = await api.patch("/coupons/" + id, DiscountCouponDto, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteDiscountCoupon = async (id: string, token: string) => {
  const response = await api.delete("/coupons/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
