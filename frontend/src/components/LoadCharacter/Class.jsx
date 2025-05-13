import { useState, useEffect } from 'react';
import ClassComponent from './ClassComponent';


const Class = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
    
        fetch('http://localhost:8000/class-names/')
          .then((res) => res.json())
          .then((data) => setClasses(data))
          .catch((err) => console.error('Error fetching classes:', err));
      }, []);
    

    return (
        <>
          <label>
                  Class:
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    required
                    className="styled-select"
                  >
                    <option value="">-- Select Class --</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </label>
        
        
                {selectedClass && (
                  <ClassComponent
                    id={selectedClass}
                  />
                )}

        </>

    );


}

export default Class;