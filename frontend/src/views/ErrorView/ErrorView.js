import React from "react";
import { Header, Icon, Segment, Button } from "semantic-ui-react";
import { Navbar } from "../../components";
import { Link } from "react-router-dom";

export default function ErrorView(props) {
    return (
        <div>
            {props.navbar ? <Navbar /> : <div></div>}
            <Segment placeholder style={{ marginTop: "6em" }}>
                <Header as="h1" icon>
                    <Icon name="exclamation circle" />
                    Page Not Found
                </Header>
                <Button primary as={Link} to="/">
                    Go Home
                </Button>
            </Segment>
        </div>
    );
}
