'use server';

export async function setCartIdAction(id: string) {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_cart_id', id, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function removeCartIdAction() {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_cart_id', '', { maxAge: -1 });
}

export async function setAuthTokenAction(token: string) {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_jwt', token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function removeAuthTokenAction() {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_jwt', '', { maxAge: -1 });
}
