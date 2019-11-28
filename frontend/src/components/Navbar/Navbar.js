import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Image, Menu, Modal } from "semantic-ui-react";
import { EpisodeCard } from "../../components";

class Navbar extends Component {
    state = {
        episodeData: null
    };

    render() {
        this.fetchEpisode = () => {
            this.setState({ episodeData: null });
            fetch(`http://127.0.0.1:5000/random_episode/`)
                .then(response => response.json())
                .then(episodeData => this.setState({ episodeData }));
        };

        const loading = (
            <EpisodeCard
                name="Random"
                number=""
                season=""
                image="http://via.placeholder.com/1280x720/808080/808080/Text=/"
            />
        );

        const randomEpisode =
            this.state.episodeData === null ? (
                loading
            ) : (
                <EpisodeCard
                    name={this.state.episodeData.name}
                    number={this.state.episodeData.number}
                    season={this.state.episodeData.season}
                    image={this.state.episodeData.image}
                    showSeason
                />
            );

        return (
            <div style={{ marginBottom: "5em" }}>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item as={Link} to="/" header>
                            <Image size="mini" src="/logo.png" style={{ marginRight: "1.5em" }} />
                            HIMYM
                        </Menu.Item>
                    </Container>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Modal
                                trigger={
                                    <Button onClick={this.fetchEpisode} primary>
                                        Generate Random Episode
                                    </Button>
                                }
                                closeIcon
                            >
                                <Modal.Header>Why don't you watch:</Modal.Header>
                                <Modal.Content>
                                    <Card.Group centered>{randomEpisode}</Card.Group>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.fetchEpisode} primary>
                                        Generate Another
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default Navbar;
