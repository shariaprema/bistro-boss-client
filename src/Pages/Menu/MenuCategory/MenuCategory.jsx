import { Link } from "react-router-dom";
import Cover from "../../shares/Cover/Cover";
import MenuItem from "../../shares/MenuItem/MenuItem";

const MenuCategory = ({items,title,image}) => {
    return (
        <div className="my-20">
       {title && <Cover image={image} title={title}></Cover>}

        <div className=" grid md:grid-cols-2 gap-10 mt-16 ">
            {
                items.map(item=><MenuItem item={item} ></MenuItem>)
            }
          
        </div>

        <Link to={`/order/${title}`}>  
            <button className="btn btn-outline border-0 border-b-4 mt-10 flex justify-between items-center mx-auto">Order Now</button>
        </Link>
                    
                </div>
            );
        };

export default MenuCategory;