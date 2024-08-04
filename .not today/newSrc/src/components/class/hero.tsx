import { Link } from "../../../../node_modules1/react-router-dom/dist";
import { Button } from "../ui/button";

interface HeroProps {
  img: string;
  opacity?: number;
  title?: string;
  subTitle?: string;
  btnTitle?: string;
  btnLink?: string;
}

const Hero = ({
  img,
  opacity,
  title,
  subTitle,
  btnTitle,
  btnLink,
}: HeroProps) => {
  return (
    <div
      className={` min-h-screen w-full bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div
        className={`bg-slate-800 bg-opacity-${opacity} h-screen w-full flex flex-col items-center justify-center`}
      >
        <div className=" text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title} </h1>
            <p className="mb-5">{subTitle}</p>

            {btnTitle && btnLink && (
              <Link to={btnLink}>
                <Button className="">{btnTitle}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.defaultProps = {
  opacity: 40,
  title: "Welcome",
  subTitle: "To my app",
};

export default Hero;
