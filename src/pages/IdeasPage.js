import React, { useState, useEffect } from 'react';
import { Container, Segment, Loader, Search, Dimmer, Grid } from 'semantic-ui-react';
import Idea from '../components/Idea';
import firebase from 'firebase';
import CreateIdea from '../components/CreateIdea';

export default function IdeasPage() {

    const [ideas, setIdeas] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [confirmedSearch, setConfirmedSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        let dbRef = firebase.firestore().collection("ideas");
        let unreg = dbRef.onSnapshot((snapshot) => {
            let ideas = [];
            snapshot.forEach(idea => ideas.push({ ...idea.data(), id: idea.id }));
            setIdeas(ideas);
            setLoading(false);
        });
        return () => unreg();
    }, []);

    const handleSearchChange = (e, { value }) => {
        setSearchLoading(true);
        setSearch(value);
        setConfirmedSearch("");
        const re = new RegExp(value, 'i');
        const isMatch = (result) => re.test(result.title);
        setFilteredIdeas(ideas.filter(isMatch));
        setSearchLoading(false);
    };

    const filterWithTitle = (idea) => {
        if (confirmedSearch === "") {
            return true;
        } else {
            return idea.title === confirmedSearch;
        }
    };

    return (
        <Container>
            <Segment>
                <Search value={search} loading={searchLoading} onResultSelect={(e, { result }) => setConfirmedSearch(result.title)} onSearchChange={handleSearchChange} results={filteredIdeas}></Search>
            </Segment>
            <Segment placeholder>
                <Dimmer active={loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Grid stackable columns={2}>
                    {ideas.filter(filterWithTitle).map((idea, index) => <Grid.Column key={`idea${index}`}><Idea {...idea} /></Grid.Column>)}
                </Grid>
            </Segment>
            <Segment>
                <CreateIdea />
            </Segment>
        </Container>
    );
}