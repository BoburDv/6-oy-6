import { useEffect, useState } from "react";
import { getCountries } from "../requests";
import CountriesCard from "./CountriesCard";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [region] = useState([
    "all",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ]);


  function handleChange(e) {
    const value = e.target.value;
    setFilter(value == "all" ? value : `region/${e.target.value}`);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }


  useEffect(() => {
    setLoader(true);
    const vs = search ? `name/${search}` : filter;
    getCountries(vs)
      .then((res) => {
        setCountries(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filter, search]);


  if (loader) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="absolute inset-0 text-4xl flex justify-center items-center">
        {error}
        <div><a href="../index.html" className="text-lg py-2 px-3 mx-2 bg-black text-white m-1 rounded-sm">Qaytish</a></div>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-7xl">
      <div className="justify-between flex mx-auto max-w-7xl gap-10 my-12 lg:px-0 px-6">
        <label className="input shadow-sm max-w-[480px] w-full gap-6 h-14 border-none px-8">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            onChange={handleSearch}
            value={search}
            required
            placeholder="Search"
          />
        </label>

        <select
          onChange={handleChange}
          value={filter === "all" ? "all" : filter.split("/")[1]}
          className="select shadow-sm w-[200px] px-6 h-14 border-none cursor-pointer"
        >
          <option value="all" className="text-sm text-[#111517]" disabled>
            Filter by region
          </option>
          {region.map((el) => {
            return <option>{el}</option>;
          })}
        </select>
      </div>

      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-16 lg:px-0 px-6">
        {countries.map((el) => {
          return <CountriesCard info={el} />;
        })}
      </ul>
    </div>
  );
}
