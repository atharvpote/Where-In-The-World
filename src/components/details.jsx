import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function Details() {
  const { country } = useParams();

  const detailsFormat = {
    borders: [],
    capital: "",
    currencies: "",
    languages: "",
    name: "",
    nativeName: "",
    flag: "",
    population: "",
    region: "",
    subRegion: "",
    topLevelDomain: "",
  };

  const [data, setData] = useState(detailsFormat);
  const [borderData, setBorderData] = useState([]);

  useEffect(() => {
    getData(country, setData);
  }, [country]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      getBorderData(data.borders, setBorderData);
    } else {
      isMounted.current = true;
    }
  }, [data.borders]);

  return (
    <div className="mx-auto max-w-7xl pb-8 dark:text-white">
      <div className="px-4">
        <div className="py-8">
          <Link
            to={"/"}
            className="flex w-32 cursor-pointer items-center justify-between bg-white px-8 py-2 shadow dark:bg-[#2b3743] dark:text-white"
          >
            <BsArrowLeft className="stroke-1" />
            Back
          </Link>
        </div>
        <div className="items-center md:flex md:justify-between md:gap-12 lg:gap-24">
          <div className="mt-8 mb-12 md:basis-1/2">
            <img src={data.flag} alt="" />
          </div>
          <div className="md:basis-1/2">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold lg:text-4xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-8 lg:flex lg:justify-between lg:gap-8">
              <div className="mb-8 lg:basis-1/2">
                <p className="mb-4">
                  <span className="font-semibold">Native Name: </span>
                  {data.nativeName}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Population: </span>
                  {data.population}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Region: </span>
                  {data.region}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Sub Region: </span>
                  {data.subRegion}
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  {data.capital}
                </p>
              </div>
              <div className="lg:basis-1/2">
                <p className="mb-4">
                  <span className="font-semibold">Top Level Domain: </span>
                  {data.topLevelDomain}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Currencies: </span>
                  {data.currencies}
                </p>
                <p>
                  <span className="font-semibold">Languages: </span>
                  {data.languages}
                </p>
              </div>
            </div>
            <div className="md:flex md:basis-1/2 md:items-center md:gap-4">
              <p className="mb-4 font-semibold md:mb-0">Border Countries:</p>
              <div className="flex flex-wrap items-center gap-2">
                {borderData.map((border, index) => (
                  <Link
                    to={`/${border.name.official}`}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                    key={index}
                    className="bg-white px-4 py-2 shadow dark:bg-[#2b3743]"
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getData(country, setter) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const [data] = await res.json();

  setter({
    borders: data.borders,
    capital: data.capital.join(", "),
    currencies: extractCurrencyNames(data.currencies),
    flag: data.flags.svg,
    languages: extractLanguages(data.languages),
    name: data.name.common,
    nativeName: extractNativeNames(data),
    population: data.population.toLocaleString(),
    region: data.region,
    subRegion: data.subregion,
    topLevelDomain: data.tld.join(", "),
  });
}

async function getBorderData(data, setter) {
  const borderData = [];

  if (!data) return borderData;

  for (const country of data) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);

    borderData.push(...(await res.json()));
  }

  setter(borderData);
}

function extractCurrencyNames(obj) {
  const currency = [];

  for (const key in obj) currency.push(obj[key].name);

  return currency.join(", ");
}

function extractLanguages(obj) {
  const languages = [];

  for (const key in obj) languages.push(obj[key]);

  return languages.join(", ");
}

function extractNativeNames(obj) {
  return obj.name.nativeName[Object.keys(obj.languages)[0]].common;
}
