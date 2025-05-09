


// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';
// import { useBookingForm } from '../context/BookingFormContext';

// export default function BookingFormAddSpaces() {
//   const navigate = useNavigate();
//   const { selectedSpaces, setSelectedSpaces, bookingDates, setBookingDates } = useBookingForm();

//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const [spaces, setSpaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [step, setStep] = useState("Spaces");
//   const [completedSteps, setCompletedSteps] = useState(["Basic", "Order"]);
//   const stepOrder = ["Basic", "Order", "Spaces"];

//   useEffect(() => {
//     const resolvedStart = startDate || bookingDates.startDate;
//     const resolvedEnd = endDate || bookingDates.endDate;
  
//     if (!resolvedStart || !resolvedEnd) return;
  
//     const fetchSpaces = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3000/api/spaces');
//         const data = await response.json();
//         const availableSpaces = data.filter(space => space.available === true);
  
//         const transformedSpaces = availableSpaces.map(space => ({
//           id: space._id,
//           name: space.spaceName || '-',
//           status: space.available ? 'Available' : 'Unavailable',
//           facia: space.faciaTowards || '-',
//           city: space.city || '-',
//           category: space.category || '-',
//           subCategory: space.subCategory || '-',
//           price: space.price || 0,
//           availableFrom: space.dates?.[0] || '',
//           availableTo: space.dates?.[space.dates.length - 1] || '',
//         }));
  
//         setSpaces(transformedSpaces);
//         console.log("Available Spaces are", transformedSpaces);
//       } catch (error) {
//         console.error('Error fetching spaces:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchSpaces();
//     setSelectedSpaces([]);
//   }, [startDate, endDate, bookingDates.startDate, bookingDates.endDate]);
  

//   const toggleSpaceSelection = (id) => {
//     const alreadySelected = selectedSpaces.find((s) => s.id === id);
//     if (alreadySelected) {
//       setSelectedSpaces(selectedSpaces.filter((s) => s.id !== id));
//     } else {
//       const fullSpace = spaces.find((s) => s.id === id);
//       setSelectedSpaces([...selectedSpaces, fullSpace]);
//     }
//   };
//   const parseDDMMYY = (str) => {
//     const [dd, mm, yy] = str.split("-");
//     return new Date(`20${yy}-${mm}-${dd}`); // Converts "30-04-25" to "2025-04-30"
//   };
  

//   const totalPrice = selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);

//   // const isSpaceAvailableInRange = (space) => {
//   //   if (!startDate || !endDate) {
//   //     console.log("⛔ Skipping filter — dates missing");
//   //     return false;
//   //   }
//   //   if (!startDate || !endDate) return true;
//   //   const selectedStart = new Date(startDate);
//   //   const selectedEnd = new Date(endDate);
//   //   const spaceStart = new Date(space.availableFrom);
//   //   const spaceEnd = new Date(space.availableTo);
//   //   console.log(`📦 Space: ${space.name}`);
//   // console.log(`   spaceStart: ${space.availableFrom}, spaceEnd: ${space.availableTo}`);
//   // console.log(`   selectedStart: ${startDate}, selectedEnd: ${endDate}`);
//   // // console.log(`   ✅ isInRange: ${isInRange}`);
//   //   return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
//   // };
//   // console.log("🔍 startDate:", startDate);
//   // console.log("🔍 endDate:", endDate);
//   // console.log("🔍 total fetched spaces:", spaces.length);
//   // console.log("🔍 all spaces:", spaces);
//   const isSpaceAvailableInRange = (space) => {
//     if (!startDate || !endDate) return false;
  
//     const selectedStart = new Date(startDate);
//     const selectedEnd = new Date(endDate);
  
//     const spaceStart = parseDDMMYY(space.availableFrom);
//     const spaceEnd = parseDDMMYY(space.availableTo);
  
//     return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
//   };
  
