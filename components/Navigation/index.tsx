import "@/styles/Navigation/navigation.scss";
import { Home, Profile, Plans } from "./menu-items";

function Navigation({ page }: { page: string }) {
  return (
    <div className="w-screen fixed flex justify-center navigation">
      <Home active={page == "home"} />
      <Plans active={page == "plans"} />
      <Profile active={page == "profile"} />
    </div>
  );
}

export default Navigation;
