
const MenuItem = ({item}) => {
    const {_id,name,recipe,image,category,price}= item || {}

    return (
        <div className="flex space-y-2 gap-2">
            <img style={{borderRadius: '0px 200px 200px 200px'}} className="bg-[#D9D9D9]  w-[100px]" src={image} alt="" />
           <div>
           <h2>{name}---------------------</h2>
            <h2>{recipe}</h2>
           </div>
           <p className="text text-[#BB8506] text-lg font-normal ">${price}</p>
            
        </div>
    );
};

export default MenuItem;