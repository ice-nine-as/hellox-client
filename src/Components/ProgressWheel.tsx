import {
  TProgressWheelProps,
} from '../TypeAliases/TProgressWheelProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/ProgressWheel.less';
const styles = _styles || {};

export class ProgressWheel extends React.PureComponent<TProgressWheelProps> {
  render() {
    const {
      current,
      max,
    } = this.props;

    const ratio = current / max;
    const goldStyles: { [key: string]: string } = {};
    if (ratio <= 0.125) {
      const subRatio = 50 + Math.round(ratio / 0.125 * 100) / 2;
      goldStyles.clipPath = `polygon(50% 0, 50% 50%, ${subRatio}% 0)`;
    } else if (ratio <= 0.375) {
      const subRatio = Math.round(ratio / 0.375 * 100) - 12.5;
      goldStyles.clipPath = `polygon(50% 0, 100% 0, 100% ${subRatio}%, 50% 50%)`;
    } else if (ratio <= 0.625) {
      const subRatio = 100 - Math.round((ratio - 0.375) / (0.625 - 0.375) * 100);
      goldStyles.clipPath = `polygon(50% 0, 100% 0, 100% 100%, ${subRatio}% 100%, 50% 50%)`;
    } else if (ratio <= 0.875) {
      const subRatio = 100 - Math.round((ratio - 0.625) / (0.875 - 0.625) * 100);
      goldStyles.clipPath = `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 ${subRatio}%, 50% 50%)`;
    } else {
      const subRatio = Math.round((ratio - 0.875) / (1 - 0.875) * 50);
      goldStyles.clipPath = `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${subRatio}% 0, 50% 50%)`;
    }

    return (
      <div className={styles.ProgressWheel}>
        <div className={styles.Gray} />
        <div
          className={styles.Gold}
          style={{ ...goldStyles, }}
        >
        </div>

        <span className={styles.Text}>
          {current}/{max}
        </span>
      </div>
    )
  }
}

export default ProgressWheel;