import { logout } from '@/actions/logout';
import LogoutBtn from '@/components/LogoutBtn';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }
  return (
    <div>
      <h1>Hi, {JSON.stringify(user)}!</h1>
      <LogoutBtn />
    </div>
  );
}
