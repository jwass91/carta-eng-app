import React, { Component } from "react";
import { Header, Card, Dimmer, Loader } from "semantic-ui-react";
import { Navbar, EpisodeCard } from "../../components";
import { ErrorView } from "../../views";

class SeasonView extends Component {
    state = {
        episodeData: null,
        error: false
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/episodes/${this.props.number}/`)
            .then(response => response.json())
            .then(episodeData => this.setState({ episodeData }))
            .catch(() => {
                this.setState({ error: true });
            });
    }

    render() {
        const loading = (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );

        const episodes =
            this.state.episodeData === null
                ? loading
                : this.state.episodeData.map(episode => {
                      return (
                          <EpisodeCard
                              key={episode.number}
                              name={episode.name}
                              number={episode.number}
                              season={this.props.number}
                              image={episode.image}
                          />
                      );
                  });

        return (
            <div>
                <Navbar />
                {this.state.error ? (
                    <ErrorView />
                ) : (
                    <div>
                        <Header as="h1" dividing>
                            Season {this.props.number} Episodes
                        </Header>
                        <Card.Group itemsPerRow={4}>{episodes}</Card.Group>
                    </div>
                )}
            </div>
        );
    }
}

export default SeasonView;
