import Paper from '@mui/material/Paper';
import { selectedProductsConnect } from '../../../connect/selectedProducts/selectedProducts'
import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';
import InputBase from "@mui/material/InputBase";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../style.css';
import './style.css';
import { nanoid } from 'nanoid';
import { changeUserRecipeProductCountReducer } from '../../../store/newRecipe/actions';
import { useDispatch } from 'react-redux';

export const ShowSelectedProducts = ({setIconImages, iconImage}) => {
    const show = () => {
        setIconImages(prevState => !prevState)
    }

    return (
        <Button 
            style={{
                color: '#000000',
                border: 'none',
                marginBottom: '2%'
            }}
            variant="outlined" 
            type="submit"
            onClick={() => show()}
        >Выбранные продукты {iconImage ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
        </Button>
    )
}

export const SelectedProducts = selectedProductsConnect(({dispatch, setToggleClass, creating, products, changeSelectedState, show, setProducts, lstOfProductsNames}) => {
    let css = {display: 'flex', flexWrap: 'wrap', marginBottom: '32px'};
    let css_paper = {borderRadius: '7px', padding: '10px', marginRight: '10px', marginBottom: '10px', 
        display: 'flex', flexDirection: 'column', alignContent: 'space-between'}

    const checkProduct = (item) => {
        changeSelectedState(item)
    }

    if (setProducts) {
        setProducts([...lstOfProductsNames])
    }

    const checkProducts = (text, productName) => {
        dispatch(changeUserRecipeProductCountReducer({text, productName}))
    }
    
    if (creating) {
        css = {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2%',
            padding: '2%', marginBottom: '32px', boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            maxHeight: '60vh', overflowY: 'scroll', borderRadius: '15px'};
        css_paper = {borderRadius: '7px', padding: '10px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}
        if (useMediaQuery('(max-width:1024px)')) {
            css.gridTemplateColumns = '1fr 1fr'
        }
        if (useMediaQuery('(max-width:768px)')) {
            css.gridTemplateColumns = '1fr 1fr 1fr'
        }
        if (useMediaQuery('(max-width:525px)')) {
            css.gridTemplateColumns = '1fr 1fr'
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function toggleClass () {
        await sleep(2000)
        setToggleClass(false)
    }

    const changeStyle = () => {
        setToggleClass(true)
        toggleClass()
    }

    if (!show) {
        if (Object.keys(products).length > 0) {
            return (
                <div style={css}>
                    {Object.keys(products).map(elKey => (
                        <Paper elevation={2} style={css_paper}
                                key={nanoid()}>
                            <div className='button'>
                                <p style={{marginTop: 'auto', marginBottom: 'auto'}}>{products[elKey].name}</p>
                                <Button className='closeIcon' onClick={() => checkProduct(elKey)} 
                                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: 'black'}}>
                                    <CloseRoundedIcon style={{
                                        color: 'inherit',
                                    }}/>
                                </Button>
                            </div>
                            {creating ? 
                            <InputBase
                                style={{width: '100%', borderBottom: '2px solid black'}}
                                onChange={(e) => checkProducts(e.target.value, products[elKey].name)}
                                placeholder="Добавьте количество"/> : null}
                        </Paper>))
                    }
                </div>
            );
        } else {
            if (setToggleClass) {
                return (
                    <div className="selectedProductsEmpty" style={{
                        textAlign: 'center', margin: '0 32px', border: '2px dashed black', borderRadius: '8px'
                    }} onClick={() => {changeStyle()}}>
                        <h6 style={{margin: '48px 0'}}>Список выбранных продуктов пуст</h6>
                    </div>)
            } else {
                return (
                    <div className="selectedProductsEmpty" style={{textAlign: 'center', margin: '0 32px', border: '2px dashed black', borderRadius: '8px'}}>
                        <h6 style={{margin: '48px 0'}}>Список выбранных продуктов пуст</h6>
                    </div>)
            }
        }
    } else {
        return null;
    }
})

export const ListOfSelectedProducts = ({creating, setToggleClass}) => {
    const [iconImage, setIconImages] = useState(true)
    const dispatch = useDispatch()
    return (<>
            <ShowSelectedProducts iconImage={iconImage} setIconImages={setIconImages}/>
            <SelectedProducts dispatch={dispatch} setToggleClass={setToggleClass} creating={creating} show={iconImage}/>
        </>)
}