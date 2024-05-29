import { Enviroment, WorkflowsEnvironment } from './Tasks'

export type QueryResult<T, K extends keyof never> = {
  [P in K]: T
}

export type WorkflowsQueryResult = QueryResult<WorkflowsEnvironment, 'environment'>

export type EnvironmentsQueryResult = QueryResult<Enviroment[], 'environments'>
