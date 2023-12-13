import SectionTitle from "../../../component/SectionTitle/SectionTitle";

import useMenu from "../../../hooks/useMenu"
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";
const PopularMenu = () => {
    const [menu] = useMenu()

    const popular = menu.filter(item=>item.category === 'popular')
   
    return (
        <div className="mb-12">
            <SectionTitle 
            subHeading= {"Check it out"}
            heading={"FROM OUR MENU"}
        ></SectionTitle>
        
        <MenuCategory items={popular}></MenuCategory>

         <button className="btn btn-outline border-0 border-b-4 mt-10 flex justify-between items-center mx-auto">View Full Menu</button>


        </div>
    );
};

export default PopularMenu;
