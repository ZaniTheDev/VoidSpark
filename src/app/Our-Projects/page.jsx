// app/portfolio/page.jsx (Server Component)
import ClientPortfolio from "./_components/ClientPortfolio";
import Navbar from "../navbar";

export const metadata = {
  title: "Portfolio - Web Design Showcase",
  description: "See how we transform boring websites into engaging experiences",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <ClientPortfolio />
    </>
  );
}
