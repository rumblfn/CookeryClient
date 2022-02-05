import { Link } from 'react-router-dom';

export const SavedRecipes = () => {
    return (
        <div style={{ 
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Link to='/profile/starred' style={{display: 'flex'}}>
                <h4>Сохраненные рецепты</h4>
            </Link>
        </div>
    )
}