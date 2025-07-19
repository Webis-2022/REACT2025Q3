import { Header } from './components/header/header';
import { Search } from './components/search/search';
import { Component, createRef } from 'react';
import { DialogWindow } from './components/dialog-window/dialog-window';
import { BuggyComponent } from './components/crash-button/crash-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { Results } from './components/results/results';
import './App.css';

class App extends Component {
  state = {
    items: [],
    isLoading: false,
    hasResults: false,
    error: null,
  };

  dialogRef = createRef<DialogWindow>();
  response: Response | undefined;

  componentDidMount(): void {
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      this.handleSearch(savedInputValue);
    } else {
      this.handleSearch('');
    }
  }

  handleSearch = async (searchTerm: string) => {
    try {
      this.setState({ isLoading: true, error: null });
      if (searchTerm === '') {
        this.response = await fetch(`https://swapi.py4e.com/api/people`);
      } else {
        this.response = await fetch(
          `https://swapi.py4e.com/api/people/?search=${searchTerm}`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await this.response.json();
      if (
        (this.response.status === 404 && this.dialogRef.current) ||
        (this.response.status === 500 && this.dialogRef.current) ||
        (data.count === 0 && this.dialogRef.current)
      ) {
        this.dialogRef.current.open();
        this.setState({ items: [], isLoading: false, error: null });
        return;
      }

      this.setState({
        items: data.results,
        isLoading: false,
        hasResults: data.results.length > 0,
      });
    } catch (error) {
      this.setState({ error: (error as Error).message, isLoading: false });
      console.log('___', error);
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
            response={this.response}
          />
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </main>
      </>
    );
  }
}

export default App;
