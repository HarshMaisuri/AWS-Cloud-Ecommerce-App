"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { OrderEntity } from "@/@types/entity";
import { useEntityData } from "@/hooks/useEntityData";
import { useData } from "@/context/data-context";

// Sample order data (replace with your actual data source)
// const orders = [
//   {
//     id: 1,
//     customer: "John Doe",
//     email: "john.doe@example.com",
//     type: "Sale",
//     status: "Fulfilled",
//     date: "2023-06-23",
//     amount: 250.0,
//   },
//   {
//     id: 2,
//     customer: "Jane Smith",
//     email: "jane.smith@example.com",
//     type: "Return",
//     status: "Pending",
//     date: "2023-07-15",
//     amount: 120.5,
//   },
//   {
//     id: 3,
//     customer: "Liam Neeson",
//     email: "neeson@example.com",
//     type: "Sale",
//     status: "Fulfilled",
//     date: "2024-06-23",
//     amount: 250.0,
//   },
//   {
//     id: 4,
//     customer: "Liam Hemsworht",
//     email: "hemsworth@example.com",
//     type: "Sale",
//     status: "Fulfilled",
//     date: "2023-07-23",
//     amount: 290.0,
//   },
// ];

export default function OrdersTable() {
  const orders = useEntityData("orders") as OrderEntity[];
  const { updateOrder, getOrderDetails, deleteOrder } = useData();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState<
    "pending" | "fulfilled" | "declined" | null
  >(null);

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = (
    newStatus: "pending" | "fulfilled" | "declined"
  ) => {
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    setUpdatedStatus(newStatus);
    // Here you would typically update the order status in your backend
  };

  const handleSaveChanges = async () => {
    if (selectedOrder && updatedStatus) {
      try {
        const updatedOrder = await updateOrder(selectedOrder.id, {
          status: updatedStatus,
        });

        // Update the local state to reflect the change
        // setSelectedOrder(updatedOrder);

        // Update the order in the orders list
        // const updatedOrders = orders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        // You might need to update the orders list in your global state here
        // For example: setOrders(updatedOrders);

        setUpdatedStatus(null); // Reset updated status after successful update
      } catch (error) {
        console.error("Failed to update order:", error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  async function handleDeleteOrder() {
    await deleteOrder(selectedOrder?.id);
  }

  return (
    <div className="flex">
      <div className="w-2/3 pr-4">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={`cursor-pointer ${
                      selectedOrder?.id === order.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleRowClick(order)}
                  >
                    <TableCell>
                      {/* <div className="font-medium">{order.customer}</div> */}
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.type}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className="text-xs"
                        variant={
                          order.status === "fulfilled" ? "secondary" : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt}
                    </TableCell>
                    <TableCell className="text-right">${order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedOrder && (
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Details: </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Order ID</label>
                  <Input value={selectedOrder.id} readOnly />
                </div>
                <div>
                  <label className="font-medium">Email</label>
                  <Input value={selectedOrder.email} readOnly />
                </div>
                <div>
                  <label className="font-medium">Type</label>
                  <Input value={selectedOrder.type} readOnly />
                </div>
                <div>
                  <label className="font-medium">Status</label>
                  <Select
                    onValueChange={handleStatusChange}
                    defaultValue={selectedOrder}
                  >
                    <SelectTrigger>
                      <SelectValue>{selectedOrder.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="font-medium">Date</label>
                  <Input value={selectedOrder.createdAt} readOnly />
                </div>
                <div>
                  <label className="font-medium">Amount</label>
                  <Input value={`$${selectedOrder.total}`} readOnly />
                </div>
                <div className="space-x-2">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                  <Button variant="destructive" onClick={handleDeleteOrder}>
                    Delete Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
