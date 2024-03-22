export const revalidate = 0

import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login');
  }


  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}