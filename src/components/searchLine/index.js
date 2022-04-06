import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react';

export const Search = ({setSearchFieldFunc, format}) => {
    const inputRef = useRef()
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '300px' }}>
            <InputBase inputRef={inputRef} onChange={e => {if (e.target.value === '') {setSearchFieldFunc('')}}}
                sx={{ ml: 1, flex: 1 }} placeholder="Искать" inputProps={{ 'aria-label': 'search' }}/>
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => {
                setSearchFieldFunc(inputRef.current.value)
            }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}