"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Instagram,
  Youtube,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageCircle,
  Building2,
  MapPin
} from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_WHATSAPP_URL
} from "@/lib/business-info"

export function ContactSection() {
  const t = useTranslations("contact")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  )
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    if (submitStatus) setSubmitStatus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error")
      setErrorMessage(t("error"))
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.message || t("error"))
      }
    } catch {
      setSubmitStatus("error")
      setErrorMessage(t("error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mb-14">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">
            {t("label")}
          </span>
          <h2
            className="mt-3 uppercase leading-[0.9] text-foreground"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 7vw, 96px)"
            }}
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Response time badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
              <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {t("responseTime")}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-5">
                {t("info.title")}
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      {t("info.legalName")}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {BUSINESS_NAME}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      {t("info.address")}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {BUSINESS_ADDRESS}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      WhatsApp
                    </p>
                    <a
                      href={BUSINESS_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {BUSINESS_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      {t("info.email")}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {BUSINESS_EMAIL}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      {t("info.instagram")}
                    </p>
                    <a
                      href="https://instagram.com/nehandev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      @nehandev
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-0.5">
                      {t("info.youtube")}
                    </p>
                    <a
                      href="https://youtube.com/@ngodingnekat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      @ngodingnekat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl bg-muted/40 p-8"
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("success.title")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("success.desc")}</p>
                <Button onClick={() => setSubmitStatus(null)} variant="outline">
                  {t("success.again")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("form.name")} <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="name"
                      placeholder={t("form.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-muted/50 border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/40 text-base placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("form.email")} <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-muted/50 border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/40 text-base placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("form.subject")}
                  </label>
                  <Input
                    id="subject"
                    placeholder={t("form.subjectPlaceholder")}
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-muted/50 border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/40 text-base placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("form.message")} <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("form.messagePlaceholder")}
                    className="min-h-[140px] bg-muted/50 border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/40 resize-none text-base placeholder:text-muted-foreground/50"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("form.submit")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
