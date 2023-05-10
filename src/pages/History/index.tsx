import { HistoryListStyled, HistoryStyled, StatusStyled } from './styles';

export default function History() {
  return (
    <HistoryStyled>
      <h1>Meu histórico</h1>

      <HistoryListStyled>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <StatusStyled statusColor="yellow">Em andamento</StatusStyled>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <StatusStyled statusColor="yellow">Em andamento</StatusStyled>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <StatusStyled statusColor="yellow">Em andamento</StatusStyled>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <StatusStyled statusColor="yellow">Em andamento</StatusStyled>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 semanas</td>
              <td>
                <StatusStyled statusColor="yellow">Em andamento</StatusStyled>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryListStyled>
    </HistoryStyled>
  );
}
