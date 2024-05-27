import TaskNode from './TaskNode';
import { Task } from '../types/Workflow';
import type { Node, Edge } from 'react-flow-renderer';

type WorkflowNode = Node<{ label: string } & Task>;

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000';

export default class Workflows {

  private taskTrees: TaskNode[];

  constructor(tasks: Task[]) {
    this.taskTrees = this.getDividedTrees(tasks);
  }

  private getTasksTree(firstTask: Task, tasks: Task[]): TaskNode {
    const head = new TaskNode(firstTask);
    const stack: { workflow: TaskNode; tasks: Task[] }[] = [];
    const visited = new Set<string>();
  
    visited.add(firstTask.taskConfig.nextBalanceConnector);
  
    if (firstTask.taskConfig.nextBalanceConnector !== NULL_ADDRESS) {
      const nextTasks = tasks.filter(
        (t) =>
          t.taskConfig.previousBalanceConnector ===
          firstTask.taskConfig.nextBalanceConnector
      );
      stack.push({ workflow: head, tasks: nextTasks });
    }
  
    while (stack.length > 0) {
      const { workflow, tasks: childrenTasks } = stack.pop()!;
      childrenTasks.forEach((task) => {
        const child = workflow.addChild(task);
        if (
          task.taskConfig.nextBalanceConnector !== NULL_ADDRESS &&
          !visited.has(task.taskConfig.nextBalanceConnector)
        ) {
          visited.add(task.taskConfig.nextBalanceConnector);
          const grandChildrenTasks = tasks.filter(
            (t) =>
              t.taskConfig.previousBalanceConnector ===
              task.taskConfig.nextBalanceConnector
          );
          if (grandChildrenTasks.length > 0) {
            stack.push({ workflow: child, tasks: grandChildrenTasks });
          }
        }
      });
    }
  
    return head;
  } 

  private getDividedTrees(tasks: Task[]): TaskNode[] {
    const firstTasks = tasks.filter(
      (t) => t.taskConfig.previousBalanceConnector === NULL_ADDRESS
    );
    return firstTasks.map((t) => this.getTasksTree(t, tasks));
  }

  public size(): number {
    return this.taskTrees.length;
  }

  public get(treeIdx: number): {
    nodes: WorkflowNode[];
    edges: Edge[];
  } {
    if(treeIdx < 0 || treeIdx >= this.size()) {
      throw new Error(`Invalid tree index: ${treeIdx}`);
    }
    const selectedTree = this.taskTrees[treeIdx];
    const nodes: WorkflowNode[] = [];
    const edges: Edge[] = [];
    const visited = new Set<string>();
    const positionMap = new Map<string, { x: number; y: number }>();
  
    const traverse = (
      taskTree: TaskNode,
      xPosition: number,
      depth: number,
      parentId?: string
    ) => {
      const head = taskTree.getHead();
      const nodeId = head.name;
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        const position = { x: xPosition, y: depth * 100 };
        positionMap.set(nodeId, position);
        nodes.push({
          id: nodeId,
          type: "default",
          data: { label: nodeId, ...head },
          position,
        });
  
        if (parentId) {
          edges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            type: "default",
          });
        }
  
        taskTree
          .getChildren()
          .forEach((child, index) =>
            traverse(child, xPosition + index * 200, depth + 1, nodeId)
          );

        if (head.taskConfig.nextBalanceConnector !== NULL_ADDRESS && taskTree.getChildren().length === 0) {
          const targetTask = findTaskInTree(selectedTree, head.taskConfig.nextBalanceConnector);
          if (targetTask) {
            edges.push({
              id: `${nodeId}-${targetTask.getHead().name}`,
              source: nodeId,
              target: targetTask.getHead().name,
              type: 'default',
            });
          }
        }
      }
    }

    const findTaskInTree = (tree: TaskNode, connector: string): TaskNode | null => {
      if (tree.getHead().taskConfig.previousBalanceConnector === connector) {
        return tree;
      }
      for (const child of tree.getChildren()) {
        const result = findTaskInTree(child, connector);
        if (result) {
          return result;
        }
      }
      return null;
    }
  
    traverse(selectedTree, 0, 0);
    return { nodes, edges };
  }
}
