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
import Head from "next/head";

// Build the full JSON-LD graph with live price data
function buildJsonLd(spotPrice, priceChange, priceChangePct, dateModified) {
  const siteUrl = "https://www.coppertracker.com";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "Copper Tracker",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
          width: 200,
          height: 60,
        },
        sameAs: [
          "https://www.uraniumtracker.com/",
          "https://www.lithiumtracker.com/",
          "https://www.nickelmetaltracker.com/",
          "https://www.pgmtracker.com/",
          "https://www.goldandsilvertracker.com/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Copper Tracker",
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/news?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Copper Tracker — Live Copper Prices, Stocks & Market News",
        description: "Track live copper prices on COMEX (HG) and LME. Real-time charts, insider transactions, press releases, and copper stock news — all in one place.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#org` },
        datePublished: "2023-01-01",
        dateModified,
      },
      {
        "@type": "Dataset",
        "@id": `${siteUrl}/#dataset-copper-price`,
        name: "Copper Spot Price",
        description: "Live copper spot price in USD per pound, updated daily.",
        license: `${siteUrl}/disclaimer`,
        creator: { "@id": `${siteUrl}/#org` },
        dateModified,
        keywords: ["copper price", "spot price", "copper", "COMEX", "LME"],
        variableMeasured: [
          {
            "@type": "PropertyValue",
            name: "Copper Spot Price",
            unitCode: "USD/lb",
            value: spotPrice,
          },
          {
            "@type": "PropertyValue",
            name: "Daily Change",
            unitCode: "USD/lb",
            value: priceChange,
          },
          {
            "@type": "PropertyValue",
            name: "Daily Change Percent",
            unitCode: "%",
            value: priceChangePct,
          },
        ],
      },
    ],
  };
}

// Component receives props from getServerSideProps
const home = ({ copperSpot, jsonLd }) => {
  return (
    <div>
      <SEO
        title="Copper Price Today: COMEX HG & LME Charts | Copper Tracker"
        description="Track live copper prices on COMEX (HG) and LME. Real-time charts, insider transactions, press releases, and copper stock news — all in one place."
        keywords="copper price today, COMEX HG copper, LME copper price, copper spot price, copper market news, copper stocks, copper tracker"
        canonicalUrl="/"
      />

      {/* Server-rendered JSON-LD with live price data — visible to all crawlers */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Server-rendered price strip — visible in raw HTML to LLM crawlers */}
      {copperSpot && (
        <div className="sr-only" aria-label="Live copper spot price data">
          <p>
            Copper Spot Price: ${copperSpot.price} per pound.
            Daily change: ${copperSpot.price_change} ({copperSpot.price_change_percent}).
            Data as of {copperSpot.date}.
          </p>
        </div>
      )}

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
            <div className="md:col-span-4 xl:col-span-3 ">
              <TVCopperCFD />
            </div>
            {/* table  */}
              <DirectHomeCopperPrice />
          </div>

          {/* 2 */}
            <HomeInsiderTransactions />

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
            <TVCopper />
          {/* </div> */}
          <Substacks />
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

// Server-side rendering — fetches live copper price at request time
// This ensures the price appears in raw HTML, visible to all crawlers including LLMs
export async function getServerSideProps() {
  const dateModified = new Date().toISOString();
  let copperSpot = null;

  try {
    const res = await fetch("https://metal-scrapper.onrender.com/commodities", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      const copper = Array.isArray(data)
        ? data.find((i) => i.name === "Copper" || i.name === "copper")
        : null;

      if (copper) {
        copperSpot = {
          price: parseFloat(copper.price || 0).toFixed(4),
          price_change: parseFloat(copper.day_change || 0).toFixed(4),
          price_change_percent: copper.percent_change
            ? `${parseFloat(copper.percent_change).toFixed(2)}%`
            : "0.00%",
          date: dateModified,
        };
      }
    }
  } catch (err) {
    console.warn("SSR copper price fetch failed:", err.message);
  }

  const jsonLd = buildJsonLd(
    copperSpot?.price ?? "N/A",
    copperSpot?.price_change ?? "0",
    copperSpot?.price_change_percent ?? "0%",
    dateModified
  );

  return {
    props: {
      copperSpot,
      jsonLd,
    },
  };
}