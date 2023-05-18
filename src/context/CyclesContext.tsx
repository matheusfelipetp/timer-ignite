import { differenceInSeconds } from 'date-fns';
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ICycle } from '../pages/Home';
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions';
import { cyclesReducer } from '../reducers/cycles/reducer';

interface ICreateNewCycle {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  activeCycle: ICycle | undefined;
  cycles: ICycle[];
  minutes: string;
  seconds: string;
  cycleInterrupt: () => void;
  createNewCycle: (data: ICreateNewCycle) => void;
}

interface ICyclesProvider {
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext);

export const CyclesProvider = ({ children }: ICyclesProvider) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@timer:cycles-1.0.0');

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    },
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((elem) => elem.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@timer:cycles-1.0.0', stateJSON);
  }, [cyclesState]);

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

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const cycleInterrupt = () => {
    dispatch(interruptCurrentCycleAction());
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
          new Date(activeCycle.startDate),
        );

        if (difference >= totalSeconds) {
          dispatch(finishCurrentCycleAction());

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
        minutes,
        seconds,
        cycleInterrupt,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
