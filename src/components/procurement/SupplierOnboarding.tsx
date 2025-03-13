
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SaveIcon, UserPlusIcon, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const SupplierOnboarding: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    taxId: '',
    categories: [] as string[],
    paymentTerms: '30',
    minimumOrder: '',
    deliveryDays: [] as string[],
    termsAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    
    // In a real app, this would send the data to your backend
    toast.success(`Supplier ${formData.companyName} onboarded successfully`);
    
    // Reset form
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      taxId: '',
      categories: [],
      paymentTerms: '30',
      minimumOrder: '',
      deliveryDays: [],
      termsAccepted: false
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold">Supplier Onboarding</h2>
        <p className="text-kitchen-muted-foreground mt-1">Add a new supplier to your procurement system</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8">
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name <span className="text-kitchen-danger">*</span></Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="ABC Produce Co."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person <span className="text-kitchen-danger">*</span></Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-kitchen-danger">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / ABN</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="123-45-6789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Business St, City, State, ZIP"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Product Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Produce', 'Meat', 'Seafood', 'Dairy', 'Bakery', 'Dry Goods', 'Beverages', 'Herbs & Spices', 'Cleaning Supplies'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={formData.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleMultiSelectChange('categories', category);
                          } else {
                            handleMultiSelectChange('categories', category);
                          }
                        }}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={formData.paymentTerms}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="7">Net 7 Days</SelectItem>
                      <SelectItem value="14">Net 14 Days</SelectItem>
                      <SelectItem value="30">Net 30 Days</SelectItem>
                      <SelectItem value="60">Net 60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumOrder">Minimum Order Amount ($)</Label>
                  <Input
                    id="minimumOrder"
                    name="minimumOrder"
                    type="number"
                    value={formData.minimumOrder}
                    onChange={handleInputChange}
                    placeholder="250"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Delivery Days</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`day-${day}`} 
                          checked={formData.deliveryDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleMultiSelectChange('deliveryDays', day);
                            } else {
                              handleMultiSelectChange('deliveryDays', day);
                            }
                          }}
                        />
                        <label
                          htmlFor={`day-${day}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.slice(0, 3)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Upload Documents</Label>
                  <div className="mt-2 border-2 border-dashed border-kitchen-border rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-kitchen-muted-foreground mb-2" />
                    <p className="text-sm text-center text-kitchen-muted-foreground">
                      Drag & drop files or <span className="text-kitchen-primary font-medium">browse</span>
                    </p>
                    <p className="text-xs text-center text-kitchen-muted-foreground mt-1">
                      Supports: PDF, DOC, JPEG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox 
                    id="terms" 
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('termsAccepted', checked === true)
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Terms & Conditions
                    </label>
                    <p className="text-xs text-kitchen-muted-foreground">
                      I confirm this supplier agrees to our standard terms and conditions, including quality standards, delivery protocols, and payment terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Onboard Supplier
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupplierOnboarding;
