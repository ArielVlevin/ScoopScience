import { Link } from "react-router-dom";

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
      className={`hero min-h-screen `}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className={`hero-overlay bg-opacity-${opacity}`} />

      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title} </h1>
          <p className="mb-5">{subTitle}</p>

          {btnTitle && btnLink && (
            <Link to={btnLink}>
              <a className="btn btn-primary">{btnTitle}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Hero.defaultProps = {
  opacity: 50,
  title: "Welcome",
  subTitle: "To my app",
};

export default Hero;
