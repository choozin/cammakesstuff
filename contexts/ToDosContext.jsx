import React, { createContext, useState } from 'react';

import todosArray from '../lib/todos'

import { v4 as uuid } from 'uuid'

export const ToDosContext = createContext();

const ToDosContextProvider = ({ children }) => {

    const initializeData = () => {
        return todosArray;
    };

    const [initialToDos, setInitialToDos] = useState(initializeData);
    const [updatedToDos, setUpdatedToDos] = useState(initialToDos);

    const addToDo = (label, description, category, priority, datetime) => {
        setUpdatedToDos([...updatedToDos, { label, description, category, priority, datetime, id: uuid() }]);
    }

    const removeToDo = (id) => {
        setUpdatedToDos(updatedToDos.filter(todo => todo.id !== id));
    }

    const updateToDo = (id, description, datetime) => {
        const toDoIndex = updatedToDos.findIndex(toDo => toDo.id == id);
        const newToDos = updatedToDos;
        newToDos[toDoIndex].description = description;
        newToDos[toDoIndex].datetime = datetime;
        setUpdatedToDos([...newToDos]);
    }

    const sortToDos = (sortType) => {
        let sortedArray = [];
        switch (sortType) {
            case 'category':
                sortedArray = updatedToDos.sort((a, b) => a.category.localeCompare(b.category));
                setUpdatedToDos([...sortedArray]);
                break;
            case 'alphabetical':
                sortedArray = updatedToDos.sort((a, b) => a.label.localeCompare(b.label));
                setUpdatedToDos([...sortedArray]);
                break;
            default:
                break;
        }
    }

    const contextData = {
        toDos: {
            updatedToDos,
            addToDo,
            removeToDo,
            updateToDo,
            sortToDos,
        }
    }

    return (
        <ToDosContext.Provider value={contextData}>
            {children}
        </ToDosContext.Provider>
    )
}

export default ToDosContextProvider;