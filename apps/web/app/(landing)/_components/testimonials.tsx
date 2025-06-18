'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tazeai/ui/components/avatar';
import { Card, CardContent } from '@tazeai/ui/components/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@tazeai/ui/components/carousel';
import { useInView } from '@tazeai/ui/hooks/use-in-view';
import { cn } from '@tazeai/ui/lib/utils';
import { useRef } from 'react';

type TestimonialProps = {
  content: string;
  author: string;
  role: string;
  company: string;
  avatarSrc?: string;
  initials: string;
};

const testimonials: TestimonialProps[] = [
  {
    content:
      'Taze AI has transformed the way our team works. The platform is intuitive and has all the features we need to streamline our workflow.',
    author: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechGrowth',
    initials: 'SJ',
  },
  {
    content:
      "We've tried numerous solutions, but none have matched the efficiency and ease of use that Acme provides. It's truly a game-changer.",
    author: 'Michael Chen',
    role: 'Operations Manager',
    company: 'InnovateNow',
    initials: 'MC',
  },
  {
    content:
      "The analytics dashboard alone has saved us countless hours of manual reporting. I can't imagine running our business without Acme now.",
    author: 'Jessica Reynolds',
    role: 'CEO',
    company: 'Brighter Solutions',
    initials: 'JR',
  },
  {
    content:
      "Customer support is exceptional - they're responsive, knowledgeable, and genuinely care about helping you succeed.",
    author: 'Robert Williams',
    role: 'IT Director',
    company: 'Global Services',
    initials: 'RW',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20" id="testimonials" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2
            className={cn(
              'font-bold text-3xl tracking-tight transition-all duration-700 sm:text-4xl md:text-5xl',
              isInView
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            Trusted by Businesses Everywhere
          </h2>
          <p
            className={cn(
              'mx-auto max-w-[700px] text-lg text-muted-foreground transition-all duration-700',
              isInView
                ? 'translate-y-0 opacity-100 delay-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            Hear what our customers have to say about their experience with our
            platform.
          </p>
        </div>

        <div
          className={cn(
            'transition-all duration-700',
            isInView
              ? 'translate-y-0 opacity-100 delay-200'
              : 'translate-y-12 opacity-0'
          )}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col p-6">
                      <blockquote className="mb-6 flex-grow text-lg">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          {testimonial.avatarSrc && (
                            <AvatarImage
                              alt={testimonial.author}
                              src={testimonial.avatarSrc}
                            />
                          )}
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {testimonial.author}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
