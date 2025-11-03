
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  supplier: z.string().min(1, 'Supplier is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  distributionChannel: z.string().min(1, 'Distribution channel is required'),
  transportationMethod: z.string().min(1, 'Transportation method is required'),
  status: z.enum(['In Transit', 'Delayed', 'Delivered', 'Pending']),
});

export function AddShipmentForm() {
  const [open, setOpen] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: '',
      manufacturer: '',
      distributionChannel: '',
      transportationMethod: '',
      status: 'Pending',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!firestore) return;
    const supplyChainsCollection = collection(firestore, 'supplyChains');
    addDocumentNonBlocking(supplyChainsCollection, values);
    toast({
      title: 'Success!',
      description: 'New shipment has been added.',
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Shipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Shipment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Raw Material Co." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. PharmaCorp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distributionChannel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distribution Channel</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. National Distributors" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transportationMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transportation Method</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Refrigerated Truck" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                   <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                       <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Shipment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
