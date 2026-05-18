import Navbar from "@/components/Navbar";
import React from "react";
import { useRouter } from "next/router";
import DataHero from "@/components/Data/DataHero";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SubNav from "@/components/Data/SubNav";
import PriceSection from "@/components/Data/PriceSection";
import InventorySection from "@/components/Data/InventorySection";
import MacroSection from "@/components/Data/MacroSection";
import SupplySection from "@/components/Data/SupplySection";
import DemandSection from "@/components/Data/DemandSection";
import HistoryTable from "@/components/Data/HistoryTable";
import CopperPricing from "@/components/Data/CopperPricing";
import ScrapCopperPrice from "@/components/Data/ScrapCopperPrice";
import TCRC from "@/components/Data/TCRC";
import PriceForecastSection from "@/components/Data/CopperPriceForcast";
import DeficitOutlookSection from "@/components/Data/DeficitOutlookSection";
import StocksSection from "@/components/Data/CopperMiningStocksSection";
import CopperCalculator from "@/components/Data/CopperCalculator";
import FAQSection from "@/components/Data/FAQ";
import TickerTape from "@/components/Data/TickerTape";
import Breadcrumbs from "@/components/Data/BreadCrumb";

const Data = () => {
  const { query } = useRouter();
  const currentTab = query.tab || "priceandpremiums";

  return (
    <div>
      <SEO
        title="Copper Price Today: COMEX HG & LME Charts, Inventory & Data"
        description="Live copper prices: COMEX $5.80/lb · LME $12,780/t. Inventory levels, TC/RC data, supply & demand metrics, mine production, and price history from 2000 to present."
        keywords="copper price today, COMEX copper price, LME copper price, copper inventory, copper TC RC, copper supply demand, copper market data"
        canonicalUrl="/data"
      />
      <Navbar />
      <Breadcrumbs />
      <TickerTape />
      <DataHero />
      <SubNav />
      <PriceSection />
      <InventorySection />
      <TCRC />
      <MacroSection />
      <SupplySection />
      <DemandSection />
      <HistoryTable />
      <CopperPricing />
      <ScrapCopperPrice />
      <PriceForecastSection />
      <DeficitOutlookSection />
      <StocksSection />
      <CopperCalculator />
      <FAQSection />
      {/* tabs  */}
      {/* <div>
        <TabsSection />
        <div className="mt-6">
          {currentTab === "priceandpremiums" && <DPricePremium />}
          {currentTab === "demanddatabase" && <DDemandDatabase />}
          {currentTab === "supply" && <DSupply />}
          {currentTab === "wpicsupply" && <DWPICSupply />}
        </div>
      </div> */}

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Data;
