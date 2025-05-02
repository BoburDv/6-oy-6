import React from "react";

export default function CountriesCard({info}) {
    const {name: {official}, population, region, capital, flags:{svg, alt}} = info
  return (
    <li>
      <div className='card bg-base-100 w-full shadow-md' title={official}>
        <figure className="w-full !min-h-40">
          <img style={{height: "160px"}} src={svg} alt={alt} className="object-cover w-full h-full object-center"/>
        </figure>
        <div className="card-body px-6 pt-6 pb-[46px]">
          <h2 className="card-title line-clamp-1 font-extrabold text-[18px] text-[#111517]">{official}</h2>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-[#111517]"><strong>Population: <span className="font-light">{population}</span></strong></p>
            <p className="text-[#111517]"><strong>Region: <span className="font-light">{region}</span></strong></p>
            <p className="text-[#111517]"><strong>Capital: <span className="font-light">{capital}</span></strong></p>
          </div>
        </div>
      </div>
    </li>
  );
}
