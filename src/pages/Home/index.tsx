import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-serra.png"; 
import background from "../../assets/background.png"; 


const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToComputacao = () => navigate("/computacao");
  const goToMecanica = () => navigate("/mecanica");

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center overflow-hidden box-border"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img
        src={logo}
        alt="Logo"
        className="
          w-[80%] sm:w-[70%] md:w-auto lg:w-1/2 xl:w-1/2
        "
      />

      <div
  className="
    flex items-center justify-center gap-x-16 pt-10
    max-lg:flex-col max-lg:gap-y-4
  "
>
        <button
        onClick={goToComputacao}
        className="
          relative px-5 py-2 text-white cursor-pointer text-2xl font-semibold
          bg-transparent rounded-lg font-poppins
          transition duration-500 ease-in-out
          hover:bg-blue-600 hover:scale-105 active:scale-90
          before:content-[''] before:absolute before:-top-[2px] before:-left-[2px]
          before:w-[calc(100%+4px)] before:h-[calc(100%+4px)]
          before:bg-gradient-to-r before:from-blue-700 before:to-purple-600
          before:bg-[length:400%_400%]
          before:blur-sm before:opacity-0 hover:before:opacity-100
          before:rounded-lg before:-z-10
          after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0
          after:bg-transparent after:rounded-lg after:-z-10
        "
        >
          Computação
        </button>

        <button
          onClick={goToMecanica}
          className="
            relative px-5 py-2 text-white cursor-pointer text-2xl font-semibold
            bg-transparent rounded-lg font-poppins
            transition duration-500 ease-in-out
            hover:bg-blue-600 hover:scale-105 active:scale-90
            before:content-[''] before:absolute before:-top-[2px] before:-left-[2px]
            before:w-[calc(100%+4px)] before:h-[calc(100%+4px)]
            before:bg-gradient-to-r before:from-blue-700 before:to-purple-600
            before:bg-[length:400%_400%]
            before:blur-sm before:opacity-0 hover:before:opacity-100
            before:rounded-lg before:-z-10
            after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0
            after:bg-transparent after:rounded-lg after:-z-10
          "
        >
          Mecânica
        </button>

      </div>
    </div>
  );
};

export default Home;
