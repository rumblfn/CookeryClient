import { PersonalInformation } from '../../components/PersonalInformation/info'
import { SavedRecipes } from '../../components/CreateNewRecipe/index'
import { UserRecipes } from '../../components/usersRecipes/usersRecipes'
import { CreateRecipeBlock } from '../../components/CreateRecipeBlock/index'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate } from "react-router-dom";
import { StarredRecipesPage } from '../StarredRecipesPage';


const css_desc = {
    marginLeft: '25%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '40%',
}

const css_laptop = {
    marginLeft: '25%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '40%',
}

const css_tablet = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '80%',
    margin: '0 auto',
}

const css_tablet2 = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '100%',
    margin: '0 auto',
}

const css_mobile = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '100%',
    margin: '0 auto',
}


export const ProfilePage = () => {
    const userData = useSelector((state) => state.user)
    let css = css_desc

    const laptop = useMediaQuery('(max-width:1024px)');
    const tablet = useMediaQuery('(max-width:768px)');
    const tablet2 = useMediaQuery('(max-width:628px)');
    const largePhone = useMediaQuery('(max-width:525px)');
    const phone = useMediaQuery('(max-width:425px)');

    if (phone) {
        css = css_mobile;
    } else if (tablet2) {
        css = css_tablet2;
    } else if (tablet) {
        css = css_tablet;
    }else if (laptop) {
        css = css_laptop;
    }

    return (
        <div className='container'>
            {userData.loged ? <div style={css}>
                <PersonalInformation 
                    mail={userData.mail}
                    name={userData.name}
                    likes={userData.likes}
                    image={userData.image}
                    userId={userData.id}
                />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <SavedRecipes/>
                </div>
                <UserRecipes largePhone={largePhone}/>
                <Routes>
                    <Route path="starred/*" element={<StarredRecipesPage />} />
                    <Route path="create/*" element={<CreateRecipeBlock />} />
                </Routes>
            </div> : <Navigate to='/login'/>}
        </div>
    )
}


export const ProfilePageRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="starred/*" element={<StarredRecipesPage />} />
                <Route path="*" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}