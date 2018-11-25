import {
	getFormattedDate,
} from '../Functions/getFormattedDate';
import {
	getPreparedHtml,
} from '../Functions/getPreparedHtml';
import {
	PodcastSubscriptionWidget,
} from './PodcastSubscriptionWidget';
import {
	TPodcastItemFullProps,
} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastItemFull.less';
const styles = _styles || {};

export class PodcastItemFull extends React.PureComponent<TPodcastItemFullProps> {
	render() {
		const {
			item: {
				description,
				enclosures: [
					url,
				],

				pubDate,
				title,
			},

			item,
		} = this.props;

		/* Escape all quote marks in the image URL. If this is not done, the
		 * browser will refuse to load the image. */
		const correctedImageUrl = (item.itunesImage || '')
			.replace(/'/g, "\\'")
			.replace(/"/g, '\\"');

		return (
			<div className={styles.PodcastItemFull}>
				<div
					className={styles.ImageWrapper}
					style={{
						backgroundImage: `url(${correctedImageUrl})`,
					}}
				></div>

				<PodcastSubscriptionWidget />

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
								src={`https://player.blubrry.com/?media_url=${encodeURIComponent(url)}`}
								title="The iframe for the Blubrry podcast player."
							></iframe> :
							'Embed failed.'
					}
				</div>

				<p
					className={styles.Summary}
					dangerouslySetInnerHTML={getPreparedHtml(description)}
				></p>
			</div>
		);
	}
}

export default PodcastItemFull;
