import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="w-full bg-obsidian min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-16 text-white text-center">
        <h1 className="font-heading font-black text-6xl md:text-8xl uppercase mb-6 relative">
          Start The <span className="text-mint inline-block relative -z-10 before:content-[''] before:absolute before:-inset-2 before:bg-white before:-z-10 before:translate-x-2 before:translate-y-2 text-obsidian px-2">Mission.</span>
        </h1>
        <p className="font-mono text-lg text-gray-300 max-w-2xl mx-auto">
          Currently taking on select projects for Q4 2026. Whether it's a completely new digital identity or an architectural UI rebuild, leave your transmission below or reach out directly.
        </p>

        <div className="flex justify-center gap-8 mt-12 font-mono text-sm uppercase font-bold text-peri">
          <a href="mailto:hello@sazibalasingam.com" className="hover:text-mint transition-colors">hello@sazibalasingam.com</a>
          <span>•</span>
          <span>Los Angeles, CA</span>
          <span>•</span>
          <a href="tel:+15551234567" className="hover:text-mint transition-colors">+1 (555) 123-4567</a>
        </div>
      </div>

      {/* Integrate the specialized Neo-Brutalist Form */}
      <ContactForm />
    </div>
  );
}
