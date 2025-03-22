"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyEmbed } from "./calendly-embed"
import { useState } from "react"

export function NextSteps() {
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  return (
    <div id="book-consultation" className="bg-veritas-blue/10 py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Next Steps</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto body-text">
            Book a Knowledge Transfer Consultation to discover how we can help your organization preserve and leverage
            its intellectual capital.
          </p>

          <Card className="max-w-2xl mx-auto border-veritas-blue/20">
            <CardHeader>
              <CardTitle>Knowledge Transfer Consultation</CardTitle>
              <CardDescription className="ui-text">
                In this 90-minute session, we will discern if and how your employee's knowledge can be captured and made
                useful to other members of your team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-veritas-blue" />
                <span className="body-text">90 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-veritas-blue" />
                <span className="body-text">Flexible scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-veritas-blue" />
                <span className="body-text">Up to 3 key stakeholders from your team</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground body-text">
                After this call, you will have a plan of activities for how to capture and share knowledge over the next
                three months.
              </p>
            </CardContent>
            <CardFooter>
              <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-veritas-blue hover:bg-veritas-blue/90" size="lg">
                    Book Your Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0">
                  <CalendlyEmbed />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

