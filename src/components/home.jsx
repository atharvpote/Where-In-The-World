import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Listbox } from "@headlessui/react";

export default function Home() {
  const filters = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="mx-auto max-w-7xl pb-8">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="py-8 px-4 md:flex md:justify-between"
      >
        <div className="mb-12 flex items-center bg-white shadow dark:bg-[#2b3743] md:mb-0">
          <label
            htmlFor="search"
            className="flex h-full w-16 items-center bg-white dark:bg-[#2b3743]"
          >
            <BsSearch className="w-full fill-gray-500 opacity-75" />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => {
              if (timer.current) {
                clearTimeout(timer.current);

                timer.current = null;
              }

              timer.current = setTimeout(() => {
                setSearchTerm(e.target.value);
              }, 500);
            }}
            className="block w-full py-4 px-8 pl-2 outline-none placeholder:opacity-75 dark:bg-[#2b3743] dark:text-white md:basis-64"
          />
        </div>
        <div className="relative h-12 w-60 shadow">
          <Listbox value={filter} onChange={setFilter}>
            <Listbox.Button className="flex h-full w-full items-center justify-between bg-white pl-8 pr-7 dark:bg-[#2b3743] dark:text-white">
              {!filter ? "Filter by Region" : filter}
              <IoMdArrowDropdown />
            </Listbox.Button>
            <Listbox.Options
              className="mt-2 bg-white shadow dark:bg-[#2b3743] dark:text-white
            "
            >
              {filters.map((fil, index) => (
                <Listbox.Option
                  key={index}
                  value={fil}
                  className="ml-8 flex h-12 cursor-pointer items-center text-center"
                >
                  {fil}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </form>
      <div className="grid-column-auto-fill grid auto-rows-fr gap-12 px-4">
        {result(data, filter, searchTerm).map((country, index) => (
          <Link to={`/${country.name.official}`} key={index}>
            <article
              className="h-full overflow-hidden
             rounded-md bg-white shadow dark:bg-[#2b3743] dark:text-white"
            >
              <img
                src={country.flags.svg}
                alt=""
                className="h-48 w-full object-cover object-center"
              />
              <div className="mx-6 py-8">
                <h2 className="mb-4 text-xl font-extrabold">
                  {country.name.common}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Population: </span>
                  {country.population.toLocaleString()}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Region: </span>
                  {country.region}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Capital: </span>
                  {country.capital}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

function result(data, filter = "", searchTerm = "") {
  let result = data;

  if (filter) result = data.filter((country) => country.region === filter);

  if (searchTerm)
    result = result.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return result;
}
