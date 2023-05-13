import { useEffect, useState } from 'react';
import { CountdownStyled, SeparatorStyled } from './styles';
import { differenceInSeconds } from 'date-fns';

export default function Countdown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

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
    <CountdownStyled>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorStyled>:</SeparatorStyled>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownStyled>
  );
}
