import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Aos from "aos";

const Login = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signInWithGoogle, signIn, user, loading, setLoading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      // 1. sign in user
      const result = await signIn(email, password);
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      console.log(data);
      const saveUser = async (user) => {
        const currentUser = {
          email: user?.email,
          role: "guest",
          status: "regular",
          name: user?.displayName,
        };
        const { data } = await axiosSecure.put(
          `${import.meta.env.VITE_API_URL}/users`,
          currentUser
        );
        return data;
      };
      await saveUser(result.user);
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      console.log(data);
      const saveUser = async (user) => {
        const currentUser = {
          email: user?.email,
          role: "guest",
          status: "regular",
          name: user?.displayName,
        };
        const { data } = await axiosSecure.put(
          `${import.meta.env.VITE_API_URL}/users`,
          currentUser
        );
        return data;
      };
      await saveUser(result.user);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center mt-4 mb-6 px-2"
    >
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  text-whiteM">
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold ">LOG IN</h1>
          <p className="text-sm text-redM">Sign in to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group mt-2 w-full rounded-md relative z-10 px-6 py-3 overflow-hidden bg-reddM text-base text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Sign In
              </span>
              Sign In
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-8 mb-6">
          <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>

          <div className="text-xs text-center text-greenM uppercase ">or</div>

          <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>
        </div>

        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 hover:border-redM transition border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>

        <p className="px-6 text-sm text-center mt-2 text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="hover:underline hover:text-rose-500 text-redM"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
