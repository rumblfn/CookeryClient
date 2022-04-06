import React, {useState, useEffect} from 'react';
import { ListOfProducts } from '../../components/HomePage/listOfProducts/listOfProducts';
import { ListOfSelectedProducts } from '../../components/HomePage/listOfSelectedProducts/listOfSelectedProducts';
import { ListOfReciepes } from '../../components/HomePage/listOfReciepes/listOfReciepes'
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from "@mui/material/Button";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useDispatch, useSelector} from "react-redux";
import Axios from "axios";
import { setRicepesReducer } from '../../store/recipes'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {setStarredRecipes} from "../../store/recipes";
import {Search} from "../../components/searchLine";


const css_desc = {
    display: 'grid',
    gridTemplateColumns: '3fr 7fr',
    gap: '16px'
}

const css_laptop = {
    display: 'grid',
    gridTemplateColumns: '7fr 13fr',
    gap: '16px'
}

const css_tablet = {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '16px'
}

const css_tablet2 = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
}

const css_mobile = {
    display: 'flex',
    flexDirection: 'column',
}


export const HomePage = () => {
    const [otherRecipes, setOtherRecipes] = useState([])
    const [searchField, setSearchField] = useState('')
    const [timeFilter, setTimeFilter] = useState(0)
    const [toggleClass, setToggleClass] = useState(false)
    const dispatch = useDispatch()
    const selectedRecipes = useSelector(state => state.products.selectedProductsNames)
    let default_size = '70vh'
    let css = css_desc
    const laptop = useMediaQuery('(max-width:1024px)');
    const tablet = useMediaQuery('(max-width:768px)');
    const tablet2 = useMediaQuery('(max-width:628px)');
    const phone = useMediaQuery('(max-width:425px)');
    let format = 'computer'

    if (phone) {
        css = css_mobile;
        default_size = '40vh'
        format = 'phone'
    } else if (tablet2) {
        css = css_tablet2;
        format = 'tablet2'
    } else if (tablet) {
        css = css_tablet;
        format = 'tablet'
    }else if (laptop) {
        css = css_laptop;
        format = 'laptop'
    }

    const selectNewRecipes = () => {
        if (selectedRecipes.length) {
            Axios.get('/recipes_by_products/get', {
                params: {
                    products: selectedRecipes
                }
            }).then((res) => {
                dispatch(setRicepesReducer(res.data))
            })
        }
    }

    useEffect(() => {
        console.log(timeFilter)
    }, [timeFilter])

    const setSearchFieldFunc = (val) => {
        setSearchField(val)
        Axios.get('/recipes_by_title/get', {
            params: {
                title: searchField.toLowerCase()
            }
        }).then((res) => {
            const recipes = []
            for (let recipe of res.data) {
                recipes.push({
                    ...recipe,
                    cook: JSON.parse(recipe.cook),
                    description: JSON.parse(recipe.description),
                    images: JSON.parse(recipe.images),
                    lstOfProducts: JSON.parse(recipe.lstOfProducts),
                    products: JSON.parse(recipe.products)
                })
            }
            setOtherRecipes(recipes)
        })
    }

    return ( 
        <div className="container">
            <div style={css}>
                <div style={{marginBottom: '24px'}}>
                    <ListOfProducts toggleClass={toggleClass} marginRightProp='2%' maxHeightProp={default_size}/>
                </div>
                <div>
                    <div style={{marginBottom: '16px', marginLeft: '16px', justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <div>
                            <Button variant="outlined" sx={{marginBottom: '12px',
                                color: 'black', backgroundColor: 'white', borderColor: 'black',
                                "&:hover": {
                                    backgroundColor: 'rgb(17,17,50)',
                                    color: 'white',
                                    borderColor: 'white',
                                }
                            }} onClick={selectNewRecipes}>
                                Подобрать <ArrowDownwardIcon />
                            </Button>
                            <Button variant="outlined" sx={{margin: '0 12px 12px',
                                color: 'black', backgroundColor: 'white', borderColor: 'black',
                                "&:hover": {
                                    backgroundColor: 'rgb(17,17,50)',
                                    color: 'white',
                                    borderColor: 'white',
                                }
                            }} onClick={() => {
                                if (timeFilter < 1) {
                                    setTimeFilter(prevState => prevState += 1)
                                } else {
                                    setTimeFilter(-1)
                                }
                            }}>
                                <AccessTimeIcon/> <ArrowDownwardIcon style={{
                                transform: timeFilter === -1 ? 'rotate(0deg)' :
                                    timeFilter === 0 ? 'rotate(90deg)' : 'rotate(180deg)'
                            }} />
                            </Button>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                            <Search setSearchFieldFunc={setSearchFieldFunc}/>
                        </div>
                    </div>
                    <ListOfSelectedProducts setToggleClass={setToggleClass} />
                    <ListOfReciepes otherRecipes={otherRecipes} searchField={searchField} timeFilter={timeFilter} format={format} />
                </div>
            </div>
        </div>
    )
}