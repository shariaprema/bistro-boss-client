import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth()
    const  navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo={
                email: result.user?.email,
                name: result.user?.displayName
            }

            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data)
                if (res.data.insertedId) {
                   
                    Swal.fire({
                      position: "top",
                      icon: "success",
                      title: "User Created Successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    
                  }
                
                  navigate("/")
            })


        })

        .catch(error => {
            console.log(error.message);
        })

    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-circle">
            <FcGoogle className="w-6 h-6" />
            </button>
            
        </div>
    );
};

export default SocialLogin;