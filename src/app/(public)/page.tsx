import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustedClients from "@/components/home/TrustedClients";
import HomepageCTA from "@/components/home/HomepageCTA";
import HomeSEOContent from "@/components/home/HomeSEOContent";
import { createPublicClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "SS Flanges & Pipe Fittings Manufacturer Ahmedabad | Angel Metal & Alloys",
  description:
    "Angel Metal & Alloys — ISO certified manufacturer & exporter of Stainless Steel pipe fittings, flanges, forged components in Ahmedabad. 30+ countries. 15–20 MT/month capacity. Est. 2007.",
  alternates: { canonical: "/" },
};

export const revalidate = 1800; // 30 mins

export default async function HomePage() {
  const supabase = createPublicClient();
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("id, slug, name, category, short_description, material_grades, primary_image_url, sort_order")
    .eq("is_published", true)
    .order("sort_order")
    .limit(8);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrustBar />
      <FeaturedProducts products={featuredProducts ?? []} />
      <WhyChooseUs />
      <TrustedClients />
      <HomepageCTA />
      <HomeSEOContent />
    </>
  );
}
