
// import React, { useCallback, useState } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
// } from '@xyflow/react';
// import BookingStatusForm from './modals/BookingStatusForm';
// import POForm from './modals/PoStatus';
// import '@xyflow/react/dist/style.css';
// import ArtworkForm from './modals/ArtworkStatus';
// import { ReactFlowProvider } from '@xyflow/react';
// import { useContext } from 'react';
// import InvoiceForm from './modals/InvoiceDetailsForm';
// import PaymentStatusForm from './modals/PaymentStatusForm';
// const baseNodeStyle = {
//   padding: 10,
//   border: '2px solid',
//   borderRadius: 8,
//   fontWeight: 600,
// };
// import { PipelineContext } from '../context/PipelineContext';
// import PrintingStatus from './modals/PrintingStatus';
// import MountingStatus from './modals/MountingStatus';
// const initialNodes = [
//   {
//     id: '1',
//     position: { x: 0, y: 200 },
//     data: { label: 'Booking Confirmed' },
//     style: { ...baseNodeStyle, background: '#d1fae5', borderColor: '#10b981' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
//   {
//     id: '2',
//     position: { x: 300, y: 200 },
//     data: { label: 'PO status' },
//     style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
//   // {
//   //   id: '3',
//   //   position: { x: 400, y: 0 },
//   //   data: { label: 'Send Reminder' },
//   //   style: { ...baseNodeStyle, background: '#fecaca', borderColor: '#ef4444' },
//   //   sourcePosition: 'bottom',
//   //   targetPosition: 'top',
//   // },
//   {
//     id: '4',
//     position: { x: 400, y: 450 },
//     data: { label: 'Invoice Details' },
//     style: { ...baseNodeStyle, background: '#fef3c7', borderColor: '#facc15' },
//     sourcePosition: 'right',
//     targetPosition: 'top',
//   },
//   {
//     id: '5',
//     position: { x: 600, y: 450 },
//     data: { label: 'Payment status' },
//     style: { ...baseNodeStyle, background: '#ede9fe', borderColor: '#8b5cf6' },
//     sourcePosition: 'left',
//     targetPosition: 'right',
//   },
//   {
//     id: '6',
//     position: { x: 500, y: 200 },
//     data: { label: 'Artwork status' },
//     style: { ...baseNodeStyle, background: '#fbcfe8', borderColor: '#ec4899' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
//   {
//     id: '7',
//     position: { x: 800, y: 200 },
//     data: { label: 'Printing Status' },
//     style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
//   {
//     id: '8',
//     position: { x: 1000, y: 200 },
//     data: { label: 'Mounting Status' },
//     style: { ...baseNodeStyle, background: '#fecaca', borderColor: '#ef4444' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
//   {
//     id: '9',
//     position: { x: 1200, y: 200 },
//     data: { label: 'Advertising Live' },
//     style: { ...baseNodeStyle, background: '#d9f99d', borderColor: '#84cc16' },
//     sourcePosition: 'right',
//     targetPosition: 'left',
//   },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e2-3', source: '2', target: '3', label: 'No', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e2-6', source: '2', target: '6', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e2-4', source: '2', target: '4', label: 'Yes', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e4-5', source: '4', target: '5', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e6-7', source: '6', target: '7', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e7-8', source: '7', target: '8', type: 'straight', markerEnd: 'arrowclosed' },
//   { id: 'e8-9', source: '8', target: '9', type: 'straight', markerEnd: 'arrowclosed' },
// ];


// export default function BookingFlow() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
//   const [isPoConfirmed,setIsPoConfirmed]=useState(false);
//   const { pipelineData } = useContext(PipelineContext);
//   const { fitView } = useReactFlow();

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
//   const onNodeClick = (_, node) => setSelectedNode(node);

// const filteredNodes = nodes.filter((node) => {
//   if (node.id === '1') return true;

//   if (!pipelineData.booking?.confirmed) return false;

