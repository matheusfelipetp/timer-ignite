import { HandPalm, Play } from '@phosphor-icons/react';
import { HomeSyled, StartButtonStyled, StopButtonStyled } from './styles';
import { useEffect, useState } from 'react';
import CycleForm from '../../components/CycleForm';
import Countdown from '../../components/Countdown';

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((elem) => elem.id === activeCycleId);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const onSubmit = (data: FormDataProps) => {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    reset();
  };

  const handleInterruptCycle = () => {
    setCycles((prev) =>
      prev.map((elem) => {
        if (elem.id === activeCycleId) {
          return { ...elem, interruptedDate: new Date() };
        } else {
          return elem;
        }
      }),
    );

    setActiveCycleId(null);
  };

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = 'Ignite Timer';
    }
  }, [activeCycle, minutes, seconds]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeSyled>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <CycleForm />
        <Countdown />

        {activeCycle ? (
          <StopButtonStyled type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopButtonStyled>
        ) : (
          <StartButtonStyled type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartButtonStyled>
        )}
      </form>
    </HomeSyled>
  );
}
