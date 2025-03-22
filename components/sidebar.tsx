"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyEmbed } from "./calendly-embed"

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <aside className="hidden lg:block sticky top-0 h-[calc(100vh-5rem)] w-64 border-r p-6 overflow-y-auto">
      <nav className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#our-method"
                className={cn(
                  "block text-sm transition-colors hover:text-veritas-blue ui-text",
                  activeSection === "our-method" ? "text-veritas-blue font-medium" : "text-muted-foreground",
                )}
              >
                Our Method
              </Link>
            </li>
            <li>
              <Link
                href="#case-studies"
                className={cn(
                  "block text-sm transition-colors hover:text-veritas-blue ui-text",
                  activeSection === "case-studies" ? "text-veritas-blue font-medium" : "text-muted-foreground",
                )}
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                className={cn(
                  "block text-sm transition-colors hover:text-veritas-blue ui-text",
                  activeSection === "testimonials" ? "text-veritas-blue font-medium" : "text-muted-foreground",
                )}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="#next-steps"
                className={cn(
                  "block text-sm transition-colors hover:text-veritas-blue ui-text",
                  activeSection === "next-steps" ? "text-veritas-blue font-medium" : "text-muted-foreground",
                )}
              >
                Next Steps
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="space-y-2">
            <li>
              <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
                <DialogTrigger asChild>
                  <button className="block text-sm text-veritas-blue font-medium transition-colors hover:text-veritas-blue/80 ui-text">
                    Book a Consultation
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0">
                  <CalendlyEmbed />
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

