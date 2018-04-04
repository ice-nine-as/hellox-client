import {
  Collaborators,
} from '../Components/Collaborators';
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
const _styles = styles || {};

export class About extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${_styles.About} ${_styles.Page}`}>
        <img
          className={_styles.HeroImage}
          src={ImageUrls.AboutHero}
        />

        <div className={_styles.Body}>
          <h1 className={`${_styles.Header} condensed`}>
            Can stories shape our future? We think so.
          </h1>

          <p className={_styles.OpeningParagraph}>
            <strong className={_styles.OpeningParagraphText}>
              The Emerald Buddha is a figurine of a sitting Budha, that is
              the is the palladium of the Kingdom of Thailand. The Buddha
              is made of green jade, suprisingly not of emerald, clothed in
              gold is approximately 45 cm tall. The Buddha is kept in the
              Chapel of the Emerald Buddha, which is located on the
              grounds of the Grand Palace in Bangkok.
            </strong>
          </p>

          <h2 className={_styles.Subheader}>
            The team
          </h2>

          <figure className={_styles.PictureContainer}>
            <img
              className={_styles.TeamPicture}
              src={ImageUrls.TeamPicture}
            />

            <figcaption className={_styles.PictureAttribution}>
              <p className={_styles.AttributionSection}>
                Barbecue The Secrets Of The Greek Way
              </p> 

              <p className={_styles.AttributionSection}>
                <strong className={_styles.Red}>
                  Photo by
                </strong>

                &nbsp;Christine Cynn
              </p>
            </figcaption>

          </figure>

          <TeamMembers />

          <h2 className={`${_styles.Subheader} condensed`}>
            Contact us
          </h2>

          <ContactForm />

          <h2 className={`${_styles.CollaboratorsSubheader} ${_styles.Subheader}`}>
            Our collaborators
          </h2>

          <h3 className={`${_styles.Subsubheader} condensed`}>
            Creative team
          </h3>

          <figure className={_styles.PictureContainer}>
            <img
              className={_styles.CollaboratorsPicture}
              src={ImageUrls.CollaboratorsPicture}
            />

            <figcaption className={_styles.PictureAttribution}>
              <p className={_styles.AttributionSection}>
                Barbecue The Secrets Of The Greek Way
              </p> 

              <p className={_styles.AttributionSection}>
                <strong className={_styles.Red}>
                  Photo by
                </strong>

                &nbsp;Christine Cynn
              </p>
            </figcaption>
          </figure>

          <p className={_styles.CollaboratorsParagraph}>
            <strong className={_styles.CollaboratorsParagraphText}>
              The Emerald Buddha is a figurine of a sitting Budha, that is the is the
              palladium of the Kingdom of Thailand. The Buddha is made of green jade,
              suprisingly not of emerald, clothed in gold is approximately 45 cm tall.
            </strong>
          </p>

          <Collaborators />
        </div>
      </div>
    );
  }
}

export default About;