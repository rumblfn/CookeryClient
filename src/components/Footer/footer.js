import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div style={{marginTop: '64px'}}>
            <hr className="hr" style={{marginTop: 0}}/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '30px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                    <span className='gradient-text heading bottom-heading'>Cookery</span>
                </Link>
            </div>
        </div>
    )
}