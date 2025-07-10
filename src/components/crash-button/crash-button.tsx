import { Component } from 'react';
// import './crash-button.css';

export class BuggyComponent extends Component {
  state = { throwError: false };

  calcBtnMargin = () => {
    console.log(window.innerWidth);
    const btnMargin = `${(window.innerWidth - 800) / 2}px`;
    return btnMargin;
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Error caused by pressing a button');
    }

    return (
      <button
        className="crash-btn"
        onClick={this.handleClick}
        style={{ marginRight: this.calcBtnMargin() }}
      >
        Error
      </button>
    );
  }
}
