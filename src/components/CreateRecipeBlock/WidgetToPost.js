import TextareaAutosize from '@mui/material/TextareaAutosize';
import { nanoid } from 'nanoid';
import { recipesConnect } from "../../connect/recipes/recipes";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';


export const Widget = recipesConnect(({userId, recipeData, images, description, setDescription, addNewRecipe}) => {
    function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            images.push(reader.result)
        }
        reader.readAsDataURL(file);}
    
    const handleUploadedFileImage = (e) => {
        encodeImageFileAsURL(e.target)
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
                        <ArrowBackRoundedIcon/> Вернуться
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{background: 'rgba(0,0,0,.3)', borderRadius: '5px',
                width: '100%', height: '50vh', border: '2px solid black',
                display: 'flex', justifyContent: 'center', flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Button
                    style={{
                        margin: '4%',
                        borderColor: "#000000",
                        color: '#000000',
                    }}
                    variant="outlined" 
                    type="submit"
                >Загрузить изображение
                    <label htmlFor="file-upload__post" className="custom-file-upload__post"/>
                </Button>
                <input id="file-upload__post" type="file" onChange={e => {handleUploadedFileImage(e)}}/>
            </div>
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
        <Widget userId={userId} recipeData={recipeData} images={images} description={description} setDescription={setDescription}/>
    )
}