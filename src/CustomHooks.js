import { useState } from 'react';

const useCreateIdeaForm = (initalState, callback) => {
    const [inputs, setInputs] = useState({ ...initalState });
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const resetInputs = () => {
        let resetInputs = {};
        Object.keys(inputs).forEach(key => resetInputs[key] = "");
        setInputs(resetInputs);
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        resetInputs
    };

}

export default useCreateIdeaForm;