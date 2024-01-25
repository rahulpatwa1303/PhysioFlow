import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import Physiotherapy1 from "./Physiotherapy1";
import Physiotherapy2 from "./Physiotherapy2";
import Physiotherapy3 from "./Physiotherapy3";
import Physiotherapy4 from "./Physiotherapy4";
import Physiotherapy5 from "./Physiotherapy5";

function Loading() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent className="animate-pulse flex justify-center items-center">
        <CarouselItem className=" flex justify-center items-center">
          <Physiotherapy1 />
        </CarouselItem>
        <CarouselItem className=" flex justify-center items-center">
          <Physiotherapy2 />
        </CarouselItem>
        <CarouselItem className=" flex justify-center items-center">
          <Physiotherapy3 />
        </CarouselItem>
        <CarouselItem className=" flex justify-center items-center">
          <Physiotherapy4 />
        </CarouselItem>
        <CarouselItem className=" flex justify-center items-center">
          <Physiotherapy5 />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default Loading;
