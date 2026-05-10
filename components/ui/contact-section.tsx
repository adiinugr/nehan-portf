"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Instagram, Youtube, Send, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const ct = t.contact

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    if (submitStatus) setSubmitStatus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error")
      setErrorMessage(ct.error)
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
        setErrorMessage(data.message || ct.error)
      }
    } catch {
      setSubmitStatus("error")
      setErrorMessage(ct.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            {ct.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {ct.title}
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg">
            {ct.subtitle}
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
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
              <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">{ct.responseTime}</span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-5">{ct.info.title}</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{ct.info.email}</p>
                    <p className="text-sm font-medium text-foreground">contact@nehandev.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{ct.info.instagram}</p>
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
                    <p className="text-xs text-muted-foreground mb-0.5">{ct.info.youtube}</p>
                    <a
                      href="https://youtube.com/@nehandev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      @nehandev
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
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-8"
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{ct.success.title}</h3>
                <p className="text-muted-foreground mb-6">{ct.success.desc}</p>
                <Button onClick={() => setSubmitStatus(null)} variant="outline">
                  {ct.success.again}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {ct.form.name} <span className="text-red-400">*</span>
                    </label>
                    <Input id="name" placeholder={ct.form.namePlaceholder} value={formData.name} onChange={handleChange} className="bg-background border-border focus:border-primary/60" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {ct.form.email} <span className="text-red-400">*</span>
                    </label>
                    <Input id="email" type="email" placeholder={ct.form.emailPlaceholder} value={formData.email} onChange={handleChange} className="bg-background border-border focus:border-primary/60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    {ct.form.subject}
                  </label>
                  <Input id="subject" placeholder={ct.form.subjectPlaceholder} value={formData.subject} onChange={handleChange} className="bg-background border-border focus:border-primary/60" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {ct.form.message} <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder={ct.form.messagePlaceholder}
                    className="min-h-[140px] bg-background border-border focus:border-primary/60 resize-none"
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

                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {ct.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {ct.form.submit}
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
