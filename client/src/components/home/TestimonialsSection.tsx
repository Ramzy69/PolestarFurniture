import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Polestar Furniture transformed our office space with their elegant and functional designs. The quality of their products has exceeded our expectations, and their customer service is exceptional.",
    author: {
      name: "Priya Sharma",
      title: "Director, TechSphere Solutions",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  },
  {
    id: 2,
    rating: 5,
    text: "We needed to furnish our new headquarters with premium quality products that reflect our company culture. Polestar delivered exactly what we needed, on time and within budget.",
    author: {
      name: "Rahul Kapoor",
      title: "CEO, Innovate Designs",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 3,
    rating: 4.5,
    text: "The ergonomic chairs from Polestar have made a significant difference in our employee comfort and productivity. Their attention to detail and focus on ergonomics is impressive.",
    author: {
      name: "Ananya Patel",
      title: "HR Manager, Global Enterprises",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg"
    }
  }
];

const TestimonialsSection = () => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-yellow-400" size={20} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
          </div>
        </div>
      );
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-yellow-400" size={20} />);
    }
    
    return stars;
  };

  return (
    <section className="py-16 bg-white dark:bg-primary/90">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-montserrat mb-3">What Our Clients Say</h2>
          <p className="text-neutral-400 dark:text-neutral-300 max-w-2xl mx-auto">
            Hear from businesses that have transformed their workspaces with our furniture
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-neutral-100 dark:bg-primary-dark rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex text-yellow-400 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="italic mb-6 text-neutral-400 dark:text-neutral-300">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.author.avatar} 
                  alt={testimonial.author.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-montserrat font-semibold">{testimonial.author.name}</h4>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">{testimonial.author.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
