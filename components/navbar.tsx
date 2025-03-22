"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MobileMenu } from "./mobile-menu"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyEmbed } from "./calendly-embed"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  return (
    <header className="z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/veritas-color-EDIAUTdNT8qZbecwkpBg5KVu5kaSVL.png"
              alt="Veritas Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#our-method" className="text-sm font-medium transition-colors hover:text-primary ui-text">
              Our Method
            </Link>
            <Link href="#case-studies" className="text-sm font-medium transition-colors hover:text-primary ui-text">
              Case Studies
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary ui-text">
              Testimonials
            </Link>
            <Link href="#next-steps" className="text-sm font-medium transition-colors hover:text-primary ui-text">
              Next Steps
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex">Book a Consultation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0">
              <CalendlyEmbed />
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

