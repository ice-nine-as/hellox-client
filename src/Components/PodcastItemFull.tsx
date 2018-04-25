import {
	getFormattedDate,
} from './PodcastItemPreview';
import {
	TPodcastItemFullProps,
} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastItemFull.less';
const styles = _styles || {};

export class PodcastItemFull extends React.PureComponent<TPodcastItemFullProps> {
	getPreparedHtml(str: string): { __html: string } {
		return { __html: str };
	}

	render() {
		const {
			item: {
				description,
				enclosures: {
					[0]: {
						url,
					},
				},

				pubDate,
				title,
			},
		} = this.props;

		const correctedUrl = /* Add https. */ `https${url/* Remove http. */.slice(4)}`;

		return (
			<div className={styles.PodcastItemFull}>
				<div
					className={styles.ImageWrapper}
					style={{
						backgroundImage: `url('${this.props.item[
							'itunes:image'
						]['#']}')`,
					}}
				></div>

				<h1 className={styles.Title}>
					{title || 'No title provided.'}
				</h1>

				<p className={styles.Date}>
					{pubDate ? getFormattedDate(new Date(pubDate)) : 'No date provided.'}
				</p>

				<div className={styles.PlayerWrapper}>
					{
						url ?
							<iframe
								className={styles.PodcastIframe}
								scrolling="no"
								src={`https://player.blubrry.com/?media_url=${encodeURIComponent(correctedUrl)}`}
							></iframe> :
							'Embed failed.'
					}
				</div>

				<p
					className={styles.Summary}
					dangerouslySetInnerHTML={this.getPreparedHtml(description)}
				></p>
			</div>
		);
	}
}

export default PodcastItemFull;
