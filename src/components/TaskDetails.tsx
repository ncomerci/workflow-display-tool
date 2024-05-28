import { NULL_ADDRESS } from '../entities/Workflows'
import styles from '../styles/TaskDetails.module.css'
import { Task } from '../types/Tasks'
import { useMediaQuery } from '@chakra-ui/react'

interface Props {
  task: Task
}

function shortenAddress(address: string) {
  return `${address.slice(0, 10)}...${address.slice(-6)}`
}

function TaskDetails({ task: { taskConfig } }: Props) {
  const prevConnector = taskConfig.previousBalanceConnector
  const hasPrevConnector = prevConnector !== NULL_ADDRESS
  const nextConnector = taskConfig.nextBalanceConnector
  const hasNextConnector = nextConnector !== NULL_ADDRESS

  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <div>
      {hasPrevConnector && (
        <>
          <div>Previous Connector:</div>
          <div className={styles.connector}>{isMobile ? shortenAddress(prevConnector) : prevConnector}</div>
        </>
      )}
      {hasPrevConnector && hasNextConnector && <br />}
      {hasNextConnector && (
        <>
          <div>Next Connector:</div>
          <div className={styles.connector}>{isMobile ? shortenAddress(nextConnector) : nextConnector}</div>
        </>
      )}
    </div>
  )
}

export default TaskDetails
