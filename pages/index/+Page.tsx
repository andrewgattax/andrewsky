import { useTranslation } from "react-i18next";
import "@/i18n";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>LETSGO CI SIAMO</h1>
    </div>
  )
}

