import {
  IFeedTemplate,
} from '../Interfaces/IFeedTemplate';
import {
	TPageProps,
} from '../TypeAliases/TPageProps';

import {
  // @ts-ignore
  default as FeedParser,
} from 'feedparser';

require('es6-promise').polyfill();
require('isomorphic-fetch');
require('abortcontroller-polyfill/dist/polyfill-patch-fetch');

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Archives.less';
const styles = _styles || {};

export const strings = {
  NODE_ID_INPUT_INVALID:
    'Unknown error. nodeIdInput property not present. This is not an error ' +
    'relating to the story template.',

  NO_INPUT:
    'No node ID was provided.',

  BAD_INPUT:
    'The node ID provided was not a positive integer (e.g. 1, 2, 10, etc.).',

  TEMPLATE_DOES_NOT_EXIST:
    'There is no story template with the specified node ID.',
}

type TStoryTemplateValidatorState = {
  error:    string,
  template: IFeedTemplate | null,
};

export class StoryTemplateValidator extends React.Component<TPageProps, TStoryTemplateValidatorState> {
  nodeIdInput: HTMLInputElement | null = null;
  
  state = {
    error: '',
    template: null,
  };

  setError(error: string) {
    this.setState({
      error,
    }, () => {
      setTimeout(() => {
        this.setState({
          error: '',
        });
      }, 4000);
    });
  }

  downloadTemplate() {
    if (!this.nodeIdInput) {
      this.setError(strings.NODE_ID_INPUT_INVALID);
      return;
    } else if (!this.nodeIdInput.value) {
      this.setError(strings.NO_INPUT);
    }

    const nodeId = Number(this.nodeIdInput.value);
    if (!(nodeId > 0 && nodeId % 1 == 0)) {
      this.setError(strings.BAD_INPUT);
    }

    let loaded = false;
    fetch(`https://cms.hellox.me/feeds/${nodeId}/story-template-validator.xml`).then(
      (response) => {
        response.text().then(
          (text) => {
            const parser = new FeedParser({});
            parser.on('readable', () => {
              const template = JSON.parse(parser.read().description) as IFeedTemplate;
              this.setState({
                error: '',
                template,
              });

              loaded = true;
            });

            parser._write(text, 'utf8', () => {
              if (!loaded) {
                this.setError(strings.TEMPLATE_DOES_NOT_EXIST)
              }
            });
          },

          (reason) => {
            this.setError(reason);
          },
        );
      },

      (reason) => {
        this.setError(reason);
      }
    )
  }

  getValidatorOutput({
    field_field_question: questions,
    field_field_story_template_body: [
      {
        raw: {
          safe_value: body,
        },
      },
    ],
  }: IFeedTemplate)
  {

    if (!body) {
      return <p>There was no text for the story template body.</p>;
    }

    if (!questions || !questions.length) {
      return <p>There were no questions in the story template.</p>;
    }

    const errors: Array<React.ReactNode> = [];
    questions.forEach((question) => {
      const {
        raw: {
          field_answer_id: {
            und: [
              {
                safe_value: answerId,
              },
            ],
          },

          field_answer_type: {
            und: [
              {
                value: answerType,
              },
            ],
          },

          field_default_answer: {
            und: [
              {
                safe_value: defaultAnswer,
              },
            ],
          },

          field_question_text: {
            und: [
              {
                safe_value: questionText,
              },
            ],
          },

          field_select_options: {
            und: selectOptions,
          }
        },
      } = question;

      if (!answerId) {
        errors.concat([
          <p>
            A question is missing an ID. Here are the other fields for that
            question:
          </p>,

          <p>
            Answer type:
          </p>,

          <p>
            {question.raw.field_answer_type.und[0].value}
          </p>,

          <p>
            Default answer:
          </p>,

          <p>
            {question.raw.field_default_answer.und[0].safe_value}
          </p>,

          <p>
            Question text:
          </p>,

          <p>
            {question.raw.field_question_text.und[0].safe_value}
          </p>,

          <p>
            Select options:
          </p>,

          <p>
            {question.raw.field_select_options.und[0].safe_value}
          </p>
        ]);
        
        return;
      } else if (body.indexOf(`{{${answerId}}}`) === -1) {
        errors.push(
          <p>
            Question with id <strong>{answerId}</strong> did not have a
            corresponding mustache template (<code>{`{{${answerId}}}`}</code>)
            in the story template body. Please add this somewhere in the body.
          </p>
        );
      }

      if (!answerType) {
        errors.push(
          <p>
            Question with id <strong>{answerId}</strong> did not have an answer
            type.
          </p>
        );
      } else if (!/^Big|Normal|Select$/.test(answerType)) {
        errors.push(
          <p>
            Question with id <strong>{answerId}</strong> did not have an
            answer type matching Big, Normal, or Select.
          </p>
        );
      } else if (answerType === 'Select') {
        if (!selectOptions ||
            !selectOptions[0] ||
            selectOptions[0].safe_value.split(/,\s*/).map((aa) => aa.trim()).filter((aa) => aa).length === 0)
        {
          errors.push(
            <p>
              Question with id <strong>{answerId}</strong> was of type &nbsp;
              <code>Select</code>, but no select options were provided.
            </p>
          );
        } else if (selectOptions[0].safe_value.split(/,\s*/).map((aa) => aa.trim()).filter((aa) => aa).length === 1) {
          errors.push(
            <p>
              Question with id <strong>{answerId}</strong> was of type &nbsp;
              <code>Select</code>, but only a single option was provided.
            </p>
          );
        }
      }

      if (!defaultAnswer) {
        errors.push(
          <p>
            Question with id <strong>{answerId}</strong> did not have a
            default answer.
          </p>
        );
      }

      if (!questionText) {
        errors.push(
          <p>Question with id <strong>{answerId}</strong> did not have question text.</p>
        );
      }

      if (selectOptions.length && answerType !== 'Select') {
        errors.push(
          <p>
            Question with id <strong>{answerId}</strong> was not of type
            <code>Select</code>, but it had text in the
            <code>Select options</code> field.
          </p>
        );
      }
    });
    
    const ids = questions.map(({
      raw: {
        field_answer_id: {
          und: [
            {
              safe_value: id,
            },
          ],
        }
      }
    }) => id).filter((id) => id);

    const re = /{{(.+?)}}/g;
    let match;
    while ((match = re.exec(body)) !== null) {
      if (ids.indexOf(match[1]) === -1) {
        errors.push(
          <p>
            The template {match[0]} was found in the story template body, but
            there were no questions provided with answer ID {match[1]}.
          </p>
        );
      }
    }

    if (errors.length) {
      return errors.map((error, index) => {
        if (React.isValidElement(error)) {
          return React.cloneElement(error as any, { key: index, });
        }

        return error;
      });
    }

    return <p>No errors found!</p>;
  }
  
  render() {
    const {
      error,
      template,
    } = this.state;

		return (
			<div className={`${styles.Archives} ${styles.Page}`}>
				<h1 className={styles.Title}>
					Story Template Validator
				</h1>

        <div>
          <label htmlFor="nodeId">
            Enter the node ID of the story template.
          </label>

          <input
            defaultValue=""
            id="nodeId"
            ref={(ref) => this.nodeIdInput = ref}
            onKeyDown={(e) => { if (e.keyCode === 13) { this.downloadTemplate(); } }}
          />
        </div>

        <div>
          <button onClick={this.downloadTemplate.bind(this)}>
            Validate template
          </button>
        </div>

        <p>{error}</p>

        <div>
          {template ? this.getValidatorOutput(template) : null}
        </div>
			</div>
		);
	}
}

export default StoryTemplateValidator;