"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["innovative", "responsive", "scalable", "modern", "custom"],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              View Our Process <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-foreground">We build website that</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Transforming your digital vision into reality. At NehanDev, we
              create beautiful, high-performance websites and applications
              tailored to your business needs and goals.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Link href="#contact">
              <Button className="gap-4" variant="outline">
                Schedule a Consultation <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#projects">
              <Button variant="default" className="gap-4">
                View Our Work <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
