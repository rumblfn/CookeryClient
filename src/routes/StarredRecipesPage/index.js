import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { ListOfReciepes } from '../../components/HomePage/listOfReciepes/listOfReciepes';
import { setStarredRecipes } from '../../store/recipes';
import { useDispatch } from 'react-redux';

export const StarredRecipesPage = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [emptyRecipes, setEmptyRecipes] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)
    console.log(userData)
    useEffect(() => {
        if (!userData.likedPostsIdes.length) {
            setEmptyRecipes(true)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            Axios.get('https://cookery-app.herokuapp.com/starredRecipes/get', {
                params: {
                    recipesIdes: userData.likedPostsIdes
                }
            }).then((response) => {
                dispatch(setStarredRecipes(response.data))
                setIsLoading(false)
            })
        }
    }, [])

    return (
        <div className='container'>
            <ListOfReciepes allRecipesBool={'starred'}/>
        </div>
    )
}