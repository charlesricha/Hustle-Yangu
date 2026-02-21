"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black font-sans relative overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter text-white">HUSTLE YANGU<span className="text-blue-500">.</span></div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/login">
              <button className=" bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors py-2 px-4">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-60 lg:pb-40 h-full">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-8 text-white leading-[0.9]">
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">EMPIRE.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              The ultimate Kenyan business simulator. Master the market, analyze real-time data, and dominate the streets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto  bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 py-2 px-4">
                  Start Hustling
                </button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-colors py-2 px-4">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Analytics",
                desc: "Precision data on every county. Spot trends before they happen.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              },
              {
                title: "Market Intelligence",
                desc: "AI-driven insights to guide your investment decisions in any sector.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Risk Assessment",
                desc: "Detailed breakdowns of potential pitfalls and regulatory challenges.",
                icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-colors"
              >
                <svg className="w-10 h-10 mb-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-600 text-sm font-medium tracking-wide uppercase">&copy; {new Date().getFullYear()} Hustle Yangu. Built for the Buildathon.</p>
      </footer>

    </main>
  );
}
