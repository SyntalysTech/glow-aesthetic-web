'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

export default function ImpressumPage() {
  return (
    <main>
      <Header />

      <section className="pt-32 pb-24" style={{ backgroundColor: cream }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-light mb-12" style={{ color: charcoal }}>
              Impressum
            </h1>

            <div className="prose prose-lg max-w-none" style={{ color: `${charcoal}b3` }}>
              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Kontaktadresse
                </h2>
                <p>
                  Glow Aesthetics GmbH<br />
                  Seestrasse 2<br />
                  8810 Horgen<br />
                  Schweiz
                </p>
                <p className="mt-4">
                  Telefon: <a href="tel:+41766092420" style={{ color: blush }}>+41 76 609 24 20</a><br />
                  E-Mail: <a href="mailto:info@glow-aesthetics.ch" style={{ color: blush }}>info@glow-aesthetics.ch</a>
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Vertretungsberechtigte Person
                </h2>
                <p>
                  Sofia Müller, Geschäftsführerin
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Handelsregistereintrag
                </h2>
                <p>
                  Eingetragener Firmenname: Glow Aesthetics GmbH<br />
                  Handelsregister: Handelsregisteramt des Kantons Zürich<br />
                  UID: CHE-XXX.XXX.XXX
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Mehrwertsteuernummer
                </h2>
                <p>
                  CHE-XXX.XXX.XXX MWST
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Haftungsausschluss
                </h2>
                <p>
                  Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit,
                  Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                </p>
                <p className="mt-4">
                  Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art,
                  welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten
                  Informationen, durch Missbrauch der Verbindung oder durch technische Störungen
                  entstanden sind, werden ausgeschlossen.
                </p>
                <p className="mt-4">
                  Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor,
                  Teile der Seiten oder das gesamte Angebot ohne besondere Ankündigung zu verändern,
                  zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Haftungsausschluss für Links
                </h2>
                <p>
                  Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs.
                  Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die
                  Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Urheberrechte
                </h2>
                <p>
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien
                  auf dieser Website gehören ausschliesslich Glow Aesthetics GmbH oder den speziell
                  genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche
                  Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  Quelle
                </h2>
                <p>
                  Dieses Impressum wurde mit dem Impressum-Generator von SwissAnwalt erstellt.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
