import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const [isAdmin] = useAdmin()
    const [cart]=useCart()
const {user,logOut} = useContext(AuthContext)
const handleLogOut=()=>{
    logOut()
    .then((result)=>{
    const logOutInfo = result.user
    console.log(logOutInfo);
    })

    .catch((error)=>{
        console.log(error.message);
    })
}


    const navOptions = <>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/menu">Our Menu</Link></li>
           <li><Link to="/order/salad">Order Food</Link></li>

           {
            user && isAdmin &&  <li><Link to="/dashboard/adminHome">Dashboard</Link></li> 

           }

           {
            user && !isAdmin &&  <li><Link to="/dashboard/userHome">Dashboard</Link></li> 

           }

           <li><Link to="/dashboard/cart">
           <button className="btn px-2 py-0 text-xs hover:bg-slate-800  text-white bg-slate-800">
           <TiShoppingCart className="w-5 h-5" />
            <div className="badge badge-secondary">+{cart.length}</div>
            </button>
            
            </Link></li> 

        
         
        {
            user ?
           <>
          {/* <span>{user?.displayName}</span> */}
           <Link to="/login"><button onClick={handleLogOut} className="btn pb-2 text-xs btn-ghost ">LogOut</button></Link>
           </> 
            : 

            <>
            <li><Link to="/login">login</Link></li>  
            </>
        }

   
            </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-40 bg-black text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                
                    {navOptions}


                </ul>
                </div>
                <div className="">
                <a className=" normal-case text-xl ">BISTRO BOSS</a>
                <p className="text-center">Restaurant</p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">


                {navOptions}

                </ul>
            </div>
            {
                user ? 
                <div className="navbar-end">
                <Link to={'/login'}>  <button className="btn">Sign Out</button></Link>
                </div> 
                :
                <div className="navbar-end">
                <Link to='/login'>  <button className="btn">Login</button></Link>
                </div>

            }
            
            


            </div>
            
            
        </div>
    );
};

export default NavBar;