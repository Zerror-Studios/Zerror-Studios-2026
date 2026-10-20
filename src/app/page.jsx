import Our_Services from "@/components/expertise/Our_Services";
import About from "@/components/home/About";
import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import OurWork from "@/components/home/OurWork";
import Services from "@/components/home/Services";
import TicketEffect from "@/components/home/TicketEffect";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Zerror Studios | Design studio in Mumbai",
  description: "Zerror Studios is a design studio in Mumbai. We build brands, websites and online stores for publishers, film houses, fashion labels and founders.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Our_Services />
      <Clients />
      <OurWork />
      <TicketEffect />
    </>
  );
}
