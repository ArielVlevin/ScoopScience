import Hero from "@/components/class/hero";
import img from "@/assets/ice-cream-back2.jpeg";

function HomePage() {
  const title = "Welcome to ScoopScience";
  const subTitle = "Your ultimate destination for heavenly ice cream recipes.";
  const btnTitle = "Get Started";
  const btnLink = "recipes/newRecipeLanding";

  return (
    <Hero
      img={img}
      title={title}
      subTitle={subTitle}
      btnTitle={btnTitle}
      btnLink={btnLink}
    />
  );
}

export default HomePage;
