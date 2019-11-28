import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SeasonCard(props) {
    return (
        <Card fluid color="blue" as={Link} to={`/season/${props.number}`}>
            <Card.Content>
                <Card.Header>Season {props.number}</Card.Header>
                <div className="ui top right attached label">{props.numEpisodes} Episodes</div>
                <Card.Description>
                    {formatDate(props.startDate)} — {formatDate(props.endDate)}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

function formatDate(dateString) {
    return dateString.split("-")[0];
}
