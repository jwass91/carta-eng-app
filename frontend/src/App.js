import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { Container } from "semantic-ui-react";
import { EpisodeView, HomeView, SeasonView, ErrorView } from "./views";
import { ScrollToTop } from "./components";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Container style={{ margin: "3em" }}>
                <div>
                    <Switch>
                        <Route
                            path="/season/:number"
                            render={props => {
                                return <SeasonView number={props.match.params.number} />;
                            }}
                        />
                        <Route
                            path="/episode/:season/:number"
                            render={props => {
                                return (
                                    <EpisodeView
                                        season={props.match.params.season}
                                        number={props.match.params.number}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/"
                            exact
                            render={props => {
                                return <HomeView />;
                            }}
                        />
                        <Route
                            render={props => {
                                return <ErrorView navbar />;
                            }}
                        />
                    </Switch>
                </div>
            </Container>
        </Router>
    );
}

export default App;
