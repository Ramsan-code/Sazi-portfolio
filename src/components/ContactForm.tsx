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
        className: "font-mono font-bold bg-mint text-obsidian border-4 border-obsidian rounded-none",
      });
      form.reset();
    } catch (error) {
      toast.error("TRANSMISSION FAILED. TRY DIRECT CHANNEL.", {
        className: "font-mono font-bold bg-red-500 text-white border-4 border-obsidian rounded-none",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="contact" className="w-full bg-mint text-obsidian py-24 px-4 sm:px-8 md:px-16 lg:px-24 border-t-8 border-obsidian relative z-40">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1 space-y-6">
          <h2 className="font-heading font-black text-6xl uppercase shadow-none">
            Let's <br/> Collaborate
          </h2>
          <p className="font-mono text-lg font-bold">
            Ready to shatter expectations and build something extraordinary? Drop your details below.
          </p>
        </div>
        
        <div className="flex-1 bg-white p-8 border-8 border-obsidian shadow-[12px_12px_0px_#0b0b0b]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono font-bold uppercase text-obsidian">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ALICE WONDERLAND" 
                        className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono focus-visible:ring-0 focus-visible:border-peri p-6 transition-colors duration-150" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="font-mono font-bold text-red-600 animate-bounce" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono font-bold uppercase text-obsidian">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="ALICE@RAD-STARTUP.COM" 
                        className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono focus-visible:ring-0 focus-visible:border-peri p-6 transition-colors duration-150" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="font-mono font-bold text-red-600 animate-bounce" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono font-bold uppercase text-obsidian">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="TELL ME ABOUT YOUR BRUTAL PROJECT..." 
                        className="rounded-none border-4 border-obsidian bg-zinc-50 font-mono min-h-[120px] focus-visible:ring-0 focus-visible:border-peri p-4 transition-colors duration-150" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="font-mono font-bold text-red-600 animate-bounce" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-none bg-obsidian text-white hover:bg-peri hover:text-obsidian font-mono font-bold text-xl uppercase py-8 border-4 border-obsidian transition-all duration-150 shadow-[6px_6px_0px_#8f94fb] hover:shadow-[8px_8px_0px_#0b0b0b] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-peri disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> SENDING...
                  </span>
                ) : (
                  "Submit Mission"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
