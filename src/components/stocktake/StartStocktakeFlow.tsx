
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Barcode, ClipboardCheck, PackageCheck } from 'lucide-react';

const StartStocktakeFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Stocktake Process</h2>
          <p className="text-kitchen-muted-foreground">Step {currentStep} of {totalSteps}</p>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="w-[200px]" />
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Select Location & Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Choose the areas and item categories you want to include in this stocktake.</p>
            <div className="flex gap-2">
              <Button onClick={() => setCurrentStep(2)}>Continue</Button>
              <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Barcode className="h-5 w-5" />
              Count Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Start counting items in the selected locations. Use the barcode scanner or enter quantities manually.</p>
            <div className="flex gap-2">
              <Button onClick={() => setCurrentStep(3)}>Continue</Button>
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5" />
              Review & Submit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Review your counted items and submit the stocktake for processing.</p>
            <div className="flex gap-2">
              <Button onClick={() => window.history.back()}>Complete Stocktake</Button>
              <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StartStocktakeFlow;
