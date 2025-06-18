'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  className?: string
  duration?: number
}

export function AnimatedCounter({ value, className = '', duration = 0.5 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [previousValue, setPreviousValue] = useState(value)

  useEffect(() => {
    if (value !== displayValue) {
      setPreviousValue(displayValue)
      
      // Animate to new value
      const startTime = Date.now()
      const startValue = displayValue
      const difference = value - startValue
      
      const animateValue = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        
        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.round(startValue + difference * easedProgress)
        
        setDisplayValue(currentValue)
        
        if (progress < 1) {
          requestAnimationFrame(animateValue)
        }
      }
      
      requestAnimationFrame(animateValue)
    }
  }, [value, displayValue, duration])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <motion.span
      key={displayValue}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`font-bold tabular-nums ${className}`}
    >
      {formatNumber(displayValue)}
    </motion.span>
  )
}

// Enhanced version with digit-by-digit animation for more dramatic effect
export function EnhancedAnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  
  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const formattedValue = displayValue.toLocaleString()
  
  return (
    <div className={`inline-flex ${className}`}>
      <AnimatePresence mode="popLayout">
        {formattedValue.split('').map((digit, index) => (
          <motion.span
            key={`${index}-${digit}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              ease: 'easeOut'
            }}
            className="inline-block font-bold tabular-nums"
          >
            {digit}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}