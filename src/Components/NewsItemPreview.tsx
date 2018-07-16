import {
	getPreparedHtml,
} from '../Functions/getPreparedHtml';
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

		const html = getPreparedHtml(description);

		return (
			<div
				className={styles.NewsItemPreview}
				dangerouslySetInnerHTML={html}
			></div>
		);
	}
}

export default NewsItemPreview;
