
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ApplicationFormProps {
  onSubmit: (application: any) => void;
  onCancel: () => void;
}

const ApplicationForm = ({ onSubmit, onCancel }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    formation: '',
    university: '',
    motivation: '',
    priority: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.formation || !formData.university || !formData.motivation) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const newApplication = {
      id: Date.now(),
      formation: formData.formation,
      university: formData.university,
      status: 'pending',
      priority: formData.priority,
      submittedAt: new Date().toISOString().split('T')[0],
      response: 'Candidature soumise avec succès. En attente de traitement.',
      motivation: formData.motivation,
    };

    onSubmit(newApplication);
    
    toast({
      title: "Candidature envoyée",
      description: "Votre candidature a été soumise avec succès.",
    });

    // Reset form
    setFormData({
      formation: '',
      university: '',
      motivation: '',
      priority: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="formation">Formation souhaitée *</Label>
        <Input
          id="formation"
          value={formData.formation}
          onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
          placeholder="Ex: Licence Informatique"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="university">Établissement *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, university: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un établissement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Université Paris-Saclay">Université Paris-Saclay</SelectItem>
            <SelectItem value="IUT de Cachan">IUT de Cachan</SelectItem>
            <SelectItem value="Lycée Technique Saint-Louis">Lycée Technique Saint-Louis</SelectItem>
            <SelectItem value="Lycée Louis-le-Grand">Lycée Louis-le-Grand</SelectItem>
            <SelectItem value="Université Sorbonne">Université Sorbonne</SelectItem>
            <SelectItem value="École Polytechnique">École Polytechnique</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Ordre de priorité</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, priority: parseInt(value) })}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir la priorité" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                Vœu #{num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Lettre de motivation *</Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          placeholder="Expliquez votre motivation pour cette formation..."
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          Envoyer la candidature
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
