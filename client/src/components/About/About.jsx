import styleAbout from "./About.module.css"
import { BsGithub } from "react-icons/bs";
import {AiFillInstagram} from "react-icons/ai"
import {BsLinkedin} from "react-icons/bs"

export const About = () => {
  return (
    <div className={styleAbout.aboutcontainer}>
        <h2 className={styleAbout.abouttitle}>About Our Pokemon App</h2>

      <div className={styleAbout.aboutcontent}>
          <div className={styleAbout.aboutImg}>
            <img src="http://www.pngmart.com/files/2/Pokeball-PNG-Image.png" className={styleAbout.pokemonball} width="300" alt=""/>
          </div>

          <div className={styleAbout.aboutText}>
            <div className={styleAbout.subtitle}>Welcome to the Pokémon App!</div>
            <p className={styleAbout.aboutdescription} >
            

            At our app, we are passionate about the fascinating world of Pokémon, 
            and we aim to provide you with the best possible experience to fully
            immerse yourself in this exciting universe.
            </p>
            {/* <p className={styleAbout.subtitle}>Our Mission</p>
            <p className={styleAbout.aboutdescription}>
            
              Our mission is to offer an interactive and user-friendly platform where you can
              discover and 
              explore the vast world of Pokémon. We want you to dive
              into the diversity of creatures, types, attack, velovity rates that make Pokémon
              such a beloved franchise worldwide.
            </p> */}
            <div className={styleAbout.subtitle}>
            Contact Us

            </div>
            <p>
            We value your feedback and opinions. If you have any questions, 
            suggestions, or just want to say "Hello," feel free to get in touch with us. 
            </p>
          </div>
          <div className={styleAbout.links}>
                        <a href='https://github.com/ALauraOliva' ><BsGithub size="3em" color='white'/></a>
                        <a href='https://www.instagram.com/' ><AiFillInstagram size="3em" color='white'/></a>
                        <a href='https://www.linkedin.com/in/andrea-laura-99604a275/' ><BsLinkedin size="3em" color='white'/></a>
                    </div>
      </div>

    </div>
  );
}
