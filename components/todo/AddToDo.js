import React, { useContext, useState } from 'react';
import { ToDosContext } from '../../contexts/ToDosContext';

import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddToDo = () => {
    const { toDos } = useContext(ToDosContext);

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [priority, setPriority] = useState(false);

    const handleSubmit = (e) => {
        toDos.addToDo(label, description, category, priority);

        // clear out state
        setLabel('');
        setDescription('');
        setCategory(null);
        setPriority(false);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 4px #BBB',
            borderRadius: '1rem',
        }}>
            <h3 style={{ textAlign: 'center', color: '#444' }}>Add an Item</h3>
            <TextField
                style={{
                    margin: '0rem 1rem'
                }}
                id='label'
                label='Label'
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required />
            <TextField
                style={{
                    margin: '0rem 1rem'
                }}
                id='description'
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl
                    style={{
                        margin: '1rem',
                        width: '40%'
                    }}>
                    <InputLabel id='category-select-label'>Category</InputLabel>
                    <Select
                        labelId='category-select-label'
                        id='category-select'
                        value={category}
                        label='Category'
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value='Produce'>Produce</MenuItem>
                        <MenuItem value='Frozen'>Frozen</MenuItem>
                        <MenuItem value='Deli/Butcher'>Deli/Butcher</MenuItem>
                        <MenuItem value='Dairy'>Dairy</MenuItem>
                        <MenuItem value='Pantry'>Pantry</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    style={{
                        margin: '1rem',
                        width: '30%'
                    }}
                    variant="contained"
                    color={priority ? "secondary" : "#888"}
                    value={priority}
                    onClick={() => setPriority(!priority)}
                >
                    Priority
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                    style={{
                        margin: '1rem',
                        width: '30%'
                    }}
                    variant="contained"
                    color='primary'
                    onClick={() => handleSubmit()}
                >
                    Add Item
                </Button>
            </div>
        </Box>
    );
}

export default AddToDo;