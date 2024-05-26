import { Task } from "../types/Workflow";

interface Props { 
  task: Task;
}

function TaskDetails({ task: { name, taskConfig } }: Props) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Next Balance Connector: {taskConfig.nextBalanceConnector}</p>
      <p>Previous Balance Connector: {taskConfig.previousBalanceConnector}</p>
    </div>
  );
}

export default TaskDetails