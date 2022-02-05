import { ListOfReciepes } from "../../components/HomePage/listOfReciepes/listOfReciepes"
import useMediaQuery from '@mui/material/useMediaQuery';

export const AllRecipesPage = () => {
    const laptop = useMediaQuery('(max-width:1024px)');
    const tablet = useMediaQuery('(max-width:768px)');
    const tablet2 = useMediaQuery('(max-width:628px)');
    const phone = useMediaQuery('(max-width:425px)');
    let format = 'computer'

    if (phone) {
        format = 'phone'
    } else if (tablet2) {
        format = 'tablet2'
    } else if (tablet) {
        format = 'tablet'
    }else if (laptop) {
        format = 'laptop'
    }

    return (
        <div className="container">
            <ListOfReciepes format={format} allRecipesBool={true}/>
        </div>
    )
}