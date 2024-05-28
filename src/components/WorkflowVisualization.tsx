import { useMemo } from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer'
import 'react-flow-renderer/dist/style.css'

import { useToast } from '@chakra-ui/react'

import Workflows from '../entities/Workflows'
import { Task } from '../types/Workflow'

import TaskDetails from './TaskDetails'

interface Props {
  workflows: Workflows
  workflowIdx: number
}

function WorkflowVisualization({ workflows, workflowIdx }: Props) {
  const { nodes, edges } = useMemo(() => workflows.get(workflowIdx), [workflows, workflowIdx])
  const toast = useToast()

  const handleNodeClick = (task: Task) => {
    toast.closeAll()
    toast({
      title: `${task.name}`,
      description: <TaskDetails task={task} />,
      status: 'info',
      duration: null,
      isClosable: true,
    })
  }

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={(_, node) => handleNodeClick(node.data)}>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export default WorkflowVisualization
