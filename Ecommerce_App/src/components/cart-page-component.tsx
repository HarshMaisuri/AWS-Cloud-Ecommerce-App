"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Image from "next/image";

type IconProps = {};

export function CartPageComponent() {
  const { items, removeFromCart, updateQty } = useCart();
  let total = items.reduce((acc, cartItem) => {
    const { product, quantity } = cartItem;
    const { price } = product;

    return acc + price * quantity;
  }, 0);

  function handleRemoveItem(id: string) {
    removeFromCart(id);
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 p-4 md:p-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Bag</h2>
        <div className="flex flex-col space-y-6">
          {items.map((cartItem, index) => {
            const { product, size, quantity } = cartItem;
            const { id, price, shortDescription, name, category, image } =
              product;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 border-b pb-4"
              >
                <Image
                  width={100}
                  height={100}
                  src={image ? image : "/placeholder.svg"}
                  alt="product image"
                  className="w-36 h-36 object-contain"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {shortDescription}
                  </p>
                  <p className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-lg w-min">
                    {category}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm">Size</span>
                    <span className="text-sm font-medium">{size}</span>
                    <span className="text-sm">Quantity</span>
                    <Select
                      value={quantity.toString()}
                      onValueChange={(value) => updateQty(id, Number(value))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue defaultValue={quantity} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  ${price}
                  <span className="text-lg font-semibold"></span>
                  <div onClick={() => handleRemoveItem(id)} className="">
                    <TrashIcon className="w-6 h-6 text-muted-foreground cursor-pointer" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm">Total</span>
            <span className="text-sm font-medium">${total}</span>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${total}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full text-lg bg-black text-white py-8 my-8 rounded-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// function HeartIcon(props: { className: string }) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//     </svg>
//   );
// }

function TrashIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
