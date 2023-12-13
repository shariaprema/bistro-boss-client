import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const axiosSecure = useAxiosSecure()
    const [cart,refetch]=useCart()

    const totalPrice = cart.reduce((total,item)=>total + item.price, 0)

const handleDelete = id=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result) => {
        if (result.isConfirmed) {
        
        axiosSecure.delete(`/carts/${id}`)
        .then(res=>{
           if(res.data.deletedCount>0){
            refetch()
              Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

           }
        })

        }
      });

    }

    return (
        <div>
            <div className="flex justify-evenly mb-4">
            <h2 className="text-4xl ">My Cart: {cart.length}</h2>
            <h2 className="text-2xl ">Total Price: ${totalPrice}</h2>

            {
                cart.length ? <Link to={"/dashboard/payment"}>
                <button className="btn btn-primary ">Pay</button>
               </Link>
               :

               <button disabled className="btn btn-primary">Pay</button>
            }
            
            </div>


            <div>
            <div className="overflow-x-auto">
            <table className="table w-full">
                { /* head */}
                <thead>
                <tr> 
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>  
                </tr>
                </thead>
                <tbody>

                    {
                        cart.map((item,index)=> <tr key={item._id}>

                        <td>
                            {index+1}
                        </td>
                          
                            <td>
                            <div className="flex items-center ">
                                <div className="avatar">
                                <div className="mask mask-squircle w-16 h-16">
                                    <img src={item.image} alt="Avatar" />
                                </div>
                                </div>
                               
                            </div>
                            </td>

                            <td >
                             {item.name}                           
                            </td>

                            <td>${item.price} </td>
                            <th>
                            <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600 w-5 h-5"/></button>
                            </th>
                        </tr>)
                    }
 
                </tbody>
            </table>
            </div>
            </div>
          
        </div>
    );
};

export default Cart;