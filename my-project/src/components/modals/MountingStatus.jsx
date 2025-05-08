import React, { useState } from 'react';
import { useContext } from 'react';
import { PipelineContext } from '../../context/PipelineContext';
export default function MountingStatus({ onConfirm }) {
  const [mountingStatus, setMountingStatus] = useState(false);

  const { pipelineData,setPipelineData } = useContext(PipelineContext);

 

  const handleSave = () => {
    //   alert(`PO Document "${poFile.name}" saved!`);
      setPipelineData(prev => ({
        ...prev,
        mountingStatus: { confirmed: true}
      }));
      onConfirm();
    
  };

  

  return (
    <div>
        {pipelineData?.mountingStatus?.confirmed?<h1>Printing done</h1>: <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mounting done</h2>

      <div className="flex text-xs items-center space-x-3 mb-4">
        <input
          id="printingCheckbox"
          type="checkbox"
          checked={mountingStatus}
          onChange={() => setMountingStatus(!mountingStatus)}
          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="printingCheckbox" className="text-gray-700 text-sm">
          Yes?
        </label>
      </div>

     
      <button
            onClick={handleSave}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
    </div>}
    </div>
   
  );
}
