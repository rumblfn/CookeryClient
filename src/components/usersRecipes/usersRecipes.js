import { recipesConnect } from "../../connect/recipes/recipes"
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { setRecipesWithAPI } from "../../store/recipes";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const paperCss = {borderRadius: '7px', padding: '10px', height: '100px', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column'}
const imageCss = {borderRadius: '5px', maxHeight: '80%', maxWidth: '80%'}
const loadingDivCss = {textAlign: 'center', padding: '32px 0'}

export const Widget = ({userRecipes, largePhone}) => {
    const userId = useSelector((state) => state.user.id);
    const [isLoading, setIsLoading] = useState(false);
    const selector = useSelector((state) => state.recipes.userRecipes);
    const dispatch = useDispatch()

    const css = {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2%'}
    if (largePhone) { css.gridTemplateColumns = '1fr 1fr' }

    useEffect(() => {
        if (Object.values(selector).length === 0) {
            setIsLoading(true)
            Axios.get('https://cookery-app.herokuapp.com/user/reciepes/get', {
                params: { id: userId }
            }).then((response) => {
                setIsLoading(false)
                dispatch(setRecipesWithAPI(response.data))
            })
        }
    }, [])

    return (
        <div style={{marginTop: '32px'}}>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
            <h4>Ваши рецепты</h4>
            <Link to='/profile/create'>
                <Button 
                    style={{
                        marginLeft: '12px',
                        borderColor: "#000000",
                        color: '#000000',
                    }}
                    variant="outlined" 
                    type="submit"
                >
                    <AddRoundedIcon/>
                </Button>
            </Link>
        </div>
            <div>
            {Object.values(userRecipes).length ? 
                isLoading ? 
                    <div style={loadingDivCss}>
                        <CircularProgress sx={{color: 'black'}}/>
                    </div> 
                    :<div style={css}>
                        {Object.values(userRecipes).map(item => (
                        <Link key={item.id} to={`/recipes/${item.id}/profile`}>
                            <Paper elevation={3} style={paperCss}>
                                <img style={imageCss} src={item.images[0]} alt='food'/>
                                <p>{item.title}</p>
                            </Paper>
                        </Link>))}
                    </div> 
                :<div className="selectedProductsEmpty" style={{textAlign: 'center', margin: '1%', border: '2px dashed black', borderRadius: '8px'}}>
                    <h6 style={{margin: '48px 0'}}>Список рецептов пуст</h6>
                </div>}
            </div>
        </div>
    )
}

export const UserRecipes = recipesConnect(Widget)