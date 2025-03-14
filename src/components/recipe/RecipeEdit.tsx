
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash, Plus, X, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const recipeDetails = {
  id: 1,
  name: 'Fish & Chips',
  category: 'Main Course',
  description: 'Classic British dish featuring crispy battered fish served with thick-cut fries.',
  servingSize: 1,
  preparationTime: '30 mins',
  cookingTime: '15 mins',
  ingredients: [
    { name: 'Fish Fillet', quantity: '200g', cost: 2.50 },
    { name: 'Beer Batter Mix', quantity: '100g', cost: 0.75 },
    { name: 'Potatoes', quantity: '300g', cost: 0.60 },
    { name: 'Vegetable Oil', quantity: '2 tbsp', cost: 0.15 },
    { name: 'Salt', quantity: '1 tsp', cost: 0.05 },
    { name: 'Black Pepper', quantity: '1/2 tsp', cost: 0.05 },
    { name: 'Lemon', quantity: '1 wedge', cost: 0.20 },
    { name: 'Tartar Sauce', quantity: '30g', cost: 0.20 },
  ],
  nutritionalFacts: {
    calories: 450,
    protein: 28,
    carbs: 52,
    fat: 16,
    fiber: 4,
    sodium: 600,
  },
  equipment: [
    'Deep Fryer',
    'Tongs',
    'Slotted Spoon',
    'Baking Tray',
    'Paper Towels',
  ],
  preparationSteps: [
    'Prepare the batter according to package instructions.',
    'Cut potatoes into thick strips and soak in cold water for 15 minutes.',
    'Pat dry the fish fillets and season with salt and pepper.',
    'Heat oil in deep fryer to 180°C (350°F).',
    'Dip fish in batter, ensuring even coating.',
    'Fry fish for 5-7 minutes until golden and crispy.',
    'Drain potatoes and pat dry. Fry for 4-5 minutes until golden.',
    'Serve with lemon wedge and tartar sauce.',
  ],
};

// Mock inventory ingredients
const inventoryIngredients = [
  { id: 1, name: 'Chicken Breast', quantity: '20kg', cost: 6.50 },
  { id: 2, name: 'Fish Fillet', quantity: '15kg', cost: 8.75 },
  { id: 3, name: 'Ground Beef', quantity: '12kg', cost: 5.20 },
  { id: 4, name: 'Potatoes', quantity: '50kg', cost: 0.80 },
  { id: 5, name: 'Rice', quantity: '25kg', cost: 1.20 },
  { id: 6, name: 'Flour', quantity: '30kg', cost: 0.60 },
  { id: 7, name: 'Sugar', quantity: '15kg', cost: 1.10 },
  { id: 8, name: 'Salt', quantity: '10kg', cost: 0.50 },
  { id: 9, name: 'Black Pepper', quantity: '5kg', cost: 2.30 },
  { id: 10, name: 'Olive Oil', quantity: '20L', cost: 7.50 },
  { id: 11, name: 'Vegetable Oil', quantity: '25L', cost: 3.80 },
  { id: 12, name: 'Eggs', quantity: '500 units', cost: 0.20 },
  { id: 13, name: 'Milk', quantity: '50L', cost: 1.30 },
  { id: 14, name: 'Butter', quantity: '10kg', cost: 5.60 },
  { id: 15, name: 'Cheese', quantity: '15kg', cost: 7.90 },
];

interface RecipeFormData {
  name: string;
  category: string;
  description: string;
  servingSize: number;
  preparationTime: string;
  cookingTime: string;
}

const RecipeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipeDetails; // In a real app, you'd fetch the recipe by id

  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', cost: 0 });
  
  const [equipment, setEquipment] = useState([...recipe.equipment]);
  const [newEquipment, setNewEquipment] = useState('');
  
  const [preparationSteps, setPreparationSteps] = useState([...recipe.preparationSteps]);
  const [newStep, setNewStep] = useState('');

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [isIngredientPopoverOpen, setIsIngredientPopoverOpen] = useState(false);

  const form = useForm<RecipeFormData>({
    defaultValues: {
      name: recipe.name,
      category: recipe.category,
      description: recipe.description,
      servingSize: recipe.servingSize,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
    },
  });

  const handleSave = (data: RecipeFormData) => {
    // In a real app, you'd save the form data, ingredients, equipment, and steps
    console.log('Form data:', data);
    console.log('Ingredients:', ingredients);
    console.log('Equipment:', equipment);
    console.log('Steps:', preparationSteps);
    
    // Navigate back to the detail view
    navigate(`/recipes/${id}`);
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

  const selectInventoryIngredient = (ingredient: typeof inventoryIngredients[0]) => {
    setNewIngredient({
      name: ingredient.name,
      quantity: '',
      cost: ingredient.cost
    });
    setIsIngredientPopoverOpen(false);
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

  const filteredIngredients = inventoryIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to={`/recipes/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit Recipe</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={() => navigate('/recipes')}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={form.handleSubmit(handleSave)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
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
                        value={ingredient.cost} 
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
                    <Popover open={isIngredientPopoverOpen} onOpenChange={setIsIngredientPopoverOpen}>
                      <PopoverTrigger asChild>
                        <div className="relative w-full">
                          <Input 
                            value={newIngredient.name} 
                            onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                            placeholder="Ingredient name"
                            className="w-full pr-10"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full aspect-square" 
                            onClick={() => setIsIngredientPopoverOpen(true)}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search ingredients..." 
                            value={ingredientSearch}
                            onValueChange={setIngredientSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No ingredients found</CommandEmpty>
                            <CommandGroup heading="Available Ingredients">
                              <ScrollArea className="h-[200px]">
                                {filteredIngredients.map((ingredient) => (
                                  <CommandItem 
                                    key={ingredient.id}
                                    onSelect={() => selectInventoryIngredient(ingredient)}
                                    className="flex justify-between"
                                  >
                                    <span>{ingredient.name}</span>
                                    <span className="text-kitchen-muted-foreground text-xs">
                                      ${ingredient.cost.toFixed(2)}/unit
                                    </span>
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Input 
                      value={newIngredient.quantity} 
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                      placeholder="Quantity"
                    />
                    <Input 
                      type="number" 
                      step="0.01" 
                      value={newIngredient.cost || ''} 
                      onChange={(e) => setNewIngredient({...newIngredient, cost: parseFloat(e.target.value)})}
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

export default RecipeEdit;
