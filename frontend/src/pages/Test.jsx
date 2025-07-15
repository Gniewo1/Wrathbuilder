import Navbar from '../components/Navbar'
import '../styles/Test.css';
import placeholder from '../images/Placeholder.png';

const Test = () => {

    return(
        <>
        <Navbar/>
        <div className='divTest'>
            <div className='empty'></div>
            <div className='divClass'>
                <img src={placeholder} alt="Italian Trulli" className='imgTest'></img>
                <p className='pBig'><strong>Oliver</strong></p>
                <p className='pTest'>What's happening?</p>
                <button className='buttonTest'>Add friend</button>

            </div>
        </div>
        <p>https://youtu.be/G3e-cpL7ofc?si=xwiN3q7QMNOWkThP&t=10007</p>
        </>
    )


}

export default Test
