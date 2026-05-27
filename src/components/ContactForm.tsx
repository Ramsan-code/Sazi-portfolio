"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Must be a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("MISSION RECEIVED. STAND BY FOR TRANSMISSION.", {
        className:
          "font-mono font-bold bg-mint text-obsidian border-4 border-obsidian rounded-none",
      });
      form.reset();
    } catch {
      toast.error("TRANSMISSION FAILED. TRY DIRECT CHANNEL.", {
        className:
          "font-mono font-bold bg-red-500 text-white border-4 border-obsidian rounded-none",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      id="contact"
      className="w-full bg-mint text-obsidian border-t-8 border-obsidian relative z-40"
    >
      {/* 
        Two-zone layout:
        - Mobile/tablet (<lg): stacked, full-width, padded
        - Desktop (≥lg): side-by-side grid with explicit column sizes
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 xl:px-16 py-12 sm:py-16 xl:py-24 overflow-hidden">
        <div className="flex flex-col xl:grid xl:grid-cols-[1fr_500px] gap-10 xl:gap-16 items-start">

          {/* Left: heading + subtitle */}
          <div className="w-full min-w-0 space-y-4 sm:space-y-6">
            <h2 className="font-heading font-black text-2xl sm:text-5xl uppercase leading-none tracking-normal">
              <span className="block">Let&apos;s</span>
              <span className="block whitespace-nowrap">Collaborate</span>
            </h2>
            <p className="font-mono text-sm sm:text-lg font-bold max-w-sm leading-relaxed">
              Ready for a sharper brand identity, campaign visual, or digital
              design system? Send the brief and I will map the next move.
            </p>
          </div>

          {/* Right: form card — fixed width on desktop, full width on mobile */}
          <div className="w-full min-w-0 bg-white p-4 sm:p-8 border-4 sm:border-8 border-obsidian shadow-[4px_4px_0px_#0b0b0b] sm:shadow-[8px_8px_0px_#0b0b0b]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-0 space-y-5 sm:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono font-bold uppercase text-obsidian text-sm sm:text-base">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ALICE WONDERLAND"
                          className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono focus-visible:ring-0 focus-visible:border-peri p-3 sm:p-6 text-xs sm:text-base transition-colors duration-150"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-mono font-bold text-red-600 animate-bounce text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono font-bold uppercase text-obsidian text-sm sm:text-base">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ALICE@RAD-STARTUP.COM"
                          className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono focus-visible:ring-0 focus-visible:border-peri p-3 sm:p-6 text-xs sm:text-base transition-colors duration-150"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-mono font-bold text-red-600 animate-bounce text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono font-bold uppercase text-obsidian text-sm sm:text-base">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="TELL ME ABOUT YOUR BRAND, LOGO, POSTER, OR UI/UX PROJECT..."
                          className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono min-h-[100px] sm:min-h-[120px] focus-visible:ring-0 focus-visible:border-peri p-3 sm:p-4 text-xs sm:text-base transition-colors duration-150"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-mono font-bold text-red-600 animate-bounce text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-none bg-obsidian text-white hover:bg-peri hover:text-obsidian font-mono font-bold text-sm sm:text-xl uppercase py-6 sm:py-8 border-4 border-obsidian transition-all duration-150 shadow-[4px_4px_0px_#8f94fb] sm:shadow-[6px_6px_0px_#8f94fb] hover:shadow-[6px_6px_0px_#0b0b0b] sm:hover:shadow-[8px_8px_0px_#0b0b0b] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-peri disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" /> SENDING...
                    </span>
                  ) : (
                    "Request Design Quote"
                  )}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}
