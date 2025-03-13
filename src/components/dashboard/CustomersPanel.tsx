
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  UserPlus, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  MapPin,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    status: "active",
    totalDebt: "$4,250.00",
    lastPayment: "2025-03-01",
    paymentStatus: "current"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 987-6543",
    location: "Miami, USA",
    status: "active",
    totalDebt: "$1,875.50",
    lastPayment: "2025-03-05",
    paymentStatus: "current"
  },
  {
    id: 3,
    name: "James Smith",
    email: "james.smith@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    status: "inactive",
    totalDebt: "$6,320.75",
    lastPayment: "2025-01-15",
    paymentStatus: "overdue"
  },
  {
    id: 4,
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, USA",
    status: "active",
    totalDebt: "$2,100.25",
    lastPayment: "2025-02-28",
    paymentStatus: "current"
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@example.com",
    phone: "+1 (555) 876-5432",
    location: "San Antonio, USA",
    status: "pending",
    totalDebt: "$3,450.00",
    lastPayment: "2025-02-20",
    paymentStatus: "warning"
  }
];

const CustomersPanel = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddCustomer = (data: any) => {
    const newCustomer = {
      id: customers.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      status: "pending",
      totalDebt: "$0.00",
      lastPayment: "-",
      paymentStatus: "current"
    };
    
    setCustomers([...customers, newCustomer]);
    setShowNewCustomerForm(false);
    form.reset();
    
    toast.success("Customer added successfully", {
      description: `${data.name} has been added to your customer list.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "overdue":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships and accounts
          </p>
        </div>
        <Button onClick={() => setShowNewCustomerForm(!showNewCustomerForm)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {showNewCustomerForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Customer</CardTitle>
                <CardDescription>
                  Enter the customer information below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddCustomer)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter customer name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" type="button" onClick={() => setShowNewCustomerForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Customer
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">Customer</th>
                    <th className="h-10 px-4 text-left font-medium">Contact</th>
                    <th className="h-10 px-4 text-left font-medium">Location</th>
                    <th className="h-10 px-4 text-left font-medium">Status</th>
                    <th className="h-10 px-4 text-left font-medium">Total Debt</th>
                    <th className="h-10 px-4 text-left font-medium">Last Payment</th>
                    <th className="h-10 px-4 text-left font-medium">Payment Status</th>
                    <th className="h-10 px-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{customer.name}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{customer.location}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {getStatusBadge(customer.status)}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>{customer.totalDebt}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{customer.lastPayment}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-1">
                          {getPaymentStatusIcon(customer.paymentStatus)}
                          <span className="capitalize">{customer.paymentStatus}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Customers</CardTitle>
              <CardDescription>
                Manage all your active customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Active customers content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Customers</CardTitle>
              <CardDescription>
                Review and reactivate inactive customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Inactive customers content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Accounts</CardTitle>
              <CardDescription>
                Manage customers with overdue payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Overdue accounts content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomersPanel;
