import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../component/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { user, createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // console.log("user profile picture updated");
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "User Created Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })

        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center md:w-1/2  lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="font-semibold text-xs text-red-700 mt-1">
                    This field is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="font-semibold text-xs text-red-700 mt-1">
                    photoURL is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="font-semibold text-xs text-red-700 mt-1">
                    This field is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />

                {errors.password?.type === "required" && (
                  <p className="font-semibold text-xs text-red-700 mt-1">
                    {" "}
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="font-semibold text-xs text-red-700 mt-1">
                    {" "}
                    Password must be 6 characters
                  </p>
                )}

                {errors.password?.type === "maxLength" && (
                  <p className="font-semibold text-xs text-red-700 mt-1">
                    {" "}
                    Password must be less than 20 characters
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="font-semibold text-xs text-red-700 mt-1">
                    {" "}
                    Password must have, one upper case, one lower case, one
                    number & one special character
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>

              <button
                type="button"
                className=" bg-slate-500 w-16 h-8 hover:focus font-semibold btn-primary text-white  flex justify-center items-center mx-auto"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
            </form>
            <p className="text-center font-semibold ">
              <small>
                You already sign-up, please
                <Link className="text-red-700 font-bold" to="/login">
                  Login
                </Link>
              </small>
            </p>
            <div className="divider"></div>
            <div className="flex justify-center items-center my-0 py-0">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
