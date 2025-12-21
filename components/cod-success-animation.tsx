"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Package, Truck } from "lucide-react"

interface CODSuccessAnimationProps {
  isVisible: boolean
  onComplete: () => void
  itemName: string
}

export function CODSuccessAnimation({ isVisible, onComplete, itemName }: CODSuccessAnimationProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setStage(0)
      return
    }

    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => onComplete(), 3000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600"
        >
          <div className="text-center px-6">
            {/* Animated Check Circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="mx-auto mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full bg-white/30 blur-xl"
                  style={{ width: 160, height: 160, margin: "auto" }}
                />
                <div className="relative w-40 h-40 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="w-24 h-24 text-white" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Order Confirmed Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg text-white/90 mb-8 max-w-md mx-auto"
            >
              Your order for <span className="font-semibold">{itemName}</span> has been placed successfully
            </motion.p>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.div
                animate={{ scale: stage >= 1 ? 1.1 : 1 }}
                className={`flex flex-col items-center transition-colors ${stage >= 1 ? "text-white" : "text-white/50"}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${stage >= 1 ? "bg-white/30" : "bg-white/10"}`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs">Confirmed</span>
              </motion.div>

              <div className={`w-8 h-0.5 transition-colors ${stage >= 2 ? "bg-white" : "bg-white/30"}`} />

              <motion.div
                animate={{ scale: stage >= 2 ? 1.1 : 1 }}
                className={`flex flex-col items-center transition-colors ${stage >= 2 ? "text-white" : "text-white/50"}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${stage >= 2 ? "bg-white/30" : "bg-white/10"}`}
                >
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-xs">Preparing</span>
              </motion.div>

              <div className={`w-8 h-0.5 transition-colors ${stage >= 3 ? "bg-white" : "bg-white/30"}`} />

              <motion.div
                animate={{ scale: stage >= 3 ? 1.1 : 1 }}
                className={`flex flex-col items-center transition-colors ${stage >= 3 ? "text-white" : "text-white/50"}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${stage >= 3 ? "bg-white/30" : "bg-white/10"}`}
                >
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs">On the way</span>
              </motion.div>
            </motion.div>

            {/* Payment Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Cash on Delivery
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
