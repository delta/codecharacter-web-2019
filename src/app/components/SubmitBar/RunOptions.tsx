import { faBrain, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmissionActions } from 'app/actions';
import * as styles from 'app/styles/RunOptions.module.css';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';

export class RunOptions extends React.Component<
  SubmitBarInterfaces.RunOptionsProps,
  SubmitBarInterfaces.RunOptionsOwnState
> {
  constructor(props: SubmitBarInterfaces.RunOptionsProps) {
    super(props);
    this.state = {
      currentIndex: -1,
      isMapOptionsOpen: false,
    };
  }

  public componentDidMount(): void {
    window.addEventListener('click', this.props.closeOptions, false);
  }

  public componentWillMount(): void {
    this.props.loadMaps();
    this.props.getAiIds();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('click', this.props.closeOptions, false);
  }

  public render() {
    const { maps, startMatch, aiIds } = this.props;
    const { currentIndex, isMapOptionsOpen } = this.state;

    const matchOptions = [
      {
        aiId: 0,
        icon: <FontAwesomeIcon icon={faBrain} />,
        name: 'Self Code Match',
        type: SubmissionActions.Type.SELF_MATCH,
      },
    ];

    if (aiIds) {
      aiIds.map((aiId) => {
        matchOptions.push({
          aiId,
          icon: <FontAwesomeIcon icon={faRobot} />,
          name: `AI ${aiId} Match`,
          type: SubmissionActions.Type.AI_MATCH,
        });
      });
    }

    const mapOptions = (
      <div className={classnames(styles['dropdown-submenu'])}>
        {maps.map((mapElement) => (
          <div
            key={mapElement.mapId}
            className={classnames(styles.dropdownItem)}
            onClick={() =>
              startMatch(
                matchOptions[currentIndex].type,
                mapElement.mapId,
                matchOptions[currentIndex].aiId,
              )
            }
          >
            <span className={classnames(styles.dropdownName)}>{mapElement.name}</span>
          </div>
        ))}
      </div>
    );

    return (
      <div className={classnames(styles.dropdown)}>
        {matchOptions.map((option, index) => {
          return (
            <div key={index}>
              <div
                className={classnames(styles.dropdownItem)}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.toggleMapOptions(index);
                  event.stopPropagation();
                }}
              >
                <span className={classnames(styles.dropdownItemName)}>{option.name}</span>
                <span className={classnames(styles.dropdownItemIcon)}>{option.icon}</span>
              </div>
              <div>{isMapOptionsOpen && currentIndex === index ? mapOptions : null}</div>
            </div>
          );
        })}
      </div>
    );
  }

  private toggleMapOptions = (currentIndex: number) => {
    if (this.state.currentIndex === currentIndex) {
      this.setState({
        currentIndex: -1,
        isMapOptionsOpen: false,
      });
    } else {
      this.setState({
        currentIndex,
        isMapOptionsOpen: true,
      });
    }
  };
}
