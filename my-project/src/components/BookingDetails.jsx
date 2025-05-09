

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // ✅ Import toast
import Navbar from './Navbar';

const Button = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded bg-black text-white hover: transition ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white border shadow-sm rounded-xl w-full ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bookings/${id}`);
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Booking deleted successfully');
        navigate('/booking-dashboard');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('An error occurred while deleting');
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-xs h-screen w-screen bg-white text-black flex flex-col lg:flex-row overflow-hidden">
      <Navbar />

      <main className="flex-1 h-full overflow-y-auto px-4 md:px-6 py-6 ml-0 lg:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-1xl md:text-2xl font-semibold">Booking Details</h1>

          
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 w-full">
          <Card>
            <CardContent className="flex flex-col gap-4 text-sm">
              <div><strong>Company Name:</strong> {booking.companyName || 'N/A'}</div>
              <div><strong>Client Name:</strong> {booking.clientName || 'N/A'}</div>
              <div><strong>Client Email:</strong> {booking.clientEmail || 'N/A'}</div>
              <div><strong>Campaign Name:</strong> {booking.campaignName || 'N/A'}</div>
              <div><strong>Brand Display Name:</strong> {booking.brandDisplayName || 'N/A'}</div>
              <div><strong>Client Type:</strong> {booking.clientType || 'N/A'}</div>
              <div><strong>Industry:</strong> {booking.industry || 'N/A'}</div>
              <div><strong>Description:</strong> {booking.description || 'N/A'}</div>
              {booking.campaignImages && booking.campaignImages.length > 0 && (
  <div className="flex flex-col">
    <strong>Campaign Images:</strong>
    <div className="flex flex-wrap gap-3 mt-2">
      {booking.campaignImages.map((img, index) => (
        <div key={index} className="w-28 h-28 rounded overflow-hidden border shadow-sm">
          <img
            src={`http://localhost:3000${img}`} // Assumes "/uploads/filename" format
            alt={`Campaign ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  </div>
)}

              <div><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</div>
              
            </CardContent>
          </Card>
          <div className="flex gap-2 mt-4 md:mt-[3%]">
            <Button onClick={() => navigate('/booking-dashboard')}>Back</Button>
            <Button
  className="bg-blue-600 hover:bg-blue-700"
  onClick={() => navigate(`/pipeline/${id}`)}
>
  Track Finance
</Button>
            <Button className="ml-auto bg-red-600 hover:bg-red-700" onClick={() => setShowDeletePopup(true)}>
              Delete
            </Button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this booking?</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gray-400 hover:bg-gray-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={() => setShowDeletePopup(false)}>
                Cancel
              </Button>
              

              <Button className="bg-red-600 hover:bg-red-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

