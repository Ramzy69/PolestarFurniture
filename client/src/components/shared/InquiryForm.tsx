import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { insertInquirySchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Extend the inquiry schema with validation rules
const inquiryFormSchema = insertInquirySchema.extend({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  company: z.string().optional(),
  interest: z.string().min(1, { message: "Please select an area of interest." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

const InquiryForm = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      interest: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: InquiryFormValues) => {
      const res = await apiRequest("POST", "/api/inquiries", {
        ...data,
        createdAt: new Date().toISOString(),
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted",
        description: "We've received your inquiry and will get back to you soon.",
        variant: "default",
      });
      form.reset();
      setSubmitting(false);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    setSubmitting(true);
    inquiryMutation.mutate(data);
  };

  return (
    <section className="py-16 bg-neutral-200 dark:bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          <motion.div 
            className="w-full lg:w-1/2 bg-white dark:bg-primary-dark rounded-lg shadow-md p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold font-montserrat mb-6">Quick Inquiry</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat font-medium">Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat font-medium">I'm interested in</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="chairs">Office Chairs</SelectItem>
                          <SelectItem value="desks">Desks & Tables</SelectItem>
                          <SelectItem value="conference">Conference Solutions</SelectItem>
                          <SelectItem value="storage">Storage Units</SelectItem>
                          <SelectItem value="complete">Complete Office Setup</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4} 
                          className="border-neutral-300 dark:border-neutral-400 dark:bg-primary/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-bold font-montserrat mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold mb-1">Visit Our Showroom</h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-300">
                      123 Business Park, Industrial Area<br />Delhi NCR, India - 110001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold mb-1">Call Us</h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-300">
                      +91 98765 43210<br />+91 11 2345 6789
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold mb-1">Email Us</h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-300">
                      info@polestarfurniture.in<br />sales@polestarfurniture.in
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold mb-1">Business Hours</h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-300">
                      Monday - Saturday: 9:30 AM - 6:30 PM<br />Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md h-64 mt-6 bg-neutral-300 dark:bg-neutral-400/20 flex items-center justify-center">
              <p className="text-neutral-500 dark:text-neutral-400 font-montserrat">Google Maps Integration</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
