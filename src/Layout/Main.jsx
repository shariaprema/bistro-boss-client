import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/shares/Footer/Footer";
import NavBar from "../Pages/shares/NavBar/NavBar";


const Main = () => {
    const location = useLocation()
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp')
    //true hbe login a jeye
    // console.log(noHeaderFooter);
    return (
        <div>
            
           {noHeaderFooter || <NavBar></NavBar>}
          
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;