import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import About from '../About/About';
import LatestMeals from '../LatestMeals/LatestMeals';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';
import Newsletter from '../Newsletter/Newsletter';
import CTA from '../CTA/CTA';

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Services></Services>
      <About></About>
      <LatestMeals></LatestMeals>
      <Reviews></Reviews>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
      <CTA></CTA>
    </div>
  );
};

export default Home;
