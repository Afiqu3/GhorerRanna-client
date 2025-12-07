import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import About from '../About/About';
import LatestMeals from '../LatestMeals/LatestMeals';
import Reviews from '../Reviews/Reviews';

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Services></Services>
      <About></About>
      <LatestMeals></LatestMeals>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
