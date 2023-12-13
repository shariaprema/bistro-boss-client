import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2'
import SocialLogin from '../../component/SocialLogin/SocialLogin';

const Login = () => {
const [disabled,setDisabled]= useState(true)
const {signIn,user,loading} = useContext(AuthContext)
const navigate = useNavigate()
const location = useLocation()
const from = location.state?.from?.pathname || "/"
console.log('location in the login page:', location.state);





    useEffect(()=>{
        loadCaptchaEnginge(6); 

    },[])

    const handleLogin = e =>{
       e.preventDefault()
       const form = e.target
       const email=form.email.value
       const password=form.password.value
       console.log(email,password)

       signIn(email,password)
        .then((result) => {
          const user = result.user
          console.log(user)
          Swal.fire({
            title: "User LogIn Successful!",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from, {replace: true});
          
        })
        .catch((error) => {
          console.log(error.message)
        });
       

    }

    const handleValidateCaptcha =(e) =>{
     
        const user_captcha_value = e.target.value
        console.log(user_captcha_value)
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }

        else{
            setDisabled(true)
        }
    }


    return (     
       <div className="hero min-h-screen bg-purple-300">


    <Helmet>
        <title>Bistro Boss | Login</title>
    </Helmet>
    <div className="hero-content flex-col lg:flex-row mt-16 w-full">
        <div className=" text-center md:w-1/2 lg:text-left">
       
        </div>
        <div className="card md:w-1/2 h-ful  max-w-sm shadow-2xl bg-base-100">
       
        <h1  className="text-4xl font-bold text-center text-purple-500 "> Please Login!</h1>
        <form  onSubmit={handleLogin} className="card-body ">
            <div className="form-control">
            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
            </div>

            {/* captcha settings */}
            
            <div className="form-control">
            <label className="label">           
                <LoadCanvasTemplate className="label-text" />
            </label>
           
            <input type="text" onBlur={handleValidateCaptcha}    name="captcha" placeholder="Type the captcha above" className="input input-bordered" />
            <button  className="btn btn-outline btn-xs mt-4">Validate</button>
            </div>
            {/* captcha settings end */}

            <div className="form-control mt-3 ">
            {/* disabled={disabled} */}         
            <input  disabled={false}  type="submit" className="btn btn-primary bg-purple-600" value="Login"/>
            </div>
        </form>

        <p className="text-center font-semibold  ">
            <small>New Here?<Link className='text-red-700  font-bold' to='/signUp'> SignUp</Link> </small> 
        </p>
        <div className="divider"></div>
        <div className='flex justify-center items-center my-0'>
        <SocialLogin></SocialLogin>
        </div>
        
        </div>
        
    </div>
    
    </div>
 
    );
};

export default Login;