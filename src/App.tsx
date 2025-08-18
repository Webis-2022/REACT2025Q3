import { Header } from './components/header/header';
import { Search } from './components/search/search';
import { Component, createRef } from 'react';
import { DialogWindow } from './components/dialog-window/dialog-window';
import { BuggyComponent } from './components/crash-button/crash-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { Results } from './components/results/results';
import './App.css';

export class App extends Component {
  state = {
    items: [],
    isLoading: false,
    hasResults: false,
    error: null,
    responseStatus: undefined as number | undefined,
  };

  dialogRef = createRef<DialogWindow>();

  componentDidMount(): void {
    const savedInputValue = localStorage.getItem('inputValue');
    this.handleSearch(savedInputValue ?? '');
  }

  handleSearch = async (searchTerm: string) => {
    try {
      this.setState({ isLoading: true, error: null });

      const baseUrl = 'https://swapi.py4e.com/api/people';
      const url = searchTerm.trim()
        ? `${baseUrl}/?search=${encodeURIComponent(searchTerm)}`
        : baseUrl;

      const response = await fetch(url);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await response.json();
      const isErrorStatus = response.status === 404 || response.status === 500;
      const isEmptyResult = data.count === 0;
      if ((isErrorStatus || isEmptyResult) && this.dialogRef.current) {
        this.dialogRef.current.open();
        this.setState({ items: [], isLoading: false, error: null });
        return;
      }

      this.setState({
        items: data.results,
        isLoading: false,
        hasResults: data.results.length > 0,
        responseStatus: response.status,
      });
    } catch (error) {
      this.setState({ error: (error as Error).message, isLoading: false });
    }
  };

  setHasResults = (value: boolean) => {
    this.setState({ hasResults: value });
  };
  render() {
    return (
      <>
        <Header />
        <main>
          <Search
            onSearch={this.handleSearch}
            setHasResults={this.setHasResults}
          />
          <Results
            items={this.state.items}
            isLoading={this.state.isLoading}
            hasResults={this.state.hasResults}
            error={this.state.error}
            dialogRef={this.dialogRef}
            responseStatus={this.state.responseStatus}
          />
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </main>
      </>
    );
  }
}
