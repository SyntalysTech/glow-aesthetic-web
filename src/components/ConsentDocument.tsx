'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, AlertCircle, Download } from 'lucide-react';

const blush = '#D6B7B4';
const charcoal = '#2D2D2D';

interface ConsentDocumentProps {
  userName: string;
  services: string[];
  onSign: (signature: string) => void;
  onCancel: () => void;
}

export default function ConsentDocument({ userName, services, onSign, onCancel }: ConsentDocumentProps) {
  const [signature, setSignature] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = charcoal;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const handleSign = () => {
    if (!signature || !agreedToTerms) return;
    onSign(signature);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        {/* PDF Header */}
        <div className="p-8 border-b-2" style={{ borderColor: blush }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${blush}33` }}>
                <FileText size={24} style={{ color: blush }} />
              </div>
              <div>
                <h2 className="text-2xl font-light" style={{ color: charcoal }}>
                  Einverständniserklärung & Gesundheitsfragebogen
                </h2>
                <p className="text-sm" style={{ color: `${charcoal}66` }}>
                  Glow Aesthetics - Professionelle Schönheitsbehandlungen
                </p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg transition-colors"
              style={{ color: blush }}
              title="Dokument drucken"
            >
              <Download size={20} />
            </button>
          </div>
          <div className="text-sm" style={{ color: `${charcoal}80` }}>
            <p>Datum: {new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Kunde: {userName}</p>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-8 space-y-6">
          {/* Services */}
          <section>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2" style={{ color: charcoal }}>
              <Check size={20} style={{ color: blush }} />
              Gebuchte Behandlungen
            </h3>
            <ul className="list-disc list-inside space-y-1" style={{ color: `${charcoal}80` }}>
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </section>

          {/* Health Information */}
          <section>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2" style={{ color: charcoal }}>
              <AlertCircle size={20} style={{ color: blush }} />
              Wichtige Gesundheitsinformationen
            </h3>
            <div className="space-y-4 text-sm" style={{ color: `${charcoal}80` }}>
              <p className="leading-relaxed">
                Bitte informieren Sie uns über folgende Zustände, falls zutreffend:
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  'Schwangerschaft oder Stillzeit',
                  'Allergien (insbesondere gegen Kosmetikprodukte)',
                  'Hauterkrankungen (Ekzeme, Psoriasis, Dermatitis)',
                  'Akute Infektionen oder Entzündungen',
                  'Diabetes mellitus',
                  'Blutgerinnungsstörungen',
                  'Autoimmunerkrankungen',
                  'Einnahme blutverdünnender Medikamente',
                  'Keloid-Neigung (übermäßige Narbenbildung)',
                  'Herpes-Infektionen im Behandlungsbereich',
                  'Kürzliche kosmetische Behandlungen',
                  'Einnahme von Akne-Medikamenten (z.B. Isotretinoin)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span style={{ color: blush }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contraindications */}
          <section className="p-4 rounded-xl" style={{ backgroundColor: `${blush}0d` }}>
            <h3 className="text-lg font-medium mb-3" style={{ color: charcoal }}>
              Kontraindikationen
            </h3>
            <div className="space-y-2 text-sm" style={{ color: `${charcoal}80` }}>
              <p>
                <strong>Für Wimpernverlängerungen:</strong> Bindehautentzündung, Augeninfektionen, sehr empfindliche Augen,
                Allergien gegen Wimpernkleber-Bestandteile.
              </p>
              <p>
                <strong>Für Gesichtsbehandlungen:</strong> Aktive Akne, offene Wunden, Sonnenbrand, kürzliche Laserbehandlungen
                (innerhalb von 2 Wochen), Einnahme von Retinoiden.
              </p>
              <p>
                <strong>Für Microneedling:</strong> Aktive Infektionen, Keloid-Neigung, Blutverdünner, Schwangerschaft.
              </p>
            </div>
          </section>

          {/* Post-Treatment Care */}
          <section>
            <h3 className="text-lg font-medium mb-3" style={{ color: charcoal }}>
              Nachbehandlungspflege
            </h3>
            <div className="space-y-3 text-sm" style={{ color: `${charcoal}80` }}>
              <p>
                <strong className="text-black">Wimpernverlängerung:</strong> 24 Stunden kein Wasser, keine Mascara,
                keine ölhaltigen Produkte, sanfte Reinigung, nicht reiben.
              </p>
              <p>
                <strong className="text-black">Gesichtsbehandlungen:</strong> 24 Stunden keine direkte Sonneneinstrahlung,
                täglicher Sonnenschutz SPF 30+, milde Reinigungsprodukte verwenden.
              </p>
              <p>
                <strong className="text-black">Microneedling:</strong> 48 Stunden keine Kosmetikprodukte, mindestens 1 Woche
                Sonnenschutz SPF 50+, keine Saunagänge für 1 Woche.
              </p>
            </div>
          </section>

          {/* Consent Statement */}
          <section className="p-6 rounded-xl border-2" style={{ borderColor: blush, backgroundColor: 'white' }}>
            <h3 className="text-lg font-medium mb-4" style={{ color: charcoal }}>
              Einverständniserklärung
            </h3>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: `${charcoal}80` }}>
              <p>
                Hiermit bestätige ich, dass ich über die oben genannten Behandlungen vollständig aufgeklärt wurde.
                Ich habe die Möglichkeit erhalten, Fragen zu stellen, und alle meine Fragen wurden zufriedenstellend beantwortet.
              </p>
              <p>
                Ich erkläre, dass ich alle gesundheitsrelevanten Informationen wahrheitsgemäß angegeben habe und
                verstehe, dass das Verschweigen von Informationen zu Komplikationen führen kann.
              </p>
              <p>
                Ich verstehe, dass trotz größter Sorgfalt Nebenwirkungen auftreten können (z.B. Rötungen, Schwellungen,
                allergische Reaktionen) und verpflichte mich, bei unerwarteten Reaktionen sofort das Studio zu kontaktieren.
              </p>
              <p>
                Ich bin damit einverstanden, dass Fotos meiner Behandlungsergebnisse zu Dokumentationszwecken gemacht werden können.
                Eine Verwendung für Marketing erfolgt nur mit meiner ausdrücklichen schriftlichen Zustimmung.
              </p>
              <p>
                Ich habe die Nachbehandlungshinweise zur Kenntnis genommen und verpflichte mich, diese einzuhalten.
              </p>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-3 mt-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
                style={{ accentColor: blush }}
              />
              <span className="text-sm" style={{ color: charcoal }}>
                Ich habe diese Einverständniserklärung gelesen und verstanden. Ich stimme allen oben genannten Bedingungen zu
                und erteile meine ausdrückliche Einwilligung für die gebuchten Behandlungen.
              </span>
            </label>
          </section>

          {/* Signature */}
          <section>
            <h3 className="text-lg font-medium mb-3" style={{ color: charcoal }}>
              Unterschrift
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  className="w-full border-2 rounded-xl cursor-crosshair"
                  style={{ borderColor: blush, backgroundColor: '#fafafa', touchAction: 'none' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!signature && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ color: `${charcoal}33` }}
                  >
                    Bitte hier unterschreiben
                  </div>
                )}
              </div>
              <button
                onClick={clearSignature}
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: blush, backgroundColor: `${blush}0d` }}
              >
                Unterschrift löschen
              </button>
            </div>
          </section>

          {/* Footer */}
          <div className="text-xs text-center pt-6 border-t" style={{ color: `${charcoal}66`, borderColor: `${charcoal}1a` }}>
            <p>Glow Aesthetics • Seestrasse 2, 8810 Horgen • +41 76 609 24 20</p>
            <p className="mt-1">www.glow-aesthetics.ch • info@glow-aesthetics.ch</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: `${charcoal}1a` }}>
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-full font-medium transition-colors"
            style={{ color: charcoal, backgroundColor: '#f5f5f5' }}
          >
            Abbrechen
          </button>
          <button
            onClick={handleSign}
            disabled={!signature || !agreedToTerms}
            className="flex-1 py-3 rounded-full font-medium text-white transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: signature && agreedToTerms ? blush : '#ccc',
              cursor: signature && agreedToTerms ? 'pointer' : 'not-allowed',
              opacity: signature && agreedToTerms ? 1 : 0.5,
            }}
          >
            <Check size={20} />
            Unterschreiben & Fortfahren
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
