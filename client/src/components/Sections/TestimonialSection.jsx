import React from 'react';

const TestimonialCard = ({ name, position, quote, delay, index }) => {
    return (
      <div
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg animate-fade-in-up"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-200 overflow-hidden mr-4">
            <img
              src={`/api/placeholder/${100 + index}/${100 + index}`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        <p className="text-gray-700 italic">"{quote}"</p>
      </div>
    );
  };
  
  const TestimonialsSection = ({ registerSection, scrollToSection }) => {
    const testimonials = [
      {
        name: "Sarah Johnson",
        position: "CEO, TechVentures",
        quote: "Working with this broker has been transformative for our company's investment strategy. The insights and personalized approach led to returns that exceeded our expectations.",
        delay: 0
      },
      {
        name: "Michael Chen",
        position: "Entrepreneur",
        quote: "I've been working with this team for over 5 years and they've consistently provided exceptional service and results. My portfolio has grown significantly under their management.",
        delay: 0.2
      },
      {
        name: "Emma Roberts",
        position: "Financial Director",
        quote: "The level of expertise and attention to detail is impressive. They take the time to understand your financial goals and create strategies that deliver results.",
        delay: 0.4
      }
    ];
  
    return (
      <section
        id="testimonials"
        ref={(el) => registerSection('testimonials', el)}
        className="h-screen w-full snap-start flex items-center bg-blue-600 text-white"
      >
        <div className="w-full px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              Client <span className="text-blue-200">Testimonials</span>
            </h2>
            <div className="w-16 h-1 bg-blue-200 mx-auto mb-8 animate-fade-in-up"></div>
            <p className="text-lg text-blue-100  mx-auto animate-fade-in-up">
              Hear what our clients have to say about their experience working with us.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                index={index}
                name={testimonial.name}
                position={testimonial.position}
                quote={testimonial.quote}
                delay={testimonial.delay}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;
  