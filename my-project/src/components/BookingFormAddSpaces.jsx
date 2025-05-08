
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
//   const [loading, setLoading] = useState(true);   // 👈 loading state
//   const [step, setStep] = useState("Spaces");
//   const [completedSteps, setCompletedSteps] = useState(["Basic", "Order"]);
//   const stepOrder = ["Basic", "Order", "Spaces"];
//   useEffect(() => {
   
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
//       } catch (error) {
//         console.error('Error fetching spaces:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (bookingDates.startDate && bookingDates.endDate) {
//       setStartDate(bookingDates.startDate);
//       setEndDate(bookingDates.endDate);
//       console.log("Dates are available",startDate, endDate);
//       fetchSpaces();
//       // setSelectedSpaces([]); // clear selectedSpaces
//     }
//   }, [bookingDates.startDate, bookingDates.endDate]);

 
  
  

//   const toggleSpaceSelection = (id) => {
//     const alreadySelected = selectedSpaces.find((s) => s.id === id);
//     if (alreadySelected) {
//       setSelectedSpaces(selectedSpaces.filter((s) => s.id !== id));
//     } else {
//       const fullSpace = spaces.find((s) => s.id === id);
//       setSelectedSpaces([...selectedSpaces, fullSpace]);
//     }
//   };

//   const totalPrice = selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);

//   const isSpaceAvailableInRange = (space) => {
//     if (!startDate || !endDate) return true;
//     const selectedStart = new Date(startDate);
//     const selectedEnd = new Date(endDate);
//     const spaceStart = new Date(space.availableFrom);
//     const spaceEnd = new Date(space.availableTo);
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
//                 setBookingDates(prev => ({ ...prev, startDate: value })); // ✅ safe, inside onChange
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
//                 setBookingDates(prev => ({ ...prev, endDate: value })); // ✅ safe, inside onChange
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

//         {/* 👇 Show loading spinner or table */}
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
//                   <th className="px-4 py-2">Sub Category</th>
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
//                     <td className="px-2 py-2">
//                       <span className="text-xs rounded-full px-2 py-1 bg-red-100 text-red-700">
//                         {space.subCategory || '-'}
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
        const availableSpaces = data.filter(space => space.available === true);
  
        const transformedSpaces = availableSpaces.map(space => ({
          id: space._id,
          name: space.spaceName || '-',
          status: space.available ? 'Available' : 'Unavailable',
          facia: space.faciaTowards || '-',
          city: space.city || '-',
          category: space.category || '-',
          subCategory: space.subCategory || '-',
          price: space.price || 0,
          availableFrom: space.dates?.[0] || '',
          availableTo: space.dates?.[space.dates.length - 1] || '',
        }));
  
        setSpaces(transformedSpaces);
        console.log("Available Spaces are", transformedSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSpaces();
    setSelectedSpaces([]);
  }, [startDate, endDate, bookingDates.startDate, bookingDates.endDate]);
  

  const toggleSpaceSelection = (id) => {
    const alreadySelected = selectedSpaces.find((s) => s.id === id);
    if (alreadySelected) {
      setSelectedSpaces(selectedSpaces.filter((s) => s.id !== id));
    } else {
      const fullSpace = spaces.find((s) => s.id === id);
      setSelectedSpaces([...selectedSpaces, fullSpace]);
    }
  };
  const parseDDMMYY = (str) => {
    const [dd, mm, yy] = str.split("-");
    return new Date(`20${yy}-${mm}-${dd}`); // Converts "30-04-25" to "2025-04-30"
  };
  

  const totalPrice = selectedSpaces.reduce((sum, space) => sum + (space.price || 0), 0);

  // const isSpaceAvailableInRange = (space) => {
  //   if (!startDate || !endDate) {
  //     console.log("⛔ Skipping filter — dates missing");
  //     return false;
  //   }
  //   if (!startDate || !endDate) return true;
  //   const selectedStart = new Date(startDate);
  //   const selectedEnd = new Date(endDate);
  //   const spaceStart = new Date(space.availableFrom);
  //   const spaceEnd = new Date(space.availableTo);
  //   console.log(`📦 Space: ${space.name}`);
  // console.log(`   spaceStart: ${space.availableFrom}, spaceEnd: ${space.availableTo}`);
  // console.log(`   selectedStart: ${startDate}, selectedEnd: ${endDate}`);
  // // console.log(`   ✅ isInRange: ${isInRange}`);
  //   return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
  // };
  // console.log("🔍 startDate:", startDate);
  // console.log("🔍 endDate:", endDate);
  // console.log("🔍 total fetched spaces:", spaces.length);
  // console.log("🔍 all spaces:", spaces);
  const isSpaceAvailableInRange = (space) => {
    if (!startDate || !endDate) return false;
  
    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);
  
    const spaceStart = parseDDMMYY(space.availableFrom);
    const spaceEnd = parseDDMMYY(space.availableTo);
  
    return spaceStart <= selectedEnd && spaceEnd >= selectedStart;
  };
  
  const filteredSpaces = spaces.filter(isSpaceAvailableInRange);

  return (
    <div className="p-6 md:ml-64 min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Create Order</h2>

        <div className="flex gap-6 mb-6 text-sm font-medium">
          {stepOrder.map((label) => (
            <div
              key={label}
              className={
                step === label
                  ? "text-green-600 flex items-center gap-1"
                  : completedSteps.includes(label)
                  ? "text-green-600 flex items-center gap-1"
                  : "text-black flex items-center gap-1"
              }
            >
              ✓{" "}
              {label === "Basic"
                ? "Basic Information"
                : label === "Order"
                ? "Order Information"
                : "Select Spaces"}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mr-20 mb-6">
          <div className="w-[50%]">
            <label className="text-xs font-medium">Start Date</label>
            <input
              type="date"
              className="w-full border px-2 py-1 rounded mt-1"
              value={startDate}
              onChange={(e) => {
                const value = e.target.value;
                setStartDate(value);
                setBookingDates(prev => ({ ...prev, startDate: value }));
                setSelectedSpaces([]);
              }}
            />
          </div>
          <div className="w-[50%]">
            <label className="text-xs font-medium">End Date</label>
            <input
              type="date"
              className="w-full border px-2 py-1 rounded mt-1"
              value={endDate}
              onChange={(e) => {
                const value = e.target.value;
                setEndDate(value);
                setBookingDates(prev => ({ ...prev, endDate: value }));
                setSelectedSpaces([]);
              }}
            />
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
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Facia Towards</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Category</th>
                  {/* <th className="px-4 py-2">Sub Category</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredSpaces.map((space, index) => (
                  <tr key={space.id} className="border-t text-center">
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        checked={selectedSpaces.some((s) => s.id === space.id)}
                        onChange={() => toggleSpaceSelection(space.id)}
                      />
                    </td>
                    <td className="text-black cursor-pointer px-2 py-2 text-left">{space.name}</td>
                    <td className="px-2 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${space.status === "Available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
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
                    {/* <td className="px-2 py-2">
                      <span className="text-xs rounded-full px-2 py-1 bg-red-100 text-red-700">
                        {space.subCategory || '-'}
                      </span>
                    </td> */}
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



 