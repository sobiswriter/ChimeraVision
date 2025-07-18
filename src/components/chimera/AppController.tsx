"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatWindow from "./ChatWindow";
import { LauncherIcon } from "./LauncherIcon";

export default function AppController() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.75);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isChatOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.1, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.1, y: 50, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-0 right-0"
            style={{ transformOrigin: 'bottom right' }}
          >
            <ChatWindow 
              onClose={() => setChatOpen(false)} 
              opacity={backgroundOpacity}
              onOpacityChange={setBackgroundOpacity}
            />
          </motion.div>
        ) : (
          <motion.div
            key="launcher-icon"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LauncherIcon onOpen={() => setChatOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
