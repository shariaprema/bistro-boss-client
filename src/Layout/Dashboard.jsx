import { NavLink, Outlet } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaAd, FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { BiSolidContact } from "react-icons/bi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()
//get is admin value from the database
    const [isAdmin] = useAdmin()


    return (
        <div className="flex">
            <div className="w-64 min-h-screen  bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin? <>
                        <li>                     
                        <NavLink to='/dashboard/adminHome'>
                       
                        <FaHome className="w-5 h-5"/>
                            Admin Home
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/addItems'>
                        
                        <FaUtensils  className="w-5 h-5"/>
                        Add Items
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/manageItems'>
                        <FaList className="w-5 h-5" />
                           Manage Items
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/bookings'>
                          <FaBook className="w-5 h-5" />
                          Manage Bookings
                        </NavLink>
                    </li>
                    <li>                     
                        <NavLink to='/dashboard/users'>
                        <FaUsers  className="w-5 h-5" />
                       All Users
                        </NavLink>
                    </li>
                </>

                :

                <>

                {/* USER PANEL */}
                    <li>                     
                        <NavLink to='/dashboard/userHome'>
                       
                        <FaHome className="w-5 h-5"/>
                            User Home
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/history'>
                        
                        <FaCalendar  className="w-5 h-5"/>
                        History
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/cart'>
                        <TiShoppingCart className="w-5 h-5" />
                            My Cart({cart.length})
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/review'>
                          <FaAd className="w-5 h-5" />
                        Add a Review
                        </NavLink>
                    </li>
                    <li>                     
                        <NavLink to='/dashboard/paymentHistory'>
                        <FaList  className="w-5 h-5" />
                        Payment Real History
                        </NavLink>
                    </li>
                        </>
                    }

                   {/* Shared nav Links: */}
                    <div className="divider"></div>

                    <li>                     
                        <NavLink to='/'>                     
                        <FaHome className="w-5 h-5"/>
                            Home
                        </NavLink>
                    </li>

                    <li>                     
                        <NavLink to='/dashboard/menu'>
                        <BsMenuButtonWideFill className="w-5 h-5"  />
                        Menu
                        </NavLink>
                    </li>
                    <li>                     
                        <NavLink to='/dashboard/shop'>
                        <RiShoppingBag2Fill className="w-5 h-5" />
                       Shop
                        </NavLink>
                    </li>
                    <li>                     
                        <NavLink to='dashboard/contact'>
                        <BiSolidContact className="w-5 h-5" />                    
                        Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8 bg-blue-200">
            <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;