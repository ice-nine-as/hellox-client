import {TNewsItemPreviewProps} from '../TypeAliases/TNewsItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NewsItemPreview.less';
const _styles = styles || {};

export class NewsItemPreview extends React.PureComponent<
	TNewsItemPreviewProps
> {
	getPreparedHtml(str: string): {__html: string} {
		return {__html: str};
	}

	render() {
		return (
			<div
				className={_styles.NewsItemPreview}
				dangerouslySetInnerHTML={this.getPreparedHtml(
					this.props.item.description
				)}
			/>
		);
	}
}

export default NewsItemPreview;
