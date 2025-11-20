import './Healthy.css'
function HealthyHero(props){
    return (
        <>
        <div className="HealthyHero">
            <div className="healthyheroheader">
                <h3>Home /</h3>
                <p>{props.title}</p>
            </div>
            <h2>{props.name}</h2>
            <p>{props.desc}</p>
        </div>
        </>
    )
}
export default HealthyHero;