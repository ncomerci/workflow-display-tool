export interface TaskConfig {
  nextBalanceConnector: string
  previousBalanceConnector: string
}

export interface Task {
  name: string
  taskConfig: TaskConfig
}

export interface WorkflowsEnvironment {
  tasks: Task[]
}

export interface Enviroment {
  id: string
  namespace: string
}
