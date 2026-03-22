'use client';

import { usePathname } from 'next/navigation';
import Navbar from './public/layouts/navbar';
import Footer from './public/layouts/footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Pages qui n'ont pas besoin du layout complet
  const noLayoutPages = [
    '/auth/connexion',
    '/auth/inscription',
    '/auth/forgot-password',
    '/auth/forgot-password/success',
    '/auth/reset-password',
    '/auth/verify',
    '/auth/verify/success',
    '/auth/inscription/success',
    '/admin',
    '/admin/profile',
    '/admin/users',
    '/admin/plannings',
    '/admin/reservations',
    '/admin/packs',
  ];
  
  const hideLayout = noLayoutPages.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="bg-osahan">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
