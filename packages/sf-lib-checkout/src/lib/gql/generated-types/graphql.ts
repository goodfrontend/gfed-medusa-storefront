import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AddCustomerAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isDefaultBilling?: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultShipping?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type Address = {
  __typename?: 'Address';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type ApplicationMethod = {
  __typename?: 'ApplicationMethod';
  currencyCode: Scalars['String']['output'];
  type: ApplicationType;
  value: Scalars['String']['output'];
};

export enum ApplicationType {
  Fixed = 'fixed',
  Percentage = 'percentage',
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  customer?: Maybe<Customer>;
  token: Scalars['String']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Cart = {
  __typename?: 'Cart';
  billingAddress?: Maybe<Address>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  customerId?: Maybe<Scalars['String']['output']>;
  discountTotal: Scalars['Int']['output'];
  email?: Maybe<Scalars['String']['output']>;
  giftCardTotal: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  itemTotal: Scalars['Int']['output'];
  items?: Maybe<Array<LineItem>>;
  originalTotal: Scalars['Int']['output'];
  paymentCollection?: Maybe<PaymentCollection>;
  promoCodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  promotions: Array<Maybe<Promotion>>;
  region?: Maybe<Region>;
  regionId?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Address>;
  shippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  shippingTotal: Scalars['Int']['output'];
  subtotal: Scalars['Int']['output'];
  taxTotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  products?: Maybe<ProductList>;
  title: Scalars['String']['output'];
};

export type CompleteCartError = {
  __typename?: 'CompleteCartError';
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CompleteCartErrorResult = {
  __typename?: 'CompleteCartErrorResult';
  cart?: Maybe<Cart>;
  error?: Maybe<CompleteCartError>;
  type: Scalars['String']['output'];
};

export type CompleteCartOrderResult = {
  __typename?: 'CompleteCartOrderResult';
  order?: Maybe<Order>;
  type: Scalars['String']['output'];
};

export type CompleteCartResponse =
  | CompleteCartErrorResult
  | CompleteCartOrderResult;

export type Country = {
  __typename?: 'Country';
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  iso2?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateCartInput = {
  billingAddress?: InputMaybe<AddressInput>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<CreateLineItemInput>>;
  promoCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<AddressInput>;
};

export type CreateLineItemInput = {
  quantity: Scalars['Int']['input'];
  variantId: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  companyName?: Maybe<Scalars['String']['output']>;
  defaultBillingAddressId?: Maybe<Scalars['String']['output']>;
  defaultShippingAddressId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  addressName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isDefaultBilling?: Maybe<Scalars['Boolean']['output']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
};

export type DeleteCustomerAddressResult = {
  __typename?: 'DeleteCustomerAddressResult';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type Footer = {
  __typename?: 'Footer';
  _id: Scalars['ID']['output'];
  _type: Scalars['String']['output'];
  copyright?: Maybe<Scalars['String']['output']>;
  poweredByCta?: Maybe<PartialRichText>;
  social?: Maybe<Array<SocialLink>>;
  storeName?: Maybe<Scalars['String']['output']>;
};

export type LineItem = {
  __typename?: 'LineItem';
  cart?: Maybe<Cart>;
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  originalTotal?: Maybe<Scalars['Int']['output']>;
  productHandle?: Maybe<Scalars['String']['output']>;
  productTitle?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  requiresShipping?: Maybe<Scalars['Boolean']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  unitPrice?: Maybe<Scalars['Int']['output']>;
  variant?: Maybe<ProductVariant>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomerAddress: Customer;
  addShippingMethod?: Maybe<Cart>;
  applyPromotions?: Maybe<Cart>;
  calculateShippingOptionPrice?: Maybe<ShippingOption>;
  completeCart?: Maybe<CompleteCartResponse>;
  createCart?: Maybe<Cart>;
  createLineItem?: Maybe<Cart>;
  deleteCustomerAddress: DeleteCustomerAddressResult;
  deleteLineItem: StoreLineItemDeleteResponse;
  initiatePaymentSession?: Maybe<Cart>;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  register: AuthPayload;
  transferCart?: Maybe<Cart>;
  updateCart?: Maybe<Cart>;
  updateCustomer: Customer;
  updateCustomerAddress: Customer;
  updateLineItem?: Maybe<Cart>;
};

export type Mutation_AddCustomerAddressArgs = {
  input: AddCustomerAddressInput;
};

export type Mutation_AddShippingMethodArgs = {
  cartId: Scalars['ID']['input'];
  optionId: Scalars['ID']['input'];
};

export type Mutation_ApplyPromotionsArgs = {
  cartId: Scalars['ID']['input'];
  codes: Array<Scalars['String']['input']>;
};

export type Mutation_CalculateShippingOptionPriceArgs = {
  cartId: Scalars['ID']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
  optionId: Scalars['ID']['input'];
};

export type Mutation_CompleteCartArgs = {
  cartId: Scalars['ID']['input'];
};

export type Mutation_CreateCartArgs = {
  data: CreateCartInput;
};

export type Mutation_CreateLineItemArgs = {
  cartId: Scalars['ID']['input'];
  data: CreateLineItemInput;
};

export type Mutation_DeleteCustomerAddressArgs = {
  id: Scalars['ID']['input'];
};

export type Mutation_DeleteLineItemArgs = {
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
};

export type Mutation_InitiatePaymentSessionArgs = {
  cartId: Scalars['ID']['input'];
  providerId: Scalars['String']['input'];
};

export type Mutation_LoginArgs = {
  input: LoginInput;
};

export type Mutation_RegisterArgs = {
  input: RegisterCustomerInput;
};

export type Mutation_TransferCartArgs = {
  cartId: Scalars['ID']['input'];
};

export type Mutation_UpdateCartArgs = {
  data: UpdateCartInput;
  id: Scalars['ID']['input'];
};

export type Mutation_UpdateCustomerArgs = {
  input: UpdateCustomerInput;
};

export type Mutation_UpdateCustomerAddressArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCustomerAddressInput;
};

export type Mutation_UpdateLineItemArgs = {
  cartId: Scalars['ID']['input'];
  data: UpdateLineItemInput;
  lineItemId: Scalars['ID']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  currencyCode: Scalars['String']['output'];
  customerId: Scalars['String']['output'];
  discountTotal?: Maybe<Scalars['Int']['output']>;
  displayId?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  fulfillmentStatus: Scalars['String']['output'];
  giftCardTotal?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items: Array<LineItem>;
  paymentCollections?: Maybe<Array<Maybe<PaymentCollection>>>;
  paymentStatus: Scalars['String']['output'];
  regionId: Scalars['String']['output'];
  shippingAddress?: Maybe<Address>;
  shippingMethods: Array<ShippingMethod>;
  shippingTotal?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  subtotal?: Maybe<Scalars['Int']['output']>;
  taxTotal?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type PartialRichText = {
  __typename?: 'PartialRichText';
  text?: Maybe<Scalars['JSON']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
};

export type PaymentCollection = {
  __typename?: 'PaymentCollection';
  amount: Scalars['Int']['output'];
  currencyCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paymentProviders: Array<Maybe<PaymentProviders>>;
  paymentSessions?: Maybe<Array<Maybe<PaymentSessions>>>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  status: PaymentStatus;
};

export type PaymentProviders = {
  __typename?: 'PaymentProviders';
  id: Scalars['String']['output'];
};

export enum PaymentSessionStatus {
  Authorized = 'authorized',
  Canceled = 'canceled',
  Captured = 'captured',
  Error = 'error',
  Pending = 'pending',
  RequiresMore = 'requires_more',
}

export type PaymentSessions = {
  __typename?: 'PaymentSessions';
  amount: Scalars['Int']['output'];
  currencyCode: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
  status: PaymentSessionStatus;
};

export enum PaymentStatus {
  Authorized = 'authorized',
  Awaiting = 'awaiting',
  Canceled = 'canceled',
  NotPaid = 'not_paid',
  PartiallyAuthorized = 'partially_authorized',
}

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  priceType?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  collection?: Maybe<Collection>;
  collectionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  length?: Maybe<Scalars['Float']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<ProductOption>>;
  originCountry?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<ProductTag>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<ProductVariant>>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  categoryChildren?: Maybe<Array<ProductCategory>>;
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentCategory?: Maybe<ProductCategory>;
  products?: Maybe<ProductList>;
};

export type ProductHit = {
  __typename?: 'ProductHit';
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type ProductList = {
  __typename?: 'ProductList';
  count: Scalars['Int']['output'];
  items?: Maybe<Array<Product>>;
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  count: Scalars['Int']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  values: Array<ProductOptionValue>;
};

export type ProductOptionValue = {
  __typename?: 'ProductOptionValue';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type ProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['ID']['output'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  allowBackorder?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inventoryQuantity?: Maybe<Scalars['Int']['output']>;
  manageInventory?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Maybe<ProductVariantOption>>>;
  originalPrice?: Maybe<Price>;
  price?: Maybe<Price>;
  product?: Maybe<Product>;
  sku?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantOption = {
  __typename?: 'ProductVariantOption';
  id: Scalars['ID']['output'];
  optionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  applicationMethod?: Maybe<ApplicationMethod>;
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isAutomatic?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  cart?: Maybe<Cart>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  footer?: Maybe<Footer>;
  me?: Maybe<Customer>;
  paymentProviders: Array<PaymentProviders>;
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productCategory?: Maybe<ProductCategory>;
  products: ProductListResponse;
  region?: Maybe<Region>;
  regions: Array<Region>;
  searchProducts: SearchProducts;
  shippingOptions?: Maybe<Array<Maybe<ShippingOption>>>;
};

export type Query_CartArgs = {
  id: Scalars['ID']['input'];
};

export type Query_CollectionArgs = {
  id: Scalars['ID']['input'];
};

export type Query_CollectionsArgs = {
  handle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Query_PaymentProvidersArgs = {
  regionId: Scalars['ID']['input'];
};

export type Query_ProductArgs = {
  id: Scalars['ID']['input'];
  region_id?: InputMaybe<Scalars['String']['input']>;
};

export type Query_ProductCategoriesArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  include_descendants_tree?: InputMaybe<Scalars['Boolean']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_internal?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  parent_category_id?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type Query_ProductCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type Query_ProductsArgs = {
  category_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  collection_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  is_giftcard?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  tag_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query_RegionArgs = {
  id: Scalars['ID']['input'];
};

export type Query_SearchProductsArgs = {
  facets?: InputMaybe<Array<Scalars['String']['input']>>;
  filters?: InputMaybe<Scalars['String']['input']>;
  hitsPerPage?: InputMaybe<Scalars['Int']['input']>;
  indexName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type Query_ShippingOptionsArgs = {
  cartId: Scalars['ID']['input'];
};

export type Region = {
  __typename?: 'Region';
  countries?: Maybe<Array<Maybe<Country>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RegisterCustomerInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SearchProducts = {
  __typename?: 'SearchProducts';
  hitsPerPage: Scalars['Int']['output'];
  items: Array<ProductHit>;
  page: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  query: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ServiceZone = {
  __typename?: 'ServiceZone';
  fulfillmentSetType?: Maybe<Scalars['String']['output']>;
  location?: Maybe<ServiceZoneLocation>;
};

export type ServiceZoneLocation = {
  __typename?: 'ServiceZoneLocation';
  address?: Maybe<ServiceZoneLocationAddress>;
};

export type ServiceZoneLocationAddress = {
  __typename?: 'ServiceZoneLocationAddress';
  address1?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  amount: Scalars['Int']['output'];
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shippingOptionId?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ShippingOption = {
  __typename?: 'ShippingOption';
  amount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  insufficientInventory?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  priceType: Scalars['String']['output'];
  serviceZone?: Maybe<ServiceZone>;
  serviceZoneId?: Maybe<Scalars['String']['output']>;
};

export type SocialLink = {
  __typename?: 'SocialLink';
  text: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type StoreLineItemDeleteResponse = {
  __typename?: 'StoreLineItemDeleteResponse';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  object?: Maybe<Scalars['String']['output']>;
};

export type UpdateCartInput = {
  billingAddress?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  promoCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<AddressInput>;
};

export type UpdateCustomerAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLineItemInput = {
  quantity: Scalars['Int']['input'];
};

export type CartItemFieldsFragment = {
  __typename?: 'LineItem';
  id: string;
  title?: string | null;
  quantity: number;
  unitPrice?: number | null;
  createdAt?: any | null;
  thumbnail?: string | null;
  productHandle?: string | null;
  productTitle?: string | null;
  total?: number | null;
  originalTotal?: number | null;
  variant?: ({ __typename?: 'ProductVariant' } & ProductVariantFragment) | null;
};

export type AddressFieldsFragment = {
  __typename?: 'Address';
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address1?: string | null;
  city?: string | null;
  countryCode?: string | null;
  postalCode?: string | null;
};

export type ShippingMethodFieldsFragment = {
  __typename?: 'ShippingMethod';
  id: string;
  cartId?: string | null;
  name: string;
  amount: number;
  shippingOptionId?: string | null;
  createdAt?: any | null;
  total?: number | null;
};

export type PaymentCollectionFieldsFragment = {
  __typename?: 'PaymentCollection';
  id: string;
  currencyCode: string;
  amount: number;
  status: PaymentStatus;
  paymentProviders: Array<{
    __typename?: 'PaymentProviders';
    id: string;
  } | null>;
  paymentSessions?: Array<{
    __typename?: 'PaymentSessions';
    id: string;
    amount: number;
    currencyCode: string;
    providerId: string;
    data: any;
    status: PaymentSessionStatus;
  } | null> | null;
};

export type CountryFieldsFragment = {
  __typename?: 'Country';
  id?: string | null;
  iso2?: string | null;
  name?: string | null;
  displayName?: string | null;
};

export type RegionFieldsFragment = {
  __typename?: 'Region';
  id: string;
  name: string;
  currencyCode: string;
  createdAt?: any | null;
  countries?: Array<
    ({ __typename?: 'Country' } & CountryFieldsFragment) | null
  > | null;
};

export type PromotionFieldsFragment = {
  __typename?: 'Promotion';
  id: string;
  code?: string | null;
  applicationMethod?: {
    __typename?: 'ApplicationMethod';
    value: string;
    type: ApplicationType;
    currencyCode: string;
  } | null;
};

export type CartFieldsFragment = {
  __typename?: 'Cart';
  id: string;
  customerId?: string | null;
  regionId?: string | null;
  email?: string | null;
  total: number;
  subtotal: number;
  taxTotal: number;
  itemTotal: number;
  discountTotal: number;
  originalTotal: number;
  currencyCode: string;
  shippingTotal: number;
  giftCardTotal: number;
  promotions: Array<
    ({ __typename?: 'Promotion' } & PromotionFieldsFragment) | null
  >;
  items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  shippingAddress?: ({ __typename?: 'Address' } & AddressFieldsFragment) | null;
  billingAddress?: ({ __typename?: 'Address' } & AddressFieldsFragment) | null;
  region?: ({ __typename?: 'Region' } & RegionFieldsFragment) | null;
  shippingMethods?: Array<
    ({ __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment) | null
  > | null;
  paymentCollection?:
    | ({ __typename?: 'PaymentCollection' } & PaymentCollectionFieldsFragment)
    | null;
};

export type ProductImageFragment = {
  __typename?: 'ProductImage';
  id: string;
  url: string;
};

export type ProductTagFragment = { __typename?: 'ProductTag'; id: string };

export type ProductOptionFragment = {
  __typename?: 'ProductOption';
  id: string;
  title: string;
  values: Array<{
    __typename?: 'ProductOptionValue';
    id: string;
    value: string;
  }>;
};

export type PriceFragment = {
  __typename?: 'Price';
  amount?: number | null;
  currencyCode?: string | null;
  priceType?: string | null;
};

export type ProductVariantFragment = {
  __typename?: 'ProductVariant';
  id: string;
  sku?: string | null;
  inventoryQuantity?: number | null;
  allowBackorder?: boolean | null;
  manageInventory?: boolean | null;
  title?: string | null;
  options?: Array<{
    __typename?: 'ProductVariantOption';
    id: string;
    optionId: string;
    value: string;
  } | null> | null;
  price?: ({ __typename?: 'Price' } & PriceFragment) | null;
  originalPrice?: ({ __typename?: 'Price' } & PriceFragment) | null;
};

export type ProductCategoryFragment = {
  __typename?: 'ProductCategory';
  id: string;
  name: string;
  description?: string | null;
  handle: string;
};

export type ProductCollectionFragment = {
  __typename?: 'Collection';
  id: string;
  title: string;
  handle: string;
};

export type ProductFragment = {
  __typename?: 'Product';
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  width?: number | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  originCountry?: string | null;
  material?: string | null;
  type?: string | null;
  collectionId?: string | null;
  createdAt: any;
  images?: Array<{ __typename?: 'ProductImage' } & ProductImageFragment> | null;
  tags?: Array<{ __typename?: 'ProductTag' } & ProductTagFragment> | null;
  options?: Array<
    { __typename?: 'ProductOption' } & ProductOptionFragment
  > | null;
  variants?: Array<
    { __typename?: 'ProductVariant' } & ProductVariantFragment
  > | null;
  collection?:
    | ({ __typename?: 'Collection' } & ProductCollectionFragment)
    | null;
};

export type CollectionProductsFragment = {
  __typename?: 'ProductList';
  count: number;
  items?: Array<{
    __typename?: 'Product';
    id: string;
    title: string;
    handle: string;
    thumbnail?: string | null;
    images?: Array<
      { __typename?: 'ProductImage' } & ProductImageFragment
    > | null;
    variants?: Array<{
      __typename?: 'ProductVariant';
      price?: ({ __typename?: 'Price' } & PriceFragment) | null;
      originalPrice?: ({ __typename?: 'Price' } & PriceFragment) | null;
    }> | null;
  }> | null;
};

export type ProductHitFragment = {
  __typename?: 'ProductHit';
  id: string;
  title?: string | null;
  description?: string | null;
  handle: string;
  thumbnail?: string | null;
};

export type CreateCartMutationVariables = Exact<{
  data: CreateCartInput;
}>;

export type CreateCartMutation = {
  __typename?: 'Mutation';
  createCart?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type UpdateCartMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateCartInput;
}>;

export type UpdateCartMutation = {
  __typename?: 'Mutation';
  updateCart?:
    | ({
        __typename?: 'Cart';
        regionId?: string | null;
        currencyCode: string;
        shippingAddress?:
          | ({ __typename?: 'Address' } & AddressFieldsFragment)
          | null;
        billingAddress?:
          | ({ __typename?: 'Address' } & AddressFieldsFragment)
          | null;
      } & CartFieldsFragment)
    | null;
};

export type CreateLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  data: CreateLineItemInput;
}>;

export type CreateLineItemMutation = {
  __typename?: 'Mutation';
  createLineItem?: {
    __typename?: 'Cart';
    id: string;
    total: number;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  } | null;
};

export type UpdateLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
  data: UpdateLineItemInput;
}>;

export type UpdateLineItemMutation = {
  __typename?: 'Mutation';
  updateLineItem?: {
    __typename?: 'Cart';
    id: string;
    total: number;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  } | null;
};

export type DeleteLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
}>;

export type DeleteLineItemMutation = {
  __typename?: 'Mutation';
  deleteLineItem: {
    __typename?: 'StoreLineItemDeleteResponse';
    id: string;
    object?: string | null;
    deleted: boolean;
  };
};

export type AddShippingMethodMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  optionId: Scalars['ID']['input'];
}>;

export type AddShippingMethodMutation = {
  __typename?: 'Mutation';
  addShippingMethod?: {
    __typename?: 'Cart';
    id: string;
    total: number;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
    shippingMethods?: Array<
      ({ __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment) | null
    > | null;
  } | null;
};

export type CompleteCartMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
}>;

export type CompleteCartMutation = {
  __typename?: 'Mutation';
  completeCart?:
    | {
        __typename: 'CompleteCartErrorResult';
        type: string;
        error?: {
          __typename?: 'CompleteCartError';
          message: string;
          name: string;
          type: string;
        } | null;
        cart?: {
          __typename?: 'Cart';
          id: string;
          total: number;
          items?: Array<
            { __typename?: 'LineItem' } & CartItemFieldsFragment
          > | null;
        } | null;
      }
    | {
        __typename: 'CompleteCartOrderResult';
        type: string;
        order?: {
          __typename?: 'Order';
          id: string;
          email: string;
          status: string;
          total: number;
          createdAt: any;
          currencyCode: string;
          customerId: string;
          fulfillmentStatus: string;
          displayId?: number | null;
          subtotal?: number | null;
          discountTotal?: number | null;
          giftCardTotal?: number | null;
          shippingTotal?: number | null;
          taxTotal?: number | null;
          paymentCollections?: Array<
            | ({
                __typename?: 'PaymentCollection';
              } & PaymentCollectionFieldsFragment)
            | null
          > | null;
          items: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment>;
          shippingMethods: Array<
            { __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment
          >;
          shippingAddress?:
            | ({ __typename?: 'Address' } & AddressFieldsFragment)
            | null;
        } | null;
      }
    | null;
};

export type TransferCartMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
}>;

export type TransferCartMutation = {
  __typename?: 'Mutation';
  transferCart?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type ApplyPromotionsMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  codes: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export type ApplyPromotionsMutation = {
  __typename?: 'Mutation';
  applyPromotions?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type CalculateShippingOptionPriceMutationVariables = Exact<{
  optionId: Scalars['ID']['input'];
  cartId: Scalars['ID']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type CalculateShippingOptionPriceMutation = {
  __typename?: 'Mutation';
  calculateShippingOptionPrice?:
    | ({ __typename?: 'ShippingOption' } & ShippingOptionFieldsFragment)
    | null;
};

export type InitiatePaymentSessionMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  providerId: Scalars['String']['input'];
}>;

export type InitiatePaymentSessionMutation = {
  __typename?: 'Mutation';
  initiatePaymentSession?:
    | ({ __typename?: 'Cart' } & CartFieldsFragment)
    | null;
};

export type GetCartQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCartQuery = {
  __typename?: 'Query';
  cart?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type ShippingOptionFieldsFragment = {
  __typename?: 'ShippingOption';
  id: string;
  name: string;
  priceType: string;
  amount?: number | null;
  serviceZoneId?: string | null;
  insufficientInventory?: boolean | null;
  serviceZone?: {
    __typename?: 'ServiceZone';
    fulfillmentSetType?: string | null;
    location?: {
      __typename?: 'ServiceZoneLocation';
      address?: {
        __typename?: 'ServiceZoneLocationAddress';
        city?: string | null;
        countryCode?: string | null;
        address1?: string | null;
        postalCode?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetShippingOptionsQueryVariables = Exact<{
  cartId: Scalars['ID']['input'];
}>;

export type GetShippingOptionsQuery = {
  __typename?: 'Query';
  shippingOptions?: Array<
    ({ __typename?: 'ShippingOption' } & ShippingOptionFieldsFragment) | null
  > | null;
};

export type GetPaymentProvidersQueryVariables = Exact<{
  regionId: Scalars['ID']['input'];
}>;

export type GetPaymentProvidersQuery = {
  __typename?: 'Query';
  paymentProviders: Array<{ __typename?: 'PaymentProviders'; id: string }>;
};

export const PromotionFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PromotionFieldsFragment, unknown>;
export const PriceFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PriceFragment, unknown>;
export const ProductVariantFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductVariantFragment, unknown>;
export const CartItemFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CartItemFieldsFragment, unknown>;
export const AddressFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddressFieldsFragment, unknown>;
export const CountryFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CountryFieldsFragment, unknown>;
export const RegionFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegionFieldsFragment, unknown>;
export const ShippingMethodFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShippingMethodFieldsFragment, unknown>;
export const PaymentCollectionFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentCollectionFieldsFragment, unknown>;
export const CartFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CartFieldsFragment, unknown>;
export const ProductCategoryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCategory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductCategory' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductCategoryFragment, unknown>;
export const ProductImageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductImageFragment, unknown>;
export const ProductTagFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
  ],
} as unknown as DocumentNode<ProductTagFragment, unknown>;
export const ProductOptionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductOptionFragment, unknown>;
export const ProductCollectionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductCollectionFragment, unknown>;
export const ProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
          { kind: 'Field', name: { kind: 'Name', value: 'length' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originCountry' } },
          { kind: 'Field', name: { kind: 'Name', value: 'material' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'images' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductImage' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductTag' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductOption' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductFragment, unknown>;
export const CollectionProductsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CollectionProducts' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductList' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'originalPrice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectionProductsFragment, unknown>;
export const ProductHitFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductHit' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductHit' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductHitFragment, unknown>;
export const ShippingOptionFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingOptionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'serviceZoneId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insufficientInventory' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceZone' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fulfillmentSetType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'countryCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShippingOptionFieldsFragment, unknown>;
export const CreateCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCartInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCartMutation, CreateCartMutationVariables>;
export const UpdateCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateCartInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingAddress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AddressFields' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingAddress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AddressFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCartMutation, UpdateCartMutationVariables>;
export const CreateLineItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateLineItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateLineItemInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createLineItem' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CartItemFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateLineItemMutation,
  CreateLineItemMutationVariables
>;
export const UpdateLineItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateLineItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lineItemId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateLineItemInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateLineItem' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lineItemId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'lineItemId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CartItemFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateLineItemMutation,
  UpdateLineItemMutationVariables
>;
export const DeleteLineItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteLineItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lineItemId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteLineItem' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lineItemId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'lineItemId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'object' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteLineItemMutation,
  DeleteLineItemMutationVariables
>;
export const AddShippingMethodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddShippingMethod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'optionId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addShippingMethod' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'optionId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'optionId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CartItemFields' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingMethods' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ShippingMethodFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddShippingMethodMutation,
  AddShippingMethodMutationVariables
>;
export const CompleteCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CompleteCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completeCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CompleteCartOrderResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'order' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currencyCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerId' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'fulfillmentStatus',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'displayId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'subtotal' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'discountTotal' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'giftCardTotal' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shippingTotal' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxTotal' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'paymentCollections',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'PaymentCollectionFields',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'CartItemFields',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shippingMethods' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'ShippingMethodFields',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shippingAddress' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'AddressFields',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CompleteCartErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'error' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'message' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cart' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'CartItemFields',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CompleteCartMutation,
  CompleteCartMutationVariables
>;
export const TransferCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TransferCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transferCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TransferCartMutation,
  TransferCartMutationVariables
>;
export const ApplyPromotionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ApplyPromotions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'codes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'String' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applyPromotions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'codes' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'codes' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ApplyPromotionsMutation,
  ApplyPromotionsMutationVariables
>;
export const CalculateShippingOptionPriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CalculateShippingOptionPrice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'optionId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'JSON' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'calculateShippingOptionPrice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'optionId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'optionId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingOptionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingOptionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'serviceZoneId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insufficientInventory' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceZone' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fulfillmentSetType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'countryCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CalculateShippingOptionPriceMutation,
  CalculateShippingOptionPriceMutationVariables
>;
export const InitiatePaymentSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InitiatePaymentSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'providerId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'initiatePaymentSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'providerId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'providerId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InitiatePaymentSessionMutation,
  InitiatePaymentSessionMutationVariables
>;
export const GetCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'LineItem' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productHandle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'productTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variant' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Address' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingMethodFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingMethod' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cartId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingOptionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentCollectionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaymentCollection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSessions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'providerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Country' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iso2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Region' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CountryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PromotionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Promotion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Cart' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originalTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PromotionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CartItemFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingAddress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RegionFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingMethodFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PaymentCollectionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const GetShippingOptionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetShippingOptions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cartId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingOptions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cartId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cartId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ShippingOptionFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShippingOptionFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ShippingOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'serviceZoneId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insufficientInventory' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceZone' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fulfillmentSetType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'countryCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetShippingOptionsQuery,
  GetShippingOptionsQueryVariables
>;
export const GetPaymentProvidersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPaymentProviders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'regionId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentProviders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'regionId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'regionId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPaymentProvidersQuery,
  GetPaymentProvidersQueryVariables
>;
