"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Facebook, X } from "lucide-react";

const Behance = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.892 5.093 5.466h-7.854c.168 2.012 1.83 2.502 3.197 2.502 1.541 0 2.227-.788 2.58-1.573h2.183zM15.485 11.233c-.092-1.391-1.284-2.126-2.336-2.126-1.077 0-2.18.777-2.336 2.126h4.672zM10.926 22H0V2h10.926c4.542 0 5.422 3.125 5.422 5.045 0 2.224-1.385 3.327-2.617 3.824 1.488.423 3.111 1.637 3.111 4.54 0 1.956-.917 6.591-5.916 6.591zM3.469 10.37h3.766c1.196 0 2.156-.516 2.156-2.176 0-1.847-1.168-2.074-2.223-2.074H3.469v4.25zm0 8.043h4.316c1.558 0 2.651-.628 2.651-2.585 0-1.956-1.085-2.501-2.673-2.501H3.469v5.086z" />
  </svg>
);

const Flickr = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.545 18.068C2.934 18.068 0 15.134 0 11.523s2.934-6.545 6.545-6.545 6.545 2.933 6.545 6.545-2.933 6.545-6.545 6.545zm10.91 0c-3.611 0-6.545-2.934-6.545-6.545s2.934-6.545 6.545-6.545S24 7.912 24 11.523s-2.934 6.545-6.545 6.545z" />
  </svg>
);

const Threads = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>
  </svg>
);

const Adobe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.1 0H24v24L15.1 0z M8.9 0H0v24L8.9 0z M12 7.4L17.6 24h-3.8l-1.6-4.6H8.6L12 7.4z" />
  </svg>
);

const SOCIALS = [
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "group-hover:text-[#0a66c2]" },
  { name: "X", icon: X, href: "#", color: "group-hover:text-[#000000]" },
  { name: "Instagram", icon: Instagram, href: "#", color: "group-hover:text-[#E1306C]" },
  { name: "Facebook", icon: Facebook, href: "#", color: "group-hover:text-[#1877F2]" },
  { name: "Behance", icon: Behance, href: "#", color: "group-hover:text-[#1769ff]" },
  { name: "Flickr", icon: Flickr, href: "#", color: "group-hover:text-[#ff0084]" },
  { name: "Threads", icon: Threads, href: "#", color: "group-hover:text-[#000000]" },
  { name: "Adobe", icon: Adobe, href: "#", color: "group-hover:text-[#FF0000]" },
];

export function SocialSection() {
  return (
    <section className="w-full bg-white py-24 text-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-12">
          Find Me <span className="text-peri">On</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SOCIALS.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5 }}
                className={`flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all group shadow-sm`}
              >
                <Icon className={`w-12 h-12 mb-4 text-gray-500 transition-colors duration-300 ${social.color}`} />
                <span className="font-mono text-sm uppercase tracking-widest text-gray-600 group-hover:text-black transition-colors duration-300">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
