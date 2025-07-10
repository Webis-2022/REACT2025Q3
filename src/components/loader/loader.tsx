import { Component } from 'react';
import './loader.css';

export class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}
