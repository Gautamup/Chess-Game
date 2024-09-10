import { useNavigate } from "react-router-dom";
import { Button } from "../component/Button";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="pt-8 amx-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className=" flex justify-center">
            <img className="max-w-96" src={"/chessboard.jpeg"} />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">
                Play Chess Online
              </h1>
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={()=>{
                navigate("/game")
              }}> Play Online </Button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
