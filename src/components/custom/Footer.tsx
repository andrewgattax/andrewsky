import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const navbar = document.querySelector('nav')
      const navbarHeight = navbar ? navbar.offsetHeight : 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="relative overflow-hidden py-16 px-6 border-t border-primary/20">

    </footer>
  )
}

