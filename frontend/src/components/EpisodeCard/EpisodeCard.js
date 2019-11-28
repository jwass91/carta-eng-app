import React from "react";
import { Card, Dimmer, Loader, Image } from "semantic-ui-react";
import Img from "react-image";
import { Link } from "react-router-dom";

export default function EpisodeCard(props) {
    return (
        <Card color="blue" as={Link} to={`/episode/${props.season}/${props.number}`}>
            <div className="image">
                <Img
                    className="wrapped image"
                    src={[props.image, "http://via.placeholder.com/1280x720/808080/808080/Text=/"]}
                    loader={
                        <React.Fragment>
                            <Dimmer inverted active>
                                <Loader />
                            </Dimmer>
                            <Image
                                src="http://via.placeholder.com/1280x720/808080/808080/Text=/"
                                ui={false}
                            />
                        </React.Fragment>
                    }
                />
            </div>
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>
                    {props.showSeason ? (
                        <span>
                            Season {props.season}, Episode {props.number}
                        </span>
                    ) : (
                        <span>Episode {props.number}</span>
                    )}
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}
