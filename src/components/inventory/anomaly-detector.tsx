"use client";

import { useState } from "react";
import { detectInventoryAnomalies } from "@/ai/flows/detect-inventory-anomalies";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export function InventoryAnomalyDetector({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isAnomaly: boolean; anomalyExplanation: string } | null>(null);

  const handleDetection = async () => {
    setLoading(true);
    setResult(null);
    const res = await detectInventoryAnomalies({
      productName: product.name,
      quantity: product.quantity,
      expectedQuantity: product.expectedQuantity,
      historicalData: JSON.stringify(product.historicalData),
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p><span className="font-semibold">Current Quantity:</span> {product.quantity}</p>
        <p><span className="font-semibold">Expected Quantity:</span> {product.expectedQuantity}</p>
      </div>
      <Button onClick={handleDetection} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Analyze Inventory Data
      </Button>
      {result && (
        <Alert variant={result.isAnomaly ? "destructive" : "default"}>
          {result.isAnomaly ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-accent" />}
          <AlertTitle>
            {result.isAnomaly ? "Anomaly Detected!" : "No Anomaly Detected"}
          </AlertTitle>
          <AlertDescription>
            {result.anomalyExplanation || "Inventory levels appear to be within normal parameters."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
