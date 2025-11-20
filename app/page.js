import Blog from "./components/blog/blog";
import Category from "./components/Category/Category";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Hero from "./components/Hero/Hero";
import NewsContainer from "./components/NewsContainer/NewsContainer";
import ProductContainer from "./components/ProductContainer/ProductContainer";
import Review from "./components/Review/Review";
import Services from "./components/Services/Services";

// import Image from "next/image";
export default function Home() {
  return (
    <div className="Home">
      <Hero/>
      <Category/>
      <ProductContainer title="Spacial Product"/>
      <FeaturedProducts/>
      <Blog/>
      <Review/>
      <NewsContainer/>
      <Services/>
    </div>
  );
}
