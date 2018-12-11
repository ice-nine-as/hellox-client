import {
	getSanitizedHtml,
} from '../Functions/getSanitizedHtml';
import {
	TNewsItemPreviewProps,
} from '../TypeAliases/TNewsItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/NewsItemPreview.less';
const styles = _styles || {};

export class NewsItemPreview extends React.PureComponent<TNewsItemPreviewProps> {
	render() {
		const {
			item: {
				description,
			},
		} = this.props;

		return (
			<div
				className={styles.NewsItemPreview}
				dangerouslySetInnerHTML={getSanitizedHtml(description)}
			></div>
		);
	}
}

export default NewsItemPreview;
