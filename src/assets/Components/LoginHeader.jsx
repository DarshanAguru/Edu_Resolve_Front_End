
const LoginHeader = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-40 rounded-b-full bg-zinc-200 xl:hidden">
        <h1 className="font-MajorMono font-bold text-5xl lg:text-6xl  text-center xl:hidden">
          Edu Resolve
        </h1>
      </div>
      <div className="bg-homeImage h-[60vh] w-5/5 hidden xl:h-[100vh]   xl:w-3/6  xl:bg-cover xl:bg-left-top xl:flex items-center justify-center text-white ">
        <h1 className=" font-MajorMono font-bold text-5xl lg:text-6xl  text-center">
          Edu Resolve
        </h1>
      </div>
    </>
  );
};

export default LoginHeader;
