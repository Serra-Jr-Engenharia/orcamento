import { useNavigate } from "react-router-dom"
import img from '../../assets/barra-title.png';
import background from '../../assets/background.png';

interface HeaderProps {
  title: string;
}

export default function Header ({ title }: HeaderProps) {
    const navigate = useNavigate();
    const goBack = () => navigate("/");
    
    return (
        <header className="w-full h-[50vh] bg-cover bg-center p-5 flex items-center justify-center relative z-10" 
        style={{ backgroundImage: `url(${background})` }}> 

            <div className="absolute top-5 left-5">
                <button onClick={goBack} className="flex items-center text-black">
                    <span className="text-white  cursor-pointer transition-transform duration-300 hover:scale-110 inline-block mb-30">
                      ← Voltar
                    </span>
                </button>
            </div>

            <div className="flex items-center justify-center flex-col">
                <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-6 text-center">{title}</h1>
                <img src={img} alt="barra do titulo" ></img>
            </div> 
                 
        </header>
    )
}

