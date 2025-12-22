import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Users, Mail, Heart, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Code2 className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
            </motion.div>

            {/* Headline */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Connect with <span className="text-blue-400">Developers</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              The professional network built for developers. Find collaborators, share knowledge, and grow your career.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-gray-700 hover:border-blue-500 text-white font-semibold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Features
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why <span className="text-blue-400">devConnect</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build meaningful professional connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Find Your Tribe",
                description: "Connect with developers who share your interests, skills, and passion for technology.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Swipe through profiles and make connections in seconds. No endless scrolling.",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Your data is protected with industry-standard security. Connect with confidence.",
              },
              {
                icon: Heart,
                title: "Build Relationships",
                description: "Form genuine connections that lead to collaborations, mentorship, and friendships.",
              },
              {
                icon: Mail,
                title: "Real-time Chat",
                description: "Message your connections instantly. Stay in touch and collaborate seamlessly.",
              },
              {
                icon: Code2,
                title: "Developer-First",
                description: "Built by developers, for developers. We understand what you need.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-gray-600/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6 border border-blue-500/30">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Create Your Profile",
                description: "Sign up and showcase your skills, projects, and what you're looking for in connections.",
                icon: Code2,
              },
              {
                number: "02",
                title: "Discover Developers",
                description: "Browse through profiles of developers. Swipe right to connect, left to pass.",
                icon: Users,
              },
              {
                number: "03",
                title: "Start Collaborating",
                description: "Once matched, start chatting and building meaningful professional relationships.",
                icon: Mail,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-xl border border-blue-500/50">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-8 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-slate-700/50">
                    <step.icon className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats Section
      <section className="py-20 sm:py-32 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Join Our <span className="text-blue-400">Community</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Thousands of developers are already connecting and collaborating
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10K+", label: "Active Developers" },
              { number: "50K+", label: "Connections Made" },
              { number: "100+", label: "Countries" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-blue-400">Connect</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers building meaningful connections. Start your journey today.
            </p>

            <Link to="/login">
              <motion.button
                className="px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle className="w-6 h-6" />
                Get Started Now
              </motion.button>
            </Link>

            <p className="text-gray-500 mt-6 text-sm">
              No credit card required • Free to join • Start connecting in minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
