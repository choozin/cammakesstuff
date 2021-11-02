import React, { Component, useState, useContext, useEffect } from 'react';
import { ToDosContext } from '../../contexts/ToDosContext';

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const ToDos = () => {

    const [onlyShowPriority, setOnlyShowPriority] = useState(false)
    const [sort, setSort] = useState(null)

    const { toDos } = useContext(ToDosContext);

    const deleteItem = (id) => {

        toDos.removeToDo(id);

    }

    const sortItems = (type) => {

        toDos.sortToDos(type)

    }

    const togglePriority = () => {

        setOnlyShowPriority(onlyShowPriority ? false : true);

    }

    const handleChange = (e) => {
        let selection = e.target.value;
        setSort(selection);

        switch (selection) {
            case 'chronologic':
                sortItems('chronologic')
                break;
            case 'category':
                sortItems('category')
                break;
            case 'alphabetical':
                sortItems('alphabetical')
                break;
        }
    }

    let priorityBtnColor = onlyShowPriority ? "secondary" : "primary"

    return (
        <div className='todos'>
            <div className='sort' style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                <FormControl>
                    <InputLabel id="sort-label">Sort By...</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={sort}
                        label="Sort by..."
                        onChange={handleChange}
                        style={{ minWidth: '150px' }}
                    >
                        <MenuItem value={'alphabetical'}>Alphabetical</MenuItem>
                        <MenuItem value={'category'}>Category</MenuItem>
                    </Select>
                </FormControl>
                {onlyShowPriority ? 
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOnlyShowPriority(!onlyShowPriority)}
                >
                    Priority Only
                </Button>
                :
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOnlyShowPriority(!onlyShowPriority)}
                >
                    Priority Only
                </Button>
                }
            </div>
            <List>
                {toDos.updatedToDos.length > 0 && toDos.updatedToDos.map(item => {

                    let showItem = ((onlyShowPriority && item.priority) || !onlyShowPriority);

                    if (showItem) {
                        return (
                            <ListItem button key={item.id}>
                                <ListItemIcon>
                                    <DeleteIcon onClick={() => deleteItem(item.id)} />
                                </ListItemIcon>

                                <ListItemText primary={item.label} onClick={() => alert(item.description ? item.description : 'No description provided.')} />
                                <span>{item.category}</span>
                            </ListItem>
                        )
                    }
                })}
            </List>
        </div >
    );

}

export default ToDos;