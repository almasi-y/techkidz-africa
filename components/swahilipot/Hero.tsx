"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import ColourfulText from "@/components/ui/colourful-text";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HeroProps {
    images?: string[];
}

export function Hero({ images = ["/hero1.jpg"] }: HeroProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollTo = useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api],
    );

    return (
        <div className="relative overflow-hidden h-[400px] md:h-[500px]">
            {/* Background Carousel */}
            <div className="absolute inset-0 -z-20 h-full w-full">
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                        align: "start",
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    className="h-full w-full"
                >
                    <CarouselContent className="-ml-0 h-full">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="pl-0 basis-full shrink-0 grow-0">
                                <div
                                    className="h-[400px] md:h-[500px] w-full bg-center bg-no-repeat overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.5,
                                    }}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#6A1383]/10 -z-10 h-[400px] md:h-[500px]" />

            {/* Bottom blur gradient */}
            <div className="absolute bottom-0 z-30 inset-x-0 h-24 md:h-32 w-full pointer-events-none">
                <div className="absolute inset-0 backdrop-blur-lg" style={{ maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(245,240,248) 0%, rgb(245,240,248) 5%, rgba(245,240,248,0.98) 10%, rgba(245,240,248,0.9) 20%, rgba(245,240,248,0.75) 35%, rgba(245,240,248,0.5) 55%, rgba(245,240,248,0.25) 75%, rgba(245,240,248,0.1) 90%, transparent 100%)', maskImage: 'linear-gradient(to top, black 0%, transparent 70%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 70%)' }} />
            </div>

            {/* Content */}
            <div className="container-custom section-padding relative z-10">
                <div className="max-w-3xl mx-auto md:mx-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        <span></span>
                        <br />
                        <ColourfulText text="We Empower Future " />
                        <br/>
                        <Cover>  Innovators</Cover>
                    </h1>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Button className="w-full sm:w-auto bg-[#6A1383] hover:bg-[#5a0f70] text-white flex items-center justify-center gap-2 text-base" asChild>
                            <Link href="/programs">
                                Our Programs <ArrowRight size={16} />
                            </Link>
                        </Button>
                        <Button className="w-full sm:w-auto bg-[#38B6FF] hover:bg-[#1A9FE8] text-white flex items-center justify-center gap-2 text-base" asChild>
                            <Link href="/about">
                                Learn More
                            </Link>
                        </Button>

                    </div>
                </div>
            </div>

            {/* Dot indicators */}
            {count > 1 && (
                <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-30 sm:bottom-10">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={`dot-${index}`}
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "h-2.5 w-2.5 rounded-full transition-all duration-300 shadow-xl border-2",
                                current === index
                                    ? "w-7 bg-gradient-to-r from-[#6A1383] to-[#38B6FF] border-white/80"
                                    : "bg-[#6A1383] border-white/50 hover:bg-[#38B6FF] hover:border-white/80",
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
