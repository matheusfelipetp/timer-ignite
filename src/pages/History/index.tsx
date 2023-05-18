import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react';
import { CyclesContext } from '../../context/CyclesContext';
import { HistoryListStyled, HistoryStyled, StatusStyled } from './styles';

export default function History() {
  const { cycles } = useContext(CyclesContext);

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
            {cycles.map((elem) => (
              <tr key={elem.id}>
                <td>{elem.task}</td>
                <td>{elem.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(elem.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {elem.finishedDate && (
                    <StatusStyled statusColor="green">Concluído</StatusStyled>
                  )}

                  {elem.interruptedDate && (
                    <StatusStyled statusColor="red">Interrompido</StatusStyled>
                  )}

                  {!elem.finishedDate && !elem.interruptedDate && (
                    <StatusStyled statusColor="yellow">
                      Em andamento
                    </StatusStyled>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryListStyled>
    </HistoryStyled>
  );
}
