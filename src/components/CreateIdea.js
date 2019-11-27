import React, { useState } from 'react';
import { Modal, Button, Form, Label, Icon, Message } from 'semantic-ui-react';
import firebase from 'firebase';
import useCreateIdeaForm from '../CustomHooks';

export default function CreateIdea() {
    const { inputs, handleInputChange, resetInputs } = useCreateIdeaForm({ title: "", subtitle: "", description: "" });

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);

    const handleTagChange = (event, { value }) => setTagInput(value);
    const handleTagAdd = () => {
        if (tagInput) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };
    const removeTag = (deleteIndex) => {
        setTags(tags.filter((tag, index) => index !== deleteIndex));
    }
    const submitIdea = () => {
        if (inputs.title && tags.length > 0 && inputs.description && inputs.subtitle) {
            setValidate(false);
            setLoading(true);
            firebase.firestore().collection("ideas").add({
                title: inputs.title,
                subtitle: inputs.subtitle,
                description: inputs.description,
                tags
            })
                .then(() => {
                    resetInputs();
                    setTagInput("");
                    setTags([]);
                    setModal(false);
                    setError(false);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    setError(true);
                })
        } else {
            setValidate(true);
        }
    };

    return (
        <Modal open={modal} onClose={() => setModal(false)} closeIcon trigger={<Button onClick={() => setModal(true)}>Create Idea</Button>}>
            <Modal.Header>Generate an Idea!</Modal.Header>
            <Modal.Content>
                <Form loading={loading} error={error}>
                    <Form.Group widths="equal">
                        <Form.Input fluid label='Title' placeholder='Title' name="title" value={inputs.title} onChange={handleInputChange} error={validate && !inputs.title} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid label='Subtitle' placeholder='Subtitle' name="subtitle" value={inputs.subtitle} onChange={handleInputChange} error={validate && !inputs.subtitle} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid label='Description' placeholder='Description' name="description" value={inputs.description} onChange={handleInputChange} error={validate && !inputs.description} />
                    </Form.Group>
                    <Form.Group widths="4">
                        <Form.Input fluid label='Tags' placeholder='Tags' onChange={handleTagChange} value={tagInput} error={validate && tags.length === 0} />
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Button onClick={handleTagAdd}>Add</Button>
                            {tags.map((tag, index) => <Label key={`tag${index}`}>{tag}&nbsp;<Icon link name="remove" onClick={() => removeTag(index)}></Icon></Label>)}
                            </div>
                    </Form.Group>
                    <Message
                        error
                        header='Please try again later!'
                        content='The current action failed, please try again!'
                    />
                </Form>
                <Button onClick={submitIdea}>Submit your idea!</Button>
            </Modal.Content>
        </Modal>
    );
}