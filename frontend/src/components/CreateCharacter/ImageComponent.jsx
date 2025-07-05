import placeholder from '../../images/Placeholder.png';

export default function ImageComponent() {


return (
    <>
    <div style={{ marginTop: '20px', marginRight: '40px', display:'grid' }}>
    <img src={placeholder} alt="Hero" style={{ width: '371px', height: '550px'}}/>
    <button type='button' style={{ width: '300px', height: '50px'}}>Change Image</button>
    </div>
    </>
);


}