import './App.css';
import { Provider } from 'react-redux';
import SearchJobs from './pages/SearchJobs';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {/* Search Jobs Page */}
      <SearchJobs/>
    </div>
    </Provider>
  );
}

export default App;