import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import IdeasPage from './pages/IdeasPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Container>
        <Header selected="/home" />
        <Switch>
          <Route path="/" exact component={AboutPage} />
          <Route path="/ideas" match component={IdeasPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
