import Our_Services from "@/components/expertise/Our_Services";
import About from "@/components/home/About";
import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import OurWork from "@/components/home/OurWork";
import Services from "@/components/home/Services";
import TicketEffect from "@/components/home/TicketEffect";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Zerror Studios — Where Design and Technology Move as One",
  description: "Zerror is a Mumbai design-led studio building custom websites, software and eCommerce for brands that refuse to look average. Zero errors between the idea and the internet.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Our_Services />
      <OurWork />
      <Clients />
      <TicketEffect />
    </>
  );
}
