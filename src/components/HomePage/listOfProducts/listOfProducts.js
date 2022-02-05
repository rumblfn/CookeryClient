import { productsConnect } from '../../../connect/products/products';
import CheckIcon from '@mui/icons-material/Check';
import './style.css';
import '../style.css';
import Paper from '@mui/material/Paper';
import InputBase from "@mui/material/InputBase";
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsWithAPI } from '../../../store/products';
import { nanoid } from 'nanoid';


const Widget = productsConnect(({isLoading, toggleClass, setInputValue, inputValue, checkEmail, products, changeSelectedState, filterState, marginRightProp, maxHeightProp}) => {
    let default_size = '70vh'

    const checkProduct = (item) => {
        changeSelectedState(item)
    }

    const filterProducts = (event) => {
        let text = event.target.value.toLowerCase()
        setInputValue(text)
        filterState(text);
    }

    const addNewProduct = () => {
        Axios.post('https://cookery-app.herokuapp.com/products/insert', {
            productName: inputValue
        }).then(() => {
            console.log(`${inputValue} added`);
        })
    }

    return (
        <>
        {checkEmail ?
        <div style={{marginBottom: '16px', marginLeft: '16px'}}>
            <Button variant="outlined" sx={{
                color: 'black', backgroundColor: 'white', borderColor: 'black',
                "&:hover": {
                    backgroundColor: 'rgb(17,17,50)',
                    color: 'white',
                    borderColor: 'white',
                }
            }} onClick={addNewProduct}>
                Добавить
            </Button>
        </div> : null
        }
        <Paper className={toggleClass ? "blob": null} elevation={3} style={{borderRadius: '7px', padding: '10px', marginRight: marginRightProp, overflow: 'auto', maxHeight: maxHeightProp || default_size}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '25px'}}>
                <InputBase
                    onChange={filterProducts}
                    sx={{m: 0, width: '100%', borderBottom: '2px solid black'}} placeholder="Введите название продукта"
                />
            </div>
            <div>
            {isLoading ? 
            <div style={{textAlign: 'center', padding: '32px 0'}}>
                <CircularProgress sx={{color: 'black'}}/>
            </div> :
            (Object.keys(products).map(elKey => (
                <div key={nanoid()} className="block" onClick={() => checkProduct(elKey)}>
                    <p>{products[elKey].name}</p>
                    <CheckIcon hidden={!products[elKey].selected}/>
                </div>))
            )}
            </div>
        </Paper>
        </>
    )
})

export const ListOfProducts = ({toggleClass}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.products.products);
    const userData = useSelector((state) => state.user)

    const [checkEmail, setCheckEmail] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const initialProducts = {}

    useEffect(() => {
        if (userData.mail === 'toshamilgis@gmail.com') {
            setCheckEmail(true)
        }

        if (Object.keys(selector).length === 0) {
            setIsLoading(true)
            Axios.get('https://cookery-app.herokuapp.com/products/get').then((response) => {
                for (let prod of response.data) {
                    if (prod.name) {
                        initialProducts[prod.id] = {
                            name: prod.name,
                            selected: Boolean(+prod.selected)
                        }
                    }
                }
                dispatch(addProductsWithAPI(initialProducts))
                setIsLoading(false)
            })
        }
    }, [])

    return (
        <Widget isLoading={isLoading} toggleClass={toggleClass} checkEmail={checkEmail} setInputValue={setInputValue} inputValue={inputValue}/>
    )
}