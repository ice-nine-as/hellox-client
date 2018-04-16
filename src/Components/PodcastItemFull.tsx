import {TPodcastItemFullProps} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';
import {getFormattedDate} from './PodcastItemPreview';

// @ts-ignore
import styles from '../Styles/Components/PodcastItemFull.less';
const _styles = styles || {};

export class PodcastItemFull extends React.PureComponent<
	TPodcastItemFullProps
> {
	getPreparedHtml(str: string): {__html: string} {
		return {__html: str};
	}

	render() {
		const iframe = (() => {
			if (
				!this.props.item ||
				!this.props.item.enclosures ||
				!this.props.item.enclosures[0] ||
				!this.props.item.enclosures[0].url
			) {
				return 'Embed failed.';
			}

			const correctedUrl =
				/* Add https. */
				'https' +
				this.props.item.enclosures[0].url
					/* Remove http. */
					.slice(4);

			return (
				<iframe
					className={_styles.PodcastIframe}
					scrolling="no"
					src={`https://player.blubrry.com/?media_url=${encodeURIComponent(
						correctedUrl
					)}`}
				/>
			);
		})();

		const date = (() => {
			if (!this.props.item || !this.props.item.pubDate) {
				return 'No date provided.';
			}
			return (
				<p
					className={_styles.Date}
					dangerouslySetInnerHTML={this.getPreparedHtml(
						getFormattedDate(this.props.item.pubDate.toISOString())
					)}
				/>
			);
		})();

		const summary = (() => {
			console.log(this.props.item);
			if (!this.props.item || !this.props.item.description) {
				return 'No description provided.';
			}

			return (
				<p
					className={_styles.Summary}
					dangerouslySetInnerHTML={this.getPreparedHtml(
						this.props.item.description
					)}
				/>
			);
		})();

		const title = (() => {
			console.log(this.props.item);
			if (!this.props.item || !this.props.item.title) {
				return 'No Title provided.';
			}

			return (
				<h1
					className={_styles.Title}
					dangerouslySetInnerHTML={this.getPreparedHtml(
						this.props.item.title
					)}
				/>
			);
		})();

		return (
			<div className={_styles.PodcastItemFull}>
				<div
					className={_styles.ImageWrapper}
					style={{
						backgroundImage: `url('${this.props.item[
							'itunes:image'
						]['#']}')`,
					}}
				/>
				{title}
				{date}
				{iframe}
				{summary}
			</div>
		);
	}
}

export default PodcastItemFull;
