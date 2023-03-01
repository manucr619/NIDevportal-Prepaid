import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  FitView,
  Edge,
} from "reactflow";
import {
  FiBox,
  FiCreditCard,
  FiHome,
  FiUser,
  FiUserCheck,
  FiUserMinus,
  FiUserPlus,
} from "react-icons/fi";

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";

const proOptions = { hideAttribution: true };

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      icon: <FiUser />,
      title: "OAuth ",
      url: (
        <a
          href="https://test-developer.ads.network.ae/apis/getingstarted?doc_id=1"
          target="_blank"
        >
          Generate Token API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: {
      icon: <FiUserPlus />,
      title: "Create New Client",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/account-services?categoryid=2&apiid=apiid-19&v=V2"
          target="_blank"
        >
          Client Create API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: {
      icon: <FiBox />,
      title: "Create new account",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/account-services?categoryid=2&apiid=apiid-29&v=V2"
          target="_blank"
        >
          Account Create API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "4",
    position: { x: 750, y: 0 },
    data: {
      icon: <FiCreditCard />,
      title: "Create New Card",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getproductapis/prepaid-solutions?productid=1&apiid=apiid-30&v=V2"
          target="_blank"
        >
          Card Create API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "5",
    position: { x: 1000, y: 0 },
    data: {
      icon: <FiUserPlus />,
      title: "Activate Card",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/card-services?categoryid=1&apiid=apiid-8&v=V2"
          target="_blank"
        >
          Activate Card API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "6",
    position: { x: 1250, y: 0 },
    data: {
      title: "💳 Set Card PIN",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/pin-management?categoryid=7&apiid=apiid-14&v=V2"
          target="_blank"
        >
          Card PIN API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "7",
    position: { x: 1550, y: 0 },
    data: {
      icon: <FiCreditCard />,
      title: "Intiate a Transaction",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/transactions?categoryid=3&apiid=apiid-17&v=V2"
          target="_blank"
        >
          Transaction API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "8",
    position: { x: 1550, y: -200 },
    data: {
      icon: <FiBox />,
      title: "Retrieves plans attached",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/buy-now-pay-later?categoryid=6&apiid=apiid-28&v=V2"
          target="_blank"
        >
          Get Plans API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "9",
    position: { x: 1550, y: 100 },
    data: {
      icon: <FiBox />,
      title: "Tokenized Card Number",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/card-services?categoryid=1&apiid=apiid-1&v=V2"
          target="_blank"
        >
          Get Lookup Card Identifier API
        </a>
      ),
    },
    type: "turbo",
  },
  {
    id: "10",
    position: { x: 1550, y: -100 },
    data: {
      icon: <FiBox />,
      title: "Limits attached to a card",
      url: (
        <a
          href="https://test-developer.ads.network.ae/getapis/card-services?categoryid=1&apiid=apiid-27&v=V2"
          target="_blank"
        >
          Get Limits API
        </a>
      ),
    },
    type: "turbo",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: false,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: false,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: false,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: false,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: false,
  },

  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: true,
  },
  {
    id: "e6-8",
    source: "6",
    target: "8",
    animated: true,
  },
  {
    id: "e6-9",
    source: "6",
    target: "9",
    animated: true,
  },
  {
    id: "e6-10",
    source: "6",
    target: "10",
    animated: true,
  },
];

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      proOptions={proOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default Flow;
