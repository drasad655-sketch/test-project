import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Reporting & Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground p-8">
            <FileText className="h-16 w-16" />
            <p className="max-w-md">
              This module provides comprehensive reporting capabilities. Generate, view, and export reports on inventory, sales, supply chain performance, and more to gain valuable insights into your operations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
