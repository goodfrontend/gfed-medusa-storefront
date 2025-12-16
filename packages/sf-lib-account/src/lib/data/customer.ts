'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  removeCartId,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies';
import { graphqlMutation } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import {
  createServerApolloClient,
  graphqlFetch,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import { TRANSFER_CART_MUTATION } from '@gfed-medusa/sf-lib-common/lib/gql/mutations/cart';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import {
  TransferCartMutation,
  TransferCartMutationVariables,
} from '@gfed-medusa/sf-lib-common/types/graphql';
import { HttpTypes } from '@medusajs/types';

import { GET_CUSTOMER_QUERY } from '@/lib/gql/queries/customer';
import {
  Customer,
  GetCustomerQuery,
  GetCustomerQueryVariables,
} from '@/types/graphql';

import { removeAuthToken, setAuthToken } from './cookies';

export const retrieveCustomer = async (): Promise<Customer | null> => {
  const cookieHeader = (await cookies()).toString();
  const apolloClient = createServerApolloClient(cookieHeader);

  try {
    const customer = await graphqlFetch<
      GetCustomerQuery,
      GetCustomerQueryVariables
    >(
      {
        query: GET_CUSTOMER_QUERY,
        fetchPolicy: 'network-only',
      },
      apolloClient
    ).then((response) => response?.me ?? null);

    return customer;
  } catch {
    return null;
  }
};

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError);

  const cacheTag = await getCacheTag('customers');
  revalidateTag(cacheTag);

  return updateRes;
};

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get('password') as string;
  const customerForm = {
    email: formData.get('email') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
  };

  try {
    const token = await sdk.auth.register('customer', 'emailpass', {
      email: customerForm.email,
      password: password,
    });

    await setAuthToken(token as string);

    const headers = {
      ...(await getAuthHeaders()),
    };

    await sdk.store.customer.create(customerForm, {}, headers);

    const loginToken = await sdk.auth.login('customer', 'emailpass', {
      email: customerForm.email,
      password,
    });

    await setAuthToken(loginToken as string);

    const customerCacheTag = await getCacheTag('customers');
    revalidateTag(customerCacheTag);

    await transferCart();

    return {
      message: 'Registration successful',
      status: 'success',
    };
  } catch (error: any) {
    return {
      message: error.toString(),
      status: 'error',
    };
  }
}

/**
 * Sets appropriate cookies for client-side SDK authentication
 * and merges carts if applicable.
 *
 * @param token Auth token received after logging in
 * @returns
 */
export async function postLogin(token: string | null | undefined) {
  // TODO: MDS-80 Revisit: remove auth-related logic once all requests are refactored to use BFF.
  if (token) {
    await setAuthToken(token as string);
    const customerCacheTag = await getCacheTag('customers');
    revalidateTag(customerCacheTag);
  }

  try {
    await transferCart();
  } catch (error: any) {
    return error.toString();
  }
}

// TODO: MDS-80 Revisit and remove logic related to JWT-based auth.
export async function postSignout(countryCode: string) {
  await sdk.auth.logout();

  await removeAuthToken();

  const customerCacheTag = await getCacheTag('customers');
  revalidateTag(customerCacheTag);

  await removeCartId();

  const cartCacheTag = await getCacheTag('carts');
  revalidateTag(cartCacheTag);

  redirect(`/${countryCode}/account`);
}

export const transferCart = async (): Promise<
  TransferCartMutation['transferCart'] | null
> => {
  const cartId = await getCartId();

  if (!cartId) {
    return null;
  }

  try {
    const result = await graphqlMutation<
      TransferCartMutation,
      TransferCartMutationVariables
    >({
      mutation: TRANSFER_CART_MUTATION,
      variables: {
        cartId,
      },
    });

    const cart = result?.transferCart ?? null;

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false;
  const isDefaultShipping =
    (currentState.isDefaultShipping as boolean) || false;

  const address = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address_1: formData.get('address_1') as string,
    address_2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    postal_code: formData.get('postal_code') as string,
    province: formData.get('province') as string,
    country_code: formData.get('country_code') as string,
    phone: formData.get('phone') as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  };

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag('customers');
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag('customers');
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get('addressId') as string);

  if (!addressId) {
    return { success: false, error: 'Address ID is required' };
  }

  const address = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address_1: formData.get('address_1') as string,
    address_2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    postal_code: formData.get('postal_code') as string,
    province: formData.get('province') as string,
    country_code: formData.get('country_code') as string,
  } as HttpTypes.StoreUpdateCustomerAddress;

  const phone = formData.get('phone') as string;

  if (phone) {
    address.phone = phone;
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag('customers');
      revalidateTag(customerCacheTag);
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};
