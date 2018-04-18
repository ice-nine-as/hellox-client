import {
  ContactForm,
} from '../Components/ContactForm';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  isNode,
} from '../Modules/isNode';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TAboutDispatchProps,
} from '../TypeAliases/TAboutDispatchProps';
import {
  TAboutStoreProps,
} from '../TypeAliases/TAboutStoreProps';
import {
  TeamMembers,
} from '../Components/TeamMembers';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/About.less';
import { FeedKeys } from '../Enums/FeedKeys';
import { ITeamMembers } from '../Interfaces/ITeamMembers';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'An error was encountered in loading the team members feed. Sorry!',
}

export class About extends React.Component<TPageProps & TAboutStoreProps & TAboutDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };
  }

  doLoad() {
    const {
      feeds: {
        TeamMembers: teamMembersFeed,
      },
    } = this.props;

    const rejector = (reason: Error) => {
      console.error(reason);
      this.setState({
        error: (reason || {} as any).message || strings.LOAD_ERROR,
      });
    };

    if (!teamMembersFeed) {
      this.props.getTeamMembersFeed()
        .then(
          /* Resolve */
          () => {},

          /* Reject */
          (reason) => rejector(reason)
        );
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds: {
        TeamMembers: teamMembersFeed,
      },
    } = this.props;

    const teamMembers: ITeamMembers | null = ((feed, error) => {
      if (error) {
        return null;
      }
      
      if (feed && Array.isArray(feed.items) && feed.items[0]) {
        return JSON.parse(feed.items[0].description || 'null');
      }
      
      return null;
    })(teamMembersFeed, this.state.error);

    const creativeTeamMembers = ((error) => {
      if (error) {
        return error;
      } else {
        if (!teamMembers || !Array.isArray(teamMembers.creativeTeam)) {
          return strings.LOAD_ERROR;
        }

        return (
          <TeamMembers members={teamMembers.creativeTeam} />
        );
      }
    })(this.state.error);

    const ice9Members = ((error) => {
      if (error) {
        return error;
      } else {
        if (!teamMembers || !Array.isArray(teamMembers.ice9)) {
          return strings.LOAD_ERROR;
        }

        return (
          <TeamMembers members={teamMembers.ice9} />
        );
      }
    })(this.state.error);

    const scienceTeamMembers = ((error) => {
      if (error) {
        return error;
      } else {
        if (!teamMembers || !Array.isArray(teamMembers.scienceTeam)) {
          return strings.LOAD_ERROR;
        }

        return (
          <TeamMembers members={teamMembers.scienceTeam} />
        );
      }
    })(this.state.error);

    return (
      <div className={`${styles.About} ${styles.Page}`}>
        <div className={`${styles.Content}`}>
          <img
            className={styles.HeroImage}
            src={ImageUrls.AboutHero}
          />

          <div className={styles.Body}>
            <h2 className={styles.Header}>
              What is hello X?
            </h2>

            <p className={styles.OpeningParagraph}>
              Can stories shape our future? We think so.
            </p>

            <p className={styles.OpeningParagraph}>
              hello X is a story laboratory to collectively imagine X,
              a young woman 50 years into the future. The first season
              of hello X asks how human impacts on the Arctic ecosystem
              (think: climate change, pollution, industrial food production)
              might affect food webs and food culture for X in 2068.
            </p>

            <p className={styles.OpeningParagraph}>
              You can contribute to the first cycle of X shor stories
              by going to the WRITE page. Listen to the PODCASTS to meet
              scientists, artists, and other special gusests, review your
              contributions, and dig into the present day stories that
              inform our evolving visions of X. Go to READ &amp; DISCUSS
              to read featured story ideas, debate issues with our creative
              and scientific teams, and propose new story games. This is a
              laboratory with live experiments, and lots of potential
              surprises, so subscribe to the hello X
            </p>

            <h2 className={styles.Header}>
              Our mission
            </h2>

            <p className={styles.OpeningParagraph}>
              Ice-9's mission is to build experimental spaces for
              productive play with stories. These spaces are online,
              on the street, in classrooms and museums. Our strategy is
              improvisational, collaborative, and networked. Our process
              creates positive feedback loops between science, art, and
              education, supporting a transition towards a knowledge-based
              circular economy in an inclusive, just, and democratic global
              society.
            </p>

            <p className={styles.OpeningParagraph}>
              Productive storyplay means serious fun — serious because
              we tackle scary real-world scenarios, and fun because we
              learn to collectively channel fears, doubts, even rage,
              into stories that ultimately nurture love for X and her
              unborn generation. An investment of love in X today, can
              yield us rewards in the forms of purpose, courage, and hope
              (compounded daily). And best of all, X inherits this fortune
              alongside a vision far beyond mere survival.
            </p>

            <h2 className={styles.Header}>
              Ice-9
            </h2>

            <p className={styles.OpeningParagraph}>
              Ice-9 was founded in 2014 by artists Christine Cynn &amp;
              Valentin Manz. Christine is a film director/producer and
              conceptual artist who has been playing with
              documentary/fiction hybrids since 1996 (including co-direction
              of The Act of Killing). Valentin Manz has been creating
              interactive environments, sculptures, and visual art since 1990.
              He specializes in process-based art, created within communities in
              dialogue with local stories and landscapes. Ice-9 is based in
              Tromsø, Northern Norway.
            </p>

            <h2 className={`${styles.Header} ${styles.NoBottomMargin}`}>
              The team
            </h2>

            <figure className={styles.PictureContainer}>
              <img
                className={styles.AboutContentPicture}
                src={ImageUrls.CoreTeamPicture}
              />

              <figcaption className={styles.PictureAttribution}>
                <p className={styles.AttributionSection}>
                  Illustration by Valentin Manz
                </p>
              </figcaption>
            </figure>

            {ice9Members}
          </div>

          <div className={styles.ContactFormWrapper}>
            <h2 className={`${styles.Header} ${styles.NoBottomMargin}`}>
              Contact us
            </h2>

            <ContactForm />
          </div>

          <div className={styles.Body}>
            <h2 className={`${styles.CollaboratorsSubheader} ${styles.Subheader}`}>
              Our collaborators
            </h2>

            <h3 className={styles.Subsubheader}>
              Creative team
            </h3>

            <figure className={styles.PictureContainer}>
              <img
                className={styles.AboutContentPicture}
                src={ImageUrls.CreativeTeamPicture}
              />

              <figcaption className={styles.PictureAttribution}>
                Illustration by Valentin Manz
              </figcaption>
            </figure>

            <p className={styles.CollaboratorsParagraph}>
              The <em>hello X</em> creative team is led by Christine
              Cynn and includes writers, dramaturgs, filmmakers, visual
              artists, performers, musicians, digital designers, and
              programmers from around the world.
            </p>

            {creativeTeamMembers}

            <h3 className={styles.Subsubheader}>
              Science team
            </h3>

            <figure className={styles.PictureContainer}>
              <img
                className={styles.AboutContentPicture}
                src={ImageUrls.ScienceTeamPicture}
              />

              <figcaption className={styles.PictureAttribution}>
                Illustration by Valentin Manz
              </figcaption>
            </figure>

            <p className={styles.ScienceTeamParagraph}>
              The hello X science team is led by environmental
              anthropologist Ann Eileen Lennert and includes
              marine biologists, bioenergeticists, ecotoxicologists,
              and more from our partner research institutes (see
              FRAM High North Research Center for Climate and the
              Environment and Nansen Legacy Project links below.
            </p>

            {scienceTeamMembers}
          </div>
        </div>
      </div >
    );
  }
}

export const mapStateToProps: MapStateToProps<TAboutStoreProps, TPageProps, TStoreProps> = ({
  feeds,
}) =>
({
  feeds,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getTeamMembersFeed: () => {
    const thunk = createRssThunk({
      feedKey: FeedKeys.TeamMembers,
    });

    return dispatch(thunk);
  },
});

export const ConnectedAbout = connect(mapStateToProps, mapDispatchToProps)(About);

export default ConnectedAbout;