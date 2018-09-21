import * as React from 'react';

// @ts-ignore
import '../Styles/Components/MailChimpSignup.less';

export class MailChimpSignup extends React.PureComponent {
  render() {
    return (
      <div id="mc_embed_signup">
        <form
          action="https://ice-9.us16.list-manage.com/subscribe/post?u=df70196a51c2b6c343aa52c4e&amp;id=74777a8f7e"
          className="validate"
          id="mc-embedded-subscribe-form"
          method="post"
          name="mc-embedded-subscribe-form"
          noValidate
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <label htmlFor="mce-EMAIL">
              Join our news/letter to get monthly updates from us
            </label>

            <input
              type="email"
              name="EMAIL"
              className="email"
              id="mce-EMAIL"
              placeholder="email address"
              required
            />

            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-5000px',
              }}
            >
              {/* Fake label to avoid lowering SEO scores. */}
              <label
                htmlFor="b_df70196a51c2b6c343aa52c4e_74777a8f7e"
                hidden={true}
                style={{ display: 'none' }}
              >
                Unused
              </label>

              {/* Fake input to fool bots. */}
              <input
                id="b_df70196a51c2b6c343aa52c4e_74777a8f7e"
                type="text"
                name="b_df70196a51c2b6c343aa52c4e_74777a8f7e"
                tabIndex={-1}
                value=""
              />
            </div>

            <div className="clear">
              <input
                className="button"
                id="mc-embedded-subscribe"
                name="subscribe"
                type="submit"
                value="Subscribe"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}