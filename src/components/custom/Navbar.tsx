import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible bg-gradient-to-b from-dbackground to-transparent navbar-blur-gradient">

    </nav >
  )
}

