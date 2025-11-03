import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Beaker } from "lucide-react";

export default function LimsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Laboratory Information Management System (LIMS)</h1>
      <Card>
        <CardHeader>
          <CardTitle>LIMS Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground p-8">
            <FlaskConical className="h-16 w-16" />
            <p className="max-w-md">
              This section will integrate with the Laboratory Information Management System to display sample testing data, analysis results, and quality control metrics.
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary" />
                <span>Sample Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary" />
                <span>Results Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary" />
                <span>QC Dashboard</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
