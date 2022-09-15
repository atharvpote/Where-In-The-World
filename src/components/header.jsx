import { Link } from "react-router-dom";
import { GrMoon } from "react-icons/gr";

export default function Header() {
  return (
    <header className="bg-white py-8 shadow">
      <div className="mx-auto flex max-w-7xl justify-between px-4">
        <Link to={"/"} className="cursor-pointer">
          <h1 className="font-extrabold">Where in the world?</h1>
        </Link>
        <button className="flex cursor-pointer items-center gap-2 font-semibold">
          <GrMoon className="-rotate-45" />
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
}
