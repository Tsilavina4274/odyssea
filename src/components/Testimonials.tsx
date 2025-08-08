
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Marie D.',
      role: 'Étudiante en médecine',
      university: 'Université Paris Descartes',
      content: 'Grâce à Odysséa, j\'ai pu échanger directement avec l\'université avant de postuler. Cela m\'a vraiment aidée à faire le bon choix !',
      rating: 5,
      avatar: 'MD'
    },
    {
      name: 'Thomas L.',
      role: 'Étudiant en informatique',
      university: 'INSA Lyon',
      content: 'L\'interface est super intuitive et le suivi des candidatures en temps réel m\'a évité beaucoup de stress. Je recommande !',
      rating: 5,
      avatar: 'TL'
    },
    {
      name: 'Sarah K.',
      role: 'Étudiante en droit',
      university: 'Université Panthéon-Sorbonne',
      content: 'Fini les dossiers perdus ! Odysséa centralise tout et me permet de garder un œil sur toutes mes candidatures.',
      rating: 5,
      avatar: 'SK'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvre ce que nos utilisateurs pensent d'Odysséa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary">{testimonial.university}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
