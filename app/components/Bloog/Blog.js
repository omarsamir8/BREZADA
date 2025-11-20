import './Blog.css'
function Bloog(props){
    return (
        <>
        <div className="Blog">
            <div className='blogImg'>
                <img src={props.img}/>
                <h5>BREZADA</h5>
            </div>
            <div className='blogDetails'>
                <h2>{props.name}</h2>
                <p>{props.details}</p>
                {/* <div className='line'></div>
                <ul>
                    <li>
                        {props.Author}
                    </li>
                    <li>
                        {props.Date}
                    </li>   
                </ul> */}
            </div>
        </div>
        </>
    )
}
export default Bloog;