
import React from 'react';
import { ArrowLeft, Edit, ChefHat, DollarSign, PieChart, Utensils, Clipboard } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

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

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipeDetails; // In a real app, you'd fetch the recipe by id
  
  // Calculate total cost
  const totalCost = recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.cost, 0);
  
  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`);
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
          <h1 className="text-2xl font-semibold">{recipe.name}</h1>
        </div>
        <Button 
          className="bg-kitchen-primary hover:bg-kitchen-primary/90"
          onClick={handleEdit}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Recipe
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-apple-sm">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-sm text-kitchen-muted-foreground">Category</span>
            <span className="font-medium">{recipe.category}</span>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-apple-sm">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-sm text-kitchen-muted-foreground">Serving Size</span>
            <span className="font-medium">{recipe.servingSize} person</span>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-apple-sm">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-sm text-kitchen-muted-foreground">Preparation Time</span>
            <span className="font-medium">{recipe.preparationTime}</span>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-apple-sm">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-sm text-kitchen-muted-foreground">Cooking Time</span>
            <span className="font-medium">{recipe.cookingTime}</span>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-apple-sm overflow-hidden">
        <Tabs defaultValue="ingredients">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 p-0 rounded-none bg-kitchen-muted">
            <TabsTrigger value="ingredients" className="py-3 data-[state=active]:bg-white">
              <ChefHat className="mr-2 h-4 w-4" />
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="costing" className="py-3 data-[state=active]:bg-white">
              <DollarSign className="mr-2 h-4 w-4" />
              Costing
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="py-3 data-[state=active]:bg-white">
              <PieChart className="mr-2 h-4 w-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="preparation" className="py-3 data-[state=active]:bg-white">
              <Clipboard className="mr-2 h-4 w-4" />
              Preparation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="m-0 p-4">
            <div className="grid gap-2">
              <h3 className="font-medium text-lg mb-2">Ingredients</h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-kitchen-border last:border-0">
                    <div className="flex gap-2">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-kitchen-muted-foreground">{ingredient.quantity}</span>
                    </div>
                    <span>${ingredient.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="costing" className="m-0 p-4">
            <div className="grid gap-4">
              <h3 className="font-medium text-lg mb-2">Cost Breakdown</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-kitchen-border last:border-0">
                      <span>{ingredient.name}</span>
                      <span>${ingredient.cost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-4 border-t border-kitchen-border">
                  <span className="font-semibold">Total Cost Per Serving</span>
                  <span className="font-semibold">${totalCost.toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <div className="pill-badge bg-kitchen-primary/10 text-kitchen-primary">
                    Markup: 120%
                  </div>
                  <div className="mt-2 text-sm text-kitchen-muted-foreground">
                    Recommended selling price: ${(totalCost * 2.2).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="m-0 p-4">
            <div className="grid gap-4">
              <h3 className="font-medium text-lg mb-2">Nutritional Facts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(recipe.nutritionalFacts).map(([key, value]) => (
                  <Card key={key} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="text-sm text-kitchen-muted-foreground capitalize">
                        {key}
                      </div>
                      <div className="text-xl font-medium mt-1">
                        {key === 'calories' ? value : `${value}g`}
                        {key === 'sodium' && 'mg'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preparation" className="m-0 p-4">
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.equipment.map((item, index) => (
                    <div key={index} className="pill-badge bg-kitchen-muted text-kitchen-muted-foreground">
                      <Utensils className="mr-1 h-3 w-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Preparation Steps</h3>
                <ol className="list-decimal pl-4 space-y-2">
                  {recipe.preparationSteps.map((step, index) => (
                    <li key={index} className="py-1">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default RecipeDetail;
