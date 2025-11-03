"use client";

import { useState } from "react";
import { detectSupplyChainAnomalies } from "@/ai/flows/detect-supply-chain-anomalies";
import type { Shipment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";

export function SupplyChainAnomalyDetector({ shipment }: { shipment: Shipment }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ anomalyDetected: boolean; explanation: string } | null>(null);

  const handleDetection = async () => {
    setLoading(true);
    setResult(null);
    const res = await detectSupplyChainAnomalies({
      shipmentData: shipment.shipmentData,
      expectedTransitTime: shipment.expectedTransitTime,
      expectedTemperatureRange: shipment.expectedTemperatureRange,
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p><span className="font-semibold">Shipment Data:</span> {shipment.shipmentData}</p>
        <p><span className="font-semibold">Expected Transit Time:</span> {shipment.expectedTransitTime}</p>
        <p><span className="font-semibold">Expected Temp. Range:</span> {shipment.expectedTemperatureRange}</p>
      </div>
      <Button onClick={handleDetection} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Analyze Shipment Data
      </Button>
      {result && (
        <Alert variant={result.anomalyDetected ? "destructive" : "default"}>
          {result.anomalyDetected ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-accent" />}
          <AlertTitle>
            {result.anomalyDetected ? "Anomaly Detected!" : "No Anomaly Detected"}
          </AlertTitle>
          <AlertDescription>
            {result.explanation || "Shipment parameters appear to be within normal ranges."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
