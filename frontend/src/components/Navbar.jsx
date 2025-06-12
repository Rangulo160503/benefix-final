import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const naviagte = useNavigate()
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          
            onClick={()=>naviagte(-1)}
          />
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
            onClick={()=>naviagte(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
            B
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
