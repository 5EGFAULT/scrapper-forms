import { useState } from "react";
import DirectFreight from "./DirectFreight";
import Loadboard from "./Loadboard";
import TruckersEdge from "./TruckersEdge";

function App() {
  const [selectedform, setselectedform] = useState<0 | 1 | 2>(0);
  return (
    <div className="w-screen h-screen flex justify-center dark:bg-gray-900 bg-white">
      <div className="w-[600px]  max-w-full  p-6">
        <h1 className="text-2xl dark:text-white text-center">
          JP Operations LOAD TOOL V2
        </h1>
        <div className="flex justify-evenly items-center min-h-14 my-5 flex-wrap">
          <div
            onClick={() => setselectedform(0)}
            className=" min-w-[150px] text-center cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Truckers Edge
          </div>
          <div
            onClick={() => setselectedform(1)}
            className=" min-w-[150px] text-center cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            123loadboard
          </div>
          <div
            onClick={() => setselectedform(2)}
            className=" min-w-[150px] text-center cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Direct freight
          </div>
        </div>
        <div className="">
          {selectedform === 0 ? <TruckersEdge /> : ""}
          {selectedform === 1 ? <Loadboard /> : ""}
          {selectedform === 2 ? <DirectFreight /> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
