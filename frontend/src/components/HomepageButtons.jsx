import '../styles/Buttons.css';
import { useNavigate } from 'react-router-dom';


const HomepageButtons = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <button className="newCharacter-button" onClick={() => navigate('/newcharacter')}>New Character</button>
        <button className="loadCharacter-button" onClick={() => navigate('/loadcharacter')}>Load Character</button>
      </div>
    );


}

export default HomepageButtons;