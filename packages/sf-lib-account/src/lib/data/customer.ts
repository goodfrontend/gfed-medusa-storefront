'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  removeAuthTokenAction,
  removeCartIdAction,
  setAuthTokenAction,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies-actions';
import {
  getCacheTag,
  getCartId,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies-utils';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import { TRANSFER_CART_MUTATION } from '@gfed-medusa/sf-lib-common/lib/gql/mutations/cart';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import {
  TransferCartMutation,
  TransferCartMutationVariables,
} from '@gfed-medusa/sf-lib-common/types/graphql';

import { GET_CUSTOMER_QUERY } from '@/lib/gql/queries/customer';
import {
  Customer,
  GetCustomerQuery,
  GetCustomerQueryVariables,
} from '@/types/graphql';

import {
  ADD_CUSTOMER_ADDRESS_MUTATION,
  DELETE_CUSTOMER_ADDRESS_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
  UPDATE_CUSTOMER_ADDRESS_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
} from '../gql/mutations/customer';

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface RegisterMutation {
  register: {
    token: string;
    customer: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
  };
}

interface RegisterMutationVariables {
  input: RegisterInput;
}

interface UpdateCustomerInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface UpdateCustomerMutation {
  updateCustomer: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface UpdateCustomerMutationVariables {
  input: UpdateCustomerInput;
}

interface AddCustomerAddressInput {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  countryCode?: string;
  postalCode?: string;
  phone?: string;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}

interface AddCustomerAddressMutation {
  addCustomerAddress: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface AddCustomerAddressMutationVariables {
  input: AddCustomerAddressInput;
}

interface UpdateCustomerAddressInput {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  countryCode?: string;
  postalCode?: string;
  phone?: string;
}

interface UpdateCustomerAddressMutation {
  updateCustomerAddress: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface UpdateCustomerAddressMutationVariables {
  id: string;
  input: UpdateCustomerAddressInput;
}

interface DeleteCustomerAddressMutation {
  deleteCustomerAddress: {
    id: string;
    deleted: boolean;
  };
}

interface DeleteCustomerAddressMutationVariables {
  id: string;
}

// TODO(fcasibu): instances of using the medusa sdk should be refactored to call BFF instead
// BFF should include these logic
export const retrieveCustomer = async (
  ctx: StorefrontContext
): Promise<Customer | null> => {
  const cookieHeader = ctx.cookieHeader || (await cookies()).toString();
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

export const updateCustomer = async (
  body: { first_name?: string; last_name?: string; phone?: string },
  ctx: StorefrontContext
) => {
  const cookieHeader = ctx.cookieHeader || (await cookies()).toString();
  const apolloClient = createServerApolloClient(cookieHeader);

  try {
    const result = await graphqlMutation<
      UpdateCustomerMutation,
      UpdateCustomerMutationVariables
    >(
      {
        mutation: UPDATE_CUSTOMER_MUTATION,
        variables: {
          input: {
            firstName: body.first_name,
            lastName: body.last_name,
            phone: body.phone,
          },
        },
      },
      apolloClient
    );

    const cacheTag = getCacheTag('customers', ctx);
    revalidateTag(cacheTag);

    return result?.updateCustomer ?? null;
  } catch (err) {
    medusaError(err);
  }
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
    const ctx = await resolveNextContext();
    const cookieHeader = ctx.cookieHeader;
    const apolloClient = createServerApolloClient(cookieHeader);

    const data = await graphqlMutation<
      RegisterMutation,
      RegisterMutationVariables
    >(
      {
        mutation: REGISTER_MUTATION,
        variables: {
          input: {
            email: customerForm.email,
            password: password,
            firstName: customerForm.first_name,
            lastName: customerForm.last_name,
            phone: customerForm.phone,
          },
        },
      },
      apolloClient
    );

    const token = data?.register?.token ?? '';

    if (!token) {
      throw new Error('Registration failed: No token received');
    }

    await postLogin(token);

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

export async function postLogin(token: string | null | undefined) {
  if (token) {
    await setAuthTokenAction(token as string);
    const ctx = await resolveNextContext();

    const customerCacheTag = getCacheTag('customers', ctx);
    revalidateTag(customerCacheTag);

    try {
      await transferCart(ctx);
    } catch (error: any) {
      return error.toString();
    }
  }
}

export async function postSignout(countryCode: string) {
  const ctx = await resolveNextContext();

  const cookieHeader = ctx.cookieHeader;
  const apolloClient = createServerApolloClient(cookieHeader);

  try {
    await graphqlMutation(
      {
        mutation: LOGOUT_MUTATION,
      },
      apolloClient
    );
  } catch (error) {
    console.error('Logout error:', error);
  }

  await removeAuthTokenAction();

  const customerCacheTag = getCacheTag('customers', ctx);
  revalidateTag(customerCacheTag);

  await removeCartIdAction();

  const cartCacheTag = getCacheTag('carts', ctx);
  revalidateTag(cartCacheTag);

  redirect(`/${countryCode}/account`);
}

export const transferCart = async (
  ctx: StorefrontContext
): Promise<TransferCartMutation['transferCart'] | null> => {
  const cookieHeader = ctx.cookieHeader || '';
  const apolloClient = createServerApolloClient(cookieHeader);
  const cartId = getCartId(ctx);

  if (!cartId) {
    return null;
  }

  try {
    const result = await graphqlMutation<
      TransferCartMutation,
      TransferCartMutationVariables
    >(
      {
        mutation: TRANSFER_CART_MUTATION,
        variables: {
          cartId,
        },
      },
      apolloClient
    );

    const cart = result?.transferCart ?? null;

    if (cart) {
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export async function addCustomerAddress(
  currentState: Record<string, unknown>,
  formData: FormData
) {
  const ctx = await resolveNextContext();
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false;
  const isDefaultShipping =
    (currentState.isDefaultShipping as boolean) || false;

  const address = {
    firstName: formData.get('first_name') as string,
    lastName: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address1: formData.get('address_1') as string,
    address2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    province: formData.get('province') as string,
    countryCode: formData.get('country_code') as string,
    postalCode: formData.get('postal_code') as string,
    phone: formData.get('phone') as string,
    isDefaultBilling,
    isDefaultShipping,
  };

  try {
    const cookieHeader = ctx.cookieHeader || (await cookies()).toString();
    const apolloClient = createServerApolloClient(cookieHeader);

    await graphqlMutation<
      AddCustomerAddressMutation,
      AddCustomerAddressMutationVariables
    >(
      {
        mutation: ADD_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          input: address,
        },
      },
      apolloClient
    );

    const customerCacheTag = getCacheTag('customers', ctx);
    revalidateTag(customerCacheTag);
    return { isDefaultShipping, success: true, error: null };
  } catch (err: unknown) {
    return {
      isDefaultShipping,
      success: false,
      error: err instanceof Error ? err.toString() : String(err),
    };
  }
}

export async function deleteCustomerAddress(addressId: string) {
  const ctx = await resolveNextContext();

  console.log('Deleting address with id:', addressId);

  try {
    const cookieHeader = ctx.cookieHeader || (await cookies()).toString();
    const apolloClient = createServerApolloClient(cookieHeader);

    await graphqlMutation<
      DeleteCustomerAddressMutation,
      DeleteCustomerAddressMutationVariables
    >(
      {
        mutation: DELETE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: addressId,
        },
      },
      apolloClient
    );

    console.log('Address deleted successfully');

    const customerCacheTag = getCacheTag('customers', ctx);
    revalidateTag(customerCacheTag);
    return { success: true, error: null };
  } catch (err) {
    console.error('Delete address error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.toString() : String(err),
    };
  }
}

export async function updateCustomerAddress(
  currentState: Record<string, unknown>,
  formData: FormData
) {
  const ctx = await resolveNextContext();
  const addressId =
    (currentState.addressId as string) || (formData.get('addressId') as string);

  if (!addressId) {
    return {
      addressId: undefined,
      success: false,
      error: 'Address ID is required',
    };
  }

  const address: UpdateCustomerAddressInput = {
    firstName: formData.get('first_name') as string,
    lastName: formData.get('last_name') as string,
    company: formData.get('company') as string,
    address1: formData.get('address_1') as string,
    address2: formData.get('address_2') as string,
    city: formData.get('city') as string,
    postalCode: formData.get('postal_code') as string,
    province: formData.get('province') as string,
    countryCode: formData.get('country_code') as string,
  };

  const phone = formData.get('phone') as string;

  if (phone) {
    address.phone = phone;
  }

  try {
    const cookieHeader = ctx.cookieHeader || (await cookies()).toString();
    const apolloClient = createServerApolloClient(cookieHeader);

    console.log('Updating address:', addressId, address);

    await graphqlMutation<
      UpdateCustomerAddressMutation,
      UpdateCustomerAddressMutationVariables
    >(
      {
        mutation: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        variables: {
          id: addressId,
          input: address,
        },
      },
      apolloClient
    );

    console.log('Address updated successfully');

    const customerCacheTag = getCacheTag('customers', ctx);
    revalidateTag(customerCacheTag);
    return { addressId, success: true, error: null };
  } catch (err: unknown) {
    console.error('Update address error:', err);
    return {
      addressId,
      success: false,
      error: err instanceof Error ? err.toString() : String(err),
    };
  }
}
