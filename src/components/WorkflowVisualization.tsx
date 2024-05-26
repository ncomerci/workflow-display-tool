import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'react-flow-renderer';
import { Task } from '../types/Workflow';

import 'react-flow-renderer/dist/style.css';
import { useState, useMemo } from 'react';
import TaskDetails from './TaskDetails';
import Workflow from '../entities/Workflow';

interface Props {
  tasks: Task[];
}

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000'

type WorkflowNode = Node<{ label: string } & Task>

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

function generateNodesAndEdges(workflow: Workflow): { nodes: WorkflowNode[], edges: Edge[] } {
  const nodes: WorkflowNode[] = [];
  const edges: Edge[] = [];
  const visited = new Set<string>();
  const positionMap = new Map<string, { x: number; y: number }>();

  function traverse(workflow: Workflow, xPosition: number, yPosition: number, parentId?: string) {
    const head = workflow.getHead();
    const nodeId = head.name;
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      const position = { x: xPosition, y: yPosition };
      positionMap.set(nodeId, position);
      nodes.push({
        id: nodeId,
        type: 'default',
        data: { label: nodeId, ...head },
        position
      });

      if (parentId) {
        edges.push({
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: 'default'
        });
      }

      workflow.getChildren().forEach((child, index) => traverse(child, xPosition + index * 200, yPosition + 100, nodeId));
    }
  }

  traverse(workflow, 0, 0);
  return { nodes, edges };
}

function WorkflowVisualization({ tasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const workflows = useMemo(() => getDividedWorkflows(tasks), [tasks]);
  const selectedWorkflow = workflows[2];
  
  const { nodes, edges } = useMemo(() => generateNodesAndEdges(selectedWorkflow), [selectedWorkflow]);

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
