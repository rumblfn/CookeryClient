import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ListOfSelectedProducts } from '../../components/HomePage/listOfSelectedProducts/listOfSelectedProducts';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserRecipeNewDataReducer } from '../../store/newRecipe/actions';
import { useNavigate } from 'react-router-dom';


export const WidgetSelectedProducts = () => {
    const [newAction, setNewAction] = useState('');
    const [actions, setActions] = useState([]);
    const inputRef = useRef(null);
    const recipeData = useSelector(state => state.newRecipe)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const checkForm = () => {
        dispatch(setUserRecipeNewDataReducer({actions}))
        navigate("/profile/create/post");
    }

    useEffect(() => {
        const newProds = [];
        for (const prod of recipeData.products) {
            newProds.push([prod, '0']);
        }
        dispatch(setUserRecipeNewDataReducer({productsWithCount: newProds}))
    }, [])
    const selectedRecipes = useSelector(state => state.products.selectedProducts)
    console.log(selectedRecipes)
    
    return (
        <div style={{padding: '16px'}}>
            <div style={{display: 'flex', marginBottom: '16px'}}>
            <Link to='/profile/create'>
                <Button 
                    style={{
                        borderColor: "#000000",
                        color: '#000000',
                    }}
                    variant="outlined" 
                    type="submit"
                >
                    <ArrowBackRoundedIcon/> Вернуться
                </Button>
            </Link>
            <Button
                    style={{
                        marginLeft: '16px',
                    }}
                    variant="outlined" 
                    type="submit"
                    onClick={() => {checkForm()}}
                    >Дальше
                </Button>
            </div>
            <div style={{display: 'flex'}}>
                <h4 style={{marginRight: '2%'}}>{recipeData.title}</h4>
                <h4 style={{marginRight: '2%'}}>{recipeData.time}</h4>
            </div>
            <ListOfSelectedProducts creating={true}/>
            <h6 style={{marginTop: '8px'}}>Способ приготовления</h6>
            <div style={{display: 'flex'}}>
                <InputBase
                    autoFocus
                    inputRef={inputRef}
                    sx={{width: '100%'}} 
                    value={newAction}
                    style={{borderBottom: '2px solid black'}}
                    placeholder="Введите название"
                    onChange={(e) => {setNewAction(e.target.value)}}
                />
                <Button 
                    style={{
                        marginLeft: '16px',
                        borderColor: "#000000",
                        color: '#000000',
                    }}
                    variant="outlined" 
                    type="submit"
                    onClick={() => {
                        if (newAction) {
                            inputRef.current.focus()
                            setActions([...actions, newAction]);
                            setNewAction('')
                        }
                    }}
                    >Добавить
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px'}}>
                {actions.map((item, index) => (
                    <p key={index} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        <span>{index + 1}</span>. {item}
                    </p>))
                }
            </div>
        </div>
    )
}