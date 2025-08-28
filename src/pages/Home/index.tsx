import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-serra.png"; 
import background from "../../assets/background.png"; 

const Home: React.FC = () => {
    const navigate = useNavigate();

    const goToComputacao = () => {
        navigate('/computacao');
    };
    
    const goToMecanica = () => {
        navigate('/mecanica');
    };

    return (
        <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center" 
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <img 
                src={logo} 
                alt="Logo Serra" 
                className="w-[80%]"
            />
            <div className="flex justify-between items-center w-[45%] pt-10">
                <button 
                    onClick={goToComputacao}
                    className="rounded-md px-10 py-2 text-lg font-semibold text-white"
                >
                    Computação
                </button>
                <button 
                    onClick={goToMecanica}
                    className="rounded-md px-10 py-2 text-lg font-semibold text-white"
                >
                    Mecânica
                </button>
            </div>
        </div>
    );
};

export default Home;