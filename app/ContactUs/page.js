import HealthyHero from "../components/Healthy/Health";
import Location from "../components/location/location";
export const metadata = {
  title: "Contact Us",
  description: "Feel free to contact me for any inquiries, collaborations, or project ideas. I’m always open to discussing new opportunities and helping you bring your vision to life. You can reach me through email, social media, or by filling out the contact form below.",
};
function Contacts(){
    return (
        <>
        <div className="Contacts">
            <HealthyHero desc="Feel free to contact me for any inquiries, collaborations, or project ideas. I’m always open to discussing new opportunities and helping you bring your vision to life. You can reach me through email, social media, or by filling out the contact form below." name="Contact with me" title="Contacts"/>
            <Location/>
        </div>
        </>
    )
}
export default Contacts;