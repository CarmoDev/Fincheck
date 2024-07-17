import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <nav>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full hover:enabled:bg-black/5 disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        className="py-3 pl-2.5 pr-2.5 rounded-full hover:bg-black/5 disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </nav>
  );
}
