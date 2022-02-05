import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

export const Search = ({setSearchFieldFunc, format}) => {
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '300px' }}>
            <InputBase onChange={e => {setSearchFieldFunc(e.target.value)}}
                sx={{ ml: 1, flex: 1 }} placeholder="Искать" inputProps={{ 'aria-label': 'search' }}/>
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}