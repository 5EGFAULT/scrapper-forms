import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Loading from "./loading";
const options = [

  { label: "Auto Carrier", value: "Auto Carrier" },
  { label: "B-Train", value: "B-Train" },
  { label: "Conestoga", value: "Conestoga" },
  { label: "Container", value: "Container" },
  { label: "Container Insulated", value: "Container Insulated" },
  { label: "Container Refrigerated", value: "Container Refrigerated" },
  { label: "Conveyor", value: "Conveyor" },
  { label: "Double Drop", value: "Double Drop" },
  { label: "Drop Deck Landoll", value: "Drop Deck Landoll" },
  { label: "Dump Trailer", value: "Dump Trailer" },
  { label: "Flatbed", value: "Flatbed" },
  { label: "Flatbed Air-Ride", value: "Flatbed Air-Ride" },
  { label: "Flatbed Conestoga", value: "Flatbed Conestoga" },
  { label: "Flatbed Double", value: "Flatbed Double" },
  { label: "Flatbed HazMat", value: "Flatbed HazMat" },
  { label: "Flatbed Hotshot", value: "Flatbed Hotshot" },
  { label: "Flatbed Maxi", value: "Flatbed Maxi" },
  { label: "Flatbed or Step Deck", value: "Flatbed or Step Deck" },
  { label: "Flatbed w/Sides", value: "Flatbed w/Sides" },
  { label: "Flatbed w/Tarps", value: "Flatbed w/Tarps" },
  { label: "Flatbed w/Team", value: "Flatbed w/Team" },
  { label: "Flatbed, Over Dimension", value: "Flatbed, Over Dimension" },
  { label: "Flatbed, w/Chains", value: "Flatbed, w/Chains" },
  { label: "Flatbed/Van/Reefer", value: "Flatbed/Van/Reefer" },
  { label: "Hopper Bottom", value: "Hopper Bottom" },
  { label: "Insulated Van or Reefer", value: "Insulated Van or Reefer" },
  { label: "Lowboy", value: "Lowboy" },
  { label: "Lowboy or RGN", value: "Lowboy or RGN" },
  { label: "Lowboy, Over Dimension", value: "Lowboy, Over Dimension" },
  { label: "Moving Van", value: "Moving Van" },
  { label: "Pneumatic", value: "Pneumatic" },
  { label: "Power Only", value: "Power Only" },
  { label: "Reefer", value: "Reefer" },
  { label: "Reefer Air-Ride", value: "Reefer Air-Ride" },
  { label: "Reefer Double", value: "Reefer Double" },
  { label: "Reefer HazMat", value: "Reefer HazMat" },
  { label: "Reefer Intermodal", value: "Reefer Intermodal" },
  { label: "Reefer Logistics", value: "Reefer Logistics" },
  { label: "Reefer or Vented Van", value: "Reefer or Vented Van" },
  { label: "Reefer w/Team", value: "Reefer w/Team" },
  { label: "Reefer, w/Pallet Exchange", value: "Reefer, w/Pallet Exchange" },
  { label: "Removable Gooseneck", value: "Removable Gooseneck" },
  { label: "Step Deck", value: "Step Deck" },
  { label: "Step Deck or RGN", value: "Step Deck or RGN" },
  { label: "Stepdeck Conestoga", value: "Stepdeck Conestoga" },
  { label: "Straight Box Truck", value: "Straight Box Truck" },
  { label: "Stretch Trailer", value: "Stretch Trailer" },
  { label: "Tanker Aluminum", value: "Tanker Aluminum" },
  { label: "Tanker Intermodal", value: "Tanker Intermodal" },
  { label: "Tanker Steel", value: "Tanker Steel" },
  { label: "Truck and Trailer", value: "Truck and Trailer" },
  { label: "Van", value: "Van" },
  { label: "Van Air-Ride", value: "Van Air-Ride" },
  { label: "Van Conestoga", value: "Van Conestoga" },
  { label: "Van Double", value: "Van Double" },
  { label: "Van HazMat", value: "Van HazMat" },
  { label: "Van Hotshot", value: "Van Hotshot" },
  { label: "Van Insulated", value: "Van Insulated" },
  { label: "Van Intermodal", value: "Van Intermodal" },
  { label: "Van Lift-Gate", value: "Van Lift-Gate" },
  { label: "Van Logistics", value: "Van Logistics" },
  { label: "Van Open-Top", value: "Van Open-Top" },
  { label: "Van Roller Bed", value: "Van Roller Bed" },
  { label: "Van Triple", value: "Van Triple" },
  { label: "Van Vented", value: "Van Vented" },
  { label: "Van or Flatbed", value: "Van or Flatbed" },
  { label: "Van or Flatbed w/Tarps", value: "Van or Flatbed w/Tarps" },
  { label: "Van or Reefer", value: "Van or Reefer" },
  { label: "Van w/Curtains", value: "Van w/Curtains" },
  { label: "Van w/Team", value: "Van w/Team" },
  { label: "Van, w/Blanket Wrap", value: "Van, w/Blanket Wrap" },
  { label: "Van, w/Pallet Exchange", value: "Van, w/Pallet Exchange" },
];

