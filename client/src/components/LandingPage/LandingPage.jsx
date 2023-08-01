import styleLanding from "./LandingPage.module.css"
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    const handleImg2Click = () => {
      // Redirect to the "/home" page when img2 is clicked
      navigate('/home');
    };

    return (
        <div className={styleLanding.container}>
            <img className={styleLanding.img1} src={require('../../Images/pokemonLogoLanding.png')} alt=''/>
            <img className={styleLanding.img2} src={require('../../Images/goLandingPage.png')} alt='' onClick={handleImg2Click}/>
        </div>
  )
}

