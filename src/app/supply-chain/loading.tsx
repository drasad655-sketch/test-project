import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Loading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Supply Chain Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-32" /></TableHead>
            <TableHead><Skeleton className="h-5 w-32" /></TableHead>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-28" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell><Skeleton className="h-5 w-32" /></TableCell>
              <TableCell><Skeleton className="h-5 w-32" /></TableCell>
              <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-5 w-28" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-[120px] ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
