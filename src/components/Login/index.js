import { useState } from "react";
import {Link} from 'react-router-dom';
import './loginAndSignUpStyles.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDataReducer } from "../../store/user/actions";
import { clearReducer } from "../../store/recipes";


export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const userDataHandler = (data) => {
        if (!data) {
            setError('Неверный email или пароль')
        } else {
            dispatch(setUserDataReducer(data))
            dispatch(clearReducer())
            navigate("/profile");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email) {
            setError('Укажите почту')
        } else if (!password) {
            setError('Введите пароль')
        } else {
            try {
                await Axios.get('/users/get', {
                    params: {
                        userEmail: email,
                        userPassword: password,
                    }
                }).then((response) => {
                    setEmail('')
                    setPassword('')
                    userDataHandler(response.data[0])
                })
            } catch (error) {
                setError(error);
            }
        }
    };

    return (
        <div className='mainPage'>
            <form onSubmit={handleSubmit}>
                <h4>Авторизация</h4>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <TextField
                        id="demo-helper-text-misaligned-no-helper"
                        label="Почта"
                        color="background"
                        name="email"
                        type="email"
                        onChange={e => {setEmail(e.target.value);}}
                        value={email}
                        sx={{m: 1, mt: 3}}
                    />
                    <TextField
                        sx={{m: 1, mb: 3}}
                        id="demo-helper-text-misaligned-no-helper"
                        color="background"
                        label="Пароль"
                        name="password"
                        onChange={e => {setPassword(e.target.value);}}
                        value={password}
                        type="password"
                    />
                </Box>
                <div>
                    {error && <Alert sx={{mb: 2}} severity="error">{error}</Alert>}
                    <Button 
                        style={{
                            borderColor: "#000000",
                            color: '#000000',
                        }}
                        variant="outlined" 
                        type="submit"
                    >Войти
                    </Button>
                </div>
                <br/>
                <p>
                    У вас нет аккаунта? <Link to="/signup">Регистрация</Link>
                </p>
            </form>
        </div>
    );
};