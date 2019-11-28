import React, { Component } from "react";
import { Header, Dimmer, Loader } from "semantic-ui-react";
import { Navbar, SeasonCard } from "../../components";

class HomeView extends Component {
    state = {
        seasonsData: null
    };

    componentDidMount() {
        fetch("http://127.0.0.1:5000/seasons/")
            .then(response => response.json())
            .then(seasonsData => this.setState({ seasonsData }));
    }

    render() {
        const loading = (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );

        const seasons =
            this.state.seasonsData === null
                ? loading
                : this.state.seasonsData.map(season => {
                      return (
                          <SeasonCard
                              key={season.number}
                              number={season.number}
                              startDate={season.premiereDate}
                              endDate={season.endDate}
                              numEpisodes={season.numEpisodes}
                          />
                      );
                  });

        return (
            <div>
                <Navbar />
                <Header as="h1" dividing>
                    How I Met Your Mother Seasons
                </Header>
                {seasons}
                {/* <Button primary fluid>
                    Generate Random Episode
                </Button> */}
            </div>
        );
    }
}

export default HomeView;
