import { useContext } from 'react';
import { CyclesContext } from '../../context/CyclesContext';
import { CountdownStyled, SeparatorStyled } from './styles';

export default function Countdown() {
  const { minutes, seconds } = useContext(CyclesContext);

  return (
    <CountdownStyled>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorStyled>:</SeparatorStyled>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownStyled>
  );
}
