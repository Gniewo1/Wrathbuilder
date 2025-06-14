import Navbar from '../components/Navbar'
import '../styles/Select.css';
import '../styles/CreateCharacter.css';
import '../styles/Buttons.css';
import LoadButtons from '../components/LoadCharacter/LoadButtons'

const LoadCharacter = () => {
    

    return (
        <>
        <Navbar/>
        {/* <div className="empty-container"></div> */}
        <h1>Load Character</h1>
        <div className='character-form'>
        <LoadButtons/>
        </div>
        </>
    );


}

export default LoadCharacter;