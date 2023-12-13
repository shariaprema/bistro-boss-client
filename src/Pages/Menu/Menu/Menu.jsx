import { Helmet } from 'react-helmet-async';
import Cover from '../../shares/Cover/Cover';
import image from '../../../assets/image/menu/banner3.jpg';
import dessertImage from '../../../assets/image/menu/dessert-bg.jpeg';
import pizzaImage from '../../../assets/image/menu/pizza-bg.jpg';
import soupImage from '../../../assets/image/menu/soup-bg.jpg';
import saladImage from '../../../assets/image/menu/salad-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {
    const [menu] = useMenu()

    const desserts = menu.filter(item=>item.category === "dessert")
    const soup = menu.filter(item=>item.category === "soup")
    const salad = menu.filter(item=>item.category === "salad")
    const pizza = menu.filter(item=>item.category === "pizza")
    const offered = menu.filter(item=>item.category === "offered")




    return (
        <div>
           
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover image={image} title={'Our Menu'}></Cover>
            
            {/* Main coffer */}
            <SectionTitle
            subHeading={"Don't Miss"}
            heading={"Today's Offer"}>
            </SectionTitle>

            {/* Offered items */}
            <MenuCategory items={offered} ></MenuCategory>


            {/* desserts items */}
            <MenuCategory items={desserts} title={'desserts'} image={dessertImage} ></MenuCategory>
           
           
            {/* pizza items */}
            <MenuCategory items={pizza} title={'pizza'} image={pizzaImage} ></MenuCategory>



            {/* soup items */}
            <MenuCategory items={soup} title={'soup'} image={soupImage} ></MenuCategory>


            {/* soup items */}
            <MenuCategory items={salad} title={'salad'} image={saladImage} ></MenuCategory>
        </div>
    );
};

export default Menu;