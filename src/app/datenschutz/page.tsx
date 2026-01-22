'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

export default function DatenschutzPage() {
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
              Datenschutzerklärung
            </h1>

            <div className="prose prose-lg max-w-none" style={{ color: `${charcoal}b3` }}>
              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  1. Allgemeine Hinweise
                </h2>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  2. Verantwortliche Stelle
                </h2>
                <p>
                  Glow Aesthetics GmbH<br />
                  Seestrasse 2<br />
                  8810 Horgen<br />
                  Schweiz
                </p>
                <p className="mt-4">
                  Telefon: +41 76 609 24 20<br />
                  E-Mail: info@glow-aesthetics.ch
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  3. Datenerfassung auf dieser Website
                </h2>

                <h3 className="text-xl font-medium mb-3 mt-6" style={{ color: charcoal }}>
                  Cookies
                </h3>
                <p>
                  Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf
                  Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu,
                  unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                </p>
                <p className="mt-4">
                  Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies".
                  Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben
                  auf Ihrem Endgerät gespeichert bis Sie diese löschen.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6" style={{ color: charcoal }}>
                  Server-Log-Dateien
                </h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so
                  genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  4. Kontaktformular und Terminbuchung
                </h2>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder einen Termin buchen,
                  werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen
                  Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen
                  bei uns gespeichert.
                </p>
                <p className="mt-4">
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  5. Newsletter
                </h2>
                <p>
                  Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen
                  wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung
                  gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem
                  Empfang des Newsletters einverstanden sind.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  6. Ihre Rechte
                </h2>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
                  und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                  ausserdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
                <p className="mt-4">
                  Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese
                  Einwilligung jederzeit für die Zukunft widerrufen. Ausserdem haben Sie das Recht,
                  unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen
                  Daten zu verlangen.
                </p>
                <p className="mt-4">
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  7. Analyse-Tools und Werbung
                </h2>

                <h3 className="text-xl font-medium mb-3 mt-6" style={{ color: charcoal }}>
                  Google Analytics
                </h3>
                <p>
                  Diese Website kann Funktionen des Webanalysedienstes Google Analytics nutzen.
                  Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mt-4">
                  Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der
                  Websitebesucher zu analysieren.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  8. Plugins und Tools
                </h2>

                <h3 className="text-xl font-medium mb-3 mt-6" style={{ color: charcoal }}>
                  Google Fonts
                </h3>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte
                  Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite
                  lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und
                  Schriftarten korrekt anzuzeigen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4" style={{ color: charcoal }}>
                  9. Aktualität und Änderung dieser Datenschutzerklärung
                </h2>
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar 2025.
                </p>
                <p className="mt-4">
                  Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter
                  gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden,
                  diese Datenschutzerklärung zu ändern.
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
