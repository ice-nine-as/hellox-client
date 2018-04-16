import {
  CreativeTeam,
} from '../Components/CreativeTeam';
import {
  ContactForm,
} from '../Components/ContactForm';
import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  TeamMembers,
} from '../Components/TeamMembers';
import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/About.less';
import { ScienceTeam } from '../Components/ScienceTeam';
const _styles = styles || {};

export class About extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${_styles.About} ${_styles.Page}`}>
        <div className={`${_styles.Content}`}>
          <img
            className={_styles.HeroImage}
            src={ImageUrls.AboutHero}
          />

          <div className={_styles.Body}>
            <h2 className={_styles.Header}>
              What is hello X?
            </h2>

            <p className={_styles.OpeningParagraph}>
              Can stories shape our future? We think so.
            </p>

            <p className={_styles.OpeningParagraph}>
              hello X is a story laboratory to collectively imagine X,
              a young woman 50 years into the future. The first season
              of hello X asks how human impacts on the Arctic ecosystem
              (think: climate change, pollution, industrial food production)
              might affect food webs and food culture for X in 2068.
            </p>

            <p className={_styles.OpeningParagraph}>
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

            <h2 className={_styles.Header}>
              Our mission
            </h2>

            <p className={_styles.OpeningParagraph}>
              Ice-9's mission is to build experimental spaces for
              productive play with stories. These spaces are online,
              on the street, in classrooms and museums. Our strategy is
              improvisational, collaborative, and networked. Our process
              creates positive feedback loops between science, art, and
              education, supporting a transition towards a knowledge-based
              circular economy in an inclusive, just, and democratic global
              society.
            </p>

            <p className={_styles.OpeningParagraph}>
              Productive storyplay means serious fun — serious because
              we tackle scary real-world scenarios, and fun because we
              learn to collectively channel fears, doubts, even rage,
              into stories that ultimately nurture love for X and her
              unborn generation. An investment of love in X today, can
              yield us rewards in the forms of purpose, courage, and hope
              (compounded daily). And best of all, X inherits this fortune
              alongside a vision far beyond mere survival.
            </p>

            <h2 className={_styles.Header}>
              Ice-9
            </h2>

            <p className={_styles.OpeningParagraph}>
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

            <h2 className={`${_styles.Header} ${_styles.NoBottomMargin}`}>
              The team
            </h2>

            <figure className={_styles.PictureContainer}>
              <img
                className={_styles.AboutContentPicture}
                src={ImageUrls.CoreTeamPicture}
              />

              <figcaption className={_styles.PictureAttribution}>
                <p className={_styles.AttributionSection}>
                  Illustration by Valentin Manz
                </p>
              </figcaption>
            </figure>

            <TeamMembers />
          </div>

          <div className={_styles.ContactFormWrapper}>
            <h2 className={`${_styles.Header} ${_styles.NoBottomMargin}`}>
              Contact us
            </h2>

            <ContactForm />
          </div>

          <div className={_styles.Body}>
            <h2 className={`${_styles.CollaboratorsSubheader} ${_styles.Subheader}`}>
              Our collaborators
            </h2>

            <h3 className={_styles.Subsubheader}>
              Creative team
            </h3>

            <figure className={_styles.PictureContainer}>
              <img
                className={_styles.AboutContentPicture}
                src={ImageUrls.CreativeTeamPicture}
              />

              <figcaption className={_styles.PictureAttribution}>
                Illustration by Valentin Manz
              </figcaption>
            </figure>

            <p className={_styles.CollaboratorsParagraph}>
              The <em>hello X</em> creative team is led by Christine
              Cynn and includes writers, dramaturgs, filmmakers, visual
              artists, performers, musicians, digital designers, and
              programmers from around the world.
            </p>

            <CreativeTeam />

            <h3 className={_styles.Subsubheader}>
              Science team
            </h3>

            <figure className={_styles.PictureContainer}>
              <img
                className={_styles.AboutContentPicture}
                src={ImageUrls.ScienceTeamPicture}
              />

              <figcaption className={_styles.PictureAttribution}>
                Illustration by Valentin Manz
              </figcaption>
            </figure>

            <p className={_styles.ScienceTeamParagraph}>
              The hello X science team is led by environmental
              anthropologist Ann Eileen Lennert and includes
              marine biologists, bioenergeticists, ecotoxicologists,
              and more from our partner research institutes (see
              FRAM High North Research Center for Climate and the
              Environment and Nansen Legacy Project links below.
            </p>

            <ScienceTeam />
          </div>
        </div>
      </div >
    );
  }
}

export default About;
