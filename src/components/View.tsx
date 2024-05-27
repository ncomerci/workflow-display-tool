import { useQuery, gql } from '@apollo/client';
import { EnvironmentQueryResult } from '../types/Workflow';
import WorkflowVisualization from './WorkflowVisualization';

import style from './View.module.css';

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
`;

function View() {
  const { loading, error, data } =
    useQuery<EnvironmentQueryResult>(GET_WORKFLOWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={style.container}>
      {data && <WorkflowVisualization tasks={data.environment.tasks} />}
    </div>
  );
}

export default View;
