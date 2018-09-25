import {
  FramIcon,
} from './Icon/Sponsors/FramIcon';
import {
  FrittOrdIcon,
} from './Icon/Sponsors/FrittOrdIcon';
import {
  InnovationNorwayIcon,
} from './Icon/Sponsors/InnovationNorwayIcon';
import {
  KommuneIcon,
} from './Icon/Sponsors/KommuneIcon';
import {
  KoroIcon,
} from './Icon/Sponsors/KoroIcon';
import {
  KulturradIcon,
} from './Icon/Sponsors/KulturradIcon';
import {
  NnkmIcon,
} from './Icon/Sponsors/NnkmIcon';
import {
  PolariaIcon,
} from './Icon/Sponsors/PolariaIcon';
import {
  SparebankIcon,
} from './Icon/Sponsors/SparebankIcon';
import {
  UitIcon,
} from './Icon/Sponsors/UitIcon';
import {
  VsfIcon,
} from './Icon/Sponsors/VsfIcon';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/SponsorIcons.less';
const styles = _styles || {};

export class SponsorIcons extends React.PureComponent {
  render() {
    return (
      <div className={styles.SponsorIcons}>
        <FramIcon />
        <FrittOrdIcon />
        <InnovationNorwayIcon />
        <KommuneIcon />
        <KoroIcon />
        <KulturradIcon />
        <NnkmIcon />
        <PolariaIcon />
        <SparebankIcon />
        <UitIcon />
        <VsfIcon />
      </div>
    );
  }
}

export default SponsorIcons;