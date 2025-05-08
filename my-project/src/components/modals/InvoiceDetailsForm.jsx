import React, { useState } from 'react';
import { useContext } from 'react';
import { PipelineContext } from '../../context/PipelineContext';
export default function InvoiceForm({ onConfirm }) {

  const [invoiceNumber,setInvoiceNumber]=useState('');
  const [invoiceFile, setInvoiceFile] = useState(null);
  const { pipelineData,setPipelineData } = useContext(PipelineContext);
  const handleFileChange = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  const handleSave = () => {
    console.log("Invoice details saved");
    setPipelineData(prev => ({
      ...prev,
      invoiceDetails: { invoiceNumber,invoiceFile}
    }))
    onConfirm();
  };

  const handleDiscard = () => {
    setInvoiceNumber(null);
    setInvoiceFile(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Invoice details</h2>


          <label>Invoice Number:</label>
          <input type="text"  placeholder="Enter Booking Ref"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)} />

      
        <div className="mb-6">
          <label className="block text-xs text-gray-700 font-medium mb-2">
            Upload Invoice Document:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
    

      
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
          {/* <button
            onClick={handleDiscard}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Discard
          </button> */}
        </div>
    
    </div>
  );
}
