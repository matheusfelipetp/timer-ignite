import { ICycle } from '../../pages/Home';

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISHED_CURRENT_CYCLE = 'FINISHED_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: ICycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}

export function finishCurrentCycleAction() {
  return {
    type: ActionTypes.FINISHED_CURRENT_CYCLE,
  };
}
