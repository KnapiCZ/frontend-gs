//! Zde budou funkce ktere se pouzivaji na vice mistech pozdeji se to muze rozdelit na vic souboru podle slozitosti
import "@/theme/main.css"

const sport_colors = ["--powerlifting", "--calisthenics", "--strongmen", "--bodybuilding", "--crossfit", "--fighting"]

//
// Nastaveni barev pro division
//
export const getCssVariable = (variable: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

export const setCssVariable = (variable: string, value: string): void => {
    document.documentElement.style.setProperty(variable, value)
}

export const updateDivisionColor = (sport: string): void => {
    const color = getCssVariable(`--${sport}`) || "#FFD700" // Fallback barva
    setCssVariable("--division-color", color)
}
