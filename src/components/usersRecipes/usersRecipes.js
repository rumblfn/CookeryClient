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
import './style.css';

const loadingDivCss = {textAlign: 'center', padding: '32px 0'}

export const Widget = ({userRecipes, largePhone}) => {
    const userId = useSelector((state) => state.user.id);
    const [isLoading, setIsLoading] = useState(false);
    const selector = useSelector((state) => state.recipes.userRecipes);
    const dispatch = useDispatch()

    const css = {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}
    if (largePhone) { css.gridTemplateColumns = '1fr 1fr' }

    useEffect(() => {
        if (Object.values(selector).length === 0) {
            setIsLoading(true)
            Axios.get('/user/reciepes/get', {
                params: { id: userId }
            }).then((response) => {
                setIsLoading(false)
                dispatch(setRecipesWithAPI(response.data))
            })
        }
    }, [])
    console.log(userRecipes)

    return (
        <div style={{marginTop: '32px'}}>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
            <h4>Ваши рецепты</h4>
            <Link to='/profile/create'>
                <Button type="submit" variant="outlined"
                    style={{
                        marginLeft: '12px',
                        borderColor: "#000000",
                        color: '#000000',
                }}>
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
                    :<div style={css} className="profile-recipes-view">
                        {Object.values(userRecipes).map(item => (
                        <Link key={item.id} to={`/recipes/${item.id}/profile`}>
                            <Paper elevation={3} className="paper-recipe-box" style={{
                                borderRadius: '7px', height: '200px', overflow: 'hidden', position: 'relative',
                                justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column'
                            }}>
                                {Object.values(item.images).length > 0 ? 
                                    <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`/reciepes/${item.images[0]}`} alt='food'/>
                                    : <div style={{backgroundColor: 'black', width: '100%', height: '100%', position: 'relative'}}/>
                                }
                                <div className="overlay">
                                    <div className="text">{item.title}</div>
                                </div>
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