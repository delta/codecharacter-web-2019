import { GameLogActions } from 'app/actions/GameLog';
import { ActionType } from 'typesafe-actions';

export interface StateProps {
  debugLog: string;
}

export interface ElementProps {
  height: number;
}

export type Props = StateProps & ElementProps;

const actions = {
  clearDisplayDebugLog: GameLogActions.clearDisplayDebugLog,
  resetGameLog: GameLogActions.resetGameLogState,
  updateDisplayDebugLog: GameLogActions.updateDisplayDebugLog,
  updateGameLog: GameLogActions.updateGameLog,
};

export interface GameLogStoreState {
  displayDebugLog: string;
  gameLog: string;
  player1DebugLog: string;
  player2DebugLog: string;
}

export type GameLogStoreAction = ActionType<typeof actions>;
