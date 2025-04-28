import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
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
import { MapPin, Phone, Mail, Clock, Smartphone, Building } from "lucide-react";

// Contact form schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Using the inquiry endpoint for contact form as well
      const res = await apiRequest("POST", "/api/inquiries", {
        ...data,
        interest: "general",  // set a default interest for contact form
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
      setSubmitting(false);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setSubmitting(true);
    contactMutation.mutate(data);
  };

  const contactInfo = [
    { 
      icon: <MapPin className="text-accent" size={24} />,
      title: "Headquarters", 
      details: ["123 Business Park, Industrial Area", "Delhi NCR, India - 110001"]
    },
    { 
      icon: <Phone className="text-accent" size={24} />,
      title: "Phone", 
      details: ["+91 98765 43210", "+91 11 2345 6789"]
    },
    { 
      icon: <Mail className="text-accent" size={24} />,
      title: "Email", 
      details: ["info@polestarfurniture.in", "sales@polestarfurniture.in"]
    },
    { 
      icon: <Clock className="text-accent" size={24} />,
      title: "Working Hours", 
      details: ["Monday - Saturday: 9:30 AM - 6:30 PM", "Sunday: Closed"]
    },
  ];
  
  return (
    <>
      <Helmet>
        <title>Contact Us | Polestar Furniture</title>
        <meta 
          name="description" 
          content="Get in touch with Polestar Furniture. Contact us for inquiries, support, or to visit our showroom." 
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-16 bg-neutral-100 dark:bg-primary relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">Get In Touch</h1>
            <p className="text-lg text-neutral-400 dark:text-neutral-300">
              Have questions or need assistance? Our team is here to help you create the perfect office environment.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information Section */}
      <section className="py-16 bg-white dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-neutral-100 dark:bg-primary-dark p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-neutral-400 dark:text-neutral-300">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-montserrat mb-6">Send Us a Message</h2>
              <p className="text-neutral-400 dark:text-neutral-300 mb-8">
                Fill out the form below, and our team will get back to you as soon as possible. We look forward to hearing from you.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-montserrat">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="John Doe"
                              className="border-neutral-300 dark:border-neutral-700"
                            />
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
                          <FormLabel className="font-montserrat">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="john@example.com"
                              className="border-neutral-300 dark:border-neutral-700"
                            />
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
                          <FormLabel className="font-montserrat">Phone Number</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 border border-r-0 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-400 rounded-l-md">
                                <Smartphone size={16} />
                              </span>
                              <Input 
                                {...field} 
                                type="tel" 
                                placeholder="+91 98765 43210"
                                className="border-neutral-300 dark:border-neutral-700 rounded-l-none"
                              />
                            </div>
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
                          <FormLabel className="font-montserrat">Company (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 border border-r-0 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-400 rounded-l-md">
                                <Building size={16} />
                              </span>
                              <Input 
                                {...field} 
                                placeholder="Your Company"
                                className="border-neutral-300 dark:border-neutral-700 rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How can we help you?"
                            rows={6}
                            className="border-neutral-300 dark:border-neutral-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold"
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold font-montserrat mb-6">Visit Our Showroom</h2>
              <p className="text-neutral-400 dark:text-neutral-300 mb-8">
                Experience our furniture firsthand at our showroom. Our product specialists will be happy to assist you and answer any questions.
              </p>
              
              <div className="rounded-lg overflow-hidden shadow-lg h-[400px] mb-8 bg-neutral-200 dark:bg-neutral-800">
                {/* Google Maps would be integrated here */}
                <div className="w-full h-full bg-neutral-300 dark:bg-neutral-700/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-accent mx-auto mb-4 opacity-50" />
                    <p className="text-neutral-500 dark:text-neutral-400 font-montserrat text-lg">
                      Google Maps Integration
                    </p>
                    <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
                      123 Business Park, Industrial Area, Delhi NCR
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-100 dark:bg-primary-dark p-4 rounded-lg shadow-md">
                  <h3 className="font-montserrat font-semibold mb-2">Delhi NCR Showroom</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">
                    123 Business Park, Industrial Area<br />
                    Delhi NCR, India - 110001<br />
                    +91 11 2345 6789
                  </p>
                </div>
                
                <div className="bg-neutral-100 dark:bg-primary-dark p-4 rounded-lg shadow-md">
                  <h3 className="font-montserrat font-semibold mb-2">Mumbai Showroom</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">
                    456 Corporate Avenue, Andheri East<br />
                    Mumbai, India - 400069<br />
                    +91 22 3456 7890
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-neutral-200 dark:bg-primary/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-400 dark:text-neutral-300">
              Find quick answers to common questions about our products and services.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Do you offer customization options?",
                answer: "Yes, we offer customization for most of our furniture products including size, material, and finish options to suit your specific requirements."
              },
              {
                question: "What is your delivery timeframe?",
                answer: "Standard delivery takes 5-7 business days for in-stock items. Custom orders typically require 3-4 weeks. Expedited shipping is available for an additional fee."
              },
              {
                question: "Do you provide installation services?",
                answer: "Yes, we offer professional installation services for all our products. Our skilled team ensures your furniture is properly assembled and positioned."
              },
              {
                question: "What warranty do you offer?",
                answer: "Most of our products come with a 2-year warranty against manufacturing defects. Premium lines include an extended 5-year warranty. See specific product details for coverage."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-montserrat font-semibold mb-3">{faq.question}</h3>
                <p className="text-neutral-400 dark:text-neutral-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
