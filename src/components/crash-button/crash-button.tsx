import { Component } from 'react';

export class BuggyComponent extends Component {
  state = { throwError: false };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Error caused by pressing a button');
    }

    return (
      <button className="crash-btn" onClick={this.handleClick}>
        Error
      </button>
    );
  }
}
