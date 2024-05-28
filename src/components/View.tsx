import { useMemo, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import Workflows from '../entities/Workflows'
import style from '../styles/View.module.css'
import { EnvironmentQueryResult } from '../types/Workflow'

import Navbar from './Navbar/Navbar'

import WorkflowVisualization from './WorkflowVisualization'

const GET_WORKFLOWS = gql`
  {
    environment(id: "0xd28bd4e036df02abce84bc34ede2a63abcefa0567ff2d923f01c24633262c7f8") {
      tasks {
        name
        taskConfig {
          nextBalanceConnector
          previousBalanceConnector
        }
      }
    }
  }
`

function View() {
  const { loading, error, data } = useQuery<EnvironmentQueryResult>(GET_WORKFLOWS)
  const tasks = data?.environment.tasks
  const workflows = useMemo(() => (tasks ? new Workflows(tasks) : undefined), [tasks])
  const startTasks = useMemo(() => workflows?.getStartTasks() || [], [workflows])
  const [workflowIdx, setWorkflowIdx] = useState<number>(0)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Navbar
        workflowItems={startTasks.map((task, idx) => ({
          label: task.name,
          onClick: () => setWorkflowIdx(idx),
        }))}
      />
      <div className={style.container}>
        {workflows && <WorkflowVisualization workflows={workflows} workflowIdx={workflowIdx} />}
      </div>
    </>
  )
}

export default View
