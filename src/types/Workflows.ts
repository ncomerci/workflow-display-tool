import type { Edge, Node } from 'react-flow-renderer'
import type { Task } from './Tasks'

export type WorkflowNode = Node<{ label: string } & Task>
export type WorkflowEdge = Edge

export type WorkflowTree = {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}
