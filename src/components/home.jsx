import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

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
      <form className="py-8 px-4 md:flex md:justify-between">
        <input
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
          className="mb-12 block py-4 px-8 shadow placeholder:opacity-75 md:mb-0"
        />
        <div className="relative h-16 w-40">
          <label
            htmlFor="filter"
            className="absolute right-0 top-1/2 -translate-y-1/2 pr-2"
          >
            <IoMdArrowDropdown />
          </label>
          <select
            id="filter"
            defaultValue={"none"}
            onChange={(e) => setFilter(e.target.value)}
            className="h-full w-full appearance-none pl-4 pr-8 shadow"
          >
            <option value="none">Filter by Region</option>
            {filters.map((filter, index) => (
              <option key={index}>{filter}</option>
            ))}
          </select>
        </div>
      </form>
      <div className="grid-column-auto-fill grid auto-rows-fr gap-12 px-4">
        {result(data, filter, searchTerm).map((country, index) => (
          <Link to={`/${country.name.official}`} key={index}>
            <article
              className="h-full overflow-hidden
             rounded-md bg-white shadow"
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
      country.name.common.toLowerCase().includes(searchTerm)
    );

  return result;
}
