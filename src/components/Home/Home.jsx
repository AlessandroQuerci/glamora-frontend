//COMPONENTS
import MyNavBar from "./Parts/MyNavBar";
import HeroSection from "./Parts/HeroSection";
import IconSection from "./Parts/IconSection";
import MainSection from "./Parts/MainSection";
import Review from "./Parts/Review";
import MyFooter from "./Parts/MyFooter";

const Home = () => {
  return (
    <>
      <MyNavBar />
      <HeroSection />
      <IconSection />
      <MainSection />
      <Review />
      <MyFooter />
    </>
  );
};

export default Home;
