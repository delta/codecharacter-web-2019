import { SidePanel } from 'app/components/SidePanel';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const sidePanelContainer = connect<SidePanel.StateProps, {}, SidePanel.OwnProps>(mapStateToProps)(
  SidePanel,
);

export default sidePanelContainer;
