"use client"

import { useEffect } from "react"

export function CalendlyEmbed() {
  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)
    }

    // No cleanup - we'll let the script persist since Calendly might need it
  }, [])

  return (
    <div className="calendly-embed-container">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/njebb-veritasprofessionalservices/risk-audit?embed_domain=veritasprofessionalservices.com&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&back=1&month=2025-03"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  )
}

