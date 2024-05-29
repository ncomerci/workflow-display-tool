import { useMemo, useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Spinner } from '@chakra-ui/react'

import Workflows from '../entities/Workflows'
import styles from '../styles/View.module.css'
import { EnvironmentsQueryResult, WorkflowsQueryResult } from '../types/Tasks'

import Navbar from './Navbar/Navbar'

import Error from './Error'
import WorkflowVisualization from './WorkflowVisualization'

const GET_WORKFLOWS = gql`
  query GetWorkflows($id: ID!) {
    environment(id: $id) {
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

// So far there are only 16 environments, in the future some sort of pagination could be implemented
const GET_ENVIROMENTS = gql`
  {
    environments(orderBy: namespace) {
      id
      namespace
    }
  }
`

const DEFAULT_ENVIRONMENT_ID = '0xd28bd4e036df02abce84bc34ede2a63abcefa0567ff2d923f01c24633262c7f8'

function View() {
  const [environmentId, setEnvironmentId] = useState(DEFAULT_ENVIRONMENT_ID)
  const {
    loading: loadingWorkflows,
    error: errorWorkflows,
    data: workflowsResult,
  } = useQuery<WorkflowsQueryResult>(GET_WORKFLOWS, {
    variables: { id: environmentId },
  })
  const {
    loading: loadingEnvironments,
    error: errorEnvironments,
    data: environmentsResult,
  } = useQuery<EnvironmentsQueryResult>(GET_ENVIROMENTS)

  const enviroments = environmentsResult?.environments || []
  const tasks = workflowsResult?.environment.tasks
  const workflows = useMemo(() => (tasks ? new Workflows(tasks) : undefined), [tasks])
  const startTasks = useMemo(() => workflows?.getStartTasks() || [], [workflows])
  const [workflowIdx, setWorkflowIdx] = useState<number>(0)

  const isLoading = loadingWorkflows || loadingEnvironments
  const isError = errorWorkflows || errorEnvironments

  return (
    <>
      <Navbar
        enviromentItems={enviroments.map((env) => ({
          label: env.namespace,
          onClick: () => {
            setEnvironmentId(env.id)
            setWorkflowIdx(0)
          },
        }))}
        workflowItems={startTasks.map((task, idx) => ({
          label: task.name,
          onClick: () => setWorkflowIdx(idx),
        }))}
      />
      <div className={styles.container}>
        {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="gray.600" size="xl" />}
        {isError && <Error message={errorWorkflows?.message || errorEnvironments?.message || ''} />}
        {workflows && <WorkflowVisualization workflows={workflows} workflowIdx={workflowIdx} />}
      </div>
    </>
  )
}

export default View
