import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import StarPurple500RoundedIcon from '@mui/icons-material/StarPurple500Rounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Button from "@mui/material/Button";
import { useState } from 'react';
import { starRecipeUserReducer } from '../../store/user/actions';
import { recipesConnect } from '../../connect/recipes/recipes';
import Axios from 'axios';

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 1024px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
    }
    @media (max-width: 628px) {
        grid-template-columns: 1fr;
    }
`

const Overlay = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    width: 60%;
    margin-left: 15%;
    @media (max-width: 1024px) {
        margin-left: 5%;
        width: 90%;
    }
`;

const OverlayRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (max-width: 628px) {
        align-items: normal;
        margin: 5%;
    }
`

const Gallery = styled.div`
    @media (max-width: 1024px) {
        display: none;
    }
`

const GalleryRight = styled.div`
    @media (min-width: 1025px) {
        display: none;
    }
`

const GalleryImagesOnly = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 5%;
    @media (max-width: 628px) {
        grid-template-columns: 1fr 1fr;
    }
`

export const RecipeInfo = recipesConnect(({page, id, starRecipeRecipe}) => {
    console.log(page)
    let user = useSelector(state => state.user)
    const [starred, setStarred] = useState(user.likedPostsIdes.indexOf(id) === -1 ? false : true)
    const dispatch = useDispatch()

    const recipeId = id;
    let selector = {}

    page === 'profile' ? selector = useSelector(state => state.recipes.userRecipes) :
    page === 'starred' ? selector = useSelector(state => state.recipes.starred_recipes) : 
    selector = useSelector(state => state.recipes.recipes)

    let recipeMain = {};
    console.log(selector);

    for (let recipe in selector) {
        if (recipe == recipeId) {
            recipeMain = selector[recipe];
            break;
        }
    }

    const starFunction = () => {
        if (user.loged) {
            if (starred) {
                Axios.post('https://cookery-app.herokuapp.com/recipes/likes/update', {
                    recipeId: recipeId, type: -1, userId: user.id
                }).then((response) => {console.log(response)})
            } else {
                Axios.post('https://cookery-app.herokuapp.com/recipes/likes/update', {
                    recipeId: recipeId, type: 1, userId: user.id
                }).then((response) => {console.log(response)})}
        
            setStarred(prevState => !prevState)
            dispatch(starRecipeUserReducer({recipeId, starred}))
        }
    }

    return (
        <div className='container'>
            <Box>
                <Overlay>
                    <h4 style={{borderBottom: '2px solid black'}}>{recipeMain.title}</h4>
                    <p>{recipeMain.description}</p>
                    <h5 style={{borderBottom: '2px solid black'}}>Список необходимых продуктов</h5>
                    <div>
                        {recipeMain.products.map((item, index) => (
                            <Paper elevation={2} style={{
                                    borderRadius: '7px', padding: '10px', marginRight: '10px', marginBottom: '10px'}}
                                    key={index}>
                                <p style={{marginTop: 'auto', marginBottom: 'auto'}}>{item[0]} - {item[1]}</p>
                            </Paper>))
                        }
                    </div>
                    <h5 style={{borderBottom: '2px solid black', marginTop: '16px'}}>Список действий</h5>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {recipeMain.cook.map((item, index) => (
                            <p key={index} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <span>{index + 1}</span>. {item}
                            </p>))
                        }
                    </div>
                    {recipeMain.images.length > 0 ? 
                        <Gallery>
                            <h5 style={{borderBottom: '2px solid black', margin: '16px 0'}}>Галлерея</h5>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5%'}}> 
                            {
                                recipeMain.images.map((item, index) => (
                                    <img style={{width: '100%', borderRadius: '15px'}} key={`${index}${index}`} src={item} alt='img'/>))
                            }
                            </div>
                        </Gallery>
                        : null}
                </Overlay>
                <OverlayRight>
                    <div style={{
                        display: 'flex', alignItems: 'center'
                    }}>Rating: {recipeMain.rating}
                        <Button sx={{color: 'black', borderRadius: '10px', m: 1, width: 'fit-content'}}
                                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                                onClick = {() => {starFunction()}}>
                            {starred ? <StarRoundedIcon/>: <StarPurple500RoundedIcon/>}
                        </Button>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center'
                    }}>time: {recipeMain.time}
                        <Button sx={{color: 'black', borderRadius: '10px', m: 1, width: 'fit-content'}}
                                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                            <AccessTimeIcon/>
                        </Button>
                    </div>
                    {recipeMain.images.length > 0 ? 
                        <GalleryRight>
                            <h5 style={{borderBottom: '2px solid black', margin: '16px 0'}}>Галлерея</h5>
                            <GalleryImagesOnly> 
                            {
                                recipeMain.images.map((item, index) => (
                                    <img style={{width: '100%', borderRadius: '15px'}} key={`${index}${index}`} src={item} alt='img'/>))
                            }
                            </GalleryImagesOnly>
                        </GalleryRight>
                        : null}
                </OverlayRight>
            </Box>
        </div>
    )
})