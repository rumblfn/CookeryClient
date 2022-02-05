import { Header } from './components/Header/header';
import { Routes, Route } from 'react-router-dom';
import { RecipesPage } from './routes/RecipesPage';
import { HomePage } from './routes/HomePage';
import { LoginPage } from './routes/LoginPage';
import { ProfilePageRoutes } from './routes/ProfilePage';
import { SignUp } from './routes/RegistrationPage';
import { AllRecipesPage } from './routes/OnlyRecipesPage';
import { PrivateRoute } from "./hocks/PrivateRoute";
import { Footer } from './components/Footer/footer';
import { useSelector } from 'react-redux';


export const App = () => {
    const userIsLoged = useSelector((state) => state.user.loged)

    return (
        <div className="app">
            <div style={{minHeight: 'calc(100vh - 80px)'}}>
            <Header />
            <hr style={{ margin: '0 0 48px', border: 0, height: '1px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/allRecipes" element={<AllRecipesPage/>}/>
                    <Route path="/recipes/:recipeId/:page" element={<RecipesPage />} />
                    <Route path="/profile/*" element={
                        <PrivateRoute authed={userIsLoged}>
                            <ProfilePageRoutes />
                        </PrivateRoute>
                    } />
                    <Route path="/*" element={<HomePage />} />
                </Routes>
            </div>
            </div>
            <Footer />
        </div>
    );
}


