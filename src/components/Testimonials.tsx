import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const AboutRelation = () => {
  const infos = [
    {
      title: 'Un lien direct entre lycéens et universités',
      content: 'Odysséa facilite la communication entre les lycéens et les universités partenaires, permettant un échange clair et transparent sur les formations proposées.',
      icon: 'LD'
    },
    {
      title: 'Accompagnement personnalisé',
      content: 'Les lycéens bénéficient d’un suivi individualisé, avec des informations adaptées à leurs besoins et à leurs projets d’études supérieures.',
      icon: 'AP'
    },
    {
      title: 'Partenariats solides',
      content: 'Grâce à des partenariats établis avec des universités reconnues, Odysséa offre aux lycéens des opportunités concrètes d’intégration dans l’enseignement supérieur.',
      icon: 'PS'
    }
  ];

  // Activités universitaires (vie étudiante, événements...)
  const universityActivities = [
    {
      title: 'Vie associative dynamique',
      description: 'Des clubs et associations variés permettent aux étudiants de s’épanouir en dehors des cours.',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      alt: 'Étudiants en réunion associative'
    },
    {
      title: 'Événements et conférences',
      description: 'Conférences, ateliers et rencontres professionnelles pour préparer l’avenir.',
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
      alt: 'Conférence universitaire'
    }
  ];

  // Services aux étudiants (aides, orientation...)
  const studentServices = [
    {
      title: 'Services de soutien aux étudiants',
      description: 'Orientation, aides financières, et accompagnement personnalisé pour réussir son parcours.',
      img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80',
      alt: 'Conseiller étudiant en entretien'
    }
  ];

  return (
    <>
      {/* Section À propos */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              À propos de la relation entre universités et lycéens
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment Odysséa connecte et accompagne les lycéens dans leur parcours vers l’enseignement supérieur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {infos.map((info, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {info.icon}
                    </div>
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <p className="text-muted-foreground leading-relaxed pl-6">
                      {info.content}
                    </p>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900">{info.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Activités universitaires */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Activités universitaires
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez la richesse de la vie étudiante et les événements organisés dans nos universités partenaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {universityActivities.map(({ title, description, img, alt }, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <img
                  src={img}
                  alt={alt}
                  className="w-full h-48 object-cover rounded-t-md"
                  loading="lazy"
                />
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services aux étudiants */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Services aux étudiants
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un accompagnement complet pour aider chaque étudiant à réussir son parcours universitaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {studentServices.map(({ title, description, img, alt }, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <img
                  src={img}
                  alt={alt}
                  className="w-full h-48 object-cover rounded-t-md"
                  loading="lazy"
                />
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutRelation;
