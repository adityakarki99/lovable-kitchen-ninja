
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface RecipeFormData {
  name: string;
  category: string;
  description: string;
  servingSize: number;
  preparationTime: string;
  cookingTime: string;
}

const RecipeForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string; cost: number }[]>([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', cost: 0 });
  
  const [equipment, setEquipment] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState('');
  
  const [preparationSteps, setPreparationSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState('');

  const form = useForm<RecipeFormData>({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      servingSize: 1,
      preparationTime: '',
      cookingTime: '',
    },
  });

  const handleSave = (data: RecipeFormData) => {
    // In a real app, you'd save the form data, ingredients, equipment, and steps
    console.log('Form data:', data);
    console.log('Ingredients:', ingredients);
    console.log('Equipment:', equipment);
    console.log('Steps:', preparationSteps);
    
    // Navigate back to the recipes list
    navigate('/recipes');
  };

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, { ...newIngredient }]);
      setNewIngredient({ name: '', quantity: '', cost: 0 });
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addEquipment = () => {
    if (newEquipment) {
      setEquipment([...equipment, newEquipment]);
      setNewEquipment('');
    }
  };

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const addPreparationStep = () => {
    if (newStep) {
      setPreparationSteps([...preparationSteps, newStep]);
      setNewStep('');
    }
  };

  const removePreparationStep = (index: number) => {
    setPreparationSteps(preparationSteps.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/recipes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Create New Recipe</h1>
        </div>
        <Button 
          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
          onClick={form.handleSubmit(handleSave)}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Recipe
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fish & Chips" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Main Course" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="servingSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serving Size</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preparationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prep Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 30 mins" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cookingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cook Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 15 mins" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the recipe briefly" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Ingredients</h3>
              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <Input 
                        value={ingredient.name} 
                        onChange={(e) => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].name = e.target.value;
                          setIngredients(newIngredients);
                        }}
                        placeholder="Ingredient name"
                      />
                      <Input 
                        value={ingredient.quantity} 
                        onChange={(e) => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].quantity = e.target.value;
                          setIngredients(newIngredients);
                        }}
                        placeholder="Quantity"
                      />
                      <Input 
                        type="number" 
                        step="0.01" 
                        value={ingredient.cost || ''} 
                        onChange={(e) => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].cost = parseFloat(e.target.value);
                          setIngredients(newIngredients);
                        }}
                        placeholder="Cost"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeIngredient(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex gap-2 items-center">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Input 
                      value={newIngredient.name} 
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      placeholder="Ingredient name"
                    />
                    <Input 
                      value={newIngredient.quantity} 
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                      placeholder="Quantity"
                    />
                    <Input 
                      type="number" 
                      step="0.01" 
                      value={newIngredient.cost || ''} 
                      onChange={(e) => setNewIngredient({...newIngredient, cost: parseFloat(e.target.value) || 0})}
                      placeholder="Cost"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Equipment</h3>
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input 
                      value={item} 
                      onChange={(e) => {
                        const newEquipment = [...equipment];
                        newEquipment[index] = e.target.value;
                        setEquipment(newEquipment);
                      }}
                      placeholder="Equipment item"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeEquipment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex gap-2 items-center">
                  <Input 
                    value={newEquipment} 
                    onChange={(e) => setNewEquipment(e.target.value)}
                    placeholder="Add equipment item"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={addEquipment}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Preparation Steps</h3>
              <div className="space-y-4">
                {preparationSteps.map((step, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="mt-2 text-sm font-medium text-kitchen-muted-foreground">
                      {index + 1}.
                    </div>
                    <Textarea 
                      value={step} 
                      onChange={(e) => {
                        const newSteps = [...preparationSteps];
                        newSteps[index] = e.target.value;
                        setPreparationSteps(newSteps);
                      }}
                      placeholder="Preparation step"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removePreparationStep(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex gap-2 items-start">
                  <div className="mt-2 text-sm font-medium text-kitchen-muted-foreground">
                    {preparationSteps.length + 1}.
                  </div>
                  <Textarea 
                    value={newStep} 
                    onChange={(e) => setNewStep(e.target.value)}
                    placeholder="Add preparation step"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={addPreparationStep}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default RecipeForm;
