import React, { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry" },
  { label: "Watermelon 🍉", value: "watermelon" },
  { label: "Pear 🍐", value: "pear", disabled: true },
  { label: "Apple 🍎", value: "apple" },
  { label: "Tangerine 🍊", value: "tangerine" },
  { label: "Pineapple 🍍", value: "pineapple" },
  { label: "Peach 🍑", value: "peach" },
];

export default function TruckersEdge() {
  const [showSpec, setshowSpec] = useState(false);
  const [selected, setSelected] = useState([]);

  const formref = useRef<HTMLFormElement | null>(null);
  const resetform = () => {
    if (formref.current) {
      formref.current.reset();
    }
  };

  return (
    <form className="w-full	 bg-white  rounded-lg" ref={formref}>
      <h2 className="text-center text-2xl">Truckers Edge </h2>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Origin:</span>
          <input
            type="text"
            className="rounded-md text-base"
            placeholder="Origin"
          />
        </label>
        <label className="flex flex-col my-2 w-full sm:max-w-[150px]">
          <span className="text-black mb-2 text-base capitalize">Dh-O:</span>
          <input
            type="number"
            className="rounded-md text-base "
            placeholder="Dh-O"
          />
        </label>
      </div>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">
            Destination:
          </span>
          <input
            type="text"
            className="rounded-md text-base"
            placeholder="Destination"
          />
        </label>
        <label className="flex flex-col my-2 w-full sm:max-w-[150px]">
          <span className="text-black mb-2 text-base capitalize">Dh-D:</span>
          <input
            type="number"
            className="rounded-md text-base "
            placeholder="Dh-D"
          />
        </label>
      </div>
      <div className="flex flex-wrap justify-evenly">
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            value="General"
            onClick={() => setshowSpec(false)}
          />
          <span className="ml-2">General</span>
        </label>
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            value="Specific"
            onClick={() => setshowSpec(true)}
          />
          <span className="ml-2">Specific</span>
        </label>
      </div>
      <label className="flex my-2  flex-col flex-wrap justify-evenly">
        <span className="mb-2">Truck type</span>
        {showSpec && (
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={"Truck type"}
          />
        )}
        {!showSpec && (
          <select className="rounded-md text-base">
            <option value="">Select1</option>
            <option value="">Select2</option>
            <option value="">Select3</option>
          </select>
        )}
      </label>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Length:</span>
          <input
            type="number"
            className="rounded-md text-base "
            placeholder="Length"
          />
        </label>
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">Weight:</span>
          <input
            type="number"
            className="rounded-md text-base "
            placeholder="Weight"
          />
        </label>
      </div>
      <label className="flex my-2  flex-col flex-wrap justify-evenly">
        <span className="mb-2">Full/partial</span>
        <select className="rounded-md text-base">
          <option value="">full</option>
          <option value="">Both</option>
          <option value="">Select3</option>
        </select>
      </label>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="text-black mb-2 text-base capitalize">
            Start date:
          </span>
          <input
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
            type="date"
            className="rounded-md text-base "
            placeholder="End date"
          />
        </label>
      </div>

      <div className="flex w-full justify-evenly flex-wrap">
        <div
          onClick={resetform}
          className=" my-2 min-w-full sm:min-w-[200px] cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset
        </div>
        <div className="  my-2 min-w-full sm:min-w-[200px] cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </div>
      </div>
    </form>
  );
}
