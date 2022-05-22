import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
// import express from "express";

// const app = express();
const options = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

type formdata = {
  origin: null | string;
  origin_dh: null | string;
  destination: null | string;
  destination_dh: null | string;
  general_specifc: null | string;
  truck_type_general: string[];
  truck_type_specific: string[];
  length: null | string;
  weight: null | string;
  full_partial: "Both" | string;
  startDate: null | string;
  endDate: null | string;
};

export default function TruckersEdge() {
  const [showSpec, setshowSpec] = useState<0 | 1 | 2>(0);
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [formData, setFormData] = useState<formdata>({
    origin: null,
    origin_dh: null,
    destination: null,
    destination_dh: null,
    general_specifc: null,
    truck_type_general: [],
    truck_type_specific: [],
    length: null,
    weight: null,
    full_partial: "Both",
    startDate: null,
    endDate: null,
  });

  const formref = useRef<HTMLFormElement | null>(null);
  const resetform = () => {
    if (formref.current) {
      formref.current.reset();
      setFormData({
        origin: null,
        origin_dh: null,
        destination: null,
        destination_dh: null,
        general_specifc: null,
        truck_type_general: [],
        truck_type_specific: [],
        length: null,
        weight: null,
        full_partial: "Both",
        startDate: null,
        endDate: null,
      });
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      truck_type_specific: selected.map((v) => v.value),
    });
  }, [selected]);
  useEffect(() => {
    setFormData({
      ...formData,
      truck_type_general: selected.map((v) => v.value),
    });
  }, [selected]);


  return (
    <form className="w-full	 bg-white  rounded-lg" ref={formref}>
      <h2 className="text-center text-2xl">Truckers Edge </h2>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Origin:</span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, origin: e.target.value });
            }}
            type="text"
            className="rounded-md text-base"
            placeholder="Origin"
          />
        </label>
        <label className="flex flex-col my-2 w-full sm:max-w-[150px]">
          <span className="text-black mb-2 text-base capitalize">Dh-O:</span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, origin_dh: e.target.value });
            }}
            type="number"
            className="rounded-md text-base "
            placeholder="Dh-O"
          />
        </label>
      </div>
      <div className="flex flex-wrap justify-evenly">
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            value="City"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            onClick={() => setshowSpec(0)}
          />
          <span className="ml-2">City</span>
        </label>
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            value="States"
            onClick={() => setshowSpec(1)}
          />
          <span className="ml-2">States</span>
        </label>
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            value="Anywhere"
            onClick={() => setshowSpec(2)}
          />
          <span className="ml-2">Anywhere</span>
        </label>
      </div>
      <label className="flex my-2  flex-col flex-wrap justify-evenly">
        {showSpec === 0 && (
          <div className="flex w-full justify-between gap-3 flex-wrap">
            <label className="flex flex-col my-2 flex-grow">
              <span className="text-black mb-2 text-base capitalize">
                Destination:
              </span>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, destination: e.target.value });
                }}
                type="text"
                className="rounded-md text-base"
                placeholder="Destination"
              />
            </label>
            <label className="flex flex-col my-2 w-full sm:max-w-[150px]">
              <span className="text-black mb-2 text-base capitalize">
                Dh-D:
              </span>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, destination_dh: e.target.value });
                }}
                type="number"
                className="rounded-md text-base "
                placeholder="Dh-D"
              />
            </label>
          </div>
        )}
        {showSpec === 1 && (
          <MultiSelect
            className="max-w-full"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={"Truck type"}
          />
        )}
        {showSpec === 2 && (
          <div className="">
            <label className="flex flex-col my-2 flex-grow">
              <span className=""></span>
              <input type="checkbox" name="specdest" value="States" />
            </label>
          </div>
        )}
      </label>

      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Length:</span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, length: e.target.value });
            }}
            type="number"
            className="rounded-md text-base "
            placeholder="Length"
          />
        </label>
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Weight:</span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, weight: e.target.value });
            }}
            type="number"
            className="rounded-md text-base "
            placeholder="Weight"
          />
        </label>
      </div>
      <label className="flex my-2  flex-col flex-wrap justify-evenly">
        <span className="mb-2">Full/partial</span>
        <select
          className="rounded-md text-base"
          onChange={(e) => {
            setFormData({ ...formData, full_partial: e.target.value });
          }}
        >
          <option value="Both">Both</option>
          <option value="Full">Full</option>
          <option value="Partial">Partial</option>
        </select>
      </label>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">
            Start date:
          </span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, startDate: e.target.value });
            }}
            type="date"
            className="rounded-md text-base "
            placeholder="Start date"
          />
        </label>
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">
            End date:
          </span>
          <input
            onChange={(e) => {
              setFormData({ ...formData, endDate: e.target.value });
            }}
            type="date"
            className="rounded-md text-base "
            placeholder="End date"
          />
        </label>
      </div>

      <div className="flex w-full justify-evenly flex-wrap gap-3">
        <div
          onClick={resetform}
          className=" my-2 min-w-full sm:flex-grow sm:min-w-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset
        </div>
        <div
          // onClick={submitform}
          className="  my-2 min-w-full sm:flex-grow sm:min-w-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </div>
      </div>
    </form>
  );
}
