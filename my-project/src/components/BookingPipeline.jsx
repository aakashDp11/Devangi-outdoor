
import React, { useCallback, useState } from 'react';
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
import { ReactFlowProvider } from '@xyflow/react';
import { useContext } from 'react';
import InvoiceForm from './modals/InvoiceDetailsForm';
import PaymentStatusForm from './modals/PaymentStatusForm';
const baseNodeStyle = {
  padding: 10,
  border: '2px solid',
  borderRadius: 8,
  fontWeight: 600,
};
import { PipelineContext } from '../context/PipelineContext';
import PrintingStatus from './modals/PrintingStatus';
import MountingStatus from './modals/MountingStatus';
const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 200 },
    data: { label: 'Booking Confirmed' },
    style: { ...baseNodeStyle, background: '#d1fae5', borderColor: '#10b981' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '2',
    position: { x: 300, y: 200 },
    data: { label: 'PO status' },
    style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  // {
  //   id: '3',
  //   position: { x: 400, y: 0 },
  //   data: { label: 'Send Reminder' },
  //   style: { ...baseNodeStyle, background: '#fecaca', borderColor: '#ef4444' },
  //   sourcePosition: 'bottom',
  //   targetPosition: 'top',
  // },
  {
    id: '4',
    position: { x: 400, y: 450 },
    data: { label: 'Invoice Details' },
    style: { ...baseNodeStyle, background: '#fef3c7', borderColor: '#facc15' },
    sourcePosition: 'right',
    targetPosition: 'top',
  },
  {
    id: '5',
    position: { x: 600, y: 450 },
    data: { label: 'Payment status' },
    style: { ...baseNodeStyle, background: '#ede9fe', borderColor: '#8b5cf6' },
    sourcePosition: 'left',
    targetPosition: 'right',
  },
  {
    id: '6',
    position: { x: 500, y: 200 },
    data: { label: 'Artwork status' },
    style: { ...baseNodeStyle, background: '#fbcfe8', borderColor: '#ec4899' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '7',
    position: { x: 800, y: 200 },
    data: { label: 'Printing Status' },
    style: { ...baseNodeStyle, background: '#bfdbfe', borderColor: '#3b82f6' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '8',
    position: { x: 1000, y: 200 },
    data: { label: 'Mounting Status' },
    style: { ...baseNodeStyle, background: '#fecaca', borderColor: '#ef4444' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '9',
    position: { x: 1200, y: 200 },
    data: { label: 'Advertising Live' },
    style: { ...baseNodeStyle, background: '#d9f99d', borderColor: '#84cc16' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e2-3', source: '2', target: '3', label: 'No', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e2-6', source: '2', target: '6', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e2-4', source: '2', target: '4', label: 'Yes', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e4-5', source: '4', target: '5', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e6-7', source: '6', target: '7', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e7-8', source: '7', target: '8', type: 'straight', markerEnd: 'arrowclosed' },
  { id: 'e8-9', source: '8', target: '9', type: 'straight', markerEnd: 'arrowclosed' },
];


export default function BookingFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isPoConfirmed,setIsPoConfirmed]=useState(false);
  const { pipelineData } = useContext(PipelineContext);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeClick = (_, node) => setSelectedNode(node);

const filteredNodes = nodes.filter((node) => {
  if (node.id === '1') return true;

  if (!pipelineData.booking?.confirmed) return false;

  if (['2', '3', '6'].includes(node.id)) return true;

  if (['4', '5'].includes(node.id)) return pipelineData.po?.confirmed === true;

  if (['7', '8', '9'].includes(node.id)) return pipelineData.artwork?.confirmed === true;

  return true;
});
// const filteredEdges = edges
//   .filter(edge => {
//     if (['e1-2', 'e2-3', 'e2-4', 'e2-6'].includes(edge.id)) {
//       return pipelineData.booking?.confirmed;
//     }

//     if (['e4-5'].includes(edge.id)) {
//       return pipelineData.po?.confirmed;
//     }

//     if (['e6-7', 'e7-8', 'e8-9'].includes(edge.id)) {
//       return pipelineData.artwork?.confirmed;
//     }

//     return true;
//   })
//   .map(edge => {
//     // Edge from Booking → PO
//     if (edge.id === 'e1-2' && pipelineData.booking?.confirmed) {
//       return { ...edge, label: 'Confirmed' };
//     }

//     // Edge from Upload Artwork → Printing Status
//     if (edge.id === 'e6-7' && pipelineData.artwork?.confirmed) {
//       return { ...edge, label: 'Received' };
//     }

//     return edge;
//   });
const filteredEdges = edges
  .filter(edge => {
    if (['e1-2', 'e2-3', 'e2-4', 'e2-6'].includes(edge.id)) {
      return pipelineData.booking?.confirmed;
    }

    if (['e4-5'].includes(edge.id)) {
      return pipelineData.po?.confirmed;
    }

    if (['e6-7'].includes(edge.id)) {
      return pipelineData.artwork?.confirmed;
    }

    if (['e7-8', 'e8-9'].includes(edge.id)) {
      return pipelineData.printingStatus?.confirmed;
    }

    return true;
  })
  .map(edge => {
    if (edge.id === 'e1-2' && pipelineData.booking?.confirmed) {
      return { ...edge, label: 'Confirmed' };
    }

    if (edge.id === 'e6-7' && pipelineData.artwork?.confirmed) {
      return { ...edge, label: 'Received' };
    }

    if (edge.id === 'e7-8' && pipelineData.printingStatus?.confirmed) {
      return { ...edge, label: 'Done' };
    }

    return edge;
  });

//   const filteredNodes = nodes.filter((node) => {
//     const id = node.id;
//     if (id === '1') return true; // always show Booking Confirmed
//     if (['2', '3', '4', '6'].includes(id)) return pipelineData.booking?.confirmed;
//     if (id === '5') return pipelineData.po?.confirmed;
//     if (id === '7') return pipelineData.artwork?.confirmed;
//     if (['8', '9'].includes(id)) return pipelineData.printingStatus?.confirmed;
//     return true;
//   });
  


  return (
    <div style={{ height: '130vh', width: '100vw' }}>
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        zoomOnScroll="false"
        panOnScroll="false"
      >
        {/* <MiniMap /> */}
        {/* <Controls /> */}
        {/* <Background /> */}
      </ReactFlow>

      {selectedNode && (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
   
      {selectedNode.id === '1' && (

        <BookingStatusForm onConfirm={() => {
          setIsBookingConfirmed(true);
          setSelectedNode(null);  // this will close the modal
          fitView();
        }}
        />
      )}

      {selectedNode.id === '2' && (
 
        <POForm  onConfirm={() => {
          setIsBookingConfirmed(true);
          setSelectedNode(null);  // this will close the modal
          fitView();
        }}/>
      )}
      {selectedNode.id === '6' && (

        <ArtworkForm onConfirm={() => {
          setIsBookingConfirmed(true);
          setSelectedNode(null);  // this will close the modal
          fitView();
        }}/>
      )}

      {selectedNode.id === '4' && (
        <InvoiceForm onConfirm={() => {
          setSelectedNode(null);  // this will close the modal
          fitView();
        }} />
       
      )}
      {selectedNode.id === '5' && (
        <div>
 <PaymentStatusForm onConfirm={() => {
          setSelectedNode(null);  // this will close the modal
          fitView();
        }} />
        </div>
       
       
      )}
      {selectedNode.id === '7' && (
        <PrintingStatus onConfirm={() => {
          setIsBookingConfirmed(true);
          setSelectedNode(null);  // this will close the modal
          fitView();
        }}/>
      )}
      {selectedNode.id === '8' && (
        <MountingStatus onConfirm={() => {
          setIsBookingConfirmed(true);
          setSelectedNode(null);  // this will close the modal
          fitView();
        }}/>
      )}

      {/* Add more forms for other nodes here */}
      
      <button className='text-xs' style={{ marginTop: 10 }} onClick={() => setSelectedNode(null)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
}

// Simple modal styles
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
  height:'90vh',
  width: '60vw',
  textAlign: 'center',

};





