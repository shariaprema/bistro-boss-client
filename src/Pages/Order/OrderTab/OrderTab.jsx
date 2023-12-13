import FoodCard from "../../../component/FoodCard/FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto py-20 gap-8">
                {
                    items.map(items=>
                    <FoodCard 
                    items={items} 
                    key={items._id}>
                    </FoodCard>)
                }
            </div>
    );
};

export default OrderTab;