import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router ind>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <p>
        <Link to="/read" style={{ padding: 5 }} onClick={() => {localStorage.setItem('page', 0);}}>Read</Link>
        <Link to="/create" style={{ padding: 5 }}>Create</Link>
        </p>        
        <div>
          <Route exact path='/create' component={Create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path='/read' component={Read} />
        </div>
        <Route path='/update' component={Update} />
      </div>
    </Router>
  );
}

export default App;
