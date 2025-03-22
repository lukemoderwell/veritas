"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyEmbed } from "./calendly-embed"

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  return (
    <div className="relative bg-veritas-beige/20">
      <div className="container px-4 py-20 md:py-32">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Employees retire. <br/>
              Their knowledge can keep working.
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] body-text">
              We listen closely to retiring employees and transfer what they know to your rising team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full sm:w-auto bg-veritas-blue hover:bg-veritas-blue/90">
                    Book a Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0">
                  <CalendlyEmbed />
                </DialogContent>
              </Dialog>
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-veritas-blue text-veritas-blue hover:bg-veritas-blue/10"
                  >
                    <Play className="mr-2 h-4 w-4" /> Learn About Veritas
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0">
                  <div className="aspect-video w-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground body-text">Video player would be embedded here</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden bg-veritas-blue/20 border border-veritas-blue/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="https://mail.google.com/mail/u/1?ui=2&ik=f6eadba476&attid=0.1&permmsgid=msg-f:1826493052188507100&th=195901c0f86a3bdc&view=fimg&fur=ip&permmsgid=msg-f:1826493052188507100&sz=s0-l75-ft&attbid=ANGjdJ9gMw76uCDRg-OrFs1NJL57Do8-jWjRsPRqaQOk795cxtemYlJqo7Fy1rg8yGjSk3KsRjMmXw9X-P8Fc6HefUazlcISyTO94YS5RRDU6-YsawYpJpSD45WunTE&disp=emb&realattid=ii_m87i2nea0&zw" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

