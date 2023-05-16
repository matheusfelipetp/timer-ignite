import { differenceInSeconds } from 'date-fns';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { ICycle } from '../pages/Home';

interface ICreateNewCycle {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  activeCycle: ICycle | undefined;
  cycles: ICycle[];
  activeCycleId: string | null;
  minutes: string;
  seconds: string;
  cycleFinished: () => void;
  createNewCycle: (data: ICreateNewCycle) => void;
}

interface ICyclesProvider {
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext);

export const CyclesProvider = ({ children }: ICyclesProvider) => {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((elem) => elem.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const createNewCycle = (data: ICreateNewCycle) => {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  };

  const cycleFinished = () => {
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

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = 'Ignite Timer';
    }
  }, [activeCycle, minutes, seconds]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (difference >= totalSeconds) {
          setCycles((prev) =>
            prev.map((elem) => {
              if (elem.id === activeCycleId) {
                return { ...elem, finishedDate: new Date() };
              } else {
                return elem;
              }
            }),
          );

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(difference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        activeCycleId,
        minutes,
        seconds,
        cycleFinished,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
