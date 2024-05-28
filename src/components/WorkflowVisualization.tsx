import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow'
import 'reactflow/dist/style.css'

import { useToast } from '@chakra-ui/react'

import Workflows from '../entities/Workflows'
import styles from '../styles/WorkflowVisualization.module.css'
import { Task } from '../types/Tasks'

import TaskDetails from './TaskDetails'

interface Props {
  workflows: Workflows
  workflowIdx: number
}

type HighlightedElements = {
  nodes: Set<string>
  edges: Set<string>
}

function WorkflowVisualization({ workflows, workflowIdx }: Props) {
  const { nodes, edges } = useMemo(() => workflows.get(workflowIdx), [workflows, workflowIdx])
  const [currentNodeIdx, setCurrentNodeIdx] = useState<string>()
  const toast = useToast()
  const [highlightedElements, setHighlightedElements] = useState<HighlightedElements>({
    nodes: new Set(),
    edges: new Set(),
  })
  const resetHighlightedElements = () => setHighlightedElements({ nodes: new Set(), edges: new Set() })

  useEffect(() => {
    toast.closeAll()
    resetHighlightedElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowIdx])

  const handleNodeClick = useCallback(
    (node: Node) => {
      toast.closeAll()
      resetHighlightedElements()
      if (currentNodeIdx !== node.id) {
        const task = node.data as Task
        toast({
          title: `${task.name}`,
          description: <TaskDetails task={task} />,
          status: 'info',
          duration: null,
          isClosable: true,
        })
      }

      const newHighlightedElements: HighlightedElements = { nodes: new Set(), edges: new Set() }
      const traverseBackwards = (currentNodeId: string) => {
        newHighlightedElements.nodes.add(currentNodeId)
        edges.forEach((edge) => {
          if (edge.target === currentNodeId) {
            newHighlightedElements.edges.add(edge.id)
            traverseBackwards(edge.source)
          }
        })
      }

      if (currentNodeIdx !== node.id) {
        traverseBackwards(node.id)
        setHighlightedElements(newHighlightedElements)
        setCurrentNodeIdx(node.id)
      } else {
        setCurrentNodeIdx(undefined)
      }
    },
    [toast, currentNodeIdx, edges]
  )

  const getNodeClassName = (node: Node) => {
    return highlightedElements.nodes.has(node.id) ? styles['node-highlight'] : ''
  }

  const getEdgeClassName = (edge: Edge) => {
    return highlightedElements.edges.has(edge.id) ? styles['edge-highlight'] : ''
  }

  return (
    <ReactFlow
      nodes={nodes.map((node) => ({ ...node, className: getNodeClassName(node) }))}
      edges={edges.map((edge) => ({ ...edge, className: getEdgeClassName(edge) }))}
      onNodeClick={(_, node) => handleNodeClick(node)}
    >
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export default WorkflowVisualization
