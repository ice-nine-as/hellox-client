import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  ConnectedLatestNews,
} from '../Components/LatestNews';
import {
  TArchivesProps,
} from '../TypeAliases/TArchivesProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Archives.less';
const _styles = styles || {};

export class Archives extends React.PureComponent<TArchivesProps> {
  render() {
    return (
      <div className={_styles.Archives}>
        <h1 className={_styles.Title}>
          ARCHIVES
        </h1>

        <ConnectedLatestNews detailLevel={FeedDetailLevels.Full} />
      </div>
    );
  }
}

export default Archives;