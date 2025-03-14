
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Search, Sparkles } from 'lucide-react';
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Mock ingredient database
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

// Mock AI recipe suggestions
const aiSuggestions = [
  {
    name: "Chicken Parmesan",
    ingredients: [
      { name: 'Chicken Breast', quantity: '200g', cost: 1.30 },
      { name: 'Flour', quantity: '50g', cost: 0.03 },
      { name: 'Eggs', quantity: '2 units', cost: 0.40 },
      { name: 'Cheese', quantity: '100g', cost: 0.79 },
      { name: 'Olive Oil', quantity: '30ml', cost: 0.22 },
      { name: 'Salt', quantity: '5g', cost: 0.01 },
      { name: 'Black Pepper', quantity: '3g', cost: 0.01 },
    ],
    preparationSteps: [
      "Pound chicken breasts to even thickness.",
      "Dredge chicken in flour, then dip in beaten eggs.",
      "Pan-fry chicken until golden brown on both sides.",
      "Top with tomato sauce and cheese, then bake until cheese is melted.",
      "Serve hot with pasta or salad."
    ]
  },
  {
    name: "Beef Stir Fry",
    ingredients: [
      { name: 'Ground Beef', quantity: '250g', cost: 1.30 },
      { name: 'Rice', quantity: '150g', cost: 0.18 },
      { name: 'Vegetable Oil', quantity: '15ml', cost: 0.06 },
      { name: 'Salt', quantity: '3g', cost: 0.01 },
      { name: 'Black Pepper', quantity: '2g', cost: 0.01 },
    ],
    preparationSteps: [
      "Heat oil in a wok or large frying pan.",
      "Add ground beef and stir-fry until browned.",
      "Add vegetables and stir-fry for 2-3 minutes.",
      "Season with salt and pepper.",
      "Serve hot over cooked rice."
    ]
  },
];

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

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [isIngredientPopoverOpen, setIsIngredientPopoverOpen] = useState(false);
  const [isAISuggestionDialogOpen, setIsAISuggestionDialogOpen] = useState(false);
  const [selectedAIRecipe, setSelectedAIRecipe] = useState<typeof aiSuggestions[0] | null>(null);

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

  const applyAIRecipeSuggestion = () => {
    if (selectedAIRecipe) {
      form.setValue('name', selectedAIRecipe.name);
      setIngredients(selectedAIRecipe.ingredients);
      setPreparationSteps(selectedAIRecipe.preparationSteps);
      setIsAISuggestionDialogOpen(false);
    }
  };

  const filteredIngredients = inventoryIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

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
        <div className="flex gap-2">
          <Dialog open={isAISuggestionDialogOpen} onOpenChange={setIsAISuggestionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                AI Suggestions
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>AI Recipe Suggestions</DialogTitle>
                <DialogDescription>
                  Select a recipe suggestion to automatically fill the form with AI-generated content based on your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {aiSuggestions.map((recipe, index) => (
                  <Card 
                    key={index}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${selectedAIRecipe?.name === recipe.name ? 'border-primary ring-1 ring-primary' : ''}`}
                    onClick={() => setSelectedAIRecipe(recipe)}
                  >
                    <h3 className="font-medium text-lg">{recipe.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recipe.ingredients.slice(0, 5).map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {ingredient.name}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 5} more
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mt-2 text-kitchen-muted-foreground">
                      {recipe.preparationSteps.length} preparation steps
                    </p>
                  </Card>
                ))}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAISuggestionDialogOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={applyAIRecipeSuggestion}
                  disabled={!selectedAIRecipe}
                  className="bg-kitchen-primary hover:bg-kitchen-primary/90"
                >
                  Use Selected Recipe
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button 
            className="bg-kitchen-primary hover:bg-kitchen-primary/90"
            onClick={form.handleSubmit(handleSave)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Recipe
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
