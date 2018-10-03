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
import _styles from '../Styles/Components/StoryPartSelector.less';
const styles = _styles || {};

export class StoryPartSelector extends React.PureComponent<TStoryPartSelectorProps> {
  render() {
    const {
      currentPart,
      setCurrentPart,
      titleMap,
    } = this.props;

    const isAActive = currentPart === StoryGeneratorParts.A ?
      'active' :
      '';

    const isBActive = currentPart === StoryGeneratorParts.B ?
      'active' :
      '';

    const isCActive = currentPart === StoryGeneratorParts.C ?
      'active' :
      '';

    return (
      <div className={styles.StoryPartSelector}>
        <div className={styles.SelectorContainer}>
          <button
            className={`${styles.PartSelector} ${styles.A}`}
            onClick={() => setCurrentPart(StoryGeneratorParts.A)}
          >
            <Hexagon className={isAActive}>
              A
            </Hexagon>

            <span className={styles.Title}>
              {titleMap.A}
            </span>
          </button>
        </div>

          <div className={styles.SelectorContainer}>
            <button
              className={`${styles.PartSelector} ${styles.B}`}
              onClick={() => setCurrentPart(StoryGeneratorParts.B)}
            >
              <Hexagon className={isBActive}>
                B
              </Hexagon>

              <span className={styles.Title}>
                {titleMap.B}
              </span>
            </button>
          </div>

        <div className={styles.SelectorContainer}>
          <button
            className={`${styles.PartSelector} ${styles.C}`}
            onClick={() => setCurrentPart(StoryGeneratorParts.C)}
          >
            <Hexagon className={isCActive}>
              C
            </Hexagon>

            <span className={styles.Title}>
              {titleMap.C}
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default StoryPartSelector;