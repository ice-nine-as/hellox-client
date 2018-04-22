import {
	FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
	ConnectedLatestNews,
} from '../Components/LatestNews';
import {
	TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Archives.less';
const styles = _styles || {};

export class Archives extends React.PureComponent<TPageProps> {
	render() {
		return (
			<div className={`${styles.Archives} ${styles.Page}`}>
				<h1 className={styles.Title}>
					ARCHIVES
				</h1>

				<ConnectedLatestNews detailLevel={FeedDetailLevels.Teaser} />
			</div>
		);
	}
}

export default Archives;
