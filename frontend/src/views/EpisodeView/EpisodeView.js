import React, { Component } from "react";
import { Header, Image, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Navbar } from "../../components";

class EpisodeView extends Component {
    state = {
        episodeData: null
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/episodes/${this.props.season}/${this.props.number}/`)
            .then(response => response.json())
            .then(episodeData => this.setState({ episodeData }));
    }

    componentDidUpdate() {
        fetch(`http://127.0.0.1:5000/episodes/${this.props.season}/${this.props.number}/`)
            .then(response => response.json())
            .then(episodeData => this.setState({ episodeData }));
    }

    render() {
        const loading = (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );

        const episodeDetail =
            this.state.episodeData === null ? (
                loading
            ) : (
                <React.Fragment>
                    <Header
                        as="h1"
                        content={this.state.episodeData.name}
                        subheader={`Season ${this.state.episodeData.season}, Episode ${
                            this.state.episodeData.number
                        } — Aired: ${formatDate(this.state.episodeData.airdate)}`}
                    />
                    <Image src={this.state.episodeData.image} size="large" rounded />
                    <Segment size="big">{formatSummary(this.state.episodeData.summary)}</Segment>
                </React.Fragment>
            );

        return (
            <div style={{ height: "100%" }}>
                <Navbar />
                {episodeDetail}
            </div>
        );
    }
}

export default EpisodeView;

function formatDate(dateString) {
    var split = dateString.split("-");
    return split[1] + "/" + split[2] + "/" + split[0];
}

function formatSummary(summaryString) {
    return summaryString.replace(/<\/p>/, "").replace(/<p>/, "");
}
