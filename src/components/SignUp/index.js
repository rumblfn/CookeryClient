import { useState } from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../Login/loginAndSignUpStyles.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Axios from 'axios';

export const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const mediumRegex = new RegExp("^(((?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])))(?=.{8,})");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length < 5) {
            setNameError("Длина имени короче 5");
        }
        if (!mediumRegex.test(password)) {
            setPasswordError("Некорректно введён пароль")
        }

        if (mediumRegex.test(password) && name.length > 4) {
            signUp()
        }
    };

    const signUp = () => {
        Axios.post('https://cookery-app.herokuapp.com/users/insert', {
            userName: name,
            userEmail: email,
            userPassword: password,
        }).then((res) => {
            if (res.data.errno === 1062) {
                setEmailError('Пользователь с такой почтой уже существуйет, войдите')
            }
        })
    }

    return (
        <div className='mainPage'>
            <form onSubmit={handleSubmit}>
                <h4>Регистрация</h4>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <TextField
                        sx={{m: 1, mt: 3}}
                        id="demo-helper-text-misaligned-no-helper"
                        label="Отображаемое имя"
                        name="name"
                        color="background"
                        onChange={(e) => {if (name.length > 4) {setNameError('')} setName(e.target.value)}}
                        value={name}
                        type="name"
                    />
                    <TextField
                        id="demo-helper-text-misaligned-no-helper"
                        label="Почта"
                        name="email"
                        type="email"
                        color="background"
                        onChange={(e) => {setEmail(e.target.value)}}
                        value={email}
                        sx={{m: 1}}
                    />
                    <TextField
                        sx={{m: 1, mb: 3}}
                        id="demo-helper-text-misaligned-no-helper"
                        label="Пароль"
                        name="password"
                        color="background"
                        onChange={(e) => {if (mediumRegex.test(password)) {setPasswordError('')} setPassword(e.target.value)}}
                        value={password}
                        type="password"
                    />
                </Box>
                <div>
                    {emailError && <Alert sx={{mb: 2}} severity="error">{emailError}</Alert>}
                    {nameError && <Alert sx={{mb: 2}} severity="error">{nameError}</Alert>}
                    {passwordError && <Alert sx={{mb: 2}} severity="error">{passwordError}</Alert>}
                    <Button 
                        style={{
                            borderColor: "#000000",
                            color: '#000000',
                        }}
                        variant="outlined" 
                        type="submit"
                    >Создать аккаунт
                    </Button>
                </div>
                <br/>
                <p>
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>
            </form>
        </div>
    );
}