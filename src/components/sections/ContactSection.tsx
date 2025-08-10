import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import Button from '../ui/Button';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-coral-100 dark:bg-coral-900/30 rounded-full">
              <Mail className="h-8 w-8 text-coral-600" />
            </div>
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="font-inter text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about Ishaara AI? Want to collaborate or provide feedback? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/70 dark:bg-dark-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-dark-600/30">
            <h3 className="font-poppins font-bold text-2xl text-gray-900 dark:text-gray-100 mb-6">
              Send us a Message
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-teal-600" />
                </div>
                <h4 className="font-poppins font-semibold text-xl text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h4>
                <p className="font-inter text-gray-600 dark:text-gray-300">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-inter font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-inter font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-inter font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/70 dark:bg-dark-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-dark-600/30">
              <h3 className="font-poppins font-bold text-2xl text-gray-900 dark:text-gray-100 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h4>
                    <p className="font-inter text-gray-600 dark:text-gray-300">hello@ishaara-ai.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100 mb-1">Location</h4>
                    <p className="font-inter text-gray-600 dark:text-gray-300">
                      Remote-first team<br />
                      Serving globally
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-coral-100 dark:bg-coral-900/30 rounded-lg">
                    <Phone className="h-6 w-6 text-coral-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-gray-900 dark:text-gray-100 mb-1">Support</h4>
                    <p className="font-inter text-gray-600 dark:text-gray-300">24/7 Online Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/70 dark:bg-dark-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-dark-600/30">
              <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-gray-100 mb-6">
                Follow Us
              </h3>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all duration-200 group text-gray-700 dark:text-gray-200"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 transition-all duration-200 group text-gray-700 dark:text-gray-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-coral-100 dark:hover:bg-coral-900/30 hover:text-coral-600 transition-all duration-200 group text-gray-700 dark:text-gray-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <p className="font-inter text-sm text-gray-500 dark:text-gray-300 mt-4">
                Join our community and stay updated with the latest developments in AI-powered accessibility technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;