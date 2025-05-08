// import React, { useState } from 'react';

// const PaymentStatusForm = ({onConfirm}) => {
//   const [totalAmount, setTotalAmount] = useState('');
//   const [modeOfPayment, setModeOfPayment] = useState('cash');
//   const [payments, setPayments] = useState([]);

//   const handleAddPayment = () => {
//     setPayments([...payments, { amount: '', date: '' }]);
//   };

//   const handlePaymentChange = (index, field, value) => {
//     const updated = [...payments];
//     updated[index][field] = value;
//     setPayments(updated);
//   };

//   const totalPaid = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
//   const paymentDue = parseFloat(totalAmount || 0) - totalPaid;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">💳 Payment Status</h2>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Total Amount (₹)</label>
//         <input
//           type="number"
//           value={totalAmount}
//           onChange={e => setTotalAmount(e.target.value)}
//           className="mt-1 w-full border rounded-md px-3 py-2"
//           placeholder="Enter total amount"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Mode of Payment</label>
//         <select
//           value={modeOfPayment}
//           onChange={e => setModeOfPayment(e.target.value)}
//           className="mt-1 w-full border rounded-md px-3 py-2"
//         >
//           <option value="cash">Cash</option>
//           <option value="cheque">Cheque</option>
//           <option value="pdc">PDC</option>
//         </select>
//       </div>

//       <div>
//         <h3 className="font-semibold text-gray-700 mb-2">Payment Records</h3>
//         {payments.map((payment, idx) => (
//           <div key={idx} className="flex items-center gap-3 mb-2">
//             <input
//               type="number"
//               placeholder="Amount (₹)"
//               value={payment.amount}
//               onChange={e => handlePaymentChange(idx, 'amount', e.target.value)}
//               className="w-1/2 border rounded-md px-3 py-2"
//             />
//             <input
//               type="date"
//               value={payment.date}
//               onChange={e => handlePaymentChange(idx, 'date', e.target.value)}
//               className="w-1/2 border rounded-md px-3 py-2"
//             />
//           </div>
//         ))}
//         <button
//           onClick={handleAddPayment}
//           className="mt-2 text-sm text-blue-600 hover:underline"
//         >
//           + Add Payment
//         </button>
//       </div>

//       <div className="pt-4 border-t">
//         <p className="text-gray-800 font-semibold">Total Paid: ₹{totalPaid}</p>
//         <p className={`font-semibold ${paymentDue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//           Payment Due: ₹{paymentDue}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentStatusForm;
import React, { useState } from 'react';
import { toast } from 'sonner'; // Optional for notification

const PaymentStatusForm = ({onConfirm}) => {
  const [totalAmount, setTotalAmount] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('cash');
  const [payments, setPayments] = useState([]);

  const handleAddPayment = () => {
    setPayments([...payments, { amount: '', date: '' }]);
  };

  const handleDeletePayment = (index) => {
    const updated = payments.filter((_, idx) => idx !== index);
    setPayments(updated);
  };

  const handlePaymentChange = (index, field, value) => {
    const updated = [...payments];
    updated[index][field] = value;
    setPayments(updated);
  };

  const totalPaid = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const paymentDue = parseFloat(totalAmount || 0) - totalPaid;

  const handleSave = () => {
    const payload = {
      totalAmount,
      modeOfPayment,
      payments,
      totalPaid,
      paymentDue,
    };

    console.log('📝 Saving Payment Data:', payload);
    toast.success('Payment details saved!');
    onConfirm();
    // Send to backend here if needed
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">💳 Payment Status</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Total Amount (₹)</label>
        <input
          type="number"
          value={totalAmount}
          onChange={e => setTotalAmount(e.target.value)}
          className="mt-1 w-full border rounded-md px-3 py-2"
          placeholder="Enter total amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mode of Payment</label>
        <select
          value={modeOfPayment}
          onChange={e => setModeOfPayment(e.target.value)}
          className="mt-1 w-full border rounded-md px-3 py-2"
        >
          <option value="cash">Cash</option>
          <option value="cheque">Cheque</option>
          <option value="pdc">PDC</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Payment Records</h3>
        {payments.map((payment, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount (₹)"
              value={payment.amount}
              onChange={e => handlePaymentChange(idx, 'amount', e.target.value)}
              className="w-[40%] border rounded-md px-3 py-2"
            />
            <input
              type="date"
              value={payment.date}
              onChange={e => handlePaymentChange(idx, 'date', e.target.value)}
              className="w-[40%] border rounded-md px-3 py-2"
            />
            <button
              onClick={() => handleDeletePayment(idx)}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Delete Payment"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          onClick={handleAddPayment}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Payment
        </button>
      </div>

      <div className="pt-4 border-t">
        <p className="text-gray-800 font-semibold">Total Paid: ₹{totalPaid}</p>
        <p className={`font-semibold ${paymentDue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          Payment Due: ₹{paymentDue}
        </p>
      </div>

      <div className="text-right">
        <button
          onClick={handleSave}
          className="px-5 py-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusForm;
