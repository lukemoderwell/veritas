"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyEmbed } from "./calendly-embed"
import { useState } from "react"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/veritas-color-EDIAUTdNT8qZbecwkpBg5KVu5kaSVL.png"
              alt="Veritas Logo"
              width={120}
              height={35}
              className="h-8 w-auto"
            />
          </SheetTitle>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          <Link
            href="#our-method"
            className="text-lg font-medium transition-colors hover:text-primary ui-text"
            onClick={onClose}
          >
            Our Method
          </Link>
          <Link
            href="#case-studies"
            className="text-lg font-medium transition-colors hover:text-primary ui-text"
            onClick={onClose}
          >
            Case Studies
          </Link>
          <Link
            href="#testimonials"
            className="text-lg font-medium transition-colors hover:text-primary ui-text"
            onClick={onClose}
          >
            Testimonials
          </Link>
          <Link
            href="#next-steps"
            className="text-lg font-medium transition-colors hover:text-primary ui-text"
            onClick={onClose}
          >
            Next Steps
          </Link>
          <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4" onClick={onClose}>
                Book a Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0">
              <CalendlyEmbed />
            </DialogContent>
          </Dialog>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

