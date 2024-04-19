import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginComponent() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}
