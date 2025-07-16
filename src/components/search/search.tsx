import { Component } from 'react';
import type { SearchProps, SearchState } from './search.types';
// import './search.css';

export class Search extends Component<SearchProps, SearchState> {
  state = {
    inputValue: '',
  };

  componentDidMount(): void {
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      this.setState({ inputValue: savedInputValue });
    }
  }

  handleChange = (event: { target: { value: string } }) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.inputValue);
    localStorage.setItem('inputValue', this.state.inputValue);
    this.props.setHasResults(false);
  };

  render() {
    return (
      <div className="search">
        <input
          id="search-input"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button className="search-btn" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}
