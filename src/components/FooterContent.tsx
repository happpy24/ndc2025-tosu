import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FooterContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