//   if (['2', '3', '6'].includes(node.id)) return true;

//   if (['4', '5'].includes(node.id)) return pipelineData.po?.confirmed === true;

//   if (['7', '8', '9'].includes(node.id)) return pipelineData.artwork?.confirmed === true;

//   return true;
// });

// const filteredEdges = edges
//   .filter(edge => {
//     if (['e1-2', 'e2-3', 'e2-4', 'e2-6'].includes(edge.id)) {
//       return pipelineData.booking?.confirmed;
//     }

//     if (['e4-5'].includes(edge.id)) {
//       return pipelineData.po?.confirmed;
//     }

//     if (['e6-7'].includes(edge.id)) {
//       return pipelineData.artwork?.confirmed;
//     }

//     if (['e7-8', 'e8-9'].includes(edge.id)) {
//       return pipelineData.printingStatus?.confirmed;
//     }

//     return true;
//   })
//   .map(edge => {
//     if (edge.id === 'e1-2' && pipelineData.booking?.confirmed) {
//       return { ...edge, label: 'Confirmed' };
//     }

//     if (edge.id === 'e6-7' && pipelineData.artwork?.confirmed) {
//       return { ...edge, label: 'Received' };
//     }

//     if (edge.id === 'e7-8' && pipelineData.printingStatus?.confirmed) {
//       return { ...edge, label: 'Done' };
//     }

//     return edge;
//   });


  


//   return (
//     <div style={{ height: '130vh', width: '100vw' }}>
//       <ReactFlow
//         nodes={filteredNodes}
//         edges={filteredEdges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeClick={onNodeClick}
//         fitView
//         zoomOnScroll="false"
//         panOnScroll="false"
//       >
//         {/* <MiniMap /> */}
//         {/* <Controls /> */}
//         {/* <Background /> */}
//       </ReactFlow>

//       {selectedNode && (
//   <div style={modalStyle}>
//     <div style={modalContentStyle}>
   
//       {selectedNode.id === '1' && (

//         <BookingStatusForm onConfirm={() => {
//           setIsBookingConfirmed(true);
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }}
//         />
//       )}

//       {selectedNode.id === '2' && (
 
//         <POForm  onConfirm={() => {
//           setIsBookingConfirmed(true);
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }}/>
//       )}
//       {selectedNode.id === '6' && (

//         <ArtworkForm onConfirm={() => {
//           setIsBookingConfirmed(true);
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }}/>
//       )}

//       {selectedNode.id === '4' && (
//         <InvoiceForm onConfirm={() => {
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }} />
       
//       )}
//       {selectedNode.id === '5' && (
//         <div>
//  <PaymentStatusForm onConfirm={() => {
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }} />
//         </div>
       
       
//       )}
//       {selectedNode.id === '7' && (
//         <PrintingStatus onConfirm={() => {
//           setIsBookingConfirmed(true);
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }}/>
//       )}
//       {selectedNode.id === '8' && (
//         <MountingStatus onConfirm={() => {
//           setIsBookingConfirmed(true);
//           setSelectedNode(null);  // this will close the modal
//           fitView();
//         }}/>
//       )}

//       {/* Add more forms for other nodes here */}
      
//       <button className='text-xs' style={{ marginTop: 10 }} onClick={() => setSelectedNode(null)}>Close</button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

// // Simple modal styles
// const modalStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   zIndex: 1000,
//   width: '100vw',
//   height: '100vh',
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// const modalContentStyle = {
//   background: 'white',
//   padding: '20px',
//   borderRadius: '8px',
//   height:'90vh',
//   width: '60vw',
//   textAlign: 'center',

// };

