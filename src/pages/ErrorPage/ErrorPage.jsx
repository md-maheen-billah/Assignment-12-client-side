import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-svh p-16 bg-blackM">
      <Helmet>
        <title>Error Page</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-reddM">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-redM">
            Sorry, we couldn&#39;t find this page.
          </p>
          <p className="mt-4 mb-8 text-whiteM">
            But don&#39;t worry, you can find plenty of other things on our
            homepage.
          </p>
          <a rel="noopener noreferrer" href="/" className="">
            <button className="group mt-8 relative z-10 px-6 py-3 overflow-hidden bg-reddM text-base text-white">
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Back to Homepage
              </span>
              Back to Homepage
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
