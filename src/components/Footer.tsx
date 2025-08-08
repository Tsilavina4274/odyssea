import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Plateforme': [
      { name: 'Rechercher une université', href: '/search-university' },
      { name: 'Créer son dossier', href: '/create-application' },
      { name: 'Suivre ses candidatures', href: '/track-applications' },
      { name: 'Assistance en ligne', href: '/online-assistance' }
    ],
    'Ressources': [
      { name: 'Guide d\'orientation', href: '/orientation-guide' },
      { name: 'FAQ', href: '/support' },
      { name: 'Témoignages', href: '/universities' },
      { name: 'Blog', href: '/blog' }
    ],
    'À propos': [
      { name: 'Notre mission', href: '/' },
      { name: 'Équipe', href: '/' },
      { name: 'Presse', href: '/' },
      { name: 'Carrières', href: '/' }
    ],
    'Légal': [
      { name: 'Conditions d\'utilisation', href: '/' },
      { name: 'Politique de confidentialité', href: '/' },
      { name: 'Mentions légales', href: '/' },
      { name: 'RGPD', href: '/gdpr' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Reste informé</h3>
            <p className="text-gray-400 mb-6">
              Reçois les dernières actualités sur l'orientation et les nouveautés d'Odysséa
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Ton adresse email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="odyssea-gradient">
                <Send className="w-4 h-4 mr-2" />
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg odyssea-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold">Odysséa</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              La plateforme qui connecte lycéens et universités pour faciliter l'orientation post-bac.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                contact@odyssea.fr
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                01 23 45 67 89
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Paris, France
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Odysséa. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Fait avec ❤️ pour les lycéens Madagascar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
