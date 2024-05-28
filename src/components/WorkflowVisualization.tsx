import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { Task } from '../types/Workflow';

import 'react-flow-renderer/dist/style.css';
import { useMemo } from 'react';
import TaskDetails from './TaskDetails';
import Workflows from '../entities/Workflows';
import { useToast } from '@chakra-ui/react';

interface Props {
  workflows: Workflows;
  workflowIdx: number;
}

function WorkflowVisualization({ workflows, workflowIdx }: Props) {
  const { nodes, edges } = useMemo(() => workflows.get(workflowIdx), [workflows, workflowIdx]);
  const toast = useToast();

  const handleNodeClick = (task: Task) => {
    toast.closeAll();
    toast({
      title: `${task.name}`,
      description: <TaskDetails task={task} />,
      status: 'info',
      duration: null,
      isClosable: true,
    });
  }

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={(_, node) => handleNodeClick(node.data)}>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default WorkflowVisualization;
