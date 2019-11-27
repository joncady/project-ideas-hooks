import React from 'react';
import { shallow } from 'enzyme';
import useCreateIdeaForm from './CustomHooks';

function HookWrapper(values) {
    const hook = values.hook ? values.hook() : undefined;
    return <div hook={hook} />;
}

describe("useCreateIdeaForm", () => {
    let initialState = {
        username: "name",
        password: "pass"
    };

    it("should have the correct initial state", () => {
        let wrapper = shallow(<HookWrapper hook={() => useCreateIdeaForm(initialState)} />);
        let { hook } = wrapper.find('div').props();
        let { inputs } = hook;
        expect(inputs).toEqual(initialState);
    });

    it("should change when an event is fired", () => {
        let wrapper = shallow(<HookWrapper hook={() => useCreateIdeaForm(initialState)} />);
        let { hook } = wrapper.find('div').props();
        let { handleInputChange, inputs } = hook;
        let inputEvent = {
            target: {
                value: "testuser",
                name: "username"
            },
            persist: jest.fn()
        };
        handleInputChange(inputEvent);

        ({ hook: { inputs } } = wrapper.find('div').props());
        expect(inputs.username).toEqual("testuser");
    });

    it("should reset all fields when resetInputs is called", () => {
        let wrapper = shallow(<HookWrapper hook={() => useCreateIdeaForm(initialState)} />);
        let { hook: { resetInputs } } = wrapper.find('div').props();

        resetInputs();
        let { hook: { inputs } } = wrapper.find('div').props();
        expect(inputs).toEqual({
            username: "",
            password: ""
        });
    });

    it("should call the callback when handleSubmit is called", () => {
        let callback = jest.fn();
        let wrapper = shallow(<HookWrapper hook={() => useCreateIdeaForm(initialState, callback)} />);
        let { hook: { handleSubmit } } = wrapper.find('div').props();
        
       handleSubmit();
       
        expect(callback).toHaveBeenCalled();
    });

});