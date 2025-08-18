import { Component } from 'react';
import './loader.css';

export class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader" role="status" aria-label="Loading..."></div>
      </div>
    );
  }
}
