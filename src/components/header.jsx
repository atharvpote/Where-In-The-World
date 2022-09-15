import { Link } from "react-router-dom";
import { FiMoon } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-white py-8 shadow dark:bg-[#2b3743]">
      <div className="mx-auto flex max-w-7xl justify-between px-4">
        <Link to={"/"} className="cursor-pointer">
          <h1 className="font-extrabold dark:text-white">
            Where in the world?
          </h1>
        </Link>
        <button
          onClick={() => {
            if (document.documentElement.classList.contains("dark"))
              document.documentElement.classList.remove("dark");
            else document.documentElement.classList.add("dark");
          }}
          className="flex cursor-pointer items-center gap-2 font-semibold dark:text-white"
        >
          <FiMoon className=" stroke-black dark:fill-white dark:stroke-white" />
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
}
