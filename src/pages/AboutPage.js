import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

export default function AboutPage() {
    return (
        <Container>
            <Segment>
                <Header>
                    Project Idea Generator
                </Header>
            </Segment>
            <Segment placeholder>
                <Header as="h2">
                    See ideas from other curious people!
                </Header>
            </Segment>
        </Container>
    );
}