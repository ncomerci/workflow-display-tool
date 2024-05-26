import { QueryResult } from "./QueryResult";

export interface TaskConfig {
  nextBalanceConnector: string;
  previousBalanceConnector: string;
}


export interface Task {
  name: string;
  taskConfig: TaskConfig;
}

export interface Environment {
  tasks: Task[];
}

export type EnvironmentQueryResult = QueryResult<Environment, 'environment'>;