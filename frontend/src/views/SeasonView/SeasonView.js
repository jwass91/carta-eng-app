import React, { Component } from "react";
import { Header, Card, Dimmer, Loader } from "semantic-ui-react";
import { Navbar, EpisodeCard } from "../../components";

class SeasonView extends Component {
    state = {
        episodeData: null
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/episodes/${this.props.number}/`)
            .then(response => response.json())
            .then(episodeData => this.setState({ episodeData }));
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
                <Header as="h1" dividing>
                    Season {this.props.number} Episodes
                </Header>
                <Card.Group itemsPerRow={4}>{episodes}</Card.Group>
            </div>
        );
    }
}

export default SeasonView;
