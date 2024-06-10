import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const ContatcUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Sent Email");
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div
        data-aos="fade-up"
        className="grid max-w-screen-xl text-reddM grid-cols-1 gap-8 px-8 py-8 lg:py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 "
      >
        <div className="flex flex-col justify-between">
          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-bold text-whiteM leading-tight lg:text-5xl">
              Let&#39;s talk!
            </h2>
            <div className="dark:text-gray-600">
              Reach Us Out Whenever is Convenient!
            </div>
          </div>
          <div className="h-full flex justify-center items-start mt-6">
            <img
              src="https://i.ibb.co/W62mns4/publicdomainq-business-man-phone-call.png"
              alt=""
              className="w-52 h-52"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm text-whiteM">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Enter Full Name"
              className="w-full p-3 rounded text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline  focus:shadow-outline bg-reddM"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-whiteM">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter Email"
              className="w-full p-3 rounded text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline  focus:shadow-outline bg-reddM"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-whiteM">
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              required
              placeholder="Leave us a message"
              className="w-full p-3 rounded text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline  focus:shadow-outline bg-reddM"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="group rounded-md mt-1 relative z-10 px-6 py-3 overflow-hidden bg-reddM text-base text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Send Message
              </span>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContatcUs;
