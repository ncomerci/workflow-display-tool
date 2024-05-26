import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { Task } from '../types/Workflow';

import 'react-flow-renderer/dist/style.css';
import { useState, useEffect } from 'react';
import TaskDetails from './TaskDetails';
import Workflow from '../entities/Workflow';

interface Props {
  tasks: Task[];
}

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000'

function getWorkflow(firstTask: Task, tasks: Task[]): Workflow {
  const head = new Workflow(firstTask);
  const stack: { workflow: Workflow; tasks: Task[] }[] = [];
  const visited = new Set<string>();

  visited.add(firstTask.taskConfig.nextBalanceConnector);

  if (firstTask.taskConfig.nextBalanceConnector !== NULL_ADDRESS) {
    const nextTasks = tasks.filter(t => t.taskConfig.previousBalanceConnector === firstTask.taskConfig.nextBalanceConnector);
    stack.push({ workflow: head, tasks: nextTasks });
  }

  while (stack.length > 0) {
    const { workflow, tasks: childrenTasks } = stack.pop()!;
    childrenTasks.forEach(task => {
      const child = workflow.addChild(task);
      if (task.taskConfig.nextBalanceConnector !== NULL_ADDRESS && !visited.has(task.taskConfig.nextBalanceConnector)) {
        visited.add(task.taskConfig.nextBalanceConnector);
        const grandChildrenTasks = tasks.filter(t => t.taskConfig.previousBalanceConnector === task.taskConfig.nextBalanceConnector);
        if (grandChildrenTasks.length > 0) {
          stack.push({ workflow: child, tasks: grandChildrenTasks });
        }
      }
    });
  }

  return head;
}

function getDividedWorkflows(tasks: Task[]): Workflow[] {
  const firstTasks = tasks.filter(t => t.taskConfig.previousBalanceConnector === NULL_ADDRESS);
  return firstTasks.map(t => getWorkflow(t, [...tasks]));
}

function WorkflowVisualization({ tasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  useEffect(() => {
    const result = getDividedWorkflows(tasks)
    console.log(result);
  }, [tasks])
  
  // console.log(getDividedTasks(tasks));
  const nodes = tasks.map((task, index) => ({
    id: `${index}`,
    type: 'default',
    data: { label: task.name },
    position: { x: 0, y: index * 100},
  }));

  const edges = tasks.map(({ taskConfig: { previousBalanceConnector, nextBalanceConnector } }, index) => {
    const sourceIndex = tasks.findIndex(t => t.taskConfig.nextBalanceConnector === previousBalanceConnector);
    const targetIndex = tasks.findIndex(t => t.taskConfig.previousBalanceConnector === nextBalanceConnector);
    return {
      id: `edge-${index}`,
      // source: '',
      target: '',
      source: previousBalanceConnector === NULL_ADDRESS ? '' : `${sourceIndex}`,
      // target: nextBalanceConnector === NULL_ADDRESS ? '' : `${targetIndex}`,
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
