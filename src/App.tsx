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
  };

  dialogRef = createRef<DialogWindow>();

  handleSearch = async (searchTerm: string) => {
    try {
      this.setState({ isLoading: true });
      let response;
      if (searchTerm === '') {
        response = await fetch(`https://swapi.py4e.com/api/people`);
      } else {
        response = await fetch(
          `https://swapi.py4e.com/api/people/?search=${searchTerm}`
        );
      }
      if (response.status === 404 && this.dialogRef.current) {
        this.dialogRef.current.open();
        this.setState({ items: [], isLoading: false });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await response.json();
      console.log(data.results.length);

      this.setState({
        items: data.results,
        isLoading: false,
        hasResults: data.results.length > 0,
      });
    } catch (error) {
      console.log('API ERROR', error);
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
          />
          <DialogWindow ref={this.dialogRef} />
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </main>
      </>
    );
  }
}

export default App;
