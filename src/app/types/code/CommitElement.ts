import { Commit } from 'app/types/code/Code';

export interface State {
  imgType: string;
  isHovered: boolean;
}

export interface Props {
  index: number;
  commitDetails: Commit;
  commitsLength: number;
  onClick: () => void;
  isCurrentHash: boolean;
}