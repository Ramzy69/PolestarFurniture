import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import InquiryForm from "@/components/shared/InquiryForm";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Polestar Furniture - Premium Office Furniture Solutions</title>
        <meta name="description" content="Discover premium office furniture solutions that blend style, comfort, and functionality for the modern workplace." />
      </Helmet>
      
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <InquiryForm />
    </>
  );
};

export default Home;
