import React from "react";
import Hero from "@/components/Home/Hero";
import LatestNews from "@/components/Home/LatestNews";
import StockNews from "@/components/Home/StockNews";
import Navbar from "@/components/Navbar";
import PopularIntradayReturn from "@/components/Home/MostFollowed";
import StayAhead from "@/components/Home/StayAhead";
import PressReleaseNews from "@/components/Home/PressReleaseNews";
import PopularTools from "@/components/Home/PopularTools";
import MostPopularNews from "@/components/Home/MostPopularNews";
import Substacks from "@/components/Home/Substacks";
import DailyNewsletterAd from "@/components/Home/DailyNewsletterAd";
import Footer from "@/components/Footer";
import TVCopperCFD from "@/components/Home/TVCopperCFD";
import TVCopper from "@/components/Home/TVCopper";
import DirectCopperPrice from "@/components/Home/DirectCopperPrice";
import DirectHomeCopperPrice from "@/components/Home/DirectHomeCopperPrice";
import HomeInsiderTransactions from "@/components/Home/HomeInsiderTransactions";
import SEO from "@/components/SEO";
import StocksMarquee from "@/components/Home/StocksMarquee";
import MostFollowedStocksTable from "@/components/Home/MostFollowedStocksTable";
import SubstacksFull from "@/components/Home/SubstacksFull";

const home = () => {
  return (
    <div>
      <SEO
        title="Copper Price Today: COMEX HG & LME Charts | Copper Tracker"
        description="Track live copper prices on COMEX (HG) and LME. Real-time charts, insider transactions, press releases, and copper stock news — all in one place."
        keywords="copper price today, COMEX HG copper, LME copper price, copper spot price, copper market news, copper stocks, copper tracker"
        canonicalUrl="/"
      />

      <Navbar />
      <StocksMarquee />

      <Hero />

      {/* part1 */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 px-3  xl:px-3  2xl:px-12 ">
        {/* 1  */}
        <div className="w-full lg:w-[76%] flex flex-col gap-6 md:gap-9 2xl:gap-6 ">
          {/* 1 */}
          <div className="grid grid-cols-1 md:grid-cols-9 gap-5 ">
            {/* graph  */}
            <div className="md:col-span-4 xl:col-span-3 w-full  border border-black/10 rounded-lg pt-3 pl-3 pb-2 pr-3 ">
              <h2 className="text-[21px] font-bold mb-2 pb-1">
                Copper Price Chart
              </h2>
              <TVCopperCFD />
            </div>
            {/* table  */}
            <div className="md:col-span-5 xl:col-span-6 bg-white border border-black/10 rounded-lg pt-3 pl-3 pb-2">
              <h2 className="text-[21px] cambay font-bold mb-2">Prices</h2>
              <DirectHomeCopperPrice />
            </div>
          </div>

          {/* 2 */}
          <div className="flex flex-col w-full border border-black/10 rounded-xl p-3 ">
            <h2 className="text-[21px] cambay font-bold mb-2  pb-1">
              Recent Activities
            </h2>
            <HomeInsiderTransactions />
          </div>

          {/* 3 */}
          <div>
            <LatestNews />
          </div>
        </div>

        {/* 2  */}
        <div className="w-full lg:w-[24%] flex flex-col space-y-6">
          <div className="border border-black/10 rounded-lg pt-3 pl-3 pb-2 pr-1">
            <DirectCopperPrice />
          </div>
          <div className="border border-black/10 rounded-lg pt-3 pl-3 pb-2 pr-3 ">
            <h2 className="text-[21px] cambay font-bold mb-3 border-b border-black/10 pb-1">
              Copper Futures
            </h2>
            <TVCopper />
          </div>
          <Substacks />
          <DailyNewsletterAd />
        </div>
      </div>

      {/* part2  */}
      <div className="px-3 xl:px-3  2xl:px-12">
        {/* left  */}
        <div className="w-full flex flex-col space-y-12">
          <div className="border border-white/10"></div>
          <div className="grid grid-cols-1 md:grid-cols-9 gap-8">
            <div className="md:col-span-6">
              <PressReleaseNews />
            </div>
            <div className="md:col-span-3 flex flex-col gap-4 ">
              <PopularTools />
              {/* // CHECK: */}
              <div className="hidden xl:block">
                <DailyNewsletterAd />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-6">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-8">
              <div className="md:col-span-6">
                <StockNews />
              </div>
              <div className="md:col-span-3">
                <PopularIntradayReturn />
              </div>
            </div>
            <MostPopularNews />
          </div>
        </div>
      </div>

      {/* Most Followed Stocks Table */}
      <MostFollowedStocksTable />

      {/* Stay ahead section */}
      <div className="mb-8">
        <StayAhead />
      </div>

      {/* Copper Substacks — full-width grid below StayAhead */}
      <SubstacksFull />

      {/* footer -------------------------------------------------------------------------------------------- */}
      <Footer />
    </div>
  );
};

export default home;
