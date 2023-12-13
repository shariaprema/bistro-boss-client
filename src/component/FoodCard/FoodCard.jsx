import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({items}) => {
    const [,refetch]= useCart()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {_id,name,recipe,image,category,price}= items
    const handleAddToCart =()=>{
        if(user && user.email){
            //send cart items to the data base
           
            const cartItem ={
                menuId:_id,
                email:user.email,
                image,
                name,
                price
            }

            axiosSecure.post('/carts', cartItem)
            .then(res=>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${name} Add to your card successfully`,
                        showConfirmButton: false,
                        timer: 1500
                      });

                    //   refetch the cart to update the cart items count
                    refetch()

                }
            })
        }

        else{
            Swal.fire({
                title: "You are not login",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate ('/login' ,{ state: { key: location } })

                }
              });
        }

    }
    return (
        
    <div className="card card-compact w-96 text-center bg-base-100 shadow-xl mx-auto">
    <figure><img src={image} alt="Shoes" /></figure>
    <p className="absolute right-4 top-3  bg-slate-900 text-white px-3">${price}</p>
    <div className="card-body">
        <h2 className="text-2xl font-bold text-center">{name}</h2>
        <p>{recipe}</p>
        <p>{category}</p>
        
        <div className="card-actions justify-end">
        <button onClick={handleAddToCart} className="btn btn-outline border-0 border-b-4 border-yellow-500 bg-slate-200 
         flex justify-between items-center mx-auto">Add To Card</button>

        </div>
    </div>
    </div>
            
      
    );
};

export default FoodCard;