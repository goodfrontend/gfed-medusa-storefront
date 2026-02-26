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

export type CalculatedShippingOptionPrice = {
  __typename?: 'CalculatedShippingOptionPrice';
  amount?: Maybe<Scalars['Int']['output']>;
};

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
  acceptOrderTransfer?: Maybe<OrderTransferResult>;
  addCustomerAddress: Customer;
  addShippingMethod?: Maybe<Cart>;
  applyPromotions?: Maybe<Cart>;
  calculateShippingOptionPrice?: Maybe<ShippingOption>;
  completeCart?: Maybe<CompleteCartResponse>;
  createCart?: Maybe<Cart>;
  createLineItem?: Maybe<Cart>;
  declineOrderTransfer?: Maybe<OrderTransferResult>;
  deleteCustomerAddress: DeleteCustomerAddressResult;
  deleteLineItem: StoreLineItemDeleteResponse;
  initiatePaymentSession?: Maybe<Cart>;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  register: AuthPayload;
  requestOrderTransfer?: Maybe<OrderTransferResult>;
  transferCart?: Maybe<Cart>;
  updateCart?: Maybe<Cart>;
  updateCustomer: Customer;
  updateCustomerAddress: Customer;
  updateLineItem?: Maybe<Cart>;
};

export type Mutation_AcceptOrderTransferArgs = {
  orderId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
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

export type Mutation_DeclineOrderTransferArgs = {
  orderId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
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

export type Mutation_RequestOrderTransferArgs = {
  orderId: Scalars['ID']['input'];
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

export type OrderListResponse = {
  __typename?: 'OrderListResponse';
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  orders: Array<Order>;
};

export type OrderTransferData = {
  __typename?: 'OrderTransferData';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type OrderTransferResult = {
  __typename?: 'OrderTransferResult';
  error?: Maybe<Scalars['String']['output']>;
  order?: Maybe<OrderTransferData>;
  success: Scalars['Boolean']['output'];
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
  Captured = 'captured',
  Completed = 'completed',
  NotPaid = 'not_paid',
  NotStarted = 'not_started',
  PartiallyAuthorized = 'partially_authorized',
  PartiallyCaptured = 'partially_captured',
  PartiallyRefunded = 'partially_refunded',
  Refunded = 'refunded',
  RequiresAction = 'requires_action',
  Voided = 'voided',
}

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  priceType?: Maybe<Scalars['String']['output']>;
};

export type PriceRule = {
  __typename?: 'PriceRule';
  attribute: Scalars['String']['output'];
  operator: Scalars['String']['output'];
  value: Scalars['String']['output'];
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
  order?: Maybe<Order>;
  orders?: Maybe<OrderListResponse>;
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

export type Query_OrderArgs = {
  id: Scalars['ID']['input'];
};

export type Query_OrdersArgs = {
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
  calculatedPrice?: Maybe<CalculatedShippingOptionPrice>;
  id: Scalars['ID']['output'];
  insufficientInventory?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  priceType: Scalars['String']['output'];
  prices?: Maybe<Array<Maybe<ShippingOptionPrice>>>;
  serviceZone?: Maybe<ServiceZone>;
  serviceZoneId?: Maybe<Scalars['String']['output']>;
};

export type ShippingOptionPrice = {
  __typename?: 'ShippingOptionPrice';
  amount?: Maybe<Scalars['Int']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  priceRules?: Maybe<Array<Maybe<PriceRule>>>;
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

export type CustomerAddressFragment = {
  __typename?: 'CustomerAddress';
  id: string;
  addressName?: string | null;
  isDefaultShipping?: boolean | null;
  isDefaultBilling?: boolean | null;
  customerId?: string | null;
  company?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  countryCode?: string | null;
  province?: string | null;
  postalCode?: string | null;
  phone?: string | null;
};

export type CustomerFragment = {
  __typename?: 'Customer';
  id: string;
  email?: string | null;
  defaultBillingAddressId?: string | null;
  defaultShippingAddressId?: string | null;
  companyName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  addresses?: Array<
    ({ __typename?: 'CustomerAddress' } & CustomerAddressFragment) | null
  > | null;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthPayload';
    token: string;
    customer?: {
      __typename?: 'Customer';
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
    } | null;
  };
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthPayload';
    token: string;
    customer?: {
      __typename?: 'Customer';
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;

export type UpdateCustomerMutation = {
  __typename?: 'Mutation';
  updateCustomer: {
    __typename?: 'Customer';
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  };
};

export type AddCustomerAddressMutationVariables = Exact<{
  input: AddCustomerAddressInput;
}>;

export type AddCustomerAddressMutation = {
  __typename?: 'Mutation';
  addCustomerAddress: {
    __typename?: 'Customer';
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  };
};

export type UpdateCustomerAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCustomerAddressInput;
}>;

export type UpdateCustomerAddressMutation = {
  __typename?: 'Mutation';
  updateCustomerAddress: {
    __typename?: 'Customer';
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  };
};

export type DeleteCustomerAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteCustomerAddressMutation = {
  __typename?: 'Mutation';
  deleteCustomerAddress: {
    __typename?: 'DeleteCustomerAddressResult';
    id: string;
    deleted: boolean;
  };
};

export type RequestOrderTransferMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type RequestOrderTransferMutation = {
  __typename?: 'Mutation';
  requestOrderTransfer?: {
    __typename?: 'OrderTransferResult';
    success: boolean;
    error?: string | null;
    order?: {
      __typename?: 'OrderTransferData';
      id: string;
      email: string;
    } | null;
  } | null;
};

export type GetCustomerQueryVariables = Exact<{ [key: string]: never }>;

export type GetCustomerQuery = {
  __typename?: 'Query';
  me?: ({ __typename?: 'Customer' } & CustomerFragment) | null;
};

export type OrderFieldsFragment = {
  __typename?: 'Order';
  id: string;
  displayId?: number | null;
  email: string;
  customerId: string;
  regionId: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  currencyCode: string;
  total: number;
  subtotal?: number | null;
  discountTotal?: number | null;
  giftCardTotal?: number | null;
  shippingTotal?: number | null;
  taxTotal?: number | null;
  createdAt: any;
  items: Array<{
    __typename?: 'LineItem';
    id: string;
    title?: string | null;
    quantity: number;
    unitPrice?: number | null;
    total?: number | null;
    originalTotal?: number | null;
    thumbnail?: string | null;
    productHandle?: string | null;
    productTitle?: string | null;
    variant?: {
      __typename?: 'ProductVariant';
      id: string;
      title?: string | null;
      sku?: string | null;
      product?: {
        __typename?: 'Product';
        id: string;
        title: string;
        handle: string;
        thumbnail?: string | null;
        createdAt: any;
      } | null;
    } | null;
  }>;
  shippingMethods: Array<{
    __typename?: 'ShippingMethod';
    id: string;
    name: string;
    amount: number;
    shippingOptionId?: string | null;
  }>;
  shippingAddress?: {
    __typename?: 'Address';
    firstName?: string | null;
    lastName?: string | null;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    phone?: string | null;
  } | null;
  paymentCollections?: Array<{
    __typename?: 'PaymentCollection';
    id: string;
    currencyCode: string;
    amount: number;
    status: PaymentStatus;
    paymentProviders: Array<{
      __typename?: 'PaymentProviders';
      id: string;
    } | null>;
    payments?: Array<{
      __typename?: 'Payment';
      id: string;
      amount: number;
      currencyCode: string;
      providerId: string;
      createdAt?: any | null;
    } | null> | null;
  } | null> | null;
};

export type GetOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetOrdersQuery = {
  __typename?: 'Query';
  orders?: {
    __typename?: 'OrderListResponse';
    count: number;
    limit: number;
    offset: number;
    orders: Array<{ __typename?: 'Order' } & OrderFieldsFragment>;
  } | null;
};

export const CustomerAddressFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerAddressFragment, unknown>;
export const CustomerFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Customer' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Customer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultBillingAddressId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultShippingAddressId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomerAddress' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerFragment, unknown>;
export const OrderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OrderFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Order' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentStatus' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fulfillmentStatus' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'originalTotal' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productHandle' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productTitle' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'handle' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'thumbnail' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
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
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingOptionId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
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
                  name: { kind: 'Name', value: 'payments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currencyCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'providerId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
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
} as unknown as DocumentNode<OrderFieldsFragment, unknown>;
export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterCustomerInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
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
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
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
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'logout' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateCustomerInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables
>;
export const AddCustomerAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddCustomerAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddCustomerAddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addCustomerAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddCustomerAddressMutation,
  AddCustomerAddressMutationVariables
>;
export const UpdateCustomerAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCustomerAddress' },
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateCustomerAddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCustomerAddress' },
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
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables
>;
export const DeleteCustomerAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCustomerAddress' },
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
            name: { kind: 'Name', value: 'deleteCustomerAddress' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCustomerAddressMutation,
  DeleteCustomerAddressMutationVariables
>;
export const RequestOrderTransferDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestOrderTransfer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderId' },
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
            name: { kind: 'Name', value: 'requestOrderTransfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
  RequestOrderTransferMutation,
  RequestOrderTransferMutationVariables
>;
export const GetCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCustomer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Customer' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Customer' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Customer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultBillingAddressId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultShippingAddressId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomerAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetOrdersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOrders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'orders' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'OrderFields' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OrderFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Order' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentStatus' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fulfillmentStatus' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discountTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'giftCardTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shippingTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'unitPrice' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'originalTotal' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productHandle' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productTitle' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'handle' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'thumbnail' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
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
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingOptionId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCollections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencyCode' },
                },
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
                  name: { kind: 'Name', value: 'payments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currencyCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'providerId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
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
} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
