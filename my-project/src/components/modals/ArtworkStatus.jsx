import React, { useState } from 'react';
import { useContext } from 'react';
import { PipelineContext } from '../../context/PipelineContext';
export default function ArtworkForm({ onConfirm }) {
  const [artworkReceived, setartworkReceived] = useState(false);
  const [artworkFile, setartworkFile] = useState(null);
  const { setPipelineData } = useContext(PipelineContext);
  const handleFileChange = (e) => {
    setartworkFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (artworkReceived && setartworkFile) {
      alert(`PO Document "${setartworkFile.name}" saved!`);
      setPipelineData(prev => ({
        ...prev,
        artwork: { confirmed: true}
      }));
      onConfirm();
    } else {
      alert('Please upload PO document if PO is received.');
    }
  };

  const handleDiscard = () => {
    setartworkReceived(false);
    setartworkFile(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Artwork Received</h2>

      <div className="flex text-xs items-center space-x-3 mb-4">
        <input
          id="artworkCheckbox"
          type="checkbox"
          checked={artworkReceived}
          onChange={() => setartworkReceived(!artworkReceived)}
          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="artworkCheckbox" className="text-gray-700 text-sm">
          Yes?
        </label>
      </div>

      {artworkReceived && (
        <div className="mb-6">
          <label className="block text-xs text-gray-700 font-medium mb-2">
            Upload artwork Document:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
      )}

      {artworkReceived && (
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
      )}
    </div>
  );
}
