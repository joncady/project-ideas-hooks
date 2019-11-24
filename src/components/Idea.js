import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function Idea(props) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Meta>
                    <span>{props.subtitle}</span>
                </Card.Meta>
                <Card.Description>
                    {props.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {props.tags && props.tags.map((tag, index) => <Label key={`tag${index}`}>{tag}</Label>)}
            </Card.Content>
        </Card>
    );
}

Idea.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
};