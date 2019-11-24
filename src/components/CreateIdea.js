import React, { useState } from 'react';
import { Modal, Button, Form, Label, Icon, Message } from 'semantic-ui-react';
import firebase from 'firebase';

export default function CreateIdea() {

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);

    const handleTitleChange = (event, { value }) => setTitle(value);
    const handleDescriptionChange = (event, { value }) => setDescription(value);
    const handleSubtitleChange = (event, { value }) => setSubtitle(value);
    const handleTagChange = (event, { value }) => setTagInput(value);
    const handleTagAdd = () => {
        setTags([...tags, tagInput]);
        setTagInput("");
    };
    const removeTag = (deleteIndex) => {
        setTags(tags.filter((tag, index) => index !== deleteIndex));
    }
    const submitIdea = () => {
        if (title && tags.length > 0 && description && subtitle) {
            setValidate(false);
            setLoading(true);
            firebase.firestore().collection("ideas").add({
                title,
                subtitle,
                description,
                tags
            })
                .then(() => {
                    setTitle("");
                    setSubtitle("");
                    setDescription("");
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
                        <Form.Input fluid label='Title' placeholder='Title' value={title} onChange={handleTitleChange} error={validate && title === ""} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid label='Subtitle' placeholder='Subtitle' value={subtitle} onChange={handleSubtitleChange} error={validate && subtitle === ""} />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid label='Description' placeholder='Description' value={description} onChange={handleDescriptionChange} error={validate && description === ""} />
                    </Form.Group>
                    <Form.Group widths="4">
                        <Form.Input fluid label='Tags' placeholder='Tags' onChange={handleTagChange} value={tagInput} error={validate && tags.length === 0} />
                        <Button onClick={handleTagAdd}>Add</Button>
                        <div>
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