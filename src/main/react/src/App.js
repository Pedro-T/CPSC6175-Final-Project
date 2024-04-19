import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import CountriesPage from "./components/CountriesPage";
import CountryDetailPage from "./components/CountryDetailPage";
import RegionsPage from "./components/RegionsPage";
import DemographicsPage from "./components/DemographicsPage";
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/countries">Countries</Link>
                        </li>
                        <li>
                            <Link to="/regions">Regions</Link>
                        </li>
                        <li>
                            <Link to="/demographics">Demographics</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/countries" component={CountriesPage} />
                    <Route path="/country/:cca2" component={CountryDetailPage} />
                    <Route path="/regions" component={RegionsPage} />
                    <Route path="/demographics" component={DemographicsPage} />
                    {/* Reminder to add a 404 page or redirect to home*/}
                    <Route path="*">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
