import type { Edge, Node } from 'reactflow'
import type { Task } from './Tasks'

export type WorkflowNode = Node<{ label: string } & Task>
export type WorkflowEdge = Edge

export type WorkflowTree = {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}
