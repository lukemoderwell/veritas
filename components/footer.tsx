import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/veritas-color-EDIAUTdNT8qZbecwkpBg5KVu5kaSVL.png"
                alt="Veritas Logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground body-text">
              Helping companies transfer and retain knowledge from their workforce.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#our-method" className="text-muted-foreground hover:text-foreground transition-colors">
                  Knowledge Capture
                </Link>
              </li>
              <li>
                <Link href="#our-method" className="text-muted-foreground hover:text-foreground transition-colors">
                  Knowledge Organization
                </Link>
              </li>
              <li>
                <Link href="#our-method" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team Training
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@veritasconsulting.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@veritasconsulting.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="body-text">&copy; {new Date().getFullYear()} Veritas Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

