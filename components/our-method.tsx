import { CheckCircle, Video, FileText, Bot, Users } from "lucide-react"

export function OurMethod() {
  const steps = [
    {
      number: "01",
      title: "Gather",
      description:
        "We gather knowledge through video interviews. We film your employee working, telling instructive stories, and demonstrating their specific techniques.",
      icons: [
        { icon: Video, text: "Record video interviews" },
        { icon: CheckCircle, text: "Capture demonstrations and techniques" },
        { icon: CheckCircle, text: "Document instructive stories" },
      ],
    },
    {
      number: "02",
      title: "Organize",
      description:
        "Our teachers organize that footage into two tools: 1. a printable onboarding guide and 2. an AI-powered interview library. Employees can ask questions in natural language, and the library will respond precisely with video answers.",
      icons: [
        { icon: FileText, text: "Create printable onboarding guides" },
        { icon: Bot, text: "Build AI-powered interview libraries" },
        { icon: CheckCircle, text: "Enable natural language questions" },
      ],
    },
    {
      number: "03",
      title: "Train",
      description:
        "We train your tools and your team. For 90 days, we meet monthly with your rising employees, get their feedback, and refine the library's algorithm. Working knowledge has idiosyncrasies – so should the handoff.",
      icons: [
        { icon: Users, text: "Meet monthly with your team" },
        { icon: CheckCircle, text: "Gather feedback and refine" },
        { icon: CheckCircle, text: "Customize to your specific needs" },
      ],
    },
  ]

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6">Our Method</h2>
          <p className="text-lg text-muted-foreground mb-12 body-text">
            Our structured approach ensures effective knowledge transfer and retention, tailored to your organization's
            specific needs and challenges.
          </p>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-veritas-blue/10 flex items-center justify-center text-veritas-blue font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground body-text">{step.description}</p>

                  <div className="mt-4 grid gap-2">
                    {step.icons.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <item.icon className="h-5 w-5 text-veritas-blue flex-shrink-0 mt-0.5" />
                        <span className="body-text">{item.text}</span>
                      </div>
                    ))}
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

