"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GuestForm from "./guest-form";
import MemberForm from "./member-form";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { OrderEntity } from "@/@types/entity";
import { placeOrder } from "@/api/clientService";
import { useRouter } from "next/navigation";

export function CheckoutComponent() {
  const { id: userId, email, firstName } = useAuth();
  const { items, clearCart } = useCart();
  console.log("itgems", items);
  const router = useRouter();
  let total = items.reduce((acc, cartItem) => {
    const { product, quantity } = cartItem;
    const { price } = product;

    return acc + price * quantity;
  }, 0);

  async function handlePlaceOrder() {
    console.log("place order", userId, name, email);

    if (userId && email) {
      let payload: Omit<OrderEntity, "id" | "createdAt" | "name"> = {
        type: "sale",
        status: "pending",
        customerId: userId,
        email: email,
        items: items,
        total: total,
      };

      const response = await placeOrder(payload);
      if (response && response.data) alert(response.data.message);
      router.push("/products");
    }
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-8 bg-muted/40 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:px-8 xl:grid-cols-[1fr_300px] xl:gap-16">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your order</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="guest">
              <TabsList>
                <TabsTrigger value="guest">Guest Checkout</TabsTrigger>
                <TabsTrigger value="member">Member Checkout</TabsTrigger>
              </TabsList>
              <TabsContent value="guest">
                <GuestForm />
              </TabsContent>
              <TabsContent value="member">
                <MemberForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePlaceOrder} className="w-full">
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{item.product.name}</span>
                      <span>${item.product.price * item.quantity}</span>
                    </div>
                  );
                })}
                {/* <div className="flex items-center justify-between">
                  <span>Glimmer Lamps</span>
                  <span>$99.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Aqua Filters</span>
                  <span>$49.00</span>
                </div> */}
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div>Liam Johnson</div>
              <div>1234 Main St.</div>
              <div>Anytown, CA 12345</div>
            </div>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5" />
              <span>Cash on Delivery</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
