import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  ConnectedLatestNews,
} from '../Components/LatestNews';
import {
  Logo,
} from '../Components/Logo';
import {
  Podcast,
} from '../Components/Podcast';
import {
  connect,
} from 'react-redux';
import {
  StoryGeneratorLink,
} from '../Components/StoryGeneratorLink';
import {
  THomePageProps,
} from '../TypeAliases/THomePageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Home.less';
const _styles = styles || {};

export class Home extends React.PureComponent<THomePageProps> {
  render() {
    return (
      <article className={_styles.Home}>
        <section className={`${_styles.HomeFirstSection} ${_styles.HomeSection} `}>
          <div className={_styles.HomeIconContainer}>
            <Logo />
          </div>

          <h1 className={_styles.HomeHeader}>
            Imagine the lives of the future
          </h1>

          <strong className={`${_styles.HomePodcastExplainerTitle} ${_styles.HomeExplainerTitle}`}>
            PODCAST
          </strong>

          <p className={`${_styles.HomePodcastExplainer} ${_styles.HomeParagraph}`}>
            Explainer about podcasts. Large businesses require a lot of IT
            infrastructure and a department.
          </p>

          <Podcast episode={1} />

          <strong className={`${styles.HomeStoryGeneratorExplainerTitle} ${_styles.HomeExplainerTitle}`}>
            WRITE
          </strong>

          <p className={`${_styles.HomeStoryGeneratorExplainer} ${_styles.HomeParagraph}`}>
            Explainer about the story generator. Large businesses require a lot
            of infrastructure and a department.
          </p>

          <p className={`${_styles.HomeStoryGeneratorThemeContainer} ${_styles.HomeParagraph}`}>
            Current theme
            
            <span className={_styles.HomeStoryGeneratorTheme}>
              Is current theme still used here?
            </span>
          </p>

          <div className={_styles.HomeStoryGeneratorLinkContainer}>
            <StoryGeneratorLink />
          </div>
        </section>

        <section className={`${_styles.HomeWhatIsHelloXSection} ${_styles.HomeSection}`}>
          <span className={_styles.HomeWhatIsHelloX}>
            WHAT IS HELLO X
          </span>
        </section>

        <section className={`${_styles.HomeNewsSection} ${_styles.HomeSection}`}>
          <h2 className={_styles.HomeLatestNewsTitle}>
            Latest news
          </h2>

          <ConnectedLatestNews />
        </section>
      </article>
    );
  }
}

export const mapStateToProps = ({
  page,
  rss,
}: {
  page: string,
  rss: IRssFeed,
}) => ({
  page,
  rss,
});

export const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;