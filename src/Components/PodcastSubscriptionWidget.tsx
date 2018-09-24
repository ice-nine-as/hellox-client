import {
  PodcastSubscriptionData,
} from '../Enums/PodcastSubscriptionData';
import {
  PodcastSubscriptionLink,
} from './PodcastSubscriptionLink';
import {
  TPodcastSubscriptionWidgetState,
} from '../TypeAliases/TPodcastSubscriptionWidgetState';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastSubscriptionWidget.less';
const styles = _styles || {};

export class PodcastSubscriptionWidget extends React.Component<{}, TPodcastSubscriptionWidgetState> {
  state = {
    open: false,
  };

  constructor(props: any, context?: any) {
    super(props, context);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const {
      open,
    } = this.state;

    this.setState({
      open: !open,
    });
  }

  render() {
    const {
      open,
    } = this.state;

    return (
      <div className={styles.PodcastSubscriptionWidget}>
        <button
          className={styles.OpenButton}
          onClick={this.toggle}
        >
          <svg className={styles.SubscribeIcon} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
            <path fill="#FFF" fillRule="nonzero" d="M2.116 10.902c.556 0 1.025.199 1.409.595.389.386.583.855.583 1.408 0 .553-.194 1.025-.583 1.416a1.909 1.909 0 0 1-1.409.578 1.9 1.9 0 0 1-1.4-.578 1.95 1.95 0 0 1-.574-1.416c0-.553.191-1.023.574-1.408.384-.397.85-.595 1.4-.595zM.208 5.665a.733.733 0 0 1 .483-.252v-.008h.817c2.228 0 4.133.793 5.717 2.38 1.583 1.575 2.383 3.483 2.4 5.723v.796h-.009a.731.731 0 0 1-.217.461.77.77 0 0 1-.466.226V15H7.541a.776.776 0 0 1-.758-.696h-.009v-.796h.009c-.017-1.447-.536-2.684-1.558-3.712-1.04-1.022-2.278-1.533-3.717-1.533h-.033v.008H.691v-.008a.824.824 0 0 1-.466-.218.702.702 0 0 1-.209-.47H0v-1.4a.821.821 0 0 1 .208-.51zM0 2.17V.763A.821.821 0 0 1 .208.25.733.733 0 0 1 .691 0h.817c3.706 0 6.878 1.318 9.517 3.955 2.639 2.643 3.964 5.827 3.975 9.553v.796h-.009a.77.77 0 0 1-.683.687V15h-1.391a.776.776 0 0 1-.759-.696h-.008v-.796h.008c-.01-2.938-1.058-5.447-3.141-7.525C6.939 3.893 4.436 2.85 1.508 2.85h-.033v.009H.691v-.009a.759.759 0 0 1-.466-.218.694.694 0 0 1-.209-.46H0z"></path>
          </svg>

          SUBSCRIBE to the PODCAST
        </button>

        {open ?
          /* Don't show the rest of the widget unless the state is open. */
          <div className={styles.LinksContainer}>
            <button
              className={styles.CloseButton}
              onClick={this.toggle}
            >
              ✖
            </button>

            <div className={styles.LinksSubcontainer}>
              <h2 className={styles.Title}>
                SUBSCRIBE TO HELLO X
              </h2>

              {Object.keys(PodcastSubscriptionData).map((key, index) => (
                <PodcastSubscriptionLink
                  key={index}
                  title={key}
                  url={PodcastSubscriptionData[key]}
                />
              ))}
            </div>
          </div> :
          null
        }
      </div>
    );
  }
}