import {
	createLinkAction,
} from '../Actions/Creators/createLinkAction';
import {
	getFormattedDate,
} from '../Functions/getFormattedDate';
import {
	getSanitizedHtml,
} from '../Functions/getSanitizedHtml';
import {
	ImageUrls,
} from '../Enums/ImageUrls';
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

export class PodcastItemPreview extends React.PureComponent<TPodcastItemPreviewProps> {
	render() {
		const {
			item: {
				description,
				guid,
				itunesImage,
				pubDate,
				title,
			},
		} = this.props;

		const id = (guid || '').split('/').filter((aa) => aa).slice(-1)[0];
		return (
			<div className={styles.PodcastItemPreview}>
				<div className="ArticleTeaser">
					<NavLink
						className="Link"
						to={createLinkAction(PodcastLinkAction, { id, })}
					>
						<div className="HeroImageContainer">
							<img
								src={itunesImage || ImageUrls.DefaultPodcastImage}
								className="HeroImage"
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
								dangerouslySetInnerHTML={getSanitizedHtml(description || 'No title provided.')}
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