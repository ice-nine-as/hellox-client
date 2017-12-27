import React  from 'react';
//import styles from '../styles/404';

export class FourOhFour extends React.Component {
  render() {
    return (
      <div>
        <span>404 - PAGE NOT FOUND</span>
        <span>{this.props}</span>
      </div>
    );
  }
}

export default FourOhFour;