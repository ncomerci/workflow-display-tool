import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { Task } from '../types/Workflow';

import 'react-flow-renderer/dist/style.css';
import { useState } from 'react';
import TaskDetails from './TaskDetails';

interface Props {
  tasks: Task[];
}

function WorkflowVisualization({ tasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const nodes = tasks.map((task, index) => ({
    id: `${index}`,
    type: 'default',
    data: { label: task.name },
    position: { x: 0, y: index * 100},
  }));

  const edges = tasks.map((task, index) => {
      const targetIndex = tasks.findIndex(t => t.taskConfig.previousBalanceConnector === task.taskConfig.nextBalanceConnector);
      return {
        id: `edge-${index}`,
        source: `${index}`,
        target: `${targetIndex}`,
        type: 'default',
      };
    });

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={(_, node) => setSelectedTask(node.id)}>
      <MiniMap />
      <Controls />
      <Background />
      <div style={{ width: '300px', padding: '10px', borderLeft: '1px solid #ccc' }}>
        {selectedTask && <TaskDetails task={tasks[Number(selectedTask)]} />}
      </div>
    </ReactFlow>
  );
}

export default WorkflowVisualization;
