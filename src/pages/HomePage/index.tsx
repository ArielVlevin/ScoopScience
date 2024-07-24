
import { Link } from 'react-router-dom';
import photo from '../../assets/ice-cream-back2.jpeg'

function MainPage(){

  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${photo})`}}>
      <div className="hero-overlay bg-opacity-60"></div>
      
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          
          <h1 className="mb-5 text-5xl font-bold">Welcome to ScoopScience </h1>
          <p className="mb-5">Your ultimate destination for heavenly ice cream recipes. Whether you’re craving creamy gelato, rich custard, or refreshing sorbet, we’ve got you covered. Dive into our collection of delicious recipes, crafted to bring joy to your taste buds and delight to your kitchen. Let’s make every day a little sweeter!</p>
          <Link to="recipes/newRecipeLanding"><a className="btn btn-primary">Get Started</a></Link>
        </div>
      </div>
    </div>
    );
}
  
export default MainPage;