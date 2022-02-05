import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import './style.css';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserProfileImage } from '../../store/user/actions';


export const PersonalInformation = ({userId, image, mail, name, likes}) => {
    const dispatch = useDispatch();
    let css = { display: 'flex', justifyContent: 'space-between', margin: '1%' }

    if (useMediaQuery('(max-width:525px)')) {
        css = { display: 'flex', flexDirection: 'column', margin: '2%' }
    }

    function encodeImageFileAsURL(element) {
        try {
            let file = element.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
            dispatch(setUserProfileImage(reader.result))
            Axios.post('https://cookery-app.herokuapp.com/user/image/upload', {
                imageBase64: reader.result,
                userId
            }).then((result) => {console.log(result);})}
            reader.readAsDataURL(file);
        } catch (err) {
            console.log(err)
    }}

    const handleUploadedFileImage = (e) => {
        encodeImageFileAsURL(e.target)}

    return (
        <div style={css}>
            <div>
                <h2> Личная информация </h2>
                <div>
                    <Paper elevation={2} sx={{p: 2, mb: 2}}>
                        <Typography variant="h6">
                            {mail}
                        </Typography>
                    </Paper>
                </div>
                <div>
                    <Paper elevation={2} sx={{p: 2}}>
                        <Typography variant="h6">
                            {name}
                        </Typography>
                    </Paper>
                </div>
            </div>
            <div style={{marginLeft: '2%', marginTop: '3%'}}>
                <div className='profileImgWrap'>
                    <img className="profileImg" style={{borderRadius: '15px'}}
                        src={image ? image : "https://picsum.photos/200"} alt='profile' />
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Загрузить
                    </label>
                    <input id="file-upload" type="file" onChange={e => {handleUploadedFileImage(e)}}/>
                </div>
            </div>
        </div>
    )
}