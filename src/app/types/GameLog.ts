import { GameLogActions } from 'app/actions/GameLog';
import { ActionType } from 'typesafe-actions';

export interface StateProps {
  debugLog: string;
}

export type Props = StateProps;

const actions = {
  clearDisplayDebugLog: GameLogActions.clearDisplayDebugLog,
  resetGameLog: GameLogActions.resetGameLogState,
  updateDisplayDebugLog: GameLogActions.updateDisplayDebugLog,
  updateGameLog: GameLogActions.updateGameLog,
  updateMatchPlayerId: GameLogActions.updateMatchPlayerId,
};

export interface GameLogStoreState {
  displayDebugLog: string;
  gameLog: string;
  player1DebugLog: string;
  player2DebugLog: string;
  matchPlayerId: number;
}

export type GameLogStoreAction = ActionType<typeof actions>;
