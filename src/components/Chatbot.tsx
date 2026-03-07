'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill, RiCloseLine } from 'react-icons/ri';

const WHATSAPP_NUMBER = '33760554000';
const WHATSAPP_MESSAGE = 'Bonjour, je souhaite en savoir plus sur vos services SEO local.';

export default function WhatsAppWidget() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  function handleClick() {
    setShowPulse(false);
    setTooltipDismissed(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      <AnimatePresence>
        {!tooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: 2 }}
            className="relative flex items-center gap-2 rounded-2xl border border-warm-200 bg-white px-4 py-3 shadow-elevated"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setTooltipDismissed(true); }}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-warm-200 text-warm-600 transition-colors hover:bg-warm-300"
            >
              <RiCloseLine className="h-3 w-3" />
            </button>
            <p className="text-sm font-medium text-warm-800">
              Une question ? Écrivez-nous !
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-colors hover:bg-[#1ebe5a]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Nous contacter sur WhatsApp"
      >
        <RiWhatsappFill className="h-7 w-7" />

        {showPulse && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
