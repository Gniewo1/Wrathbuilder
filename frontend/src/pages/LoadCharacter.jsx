import Navbar from '../components/Navbar'
import Main from '../components/LoadCharacter/Main'
import Race from '../components/LoadCharacter/Race'
import Class from '../components/LoadCharacter/Class'
import '../styles/Select.css';
import '../styles/CreateCharacter.css';

const LoadCharacter = () => {
    

    return (
        <>
        <Navbar/>
        <div className="empty-container"></div>
        <h1>Create New Character</h1>
        <form className="character-form">
        <Main/>
        <div>
            <Race />
            <Class />
        </div>
        </form>
        </>
    );


}

export default LoadCharacter;