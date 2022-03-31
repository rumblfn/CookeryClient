import TextareaAutosize from '@mui/material/TextareaAutosize';
import { nanoid } from 'nanoid';
import { recipesConnect } from "../../connect/recipes/recipes";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { useRef } from 'react';
import Paper from '@mui/material/Paper';


export const Widget = recipesConnect(({userId, setImages, recipeData, images, description, setDescription, addNewRecipe}) => {
    const inputRef = useRef(null)
    function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            setImages(prevState => [...prevState, reader.result])
        }
        reader.readAsDataURL(file);
    }
    
    const handleUploadedFileImage = (e) => {
        try {
            encodeImageFileAsURL(e.target)
        } catch {
            console.log('error')
        }
    }
    
    useEffect(() => {
        console.log(images)
    }, [images])

    const inputClick = () => {
        inputRef.current.click()
    }

    return (
        <div style={{padding: '16px', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', marginBottom: '16px'}}>
                <Link to='/profile/create/checkProducts'>
                    <Button
                        style={{
                            borderColor: "#000000",
                            color: '#000000',
                        }}
                        variant="outlined" 
                        type="submit"
                    >
                        <ArrowBackRoundedIcon/>
                    </Button>
                </Link>
                <Link to='/profile'>
                    <Button
                        style={{
                            marginLeft: '16px',
                        }}
                        variant="outlined"
                        type="submit"
                        onClick = {() => { 
                            document.body.style.overflow = "scroll";
                            addNewRecipe({
                                "title": recipeData.title, "userId": userId, "id": nanoid(),
                                "time": recipeData.time, "cook": recipeData.actions,
                                "lstOfProducts": recipeData.products, "products": recipeData.productsWithCount,
                                "description": description, "images": images,
                                "rating": 0, "comments": []})
                        }}
                        >Опубликовать
                    </Button>
                </Link>
            </div>
            <div style={{width: '100%', height: '100%'}}>
                <Button onClick={inputClick}
                    style={{
                        margin: '0 4% 3%',
                        borderColor: "#000000",
                        color: '#000000',
                    }}
                    variant="outlined" 
                    type="submit"
                >Загрузить изображение
                </Button>
                <input ref={inputRef} id="file-upload__post" type="file" onChange={e => {handleUploadedFileImage(e)}}/>
                <div style={{display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr'}}>
                    {
                        images.map(item => (
                            <Paper elevation={3} className="paper-recipe-box" style={{aspectRatio: '1 / 1',
                                borderRadius: '7px', overflow: 'hidden', position: 'relative',
                                justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column'
                            }}>
                                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={item} alt='food'/>
                            </Paper>
                        ))
                    }
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextareaAutosize
                style={{border: 'none', margin: '10px 16px', maxHeight: '40vh'}}
                aria-label="textarea"
                placeholder="Добавьте описание"
                autoFocus
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            </div>
        </div>
    )
})

export const ToPost = () => {
    const [images, setImages] = useState([])
    const [description, setDescription] = useState('')
    const recipeData = useSelector(state => state.newRecipe)
    const userId = useSelector(state => state.user.id)

    return (
        <Widget userId={userId} recipeData={recipeData} images={images} setImages={setImages} description={description} setDescription={setDescription}/>
    )
}