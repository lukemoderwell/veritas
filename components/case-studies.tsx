import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CaseStudies() {
  const caseStudies = [
    {
      title: "Manufacturing Company",
      description: "Preserved critical operational knowledge from retiring engineers, reducing training time by 40%.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "Financial Services Firm",
      description:
        "Captured specialized compliance expertise, ensuring regulatory continuity during leadership transition.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "Healthcare Organization",
      description:
        "Documented clinical best practices, improving patient outcomes and reducing onboarding time for new staff.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  ]

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6">Case Studies</h2>
          <p className="text-lg text-muted-foreground mb-12 body-text">
            See how we've helped organizations across industries preserve and transfer critical knowledge.
          </p>

          <div className="grid gap-8 md:gap-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-6 items-center">
                <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <h3 className="text-2xl mb-3">{study.title}</h3>
                  <p className="text-muted-foreground mb-4 body-text">{study.description}</p>
                  <Button
                    variant="outline"
                    asChild
                    className="border-veritas-blue text-veritas-blue hover:bg-veritas-blue/10"
                  >
                    <Link href={study.link}>Read Case Study</Link>
                  </Button>
                </div>
                <div
                  className={`${index % 2 !== 0 ? "md:order-1" : ""} aspect-video bg-veritas-blue/10 rounded-lg overflow-hidden border border-veritas-blue/20`}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground body-text">Case study image</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

