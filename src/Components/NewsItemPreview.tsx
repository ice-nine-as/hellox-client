import {TNewsItemPreviewProps} from '../TypeAliases/TNewsItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/NewsItemPreview.less';
const styles = _styles || {};

export class NewsItemPreview extends React.PureComponent<TNewsItemPreviewProps> {
	getPreparedHtml(str: string): { __html: string, } {
		return { __html: str, };
	}

	render() {
		const {
			item: {
				description,
			},
		} = this.props;

		const html = this.getPreparedHtml(description);

		return (
			<div
				className={styles.NewsItemPreview}
				dangerouslySetInnerHTML={html}
			></div>
		);
	}
}

export default NewsItemPreview;
