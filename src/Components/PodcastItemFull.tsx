import {
	TPodcastItemFullProps,
} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastItemFull.less';
const styles = _styles || {};

export function getFormattedDate(date: Date) {
	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	let hours = date.getHours();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	const minutes = date.getMinutes();
	const minuteString = minutes < 10 ? '0' + minutes : minutes;
	const strTime = hours + ':' + minuteString + ampm;
	// e.g. "13 Nov 2016 11:00pm";
	return ( 
		`${date.getDate()} ${month[date.getMonth()]} ` +
		`${date.getFullYear()} ${strTime}`
	);
}

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

			item,
		} = this.props;

		const correctedPodcastUrl = /* Add https. */ `https${url/* Remove http. */.slice(4)}`;
		const correctedImageUrl = item['itunes:image']['#'].replace("'", "\\'").replace('"', '\\"');

		return (
			<div className={styles.PodcastItemFull}>
				<div
					className={styles.ImageWrapper}
					style={{
						backgroundImage: `url(${correctedImageUrl})`,
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
								src={`https://player.blubrry.com/?media_url=${encodeURIComponent(correctedPodcastUrl)}`}
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
