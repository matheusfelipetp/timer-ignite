import { Play } from '@phosphor-icons/react';
import {
  ButtonStyled,
  CountdownStyled,
  FormStyled,
  HomeSyled,
  MinutesAmountInputStyled,
  SeparatorStyled,
  TaskInputStyled,
} from './styles';

export default function Home() {
  return (
    <HomeSyled>
      <form action="">
        <FormStyled>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInputStyled
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInputStyled
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormStyled>

        <CountdownStyled>
          <span>0</span>
          <span>0</span>
          <SeparatorStyled>:</SeparatorStyled>
          <span>0</span>
          <span>0</span>
        </CountdownStyled>

        <ButtonStyled type="submit">
          <Play size={24} />
          Começar
        </ButtonStyled>
      </form>
    </HomeSyled>
  );
}
