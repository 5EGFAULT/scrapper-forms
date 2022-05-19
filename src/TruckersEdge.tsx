import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { value: "AC", label: "Auto Carrier" },
  { value: "BT", label: "B-Train" },
  { value: "CN", label: "Conestoga" },
  { value: "C", label: "Container" },
  { value: "CI", label: "Container Insulated" },
  { value: "CR", label: "Container Refrigerated" },
  { value: "CV", label: "Conveyor" },
  { value: "DD", label: "Double Drop" },
  { value: "LA", label: "Drop Deck Landoll" },
  { value: "DT", label: "Dump Trailer" },
  { value: "F", label: "Flatbed" },
  { value: "FA", label: "Flatbed Air-Ride" },
  { value: "FN", label: "Flatbed Conestoga" },
  { value: "F2", label: "Flatbed Double" },
  { value: "FZ", label: "Flatbed HazMat" },
  { value: "FH", label: "Flatbed Hotshot" },
  { value: "MX", label: "Flatbed Maxi" },
  { value: "FD", label: "Flatbed or Step Deck" },
  { value: "FS", label: "Flatbed w/Sides" },
  { value: "FT", label: "Flatbed w/Tarps" },
  { value: "FM", label: "Flatbed w/Team" },
  { value: "FO", label: "Flatbed, Over Dimension" },
  { value: "FC", label: "Flatbed w/Chains" },
  { value: "FR", label: "Flatbed/Van/Reefer" },
  { value: "HB", label: "Hopper Bottom" },
  { value: "IR", label: "Insulated Van or Reefer" },
  { value: "LB", label: "Lowbey" },
  { value: "LR", label: "Lowbey or RGN" },
  { value: "LO", label: "Lowbey, over Dimension" },
  { value: "MV", label: "Moving Van" },
  { value: "NU", label: "Pneumatic" },
  { value: "PO", label: "Power only" },
  { value: "R", label: "Reefer" },
  { value: "RA", label: "Reefer Air-Ride" },
  { value: "R2", label: "Reefer Double" },
  { value: "RZ", label: "Reefer HazMat" },
  { value: "RN", label: "Reefer Intermodal" },
  { value: "RL", label: "Reefer Logistics" },
  { value: "RV", label: "Reefer or Vented Van" },
  { value: "RM", label: "Reefer w/Team" },
  { value: "RM", label: "Reefer w/Pallet Exchange" },
  { value: "RG", label: "Removable Gooseneck" },
  { value: "SD", label: "Step Deck" },
  { value: "SR", label: "Step Deck or RGN" },
  { value: "SN", label: "StepDeck Conestoga" },
  { value: "SB", label: "Straight Box Truck" },
  { value: "ST", label: "Stretch Trailer" },
  { value: "TA", label: "Tanker Aluminum" },
  { value: "TN", label: "Tanker Intermodal" },
  { value: "TS", label: "Tanker Steel" },
  { value: "TT", label: "Tanker And Trailer" },
  { value: "V", label: "Van" },
  { value: "VA", label: "Van Air-Ride" },
  { value: "VS", label: "Van Conestoga" },
  { value: "V2", label: "Van Double" },
  { value: "VZ", label: "Van HazMat" },
  { value: "VH", label: "Van Hotshot" },
  { value: "VI", label: "Van Insulated" },
  { value: "VN", label: "Van Intermodal" },
  { value: "VG", label: "Van Lift-Gate" },
  { value: "VL", label: "Van Logistics" },
  { value: "OT", label: "Van Open-top" },
  { value: "VB", label: "Van Roller bed" },
  { value: "V3", label: "Van Triple" },
  { value: "VV", label: "Van Vented" },
  { value: "VF", label: "Van or Flatbed" },
  { value: "VT", label: "Van or Flatbed w/Tarps" },
  { value: "VR", label: "Van or Reefer" },
  { value: "VC", label: "Van w/Curtains" },
  { value: "VM", label: "Van w/Team" },
  { value: "VW", label: "Van w/Blanket Wrap" },
  { value: "VP", label: "Van w/Pallet Exchange" },
];

type formdata = {
  origin: null | string;
  origin_dh: null | string;
  destination: null | string;
  destination_dh: null | string;
  general_specifc: null | string;
  truck_type_general: null | string;
  truck_type_specific: string[];
  length: null | string;
  weight: null | string;
  full_partial: null | string;
  startDate: null | string;
  endDate: null | string;
};

export default function TruckersEdge() {
  const [showSpec, setshowSpec] = useState(false);
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [formData, setFormData] = useState<formdata>({
    origin: null,
    origin_dh: null,
    destination: null,
    destination_dh: null,
    general_specifc: null,
    truck_type_general: null,
    truck_type_specific: [],
    length: null,
    weight: null,
    full_partial: null,
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
        truck_type_general: null,
        truck_type_specific: [],
        length: null,
        weight: null,
        full_partial: null,
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

  const submitform = () => {
    console.log(formData);
    //if (formref.current) {
    //  formref.current.reset();
    //  setFormData({
    //    origin: null,
    //    origin_dh: null,
    //    destination: null,
    //    destination_dh: null,
    //    general_specifc: null,
    //    truck_type_general: null,
    //    truck_type_specific: [],
    //    length: null,
    //    weight: null,
    //    full_partial: null,
    //    startDate: null,
    //    endDate: null,
    //  });
    //}
  };

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
          <span className="text-black mb-2 text-base capitalize">Dh-D:</span>
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
      <div className="flex flex-wrap justify-evenly">
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            value="General"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            onClick={() => setshowSpec(false)}
          />
          <span className="ml-2">General</span>
        </label>
        <label className="flex h-7 items-center">
          <input
            type="radio"
            name="spec"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
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
            className="max-w-full"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={"Truck type"}
          />
        )}
        {!showSpec && (
          <select
            className="rounded-md text-base"
            onChange={(e) => {
              setFormData({ ...formData, truck_type_general: e.target.value });
            }}
          >
            <option value="V">Vans,Standard</option>
            <option value="F">Flatbeds</option>
            <option value="R">Reefers</option>
            <option value="N">Conestoga</option>
            <option value="C">Containers</option>
            <option value="D">Decks,Standard</option>
            <option value="B">Dry bulk</option>
            <option value="Z">Hazardous materials</option>
            <option value="O">Other equipement</option>
            <option value="T">Tankers</option>
            <option value="S">Vans Specialized</option>
          </select>
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
          onClick={submitform}
          className="  my-2 min-w-full sm:flex-grow sm:min-w-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </div>
      </div>
    </form>
  );
}
