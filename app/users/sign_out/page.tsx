
import { deleteSessionAction } from '@/lib/session';
import SignOut from '.';

export default async function SignOutPage() {
  // Trigger the session deletion when the page is rendered


  // Return a response to redirect the user to the sign-in page
  return (
<SignOut deleteSessionAction={deleteSessionAction}/>
  );
}