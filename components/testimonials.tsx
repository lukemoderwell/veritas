"use client"

import { useState, useRef, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface TestimonialProps {
  quote: string
  author: string
  company: string
  logo: string
}

function TestimonialCard({ quote, author, company, logo }: TestimonialProps) {
  return (
    <div className="bg-veritas-beige/30 rounded-lg p-6 md:p-8 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-start">
        <Quote className="text-veritas-blue h-10 w-10" />
        {logo && (
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${company} logo`}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <p className="text-lg body-text mb-6">{quote}</p>
      </div>
      <div className="mt-auto">
        <p className="font-medium ui-text">
          {author} <span className="text-muted-foreground">at {company}</span>
        </p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Working with Nate Jebb has been a rewarding experience for our business. His urgency, professionalism and preparation was evident from day one. I would encourage any business owner interested in streamlining their processes, expediting their onboarding or shortening their accountability runway to give Nate a call today.",
      author: "Jordan Mefford",
      company: "Mefford Contracting",
      logo: "/logos/mefford-logo.svg",
    },
    {
      quote:
        "Nate, I thoroughly liked the thoughtfulness of each question you asked. It is a hard process to understand HOW a company sells their story, and I think through finding a structure with our processes this will become easier for everyone involved. I liked that you asked me what our current issues were, what I enjoyed most about the job, and what I notice. You did not miss a beat on these questions and I really enjoyed our interview!",
      author: "Elle Harris",
      company: "Blue Delta Jeans",
      logo: "/logos/bluedelta-logo.svg",
    },
    {
      quote:
        "The knowledge transfer process Veritas implemented helped us preserve critical expertise that would have otherwise been lost when our senior engineer retired. The AI-powered interview library has become an invaluable resource for our new team members.",
      author: "Michael Chen",
      company: "TechSolutions Inc.",
      logo: "/logos/techsolutions-logo.svg",
    },
    {
      quote:
        "Veritas helped us document decades of institutional knowledge in a way that's actually useful and accessible. Their three-step process was efficient and the results exceeded our expectations. The video interviews captured nuances that would have been lost in written documentation.",
      author: "Sarah Johnson",
      company: "Heritage Manufacturing",
      logo: "/logos/heritage-logo.svg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3)
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="bg-veritas-beige/10 py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl mb-4">Don't just take our word for it</h2>
              <p className="text-lg text-muted-foreground body-text">
                Hear from organizations that have transformed their knowledge management with Veritas.
              </p>
            </div>
            <div className="md:col-span-2 flex items-end justify-end">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="border-veritas-blue text-veritas-blue hover:bg-veritas-blue/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  className="border-veritas-blue text-veritas-blue hover:bg-veritas-blue/10"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 px-3"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    company={testimonial.company}
                    logo={testimonial.logo}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index >= currentIndex && index < currentIndex + visibleCount
                    ? "bg-veritas-blue"
                    : "bg-veritas-blue/30"
                }`}
                onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

