import './News.css'
function News(props){
    return (
        <>
        <div className="news">
            <img src={props.img}/>
            <p>{props.author}</p>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
            
        </div>
        </>
    )
}
export default News;