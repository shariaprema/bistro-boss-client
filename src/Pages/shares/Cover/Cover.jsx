import { Parallax, Background } from 'react-parallax';
const Cover = ({image, title}) => {
    return (
        <div>

<Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={image}
        bgImageAlt="food category"
        strength={-200}
    >
        
        <div className="hero h-[700px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className=" bg-stone-800 opacity-60 w-1/2 px-10 mx-10 text-white">
                    <h1 className="mb-5 text-5xl font-bold uppercase ">{title}</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    
                </div>
            </div>
            </div>
    </Parallax>


  
        </div>
    );
};

export default Cover;