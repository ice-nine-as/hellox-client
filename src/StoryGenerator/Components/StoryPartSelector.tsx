import {
  Hexagon,
} from '../../Components/Hexagon';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  TStoryPartSelectorProps,
} from '../TypeAliases/TStoryPartSelectorProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StoryPartSelector.less';
const _styles = styles || {};

export class StoryPartSelector extends React.PureComponent<TStoryPartSelectorProps> {
  render() {
    const isAActive = this.props.currentPart === StoryGeneratorParts.A ?
      'active' :
      '';

    const isBActive = this.props.currentPart === StoryGeneratorParts.B ?
      'active' :
      '';

    const isCActive = this.props.currentPart === StoryGeneratorParts.C ?
      'active' :
      '';

    return (
      <div className={_styles.StoryPartSelector}>
        <div className={_styles.SelectorContainer}>
          <button
            className={`${_styles.PartSelector} ${_styles.A}`}
            onClick={() => this.props.setCurrentPart(StoryGeneratorParts.A)}
          >
            <Hexagon className={isAActive}>
                A
            </Hexagon>

            <span className={_styles.Title}>
              {this.props.titleMap.A}
            </span>
          </button>
        </div>

          <div className={_styles.SelectorContainer}>
            <button
              className={`${_styles.PartSelector} ${_styles.B}`}
              onClick={() => this.props.setCurrentPart(StoryGeneratorParts.B)}
            >
              <Hexagon className={isBActive}>
                  B
              </Hexagon>

              <span className={_styles.Title}>
                {this.props.titleMap.B}
              </span>
            </button>
          </div>

        <div className={_styles.SelectorContainer}>
          <button
            className={`${_styles.PartSelector} ${_styles.C}`}
            onClick={() => this.props.setCurrentPart(StoryGeneratorParts.C)}
          >
            <Hexagon className={isCActive}>
              C
            </Hexagon>

            <span className={_styles.Title}>
              {this.props.titleMap.C}
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default StoryPartSelector;