//   const filteredSpaces = spaces.filter(isSpaceAvailableInRange);

//   return (
//     <div className="p-6 md:ml-64 min-h-screen">
//       <Navbar />
//       <div className="max-w-screen-xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">Create Order</h2>

//         <div className="flex gap-6 mb-6 text-sm font-medium">
//           {stepOrder.map((label) => (
//             <div
//               key={label}
//               className={
//                 step === label
//                   ? "text-green-600 flex items-center gap-1"
//                   : completedSteps.includes(label)
//                   ? "text-green-600 flex items-center gap-1"
//                   : "text-black flex items-center gap-1"
//               }
//             >
//               ✓{" "}
//               {label === "Basic"
//                 ? "Basic Information"
//                 : label === "Order"
//                 ? "Order Information"
//                 : "Select Spaces"}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-2 gap-4 mr-20 mb-6">
//           <div className="w-[50%]">
//             <label className="text-xs font-medium">Start Date</label>
//             <input
//               type="date"
//               className="w-full border px-2 py-1 rounded mt-1"
//               value={startDate}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setStartDate(value);
//                 setBookingDates(prev => ({ ...prev, startDate: value }));
//                 setSelectedSpaces([]);
//               }}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="text-xs font-medium">End Date</label>
//             <input
//               type="date"
//               className="w-full border px-2 py-1 rounded mt-1"
//               value={endDate}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setEndDate(value);
//                 setBookingDates(prev => ({ ...prev, endDate: value }));
//                 setSelectedSpaces([]);
//               }}
//             />
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <div className="font-medium text-sm">
//             Selected Places: {selectedSpaces.length} <br />
//             Total Price: ₹{totalPrice.toLocaleString()} + inclusive of GST
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto border rounded">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">#</th>
//                   <th className="px-4 py-2">Space Name</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Facia Towards</th>
//                   <th className="px-4 py-2">City</th>
//                   <th className="px-4 py-2">Category</th>
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSpaces.map((space, index) => (
//                   <tr key={space.id} className="border-t text-center">
//                     <td className="px-2 py-2">
//                       <input
//                         type="checkbox"
//                         checked={selectedSpaces.some((s) => s.id === space.id)}
//                         onChange={() => toggleSpaceSelection(space.id)}
//                       />
//                     </td>
//                     <td className="text-black cursor-pointer px-2 py-2 text-left">{space.name}</td>
//                     <td className="px-2 py-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${space.status === "Available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
//                         {space.status}
//                       </span>
//                     </td>
//                     <td className="px-2 py-2">{space.facia}</td>
//                     <td className="px-2 py-2">{space.city}</td>
//                     <td className="px-2 py-2">
//                       <span className="text-xs rounded-full px-2 py-1 bg-green-100 text-green-700">
//                         {space.category}
//                       </span>
//                     </td>
                    
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="flex justify-between mt-6">
//           <button className="border px-2 py-1 rounded">Cancel</button>
//           <div className="space-x-2">
//             <button onClick={() => navigate('/create-booking-orderInfo')} className="bg-black text-xs text-white px-2 py-1 rounded">Back</button>
//             <button onClick={() => navigate('/booking-preview')} className="bg-black text-xs text-white px-2 py-1 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">Preview</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useBookingForm } from '../context/BookingFormContext';

export default function BookingFormAddSpaces() {
  const navigate = useNavigate();
  const { selectedSpaces, setSelectedSpaces, bookingDates, setBookingDates } = useBookingForm();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("Spaces");
  const [completedSteps, setCompletedSteps] = useState(["Basic", "Order"]);
  const stepOrder = ["Basic", "Order", "Spaces"];

  useEffect(() => {
    const resolvedStart = startDate || bookingDates.startDate;
    const resolvedEnd = endDate || bookingDates.endDate;
    if (!resolvedStart || !resolvedEnd) return;

    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/spaces');
        const data = await response.json();

        const transformedSpaces = data.map(space => {
          const occupied = space.occupiedUnits || 0;
          const total = space.unit || 0;
          let status = 'Completely available';
          if (occupied === 0) status = 'Completely available';
          else if (occupied < total) status = 'Partialy available';
          else status = 'Completely booked';

          return {
            id: space._id,
            name: space.spaceName || '-',
            facia: space.faciaTowards || '-',
            city: space.city || '-',
            category: space.category || '-',
            spaceType: space.spaceType || '-',
            price: space.price || 0,
            unit: total,
            occupiedUnits: occupied,
            availability: space.availability,
            traded: space.traded || false,
            overlappingBooking: space.overlappingBooking || false,
            availableFrom: space.dates?.[0] || '',
            availableTo: space.dates?.[space.dates.length - 1] || '',
            selectedUnits: 0,
            status
          };
        });

        setSpaces(transformedSpaces);
        setSelectedSpaces([]);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [startDate, endDate, bookingDates.startDate, bookingDates.endDate]);

  const toggleSpaceSelection = (id) => {
    const updatedSpaces = spaces.map(space => {
      if (space.id === id) {
        if (selectedSpaces.some(s => s.id === id)) {
          return { ...space, selectedUnits: 0 };
        } else {
          return { ...space, selectedUnits: 1 };
        }
      }
      return space;
    });
    setSpaces(updatedSpaces);

    const alreadySelected = selectedSpaces.find((s) => s.id === id);
    if (alreadySelected) {
      setSelectedSpaces(selectedSpaces.filter((s) => s.id !== id));
    } else {
      const fullSpace = updatedSpaces.find((s) => s.id === id);
      setSelectedSpaces([...selectedSpaces, fullSpace]);
    }
  };

  // const parseDDMMYY = (str) => {
  //   const [dd, mm, yy] = str.split("-");
  //   return new Date(`20${yy}-${mm}-${dd}`);
  // };
  const parseDDMMYY = (str) => {
    const [dd, mm, yy] = str.split("-");
    const fullYear = yy.length === 2 ? `20${yy}` : yy; // handles both 25 and 2025
    return new Date(`${fullYear}-${mm}-${dd}`);
  };
  

  // const isSpaceAvailableInRange = (space) => {
  //   if (!startDate || !endDate) return false;
  //   const selectedStart = new Date(startDate);
  //   const selectedEnd = new Date(endDate);
  //   const spaceStart = parseDDMMYY(space.availableFrom);
  //   const spaceEnd = parseDDMMYY(space.availableTo);
  //   return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
  // };

  const isSpaceAvailableInRange = (space) => {
    if (!startDate || !endDate) return false;
  
    if (!space.availableFrom || !space.availableTo) return false;
  
    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);
  
    const spaceStart = parseDDMMYY(space.availableFrom);
    const spaceEnd = parseDDMMYY(space.availableTo);
    console.log("🟢 Checking space:", space.name);
    console.log("   📅 Space Start:", space.availableFrom, spaceStart);
    console.log("   📅 Space End:", space.availableTo, spaceEnd);
    console.log("   📅 Selected Start:", startDate, selectedStart);
    console.log("   📅 Selected End:", endDate, selectedEnd);
    
    if (isNaN(spaceStart.getTime()) || isNaN(spaceEnd.getTime())) return false;
  
    // Check for overlap
    return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
  };
  
  const filteredSpaces = spaces.filter(space => {
    if (!isSpaceAvailableInRange(space)) return false;
    if (space.overlappingBooking === true && space.status === 'Completely booked') return false;
    if ((space.status === 'Completely available' || space.status === 'Partialy available') && space.traded) return false;
    return true;
  });

  const totalPrice = selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);

  const updateSelectedUnits = (id, value) => {
    const updatedSpaces = spaces.map(space => {
      if (space.id === id) {
        return { ...space, selectedUnits: value };
      }
      return space;
    });
    setSpaces(updatedSpaces);

    const updatedSelected = selectedSpaces.map(space => {
      if (space.id === id) {
        return { ...space, selectedUnits: value };
      }
      return space;
    });
    setSelectedSpaces(updatedSelected);
  };

  return (
    <div className="p-6 md:ml-64 min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Create Order</h2>

        <div className="grid grid-cols-2 gap-4 mr-20 mb-6">
          <div className="w-[50%]">
            <label className="text-xs font-medium">Start Date</label>
            <input type="date" className="w-full border px-2 py-1 rounded mt-1"
              value={startDate}
              onChange={(e) => {
                const value = e.target.value;
                setStartDate(value);
                setBookingDates(prev => ({ ...prev, startDate: value }));
                setSelectedSpaces([]);
              }} />
          </div>
          <div className="w-[50%]">
            <label className="text-xs font-medium">End Date</label>
            <input type="date" className="w-full border px-2 py-1 rounded mt-1"
              value={endDate}
              onChange={(e) => {
                const value = e.target.value;
                setEndDate(value);
                setBookingDates(prev => ({ ...prev, endDate: value }));
                setSelectedSpaces([]);
              }} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-sm">
            Selected Places: {selectedSpaces.length} <br />
            Total Price: ₹{totalPrice.toLocaleString()} + inclusive of GST
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Space Name</th>
                  <th className="px-4 py-2">Space Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Facia Towards</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Occupied Units</th>
                  <th className="px-4 py-2">Total Units</th>
                  <th className="px-4 py-2">Select Units</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpaces.map((space, index) => (
                  <tr key={space.id} className="border-t text-center">
                    <td className="px-2 py-2">
                      <input type="checkbox"
                        checked={selectedSpaces.some((s) => s.id === space.id)}
                        onChange={() => toggleSpaceSelection(space.id)} />
                    </td>
                    <td className="text-black cursor-pointer px-2 py-2 text-left">{space.name}</td>
                    <td className="px-2 py-2">{space.spaceType}</td>
                    <td className="px-2 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        space.status === "Completely available" ? "bg-green-100 text-green-700" :
                        space.status === "Partialy available" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {space.status}
                      </span>
                    </td>
                    <td className="px-2 py-2">{space.facia}</td>
                    <td className="px-2 py-2">{space.city}</td>
                    <td className="px-2 py-2">
                      <span className="text-xs rounded-full px-2 py-1 bg-green-100 text-green-700">
                        {space.category}
                      </span>
                    </td>
                    <td className="px-2 py-2">{space.occupiedUnits}</td>
                    <td className="px-2 py-2">{space.unit}</td>
                    <td className="px-2 py-2">
                      {/* <input
                        type="number"
                        min={0}
                        max={space.unit - space.occupiedUnits}
                        value={space.selectedUnits || 0}
                        onChange={(e) => updateSelectedUnits(space.id, parseInt(e.target.value))}
                        className="w-16 border rounded px-1"
                        disabled={!selectedSpaces.some(s => s.id === space.id)}
                      /> */}
                      {space.status === "Completely booked" ? (
  <span className="text-gray-400 italic">N/A</span>
) : (
  <input
    type="number"
    min={1}
    max={space.unit - space.occupiedUnits}
    value={space.selectedUnits || 1}
    onChange={(e) => updateSelectedUnits(space.id, parseInt(e.target.value))}
    className="w-16 border rounded px-1"
    disabled={!selectedSpaces.some(s => s.id === space.id)}
  />
)}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button className="border px-2 py-1 rounded">Cancel</button>
          <div className="space-x-2">
            <button onClick={() => navigate('/create-booking-orderInfo')} className="bg-black text-xs text-white px-2 py-1 rounded">Back</button>
            <button onClick={() => navigate('/booking-preview')} className="bg-black text-xs text-white px-2 py-1 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}


 