import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { ListOfProducts } from '../HomePage/listOfProducts/listOfProducts';
import { selectedProductsConnect } from '../../connect/selectedProducts/selectedProducts';
import { useNavigate } from 'react-router-dom';
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setUserRecipeNewDataReducer } from '../../store/newRecipe/actions';

export const WidgetMain = selectedProductsConnect(({products, lstOfProductsNames, tablet}) => {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const data = useSelector(state => state.newRecipe)
    console.log(data)

    const checkForm = () => {
        if (title && time && Object.keys(products).length) {
            dispatch(
                setUserRecipeNewDataReducer({
                    time, title,
                    products: [...lstOfProductsNames]
                })
            )
            navigate("/profile/create/checkProducts");
        }
    }

    return (
        <div>
            <InputBase
                    sx={{m: 2, width: '80%'}} 
                    style={{borderBottom: '2px solid black'}}
                    placeholder="Введите название"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <div style={{
                    display: 'flex',
                }}>
                    <p style={{margin: '16px'}}>Введите время приготовления</p>
                    <input 
                        style={{margin: '10px 0'}} 
                        type="time" id="appt" 
                        name="appt" required
                        onChange={(e) => {setTime(e.target.value)}}
                    />
                </div>
                <div style={{
                    margin: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <p style={{
                            marginBottom: '0px',
                    }}>Выберите подходящие продукты</p>
                    <Button 
                        style={{
                            marginLeft: '16px'
                        }}
                        variant="outlined" 
                        type="submit"
                        onClick={checkForm}>
                        Дальше <ArrowForwardRoundedIcon/>
                    </Button>
                </div>
                {tablet ? <ListOfProducts maxHeightProp='100%' />: <ListOfProducts maxHeightProp='60vh' />}
        </div>
    )
})