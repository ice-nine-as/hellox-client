import {
  THexagonProps,
} from '../TypeAliases/THexagonProps';
import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Hexagon.less';
const _styles = styles || {};

const gold = '#dab239';
const deepPurple = '#343358'

const hexagonImage = `<svg version="1.1" id="dat-hexagon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="240px" height="240px" viewBox="0 0 240 240" enable-background="new 0 0 240 240" xml:space="preserve">
<polygon fill={color} points="224,179.5 119.5,239.5 15,179.5 15,59.5 119.5,-0.5 224,59.5 "/>
</svg>`;


export class Hexagon extends React.PureComponent<THexagonProps> {
  render() {
    const className = this.props.className ? ` ${this.props.className}` : '';
    const imageColor = (className == ' active' ? gold : deepPurple)
    const formattedSource = hexagonImage.replace('{color}', `"${imageColor}"`)
    const imgSrc = `data:image/svg+xml;utf8,${formattedSource}`

    console.log(className)
    return (
      <div className={`${_styles.Hexagon} Hexagon${className}`}>
        <img src={imgSrc} />
        <h3>{this.props.children}</h3>
      </div>
    );
  }
}

export default Hexagon;