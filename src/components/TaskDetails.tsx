import { NULL_ADDRESS } from '../entities/Workflows'
import style from '../styles/TaskDetails.module.css'
import { Task } from '../types/Tasks'

interface Props {
  task: Task
}

function TaskDetails({ task: { taskConfig } }: Props) {
  const prevConnector = taskConfig.previousBalanceConnector
  const hasPrevConnector = prevConnector !== NULL_ADDRESS
  const nextConnector = taskConfig.nextBalanceConnector
  const hasNextConnector = nextConnector !== NULL_ADDRESS
  return (
    <div>
      {hasPrevConnector && (
        <>
          <div>Previous Connector:</div>
          <div className={style.connector}>{prevConnector}</div>
        </>
      )}
      {hasPrevConnector && hasNextConnector && <br />}
      {hasNextConnector && (
        <>
          <div>Next Connector:</div>
          <div className={style.connector}>{nextConnector}</div>
        </>
      )}
    </div>
  )
}

export default TaskDetails
