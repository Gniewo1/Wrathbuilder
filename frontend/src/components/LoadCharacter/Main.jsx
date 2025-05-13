import { useState } from 'react';


const Main = () => {
    const [name, setName] = useState('');
    

    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2>Character Name:</h2>
            <label>
            <input 
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            </label>
        </div>
        </>

    );


}

export default Main;