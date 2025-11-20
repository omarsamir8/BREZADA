import './location.css'
function Location(){
    return (
        <>
        <div className="location">
            <div className='loc-map' style={{width:"60%",}}>
                 <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.6131415699655!2d31.17984027518344!3d30.465992301530284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7f7d7f6dc7d3b%3A0x7f4a5fbcdeed85ac!2sBanha%2C%20Qalyubia%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1730344440000!5m2!1sen!2seg"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Banha Location"
                ></iframe>
            </div>
            <div style={{width:"40%"}} className='locationDetails'>
                <h2>Get in Touch</h2>
                <p>📍 Geographical Location
                    Banha is located in northeastern Egypt, within the Nile Delta region, on the east bank of the Damietta branch of the Nile River.
                    It lies about 48 kilometers (30 miles) north of Cairo.
                    Coordinates: 30.4667° N latitude, 31.1848° E longitude.
                    It serves as a major transportation and trade hub connecting Cairo with other Delta cities
                </p>
            </div>
        </div>
        </>
    )
}
export default Location;