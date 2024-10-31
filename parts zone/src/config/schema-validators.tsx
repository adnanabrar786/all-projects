import * as yup from "yup";

export const PRODUCTS_SCHEMA = () =>
  yup.object({
    name: yup.string().required("Required Name"),
    slug: yup.string().required("Required Slug"),
    status: yup.boolean().default(true),
    sequence: yup.number().required("Required Sequence"),
    code: yup.string().optional(),
    meta_keywords: yup.string().optional(),
    meta_description: yup.string().optional(),
    short_description: yup.string().optional(),
    long_description: yup.string().optional(),
  });

export const CATEGORIES_SCHEMA = () =>
  yup.object({
    name: yup.string().required("Required Name"),
    slug: yup.string().required("Required Slug"),
    status: yup.boolean().default(true),
    sequence: yup.number().required("Required Sequence"),
    short_description: yup.string().optional(),
    long_description: yup.string().optional(),
    picture: yup.string().optional(),
    meta_keywords: yup.string().optional(),
    meta_description: yup.string().optional(),
    parent_id: yup.number().optional(),
  });

export const CATEGORIES_PRODUCT_SCHEMA = () =>
  yup.object({
    sale_price: yup.number().optional(),
    purchase_price: yup.number().optional(),
    featured: yup.boolean().optional(),
    top_rated: yup.boolean().optional(),
    categories_id: yup.number(),
    products_id: yup.number(),
  });

export const OPTIONS_SCHEMA = () =>
  yup.object({
    value: yup.string().required("Required value"),
  });

export const PRODUCT_OPTIONS_SCHEMA = () =>
  yup.object({
    products_id: yup.number().required("Required products_id"),
    options_id: yup.number().required("Required options_id"),
  });

export const PRODUCT_IMAGES = () =>
  yup.object({
    url: yup.string().required("Required Image Url"),
    products_id: yup.number().required("Required ProductId"),
  });

export const SUBSCRIBERS_EMAIL = () =>
  yup.object({
    email: yup.string().email("Invalid email").required("Required Email"),
  });

export const CONTACT_US = () =>
  yup.object({
    first_name: yup.string().required("Required First Name"),
    last_name: yup.string().required("Required Last Name"),
    phone_no: yup.string().required("Required Phone Number"),
    company_name: yup.string().required("Required Company Name"),
    email: yup.string().email("Invalid Email").required("Required Email"),
    country: yup.string().required("Required Country"),
    message: yup.string().required("Required Message"),
  });
