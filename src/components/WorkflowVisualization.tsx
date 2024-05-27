import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { Task } from '../types/Workflow';

import 'react-flow-renderer/dist/style.css';
import { useState, useMemo } from 'react';
import TaskDetails from './TaskDetails';
import Workflows from '../entities/Workflows';

interface Props {
  tasks: Task[];
}

function WorkflowVisualization({ tasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const workflows = useMemo(() => new Workflows(tasks), [tasks]);
  
  const { nodes, edges } = useMemo(() => workflows.get(0), [workflows]);

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={(_, node) => setSelectedTask(node.data)}>
      <MiniMap />
      <Controls />
      <Background />
      <div style={{ width: '300px', padding: '10px', borderLeft: '1px solid #ccc' }}>
        {selectedTask && <TaskDetails task={selectedTask} />}
      </div>
    </ReactFlow>
  );
}

export default WorkflowVisualization;
