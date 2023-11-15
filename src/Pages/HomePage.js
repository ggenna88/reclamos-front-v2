import { NavLink } from "react-router-dom";
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import HomeCarousel from "../Components/Carousel";


export const HomePage = () => {
  return (
    <>
      <div className="container my-4">
        <header className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <span className="mr-2">
              <HomeWorkTwoToneIcon/>
              </span>
            </a>
            <button className="btn btn-primary ml-right">
              <NavLink className="nav-link" to="/login">
                Ingresar
              </NavLink>
            </button>
          </div>
        </header>
        <div>
            <HomeCarousel/>
          </div>
        <footer>
          
        </footer>
      </div>
    </>
  );
};
