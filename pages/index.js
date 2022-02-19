import dynamic from "next/dynamic";
import { useSession, signIn, signOut } from "next-auth/react";

function HomePage() {
  const { data: session, status } = useSession()

  const Map = dynamic(
    () => import("../component/Map"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Map />
      </>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
      <Map />
    </div>
  );
}
export default HomePage;