import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from '@phosphor-icons/react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import Countdown from '../../components/Countdown';
import CycleForm from '../../components/CycleForm';
import { CyclesContext } from '../../context/CyclesContext';
import { HomeSyled, StartButtonStyled, StopButtonStyled } from './styles';

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const formSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minímo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type FormDataProps = zod.infer<typeof formSchema>;

export default function Home() {
  const { activeCycle, cycleInterrupt, createNewCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<FormDataProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const onSubmit = (data: FormDataProps) => {
    createNewCycle(data);
    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeSyled>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopButtonStyled type="button" onClick={cycleInterrupt}>
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
