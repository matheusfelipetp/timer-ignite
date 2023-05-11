import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
  ButtonStyled,
  CountdownStyled,
  FormStyled,
  HomeSyled,
  MinutesAmountInputStyled,
  SeparatorStyled,
  TaskInputStyled,
} from './styles';

const formSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minímo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type FormDataProps = zod.infer<typeof formSchema>;

export default function Home() {
  const { register, handleSubmit, watch, reset } = useForm<FormDataProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const onSubmit = (data: FormDataProps) => {
    console.log(data);
    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeSyled>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <FormStyled>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInputStyled
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <ButtonStyled type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </ButtonStyled>
      </form>
    </HomeSyled>
  );
}
