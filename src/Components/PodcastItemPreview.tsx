import {TPodcastItemPreviewProps} from '../TypeAliases/TPodcastItemPreviewProps';
import * as React from 'react';
// @ts-ignore
import styles from '../Styles/Components/PodcastItemPreview.less';
const _styles = styles || {};

export function getFormattedDate(dateString: string) {
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
	const myDate = new Date(dateString);
	let hours = myDate.getHours();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	const minutes = myDate.getMinutes();
	const minuteString = minutes < 10 ? '0' + minutes : minutes;
	const strTime = hours + ':' + minuteString + ampm;
	// e.g. "13 Nov 2016 11:00pm";
	return (
		myDate.getDate() +
		' ' +
		month[myDate.getMonth()] +
		' ' +
		myDate.getFullYear() +
		' ' +
		strTime
	);
}

export class PodcastItemPreview extends React.PureComponent<
	TPodcastItemPreviewProps
> {
	getPreparedHtml(str: string): {__html: string} {
		return {__html: str};
	}

	render() {
		const iframe = (() => {
			if (!this.props.item ||
					!this.props.item.enclosures ||
					!this.props.item.enclosures[0] ||
					!this.props.item.enclosures[0].url)
			{
				return 'Embed failed.';
			}

			const correctedUrl =
				/* Prepare for being placed as an URL argument. */
				encodeURIComponent(
					/* Add https. */
					'https' +
					this.props.item.enclosures[0].url
						/* Remove http. */
						.slice(4)
				);

			return (
				<iframe
					className={_styles.PodcastIframe}
					scrolling="no"
					src={`https://player.blubrry.com/?media_url=${correctedUrl}`}
				/>
			);
		})();

		const summary = (() => {
			if (!this.props.item || !this.props.item.description) {
				return 'No description provided.';
			}

			return (
				<p
					className={_styles.Summary}
					dangerouslySetInnerHTML={this.getPreparedHtml(
						this.props.item.description
					)}
				>
				</p>
			);
		})();

		const date = (() => {
			if (!this.props.item || !this.props.item.pubDate) {
				return 'No date provided.';
			}
			return (
				<p className={_styles.Date}>
					{getFormattedDate(new Date(this.props.item.pubDate).toISOString())}
				</p>
			);
		})();

		const title = (() => {
			if (!this.props.item || !this.props.item.title) {
				return 'No title provided.';
			}

			return (
				<h3
					className={_styles.Title}
				>
					{this.props.item.title}
				</h3>
			);
		})();

		return (
			<div className={_styles.PodcastItemPreview}>
				<div
					className={_styles.ImageWrapper}
					style={{
						backgroundImage: `url('${this.props.item['itunes:image']['#']}')`,
					}}
				/>
				<div className={_styles.TextContent}>
					{iframe}
					{title}
					{date}
					{summary}
				</div>
			</div>
		);
	}
}

export default PodcastItemPreview;