const options_general = [
  { value: "Vans,Standard", label: "Vans,Standard" },
  { value: "Flatbeds", label: "Flatbeds" },
  { value: "Reefers", label: "Reefers" },
  { value: "Conestoga", label: "Conestoga" },
  { value: "Containers", label: "Containers" },
  { value: "Decks, Specialized", label: "Decks, Specialized" },
  { value: "Decks, Standard", label: "Decks, Standard" },
  { value: "Dry Bulk", label: "Dry Bulk" },
  { value: "Hazardous Materials", label: "Hazardous Materials" },
  { value: "Other Equipment", label: "Other Equipment" },
  { value: "Tankers", label: "Tankers" },
  { value: "Vans, Specialized", label: "Vans, Specialized" },

];

type formdata = {
  origin: null | string;
  origin_dh: "150" | string;
  destination: null | string;
  destination_dh: "150" | string;
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
  const [showSpec, setshowSpec] = useState(false);
  const [loading, setloading] = useState(false);
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selected_general, setSelected_general] = useState<{ value: string; label: string }[]>(
    []
  );
  const [formData, setFormData] = useState<formdata>({
    origin: null,
    origin_dh: "150",
    destination: null,
    destination_dh: "150",
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
  // const resetform = () => {
  //   if (formref.current) {
  //     formref.current.reset();
  //     setFormData({
  //       origin: null,
  //       origin_dh: "150",
  //       destination: null,
  //       destination_dh: "150",
  //       general_specifc: null,
  //       truck_type_general: [],
  //       truck_type_specific: [],
  //       length: null,
  //       weight: null,
  //       full_partial: "Both",
  //       startDate: null,
  //       endDate: null,
  //     });
  //   }
  // };
  useEffect(() => {
    setFormData({
      ...formData,
      truck_type_specific: selected.map((v) => v.value),
    });
  }, [selected]);

  useEffect(() => {
    setFormData({
      ...formData,
      truck_type_general: selected_general.map((v) => v.value),
    });
  }, [selected_general]);
  function downloadFile(filePath: string) {
    var link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }
  const submitform = async (e: any) => {
    e.preventDefault();
    setloading(true);
    let res = fetch(
      "http://localhost:3333/truckersedge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).then((res) => {
      downloadFile("http://localhost:3333/csv/Truckers_Edge.csv");
      setloading(false);
      setFormData({
        ...formData,
        origin: null,
        origin_dh: "150",
        destination: null,
        destination_dh: "150",
        general_specifc: null,
        truck_type_general: [],
        truck_type_specific: [],
        length: null,
        weight: null,
        full_partial: "Both",
        startDate: null,
        endDate: null,
      });
    })
    // });
    // 
  };

  return (
    <form className="w-full	rounded-lg" onSubmit={submitform}>
      <h2 className=" dark:text-white text-center text-2xl">Truckers Edge </h2>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className="dark:text-white text-black mb-2 text-base capitalize">Origin:</span>
          <input required
            onChange={(e) => {
              setFormData({ ...formData, origin: e.target.value.trim() });
            }}
            type="text"
            className="rounded-md text-base"
            placeholder="Origin"
          />
        </label>
        <label className="flex flex-col my-2 w-full sm:max-w-[150px]">
          <span className="dark:text-white text-black mb-2 text-base capitalize">Dh-O:</span>
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
          <span className="dark:text-white text-black mb-2 text-base capitalize">
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
          <span className="dark:text-white text-black mb-2 text-base capitalize">Dh-D:</span>
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
          <input required
            type="radio"
            name="spec"
            value="General"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            onClick={() => setshowSpec(false)}
          />
          <span className="dark:text-white ml-2">General</span>
        </label>
        <label className="flex h-7 items-center">
          <input required
            type="radio"
            name="spec"
            onChange={(e) => {
              setFormData({ ...formData, general_specifc: e.target.value });
            }}
            value="Specific"
            onClick={() => setshowSpec(true)}
          />
          <span className="dark:text-white ml-2">Specific</span>
        </label>
      </div>
      <label className="flex my-2  flex-col flex-wrap justify-evenly">
        <span className="dark:text-white mb-2">Truck type</span>
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
          <MultiSelect
            className="max-w-full"
            options={options_general}
            value={selected_general}
            onChange={setSelected_general}
            labelledBy={"Truck type"}
          />
        )}
      </label>
      <div className="flex w-full justify-between gap-3 flex-wrap">
        <label className="flex flex-col my-2 flex-grow">
          <span className=" dark:text-white text-black mb-2 text-base capitalize">Length:</span>
          <input required
            onChange={(e) => {
              setFormData({ ...formData, length: e.target.value });
            }}
            type="number"
            className="rounded-md text-base "
            placeholder="Length"
          />
        </label>
        <label className="flex flex-col my-2 flex-grow">
          <span className="dark:text-white mb-2 text-base capitalize">Weight:</span>
          <input required
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
        <span className="dark:text-white mb-2">Full/partial</span>
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
          <span className="dark:text-white text-black mb-2 text-base capitalize">
            Start date:
          </span>
          <input required
            onChange={(e) => {
              setFormData({ ...formData, startDate: e.target.value });
            }}
            type="date"
            className="rounded-md text-base "
            placeholder="Start date"
          />
        </label>
        <label className="flex flex-col my-2 flex-grow">
          <span className="dark:text-white mb-2 text-base capitalize">
            End date:
          </span>
          <input required
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
        {/* <div
          // onClick={resetform}
          // type="submit"
          onClick={resetform}
          className=" my-2 min-w-full sm:flex-grow sm:min-w-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset
        </div> */}
        {(!loading)
          ? <button
            // onClick={submitform}
            type="submit"
            className="  my-2 min-w-full sm:flex-grow sm:min-w-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          :
          <Loading />
        }
      </div>
    </form>
  );
}
