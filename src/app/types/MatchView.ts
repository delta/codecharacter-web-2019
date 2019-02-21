import { MatchActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export enum MatchViewTabType {
  MY_MATCHES = 'MY_MATCHES',
  TOP_MATCHES = 'TOP_MATCHES',
}

export interface OwnState {
  activeMatchViewTab: MatchViewTabType;
  offset: number;
}

export interface Match {
  username1: string;
  score1: number;
  username2: string;
  score2: number;
  verdict: number;
  playedAt: string;
  games: number[];
}

export interface StateProps {
  matches: Match[];
  topMatches: Match[];
  loading: boolean;
}

export interface DispatchProps {
  getMatches: () => void;
  getTopMatches: () => void;
  getGameLogs: (gameId: number) => void;
}

export type Props = StateProps & DispatchProps;

export type State = OwnState;

export interface ElementOwnProps {
  match: Match;
  index: number;
  getGameLogs: (gameId: number) => void;
}

export type ElementProps = ElementOwnProps;

const actions = {
  getMatches: MatchActions.getMatches,
  getTopMatches: MatchActions.getTopMatches,
  resetMatchView: MatchActions.resetMatchView,
  updateError: MatchActions.updateError,
  updateLoading: MatchActions.updateLoadingStatus,
  updateMatches: MatchActions.updateMatches,
  updateTopMatchs: MatchActions.updateTopMatches,
};

export interface MatchStoreState {
  loading: boolean;
  matches: Match[];
  topMatches: Match[];
}

export type MatchStoreAction = ActionType<typeof actions>;
