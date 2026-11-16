import { Seo } from "../../components/Seo";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Mission } from "./Mission";
import { NextSteps } from "./NextSteps";
import { ServiceTimes } from "./ServiceTimes";

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ServiceTimes />
      <Mission />
      <Gallery />
      <NextSteps />
    </>
  );
}
