import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, Send, Loader2 } from 'lucide-react';

// Form Field Component with Floating Label
function FormField({ label, type, name, required, value, onChange, isFocused, setIsFocused, isTextarea = false }) {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleFocus = () => setIsFocused(name);
  const handleBlur = () => setIsFocused('');

  return (
    <div className="relative mb-6">
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border bg-transparent text-[#F8FAFC] placeholder-transparent transition-all duration-300 resize-none ${isFocused === name ? 'border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(139,92,246,0.3)]'}`}
          style={{ fontSize: '16px' }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border bg-transparent text-[#F8FAFC] placeholder-transparent transition-all duration-300 ${isFocused === name ? 'border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(139,92,246,0.3)]'}`}
          style={{ fontSize: '16px' }}
        />
      )}
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused === name || isFilled ? 'text-xs text-[#8B5CF6] -top-2' : 'text-sm text-[#94A3B8] top-3'}`}
        style={{ 
          backgroundColor: isFocused === name || isFilled ? '#050505' : 'transparent',
          padding: isFocused === name || isFilled ? '0 4px' : '0'
        }}
      >
        {label}
      </label>
    </div>
  );
}

// Toast Component
function Toast({ type, message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 px-4 sm:px-0"
          style={{
            bottom: '16px',
            right: '16px',
            left: '16px',
            sm: {
              left: 'auto',
              right: '32px',
              bottom: '32px'
            }
          }}
        >
          <div
            className={`px-6 py-4 rounded-xl border ${
              type === 'success'
                ? 'bg-[rgba(34,197,94,0.15)] border-[rgba(34,197,94,0.4)] text-[#4ADE80]'
                : 'bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.4)] text-[#F87171]'
            }`}
            style={{ fontSize: '15px' }}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Contact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isFocused, setIsFocused] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for form
      formRef.current.style.animation = 'shake 0.5s';
      setTimeout(() => {
        formRef.current.style.animation = '';
      }, 500);
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing');
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setIsSuccess(true);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('EmailJS error:', error);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: 'summaraashraf99@gmail.com',
      href: 'mailto:summaraashraf99@gmail.com',
      external: false
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Summara-AI',
      href: 'https://github.com/Summara-AI',
      external: true
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/summara-ashraf-ai',
      href: 'https://linkedin.com/in/summara-ashraf-ai',
      external: true
    }
  ];

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-[#050505] py-16 sm:py-20 lg:py-24"
      style={{
        background: 'radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.08) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p style={{
            color: '#8B5CF6',
            fontSize: '14px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Clash Display, sans-serif',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            // Contact
          </p>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-clash-display font-bold mb-4 sm:mb-6"
            style={{ 
              color: '#F8FAFC',
              fontFamily: 'Clash Display, sans-serif'
            }}
          >
            Get In Touch
          </h2>
          <div 
            className="w-16 sm:w-20 h-1 rounded-full mx-auto mb-6 sm:mb-8"
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
            }}
          />
          <p 
            className="text-[#94A3B8] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            style={{ lineHeight: '1.8' }}
          >
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* LEFT COLUMN - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              <FormField
                label="Your Name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
              {formErrors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#F87171] text-sm mt-1"
                >
                  {formErrors.name}
                </motion.p>
              )}

              <FormField
                label="Your Email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
              {formErrors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#F87171] text-sm mt-1"
                >
                  {formErrors.email}
                </motion.p>
              )}

              <FormField
                label="Your Message"
                type="text"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                isTextarea
              />
              {formErrors.message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#F87171] text-sm mt-1"
                >
                  {formErrors.message}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                style={{
                  background: isSubmitted 
                    ? 'linear-gradient(135deg, #22C55E, #16A34A)' 
                    : 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.4)',
                  minHeight: '44px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.target.style.boxShadow = '0 0 40px rgba(139,92,246,0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.target.style.boxShadow = '0 0 30px rgba(139,92,246,0.4)';
                  }
                }}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-6 sm:space-y-8">
              {contactCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.a
                    key={card.label}
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl border border-[rgba(139,92,246,0.15)] hover:border-[rgba(139,92,246,0.4)] hover:bg-[rgba(139,92,246,0.05)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + index * 0.15 
                    }}
                  >
                    <Icon size={20} className="sm:size-24" className="text-[#8B5CF6]" />
                    <div>
                      <div className="text-[#94A3B8] text-xs uppercase tracking-[0.125em] mb-1">
                        {card.label}
                      </div>
                      <div className="text-[#F8FAFC] text-xs sm:text-sm">
                        {card.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* AVAILABILITY BADGE */}
            <motion.div 
              className="mt-4 sm:mt-6 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22C55E] rounded-full animate-pulse"
                style={{ boxShadow: '0 0 10px #22C55E' }}
              />
              <div>
                <div className="text-[#94A3B8] text-xs sm:text-sm">
                  Available for freelance projects
                </div>
                <div className="text-[rgba(148,163,184,0.5)] text-[10px] sm:text-xs">
                  Usually responds within 24 hours
                </div>
              </div>
            </motion.div>

            {/* RESPONSE TIME DECORATION */}
            <motion.div 
              className="flex gap-1 sm:gap-1.5 mt-3 sm:mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#8B5CF6]"
                  style={{ opacity: 0.4 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* TOAST NOTIFICATIONS */}
      <Toast 
        type="success" 
        message="✅ Message sent! I'll reply soon 🚀"
        isVisible={isSuccess}
      />
      <Toast 
        type="error" 
        message="❌ Something went wrong. Try emailing me directly."
        isVisible={isError}
      />
    </section>
  );
};

export default Contact;
