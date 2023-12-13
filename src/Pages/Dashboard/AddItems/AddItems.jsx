import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset} = useForm()
    const onSubmit = async(data) =>{
        console.log(data)
    
    //image upload to imageBB and then get an url
    const imageFile = { image: data.image[0] } //create an object for image
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
         'content-Type': 'multipart/form-data' 
        }
    })

    if(res.data.success){
        //Now send the menu item data to the server with image
        const menuItems={
            name: data.name,
            category: data.category,
            image: res.data.data.display_url,
            price: parseFloat(data.price),
            recipe: data.recipe,

        }
//-------
        const menuRes = await axiosSecure.post('/menu',menuItems)
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            reset()
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Your ${data.name} food has been added Successfully!`,
                showConfirmButton: false,
                timer: 1500
              });
        }

//-------
    }

        console.log('with image url',res.data);

    }
    return (
        <div className="py-0">
            

           <SectionTitle
           subHeading={"What's a new?"}
           heading={'ADD AN ITEM'}
           >
           </SectionTitle>

           <div>
           <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full  ">
            <label className="label">
                <span className="label-text">Recipe Name?</span>
            </label>
            <input {...register("name", { required: true})}
             type="text"
             placeholder="Recipe Name"
             className="input input-bordered w-full " />
            </div>

            <div className="flex gap-3 justify-center items-center mx-auto  my-6 ">
            {/* Category */}
           <div className="form-control w-full flex-1">
           <label className="label">
                <span className="label-text">Category</span>
            </label>
           <select defaultValue="default" {...register("category", { required: true})}
            className="select select-bordered">
            <option disabled value="default">Select a Category</option>
            <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
            </select>
           </div>

           {/* price */}

                <div className="form-control w-full flex-1 ">
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input {...register("price", { required: true})}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full " />
                </div>

            </div>

            <div className="form-control w-full ">
            <label className="label">
                <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register("recipe", { required: true})}
             type="text"
             placeholder="Recipe Details"
             className="textarea textarea-bordered h-24 w-full " />
            </div>

            {/* Recipe Image */}
            <dir className="form-control w-full ">
                <input {...register("image", { required: true})}
                type="file"
                placeholder="Image URL"
                className="file-input input-bordered w-full" />
            </dir>

           
           
           <button className="btn bg-amber-500">
            Add Items
            <FaUtensils></FaUtensils>
           </button>
            </form>
           </div>

        </div>
    );
};

export default AddItems;