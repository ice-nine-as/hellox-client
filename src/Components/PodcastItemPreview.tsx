import {
	createLinkAction,
} from '../Actions/Creators/createLinkAction';
import {
	NavLink,
} from 'redux-first-router-link';
import {
	PodcastLinkAction,
} from '../Actions/Link/PodcastLinkAction';
import {
	TPodcastItemPreviewProps,
} from '../TypeAliases/TPodcastItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastItemPreview.less';
const styles = _styles || {};

// @ts-ignore
import _newsItemStyles from '../Styles/Components/NewsItemPreview.less';

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

	return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

export class PodcastItemPreview extends React.PureComponent<TPodcastItemPreviewProps> {
	getPreparedHtml(str: string): {__html: string} {
		return { __html: str, };
	}

	render() {
		const {
			item: {
				description,
				guid,
				'itunes:image': itunesImage,
				pubDate,
				title,
			},
		} = this.props;

		const id = guid.split('/').filter((aa) => aa).slice(-1)[0];
		return (
			<div className={styles.PodcastItemPreview}>
				<div className="ArticleTeaser">
					<NavLink
						className="Link"
						to={createLinkAction(PodcastLinkAction, { id, })}
					>
						<div className="HeroImageContainer">
							<img
								className="HeroImage"
								src={(itunesImage || {})['#']}
							/>
						</div>

						<div className="Main">		
							<h3 className="Headline">
								{title}
							</h3>

							<p className="AuthoringInfo">
								<time className="Date">
									{getFormattedDate(new Date(pubDate))}
								</time>

								<span className="Bullet"> · </span>

								<span className="Author">
									By hello X
								</span>
							</p>

							<div
								className="Summary"
								dangerouslySetInnerHTML={this.getPreparedHtml(description || 'No title provided.')}
							>
							</div>
						</div>

						<div className="SpacerBar"></div>
					</NavLink>
				</div>
			</div>
		);
	}
}

export default PodcastItemPreview;