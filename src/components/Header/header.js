import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import styled from "styled-components";

const Item = styled.li``;

const Overlay = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  height: ${props => (props.open ? "100vh" : "0")};
  width: 100vw;
  background: ${props => (props.open ? "black" : "black")};
  transition: all 0.4s ease-in-out;
  z-index: 2;

  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;

const NavBarItem = ({link, text, menu, setBarActive, not_show}) => {
    let css_span = {}
    if (menu) { css_span = { color: 'white' }}

    if (not_show) { return null }
    return (
        <Typography variant="h6" component="span" fontSize='24px'>
            <Link to={link} onClick={() => setBarActive(false)} style={{ textDecoration: 'none', color: 'white' }}>
                <span className='gradient-text' style={css_span}>{text}</span>
            </Link>
        </Typography>
    )
}

export const Header = () => {
    const tablet = useMediaQuery('(max-width:768px)');

    const bar_css = {color: 'black', fontSize: '36px'}
    const [bar_active, setBarActive] = useState(false);

    const changeIcon = () => {
        setBarActive(!bar_active);
    }

    if (bar_active) { document.body.style.overflow = "hidden";
    } else { document.body.style.overflow = "scroll"; }

    return (
        <Box sx={{height: '64px', m: 0, p: 0}}>
            <AppBar className='container' position="static" sx={{ background: 'white', boxShadow: 'none'}}>
                <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6" component="span" fontSize='30px'>
                            <Link to="/" onClick={() => setBarActive(false)} style={{ textDecoration: 'none', color: 'black' }}>
                                <span className='gradient-text heading'>Cookery</span>
                            </Link>
                        </Typography>
                    </div>
                    {tablet ? 
                    <div>
                        <Button className="menuIcon" style={{ color: 'black', borderRadius: '20px' }} onClick={() => changeIcon()}>
                            {bar_active ? <MenuOpenIcon style={bar_css}/> : <MenuIcon style={bar_css}/>}
                        </Button>
                    </div> :
                    <div>
                        <NavBarItem link={"/login"} text={"Login / "} setBarActive={setBarActive}/>
                        <NavBarItem link={"/profile"} text={"Profile / "} setBarActive={setBarActive}/>
                    </div>}
                </Toolbar>
                <Overlay open={bar_active}>
                    <OverlayMenu open={bar_active}>
                        <Item>
                            <NavBarItem link={"/profile"} text={"Profile"} menu={true} 
                                        setBarActive={setBarActive} not_show={!bar_active}/>
                        </Item>
                        <Item>
                            <NavBarItem link={"/login"} text={"Login"} menu={true}
                                        setBarActive={setBarActive} not_show={!bar_active}/>
                        </Item>
                    </OverlayMenu>
                </Overlay>
            </AppBar>
        </Box >
    )
}