// ============================
// BookingPipeline.jsx (Updated)
// ============================

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import BookingStatusForm from './modals/BookingStatusForm';
import POForm from './modals/PoStatus';
import '@xyflow/react/dist/style.css';
import ArtworkForm from './modals/ArtworkStatus';
import { useContext } from 'react';
import InvoiceForm from './modals/InvoiceDetailsForm';
import PaymentStatusForm from './modals/PaymentStatusForm';
import PrintingStatus from './modals/PrintingStatus';
import MountingStatus from './modals/MountingStatus';
import { PipelineContext } from '../context/PipelineContext';
import axios from 'axios';

const baseNodeStyle = {
  padding: 10,
  border: '2px solid',
  borderRadius: 8,
  fontWeight: 600,
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 200 }, data: { label: 'Booking Confirmed' }, style: { ...baseNodeStyle, background: '#d1fae5', borderColor: '#10b981' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: '2', position: { x: 300, y: 200 }, data: { label: 'PO status' }, style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: '4', position: { x: 400, y: 450 }, data: { label: 'Invoice Details' }, style: { ...baseNodeStyle, background: '#fef3c7', borderColor: '#facc15' }, sourcePosition: 'right', targetPosition: 'top' },
  { id: '5', position: { x: 600, y: 450 }, data: { label: 'Payment status' }, style: { ...baseNodeStyle, background: '#ede9fe', borderColor: '#8b5cf6' }, sourcePosition: 'left', targetPosition: 'right' },
  { id: '6', position: { x: 500, y: 200 }, data: { label: 'Artwork status' }, style: { ...baseNodeStyle, background: '#fbcfe8', borderColor: '#ec4899' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: '7', position: { x: 800, y: 200 }, data: { label: 'Printing Status' }, style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: '8', position: { x: 1000, y: 200 }, data: { label: 'Mounting Status' }, style: { ...baseNodeStyle, background: '#fecaca', borderColor: '#ef4444' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: '9', position: { x: 1200, y: 200 }, data: { label: 'Advertising Live' }, style: { ...baseNodeStyle, background: '#d9f99d', borderColor: '#84cc16' }, sourcePosition: 'right', targetPosition: 'left' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e2-6', source: '2', target: '6', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e2-4', source: '2', target: '4', label: 'Yes', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e4-5', source: '4', target: '5', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e6-7', source: '6', target: '7', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e7-8', source: '7', target: '8', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e8-9', source: '8', target: '9', type: 'straight', markerEnd: 'arrowclosed' },
];

export default function BookingFlow({ bookingId }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const { pipelineData, setPipelineData } = useContext(PipelineContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();

  const { fitView } = useReactFlow();
const BookingId=id;
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeClick = (_, node) => setSelectedNode(node);

  useEffect(() => {
    const fetchOrCreatePipeline = async () => {
      try {
        const res1= await axios.get(`http://localhost:3000/api/bookings/${BookingId}`);
        console.log(res1);
        const res = await axios.get(`http://localhost:3000/api/pipeline/${BookingId}`);
        setPipelineData(res.data);
        console.log(pipelineData);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          const createRes = await axios.post(`http://localhost:3000/api/pipeline/${BookingId}`);
          setPipelineData(createRes.data);
        } else {
          console.error('Error fetching/creating pipeline:', err);
        }
      }
    };

    fetchOrCreatePipeline();
  }, [BookingId,bookingId]);

  const filteredNodes = nodes.filter((node) => {
    if (node.id === '1') return true;
    if (!pipelineData?.bookingStatus?.confirmed) return false;
    if (['2', '6'].includes(node.id)) return true;
    if (['4', '5'].includes(node.id)) return pipelineData.po?.confirmed;
    if (['7'].includes(node.id)) return pipelineData.artwork?.confirmed;
    if (['8'].includes(node.id)) return pipelineData.printingStatus?.confirmed;
    if (['9'].includes(node.id)) return pipelineData.mountingStatus?.confirmed;
    return true;
  });

 
  
  
  

  // const filteredEdges = edges
  // .filter(edge => {
  //   if (['e1-2', 'e2-6', 'e2-4'].includes(edge.id)) {
  //     return pipelineData?.bookingStatus?.confirmed;
  //   }
  //   if (edge.id === 'e4-5') return pipelineData.po?.confirmed;
  //   if (edge.id === 'e6-7') return pipelineData.artwork?.confirmed;
  //   if (edge.id === 'e7-8') return pipelineData.printingStatus?.confirmed;
  //   if (edge.id === 'e8-9') return pipelineData.mountingStatus?.confirmed;
  //   return true;
  // })
  // .map(edge => {
  //   if (edge.id === 'e1-2' && pipelineData?.bookingStatus?.confirmed) {
  //     return { ...edge, label: 'Confirmed' };
  //   }
  //   if (edge.id === 'e6-7' && pipelineData?.artwork?.confirmed) {
  //     return { ...edge, label: 'Received' };
  //   }
  //   if (edge.id === 'e7-8' && pipelineData?.printingStatus?.confirmed) {
  //     return { ...edge, label: 'Done' };
  //   }
  //   if (edge.id === 'e8-9' && pipelineData?.printingStatus?.confirmed) {
  //     return { ...edge, label: 'Done' };
  //   }
  //   return edge;
  // });

  const filteredEdges = edges
  .filter(edge => {
    if (['e1-2', 'e2-6', 'e2-4'].includes(edge.id)) {
      return pipelineData?.bookingStatus?.confirmed;
    }
    if (edge.id === 'e4-5') return pipelineData.po?.confirmed;
    if (edge.id === 'e6-7') return pipelineData.artwork?.confirmed;
    if (edge.id === 'e7-8') return pipelineData.printingStatus?.confirmed;
    if (edge.id === 'e8-9') return pipelineData.mountingStatus?.confirmed;
    return true;
  })
  .map(edge => {
    if (edge.id === 'e1-2' && pipelineData?.bookingStatus?.confirmed) {
      return { ...edge, label: 'Confirmed' };
    }
    if (edge.id === 'e6-7' && pipelineData?.artwork?.confirmed) {
      return { ...edge, label: 'Received' };
    }
    if (edge.id === 'e7-8' && pipelineData?.printingStatus?.confirmed) {
      return { ...edge, label: 'Done' };
    }
    if (edge.id === 'e8-9' && pipelineData?.printingStatus?.confirmed) {
      return { ...edge, label: 'Done' };
    }
    if (edge.id === 'e4-5' && pipelineData?.invoice?.invoiceNumber) {
      return { ...edge, label: 'Received' };
    }
    return edge;
  });

  



  return (
    <div style={{ height: '130vh', width: '100vw' }}>
      <button
  onClick={() => setShowDeleteModal(true)}
  className="absolute top-4 right-6 bg-red-600 text-white text-sm px-4 py-1 rounded shadow hover:bg-red-700 z-50"
>
  Delete Pipeline
</button>

      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        zoomOnScroll={false}
        panOnScroll={false}
      >
      </ReactFlow>

      {selectedNode && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            {selectedNode.id === '1' && <BookingStatusForm bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '2' && <POForm bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '6' && <ArtworkForm bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '4' && <InvoiceForm bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '5' && <PaymentStatusForm bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '7' && <PrintingStatus bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}
            {selectedNode.id === '8' && <MountingStatus bookingId={BookingId} onConfirm={() => { setSelectedNode(null); fitView(); }} />}

            <button className='text-xs mt-3' onClick={() => setSelectedNode(null)}>Close</button>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div style={modalStyle}>
    <div style={{ ...modalContentStyle, width: '400px', height: '200px' }}>
      <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this pipeline?</h3>
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:3000/api/pipeline/${BookingId}`);
              setPipelineData(null); // reset state
              setShowDeleteModal(false);
              window.location.reload(); // or redirect
            } catch (err) {
              console.error('Failed to delete pipeline:', err);
              alert('Error deleting pipeline');
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}


const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  height: '90vh',
  width: '60vw',
  textAlign: 'center',
};




