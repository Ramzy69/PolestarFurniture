import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Award, 
  Users, 
  Clock, 
  Map, 
  RefreshCw, 
  ThumbsUp, 
  Coffee, 
  Heart 
} from "lucide-react";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const stats = [
    { icon: <Clock size={24} />, title: "20+", description: "Years of Experience" },
    { icon: <Users size={24} />, title: "500+", description: "Satisfied Clients" },
    { icon: <Map size={24} />, title: "10+", description: "Cities Across India" },
    { icon: <RefreshCw size={24} />, title: "100%", description: "Quality Commitment" },
  ];

  const values = [
    { 
      icon: <Award className="text-accent" size={32} />, 
      title: "Quality Excellence", 
      description: "We use only the finest materials and craftsmanship to ensure our furniture stands the test of time."
    },
    { 
      icon: <ThumbsUp className="text-accent" size={32} />, 
      title: "Client Satisfaction", 
      description: "Your satisfaction is our top priority, from initial consultation to final delivery and beyond."
    },
    { 
      icon: <Coffee className="text-accent" size={32} />, 
      title: "Innovation", 
      description: "We constantly explore new designs, materials, and technologies to stay at the forefront of office furniture solutions."
    },
    { 
      icon: <Heart className="text-accent" size={32} />, 
      title: "Sustainability", 
      description: "Our commitment to eco-friendly practices ensures our products are as good for the environment as they are for your workspace."
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Polestar Furniture</title>
        <meta 
          name="description" 
          content="Learn about Polestar Furniture's journey, values, and commitment to crafting premium office furniture solutions."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-neutral-100 dark:bg-primary relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-montserrat mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About <span className="text-accent">Polestar</span> Furniture
            </motion.h1>
            <motion.p 
              className="text-lg text-neutral-400 dark:text-neutral-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Crafting premium office furniture solutions since 2003, blending traditional craftsmanship with modern design to transform workspaces across India.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-montserrat mb-6">Our Story</h2>
              <p className="text-neutral-400 dark:text-neutral-300 mb-4">
                Founded in 2003 by a team of designers and craftsmen passionate about creating functional and aesthetically pleasing office spaces, Polestar Furniture began as a small workshop in Delhi.
              </p>
              <p className="text-neutral-400 dark:text-neutral-300 mb-4">
                What started as a modest operation has grown into one of India's premier office furniture manufacturers, serving clients from startups to multinational corporations across the country.
              </p>
              <p className="text-neutral-400 dark:text-neutral-300 mb-6">
                Our journey has been guided by the belief that great workspace design has the power to transform how people work, collaborate, and feel in their professional environment. This philosophy shapes every piece we create.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    custom={index}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full mx-auto mb-3 w-12 h-12 flex items-center justify-center text-accent">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-montserrat">{stat.title}</h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-300">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Our workshop" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Office setup" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1600494603989-9650cf6dad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Design process" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Team meeting" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-neutral-200 dark:bg-primary/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-4">Our Core Values</h2>
            <p className="text-neutral-400 dark:text-neutral-300">
              These principles guide everything we do, from design and manufacturing to customer service and environmental stewardship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md text-center"
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{value.title}</h3>
                <p className="text-neutral-400 dark:text-neutral-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-4">Meet Our Leadership Team</h2>
            <p className="text-neutral-400 dark:text-neutral-300">
              The passionate individuals behind Polestar Furniture who drive our vision and commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Vikram Mehta",
                position: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "With over 25 years in furniture design and manufacturing, Vikram leads our company with vision and passion."
              },
              {
                name: "Priya Sharma",
                position: "Design Director",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bio: "Award-winning designer with expertise in ergonomics and sustainable materials."
              },
              {
                name: "Rajiv Kapoor",
                position: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/68.jpg",
                bio: "Ensures our production processes maintain the highest standards of quality and efficiency."
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-neutral-100 dark:bg-primary-dark rounded-lg overflow-hidden shadow-md"
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.position}</p>
                  <p className="text-neutral-400 dark:text-neutral-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary dark:bg-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="w-full lg:w-2/3 mb-8 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold font-montserrat mb-4">Partner With Us</h2>
              <p className="text-white/90 max-w-2xl">
                Whether you need to furnish a single office or an entire corporate headquarters, our team is ready to help you create the perfect workspace. Let's start the conversation today.
              </p>
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-4 lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                className="bg-white text-secondary hover:bg-neutral-100 font-montserrat font-semibold"
                size="lg"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-montserrat font-semibold"
                size="lg"
                asChild
              >
                <Link href="/products">
                  View Our Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
