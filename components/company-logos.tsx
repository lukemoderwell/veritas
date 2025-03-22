import type { FC } from "react"

interface CompanyLogoProps {
  name: string
  className?: string
}

export const MeffordLogo: FC<CompanyLogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`${className} bg-veritas-blue/10 rounded-md flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-veritas-blue">
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fontFamily="Helvetica"
          fill="currentColor"
        >
          MC
        </text>
      </svg>
    </div>
  )
}

export const BlueDeltaLogo: FC<CompanyLogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`${className} bg-veritas-blue/10 rounded-md flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-veritas-blue">
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fontFamily="Helvetica"
          fill="currentColor"
        >
          BDJ
        </text>
      </svg>
    </div>
  )
}

export const TechSolutionsLogo: FC<CompanyLogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`${className} bg-veritas-blue/10 rounded-md flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-veritas-blue">
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fontFamily="Helvetica"
          fill="currentColor"
        >
          TS
        </text>
      </svg>
    </div>
  )
}

export const HeritageManufacturingLogo: FC<CompanyLogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`${className} bg-veritas-blue/10 rounded-md flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-veritas-blue">
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fontWeight="bold"
          fontFamily="Helvetica"
          fill="currentColor"
        >
          HM
        </text>
      </svg>
    </div>
  )
}

