import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardMenuProps {
  title: string;
  img: string;
  rute: string;
}

function CardMenu({ title, img, rute }: CardMenuProps) {
  const navigate = useNavigate();
  const nav = () => {
    navigate(`/private${rute}`, { replace: true });
  };

  return (
    <button onClick={nav}>
      <div className="bg-gray-100 w-64 h-80 rounded-lg m-5 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <LazyLoadImage
          src={img}
          className="bg-white w-full h-3/4 object-cover rounded-t-lg"
          alt={title}
        />
        <h2 className="text-center text-2xl h-auto w-auto text-black dark:text-white mt-2">
          {title}
        </h2>
      </div>
    </button>
  );
}

export default CardMenu;
