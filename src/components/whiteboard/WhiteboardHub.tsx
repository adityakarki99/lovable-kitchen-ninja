
import React, { useState } from 'react';
import { WhiteboardTemplate } from '@/components/whiteboard/types';
import WhiteboardPanel from '@/components/whiteboard/WhiteboardPanel';
import WhiteboardTemplateSelector from '@/components/whiteboard/WhiteboardTemplateSelector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ArrowLeft, CheckSquare, CalendarCheck, ClipboardList, Menu, MessageSquare, Users, ShoppingCart } from 'lucide-react';
import { suppliers } from '@/data/procurement/suppliers';
import { stockItems } from '@/data/procurement/stockItems';

const TEMPLATES: WhiteboardTemplate[] = [
  {
    id: 'supplier-order',
    name: 'Supplier Order Template',
    description: 'Create and track supplier orders',
    sections: [
      { 
        id: 'order-details', 
        title: 'Order Details', 
        type: 'text',
        content: `Order #A12587
Supplier: ${suppliers[0].name}
Date: ${new Date().toLocaleDateString()}
Contact: ${suppliers[0].accountManager}
Phone: ${suppliers[0].phone}
URGENT: Needed for weekend service`
      },
      { 
        id: 'order-items', 
        title: 'Order Items', 
        type: 'table',
        content: {
          columns: [
            { id: 'item', name: 'Item' },
            { id: 'qty', name: 'Quantity' },
            { id: 'unit', name: 'Unit' },
            { id: 'price', name: 'Price' },
            { id: 'total', name: 'Total' }
          ],
          rows: [
            { 
              id: '1', 
              cells: { 
                item: stockItems[0].name, 
                qty: '15', 
                unit: stockItems[0].unit, 
                price: stockItems[0].lastOrderedPrice.toString(), 
                total: (15 * stockItems[0].lastOrderedPrice).toFixed(2) 
              } 
            },
            { 
              id: '2', 
              cells: { 
                item: stockItems[1].name, 
                qty: '10', 
                unit: stockItems[1].unit, 
                price: stockItems[1].lastOrderedPrice.toString(), 
                total: (10 * stockItems[1].lastOrderedPrice).toFixed(2) 
              } 
            },
            { 
              id: '3', 
              cells: { 
                item: stockItems[5].name, 
                qty: '5', 
                unit: stockItems[5].unit, 
                price: stockItems[5].lastOrderedPrice.toString(), 
                total: (5 * stockItems[5].lastOrderedPrice).toFixed(2) 
              } 
            }
          ]
        }
      },
      { 
        id: 'delivery-notes', 
        title: 'Delivery Notes', 
        type: 'text',
        content: 'Please deliver before 8am on Friday.\nRequire fresh produce with at least 5 days shelf life.\nCall Chef David 30 minutes before arrival.'
      },
      { 
        id: 'verification', 
        title: 'Order Verification', 
        type: 'checklist',
        content: [
          { id: '1', text: 'Verify quantities match our inventory needs', completed: true },
          { id: '2', text: 'Confirm prices against approved supplier catalog', completed: true },
          { id: '3', text: 'Check delivery time works with kitchen schedule', completed: false },
          { id: '4', text: 'Obtain manager approval for orders over $500', completed: false },
          { id: '5', text: 'Send confirmation email to supplier', completed: false }
        ]
      }
    ]
  },
  {
    id: 'weekly-order',
    name: 'Weekly Order Planner',
    description: 'Plan weekly ordering across departments',
    sections: [
      { 
        id: 'produce', 
        title: 'Produce Order', 
        type: 'text',
        content: `Order #WP2203
Supplier: ${suppliers[0].name}
Date: Monday delivery

- 20kg Tomatoes (Roma)
- 15kg Onions (yellow)
- 10kg Potatoes (Russet)
- 8kg Bell Peppers (assorted)
- 5kg Carrots
- 6kg Zucchini
- 4kg Eggplant
- 3kg Mushrooms (button)
- 2kg Garlic
- 10 bunches Fresh Herbs (basil, parsley, thyme)`
      },
      { 
        id: 'meat', 
        title: 'Meat & Poultry', 
        type: 'text',
        content: `Order #WP2204
Supplier: ${suppliers[1].name}
Date: Tuesday delivery

- 15kg Chicken Breast
- 10kg Ground Beef (80/20)
- 8kg Ribeye Steak
- 5kg Pork Tenderloin
- 6kg Lamb Shoulder
- 4kg Duck Breast
- 3kg Bacon`
      },
      { 
        id: 'seafood', 
        title: 'Seafood', 
        type: 'text',
        content: `Order #WP2205
Supplier: ${suppliers[2].name}
Date: Wednesday delivery

- 10kg Salmon Fillet
- 8kg Shrimp (16/20)
- 6kg Sea Bass
- 4kg Scallops
- 5kg Mussels
- 3kg Calamari`
      },
      { 
        id: 'dry-goods', 
        title: 'Dry Goods', 
        type: 'text',
        content: `Order #WP2206
Supplier: ${suppliers[3].name}
Date: Monday delivery

- 25kg All-Purpose Flour
- 15kg Rice (Arborio)
- 10kg Pasta (Assorted)
- 5kg Sugar
- 8kg Salt
- 20 cans Tomato Paste
- 15 cans Coconut Milk
- 10L Olive Oil
- 5L Vegetable Oil
- 3kg Dried Herbs & Spices`
      },
      { 
        id: 'beverage', 
        title: 'Beverages', 
        type: 'text',
        content: `Order #WP2207
Supplier: Beverage Distributors Inc.
Date: Thursday delivery

- 10 cases Sparkling Water
- 5 cases Craft Sodas
- 8 cases Wine (House Red)
- 8 cases Wine (House White)
- 3 cases Specialty Beers
- 2 cases Coffee Beans
- 5kg Tea (Assorted)`
      },
      { 
        id: 'verification', 
        title: 'Order Checklist', 
        type: 'checklist',
        content: [
          { id: '1', text: 'Review previous week's usage and adjust quantities', completed: true },
          { id: '2', text: 'Check upcoming events and adjust for increased demand', completed: true },
          { id: '3', text: 'Verify all departments have submitted requirements', completed: true },
          { id: '4', text: 'Compare against budget allocations', completed: false },
          { id: '5', text: 'Confirm delivery schedules with all suppliers', completed: false },
          { id: '6', text: 'Submit final orders to purchasing department', completed: false }
        ]
      }
    ]
  },
  {
    id: 'quick-reorder',
    name: 'Quick Reorder Form',
    description: 'Fast reordering of commonly used items',
    sections: [
      { 
        id: 'urgent-items', 
        title: 'Urgent Reorder Items', 
        type: 'checklist',
        content: [
          { id: '1', text: 'Fresh herbs - basil, cilantro, mint', completed: true },
          { id: '2', text: 'Heavy cream - 5 quarts', completed: true },
          { id: '3', text: 'Ribeye steak - 10kg', completed: true },
          { id: '4', text: 'Shrimp (16/20) - 5kg', completed: false },
          { id: '5', text: 'Lemon - 5kg', completed: false },
          { id: '6', text: 'Butter - 10kg', completed: false }
        ]
      },
      { 
        id: 'quantities', 
        title: 'Quantities', 
        type: 'table',
        content: {
          columns: [
            { id: 'item', name: 'Item' },
            { id: 'current', name: 'Current Stock' },
            { id: 'minimum', name: 'Minimum Needed' },
            { id: 'order', name: 'Order Quantity' },
            { id: 'supplier', name: 'Supplier' }
          ],
          rows: [
            { 
              id: '1', 
              cells: { 
                item: 'Fresh herbs (bunches)', 
                current: '2', 
                minimum: '10', 
                order: '12',
                supplier: suppliers[0].name
              } 
            },
            { 
              id: '2', 
              cells: { 
                item: 'Heavy cream (quarts)', 
                current: '1', 
                minimum: '6', 
                order: '10',
                supplier: 'Dairy Farm Co.'
              }
            },
            { 
              id: '3', 
              cells: { 
                item: 'Ribeye steak (kg)', 
                current: '2', 
                minimum: '12', 
                order: '15',
                supplier: suppliers[1].name
              }
            },
            { 
              id: '4', 
              cells: { 
                item: 'Shrimp 16/20 (kg)', 
                current: '1', 
                minimum: '6', 
                order: '8',
                supplier: suppliers[2].name
              }
            },
            { 
              id: '5', 
              cells: { 
                item: 'Lemon (kg)', 
                current: '2', 
                minimum: '7', 
                order: '10',
                supplier: suppliers[0].name
              }
            },
            { 
              id: '6', 
              cells: { 
                item: 'Butter (kg)', 
                current: '3', 
                minimum: '10', 
                order: '12',
                supplier: 'Dairy Farm Co.'
              }
            }
          ]
        }
      },
      { 
        id: 'notes', 
        title: 'Special Instructions', 
        type: 'text',
        content: 'URGENT: All items needed by tomorrow morning. Expedited delivery required.\nApproved by: Chef Michael\nBudget code: EMERG-2023-04\nContact for confirmation: 555-123-4567'
      }
    ]
  },
  {
    id: 'daily-ops',
    name: 'Daily Operations',
    description: 'Track daily tasks and assignments',
    sections: [
      { 
        id: 'tasks', 
        title: 'Daily Tasks', 
        type: 'checklist',
        content: [
          { id: '1', text: 'Morning inventory check - all stations', completed: true },
          { id: '2', text: 'Prep list completion - 100%', completed: true },
          { id: '3', text: 'Staff meal preparation - 11:00am', completed: true },
          { id: '4', text: 'Pre-service meeting - 4:00pm', completed: false },
          { id: '5', text: 'Equipment maintenance check', completed: false },
          { id: '6', text: 'End of day cleaning checklist', completed: false },
          { id: '7', text: 'Next day prep list creation', completed: false }
        ]
      },
      { 
        id: 'staff', 
        title: 'Staff Assignments', 
        type: 'table',
        content: {
          columns: [
            { id: 'name', name: 'Staff Name' },
            { id: 'position', name: 'Position' },
            { id: 'station', name: 'Station' },
            { id: 'hours', name: 'Hours' }
          ],
          rows: [
            { id: '1', cells: { name: 'Michael Chen', position: 'Head Chef', station: 'Expediting', hours: '12pm-11pm' } },
            { id: '2', cells: { name: 'Sarah Johnson', position: 'Sous Chef', station: 'Hot Line', hours: '2pm-11pm' } },
            { id: '3', cells: { name: 'David Kim', position: 'Line Cook', station: 'Grill', hours: '3pm-11pm' } },
            { id: '4', cells: { name: 'Maria Rodriguez', position: 'Line Cook', station: 'Sauté', hours: '3pm-11pm' } },
            { id: '5', cells: { name: 'James Wilson', position: 'Prep Cook', station: 'Cold Line', hours: '9am-5pm' } },
            { id: '6', cells: { name: 'Aisha Patel', position: 'Pastry Chef', station: 'Desserts', hours: '10am-6pm' } }
          ]
        }
      },
      { 
        id: 'specials', 
        title: "Today's Specials", 
        type: 'text',
        content: `APPETIZER:
Seared Scallops with Citrus Reduction - $18
Local heirloom tomato and burrata salad - $16

ENTREES:
Grilled Prime Ribeye with truffle butter - $42
Pan-seared Chilean Sea Bass with lemon beurre blanc - $38
Wild Mushroom Risotto with aged parmesan - $28

DESSERT:
Vanilla Bean Crème Brûlée - $12
Seasonal Fruit Tart with honey lavender ice cream - $14`
      },
      { 
        id: 'notes', 
        title: 'Notes & Reminders', 
        type: 'text',
        content: `- VIP reservation at 7:30pm - Table 12 - Mr. & Mrs. Anderson (Wedding Anniversary)
- Wine rep coming tomorrow at 2pm - Chef Michael to meet
- New POS system training next Monday - All staff required
- Walk-in cooler temperature fluctuating - Maintenance scheduled for Wednesday
- 86 the Duck Confit - Restock tomorrow
- Large party (20ppl) booked for Friday - Special menu requested`
      }
    ]
  },
  {
    id: 'weekly-planning',
    name: 'Weekly Planning',
    description: 'Plan your week ahead',
    sections: [
      { 
        id: 'mon', 
        title: 'Monday', 
        type: 'text',
        content: `PREP FOCUS:
- Stocks and bases preparation
- Sauce production
- Butchery day - breakdown proteins for the week

STAFF: 
- 2 prep cooks (8am-4pm)
- 1 sous chef (10am-8pm)

DELIVERIES:
- Produce delivery - 7am
- Dry goods - 10am

TASKS:
- Staff meeting - 2pm
- Menu planning for weekend specials
- Inventory check on cleaning supplies`
      },
      { 
        id: 'tue', 
        title: 'Tuesday', 
        type: 'text',
        content: `PREP FOCUS:
- Vegetable prep
- Marinades
- Pastry prep

STAFF:
- 3 prep cooks (8am-4pm)
- 1 pastry assistant (9am-5pm)
- 1 sous chef (12pm-10pm)

DELIVERIES:
- Meat and poultry - 8am
- Dairy - 11am

TASKS:
- Equipment maintenance check
- Review supplier invoices
- Update recipe cards`
      },
      { 
        id: 'wed', 
        title: 'Wednesday', 
        type: 'text',
        content: `PREP FOCUS:
- Seafood prep
- Specialty items for weekend
- Soup production

STAFF:
- 2 prep cooks (8am-4pm)
- 1 sous chef (12pm-10pm)
- 1 line cook (10am-6pm)

DELIVERIES:
- Seafood delivery - 9am
- Wine and beverages - 1pm

TASKS:
- Health and safety training - 3pm
- Mid-week inventory check
- Staff meal planning`
      },
      { 
        id: 'thu', 
        title: 'Thursday', 
        type: 'text',
        content: `PREP FOCUS:
- Heavy prep for weekend service
- Sauce finishing
- Dessert components

STAFF:
- 3 prep cooks (8am-4pm)
- 1 pastry chef (10am-6pm)
- 2 sous chefs (12pm-10pm)

DELIVERIES:
- Produce (second delivery) - 8am
- Specialty items - 11am

TASKS:
- Final weekend prep list review
- Polish and silverware check
- Menu printing`
      },
      { 
        id: 'fri', 
        title: 'Friday', 
        type: 'text',
        content: `PREP FOCUS:
- Final weekend prep
- Station setup
- Fresh bread production

STAFF:
- Full kitchen staff on rotation
- All hands for service

DELIVERIES:
- Emergency-only deliveries
- Fresh bread delivery - 2pm

TASKS:
- Pre-service meeting - 4pm
- Kitchen line check - 5pm
- Full station inspection`
      },
      { 
        id: 'sat', 
        title: 'Saturday', 
        type: 'text',
        content: `PREP FOCUS:
- Limited morning prep
- Replenish stations
- Special event prep (private dining)

STAFF:
- Full kitchen staff on rotation
- Double pastry team

DELIVERIES:
- No scheduled deliveries
- On-call supplier for emergencies

TASKS:
- Pre-service meeting - 4pm
- VIP table assignments
- Specials review`
      },
      { 
        id: 'sun', 
        title: 'Sunday', 
        type: 'text',
        content: `PREP FOCUS:
- Brunch service
- Limited evening service prep
- Next week's planning

STAFF:
- Brunch team (6am-3pm)
- Reduced evening staff

DELIVERIES:
- No scheduled deliveries

TASKS:
- Weekly deep clean (after service)
- Inventory for Monday orders
- Equipment maintenance
- Menu development meeting`
      }
    ]
  },
  {
    id: 'menu-dev',
    name: 'Menu Development',
    description: 'Collaborate on new menu items',
    sections: [
      { 
        id: 'ideas', 
        title: 'Ideas & Concepts', 
        type: 'text',
        content: `SPRING MENU CONCEPT:
Focus on seasonal produce with emphasis on local farms
Light, fresh flavors with Mediterranean and Asian influences
Color palette: greens, yellows, light pinks

POTENTIAL NEW DISHES:
1. Spring pea risotto with preserved lemon and mint
2. Charred asparagus with miso butter and toasted almonds
3. Lamb loin with spring vegetable ragout and herb salsa verde
4. Rhubarb and strawberry tart with vanilla custard
5. Yellowfin tuna crudo with citrus, avocado and shaved fennel
6. Spring onion and goat cheese tart with microgreens

THEME: "From Seed to Table" - emphasizing our farm relationships`
      },
      { 
        id: 'ingredients', 
        title: 'Key Ingredients', 
        type: 'text',
        content: `SEASONAL FOCUS INGREDIENTS:
- Spring peas
- Young radishes
- Green garlic
- Ramps
- Fava beans
- Morel mushrooms
- Spring lamb
- Rhubarb
- Strawberries
- New potatoes
- Young lettuces
- Fiddlehead ferns

NEW SUPPLIERS:
- Blue Hill Farm (organic vegetables)
- Meadow Creek Dairy (artisanal cheeses)
- Elysian Fields Farm (lamb)
- Wild Things Foraging Co. (wild mushrooms and edibles)`
      },
      { 
        id: 'testing', 
        title: 'Testing Notes', 
        type: 'text',
        content: `DISH: Spring Pea Risotto
Test Date: March 15
Testers: Chef Michael, Sous Chef Sarah, Line Cook David

NOTES:
- Rice: Carnaroli worked better than Arborio for texture
- Peas: Blanching time 45 seconds optimal for color/taste
- Needs more acid - added preserved lemon
- Mint needs to be added at the last moment
- Garnish with pea tendrils and flowers works well
- Plating: Shallow bowl best presentation
- Wine pairing: Sauvignon Blanc or light Sancerre

IMPROVEMENTS FOR NEXT TEST:
- Try adding a small amount of mascarpone for richness
- Experiment with different stocks (vegetable vs. chicken)
- Test adding fresh pea puree at end of cooking
- Consider a crispy element for texture contrast`
      },
      { 
        id: 'feedback', 
        title: 'Feedback', 
        type: 'text',
        content: `STAFF TASTING FEEDBACK:

Spring Pea Risotto:
"Perfect balance of freshness and comfort" - Sarah
"The preserved lemon makes it pop" - David
"Could use a crispy element for texture" - Aisha

Lamb Loin:
"Cook temperature perfect at medium-rare" - Michael
"Herb salsa verde needs more punch" - Maria
"Vegetable ragout seasoning on point" - James

Rhubarb Tart:
"Great balance of sweet and tart" - Aisha
"Vanilla custard could be more pronounced" - Sarah
"Beautiful presentation" - Michael

GENERAL COMMENTS:
- Overall excitement about seasonal focus
- Concerns about sourcing consistency for wild ingredients
- Price points seem appropriate for market
- Staff favorites: Lamb loin and asparagus dishes`
      }
    ]
  }
];

const getTemplateIcon = (id: string) => {
  switch (id) {
    case 'supplier-order':
      return <ShoppingCart className="h-8 w-8 text-blue-500" />;
    case 'weekly-order':
      return <ClipboardList className="h-8 w-8 text-green-500" />;
    case 'quick-reorder':
      return <Plus className="h-8 w-8 text-amber-500" />;
    case 'daily-ops':
      return <ClipboardList className="h-8 w-8 text-teal-500" />;
    case 'weekly-planning':
      return <CalendarCheck className="h-8 w-8 text-green-500" />;
    case 'menu-dev':
      return <Menu className="h-8 w-8 text-red-500" />;
    case 'message-board':
      return <MessageSquare className="h-8 w-8 text-purple-500" />;
    case 'to-dos':
      return <CheckSquare className="h-8 w-8 text-teal-500" />;
    default:
      return <ClipboardList className="h-8 w-8 text-blue-500" />;
  }
};

const WhiteboardHub: React.FC = () => {
  const [boards, setBoards] = useState<string[]>(['supplier-order', 'weekly-order', 'quick-reorder', 'daily-ops']);
  const [activeBoard, setActiveBoard] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);
  
  const handleAddBoard = (templateId: string) => {
    if (!boards.includes(templateId)) {
      setBoards([...boards, templateId]);
    }
    setShowTemplateSelector(false);
  };
  
  const handleOpenBoard = (boardId: string) => {
    setActiveBoard(boardId);
  };
  
  const handleBackToHome = () => {
    setActiveBoard(null);
  };

  const recentActivity = [
    { id: 1, user: 'Chef Michael', action: 'updated', board: 'Supplier Order Template', time: '2 hours ago' },
    { id: 2, user: 'Sarah', action: 'commented on', board: 'Weekly Order Planner', time: '4 hours ago' },
    { id: 3, user: 'David', action: 'created', board: 'Quick Reorder Form', time: 'Yesterday' },
    { id: 4, user: 'Aisha', action: 'updated', board: 'Menu Development', time: '2 days ago' },
    { id: 5, user: 'Kitchen Manager', action: 'approved', board: 'Weekly Order Planner', time: 'Today at 9:15am' },
  ];
  
  if (activeBoard) {
    const template = TEMPLATES.find(t => t.id === activeBoard);
    
    if (!template) {
      return <div>Board not found</div>;
    }
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBackToHome} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Whiteboards
          </Button>
          <h2 className="text-2xl font-medium">{template.name}</h2>
        </div>
        
        <WhiteboardPanel template={template} />
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      {showTemplateSelector ? (
        <WhiteboardTemplateSelector 
          templates={TEMPLATES} 
          onSelectTemplate={handleAddBoard}
          onCancel={() => setShowTemplateSelector(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium mb-1">Your Whiteboards</h2>
              <p className="text-kitchen-muted-foreground">
                Streamline ordering and collaboration with team whiteboards
              </p>
            </div>
            <Button onClick={() => setShowTemplateSelector(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Whiteboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map(boardId => {
              const template = TEMPLATES.find(t => t.id === boardId);
              if (!template) return null;
              
              return (
                <Card 
                  key={boardId}
                  className="hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenBoard(boardId)}
                >
                  <div className={`h-2 w-full bg-${boardId === 'supplier-order' ? 'blue' : boardId === 'weekly-order' ? 'green' : boardId === 'quick-reorder' ? 'amber' : boardId === 'daily-ops' ? 'teal' : boardId === 'weekly-planning' ? 'green' : boardId === 'menu-dev' ? 'red' : boardId === 'message-board' ? 'purple' : 'teal'}-500`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      {getTemplateIcon(boardId)}
                      <span className="text-xs text-kitchen-muted-foreground bg-kitchen-muted px-2 py-1 rounded-full">
                        {template.sections.length} sections
                      </span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{template.name}</h3>
                    <p className="text-kitchen-muted-foreground mb-4 text-sm">{template.description}</p>
                    <div className="mt-4 flex items-center text-kitchen-muted-foreground text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      <span>3 team members</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
            <Card>
              <CardContent className="p-4">
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <div className="flex items-center py-3">
                      <div className="h-8 w-8 rounded-full bg-kitchen-muted flex items-center justify-center text-kitchen-foreground mr-3">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.board}</span>
                        </p>
                        <p className="text-xs text-kitchen-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default WhiteboardHub;
