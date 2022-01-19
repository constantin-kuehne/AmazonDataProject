import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SearchSelect() {
    const [search, setSearch] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" color="secondary"> Option</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search}
                    label="Search Option"
                    onChange={handleChange}
                    color="secondary"
                >
                    <MenuItem value={10}>ASIN</MenuItem>
                    <MenuItem value={20}>Product</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
