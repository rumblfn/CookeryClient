import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { ToPost } from './WidgetToPost';
import { WidgetMain } from './WidgetMain';
import { WidgetSelectedProducts } from './WidgetSelectedProducts';


const css_desc_main = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'center',
    background: 'rgba(0,0,0,.5)',
    overflow: 'auto'
}

const css_desc_block = {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: '10%',
    width: '50%',
    minHeight: '60vh',
    borderRadius: '20px',
}

const css_tablet_main = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0px',
    left: '0px',
    display: 'flex',
    overflow: 'auto',
    background: 'rgb(255,255,255)'
}

const css_tablet_block = {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
}


export const CreateRecipeBlock = () => {
    let css_1 = css_desc_main
    let css_2 = css_desc_block
    const dispatch = useDispatch()

    const tablet = useMediaQuery('(max-width:768px)');
    if (tablet) {
        css_1 = css_tablet_main
        css_2 = css_tablet_block
    }

    document.body.style.overflow = "hidden";

    return (
        <div style={css_1}>
            <div style={css_2}>
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                }}>
                    <Link to='/profile' onClick={() => {document.body.style.overflow = "scroll";}}>
                        <CloseRoundedIcon style={{
                            color: '#000000',
                        }}/>
                    </Link>
                </div>
                <Routes>
                    <Route path="post" element={
                        <ToPost dispatch={dispatch}/>
                    } />
                    <Route path="checkProducts" element={
                        <WidgetSelectedProducts dispatch={dispatch}/>
                    } />
                    <Route path="/*" element={
                        <WidgetMain dispatch={dispatch} tablet={tablet}/>
                    } />
                </Routes>
            </div>
        </div>
    )
}