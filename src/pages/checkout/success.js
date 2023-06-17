import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes

// ----------------------------------------------------------------------

export default function CheckoutSuccess() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === '/account') {
      push('/account/personal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
