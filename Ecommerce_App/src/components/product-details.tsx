"use client";

import { ProductEntity } from "@/@types/entity";
import { getClientProductById } from "@/api/clientService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useCart } from "@/context/cart-context"; // Update the import path as necessary

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<ProductEntity>();
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | null>(
    null
  );
  const { addToCart } = useCart();

  useEffect(() => {
    getClientProductById(id).then((res) => {
      if (res && res.data) setProductDetails(res.data.data);
    });
  }, [id]);

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleAddToCart = () => {
    if (productDetails && selectedSize) {
      addToCart({
        product: productDetails,
        size: selectedSize,
        quantity: 1,
      });
      router.push("/cart");
    } else {
      alert("Please select a size.");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
      <div className="grid gap-4">
        <Image
          src={
            productDetails?.image ? productDetails.image : `/placeholder.svg`
          }
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square object-contain w-full rounded-lg"
        />

        {/* {productDetails?.images.length > 0 ? (
          <div className="flex gap-4 overflow-auto [&_img]:shrink-0 [&_img]:max-w-[120px]">
            {productDetails?.images.map((src) => {
              return (
                <Image
                  key={src}
                  src={src ?? `/placeholder.svg`}
                  alt="Product Thumbnail"
                  width={120}
                  height={120}
                  className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                />
              );
            })}
          </div>
        ) : (
          <div className="flex gap-4 overflow-auto [&_img]:shrink-0 [&_img]:max-w-[120px]">
            <Image
              src="/placeholder.svg"
              alt="Product Thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
            />
            <Image
              src="/placeholder.svg"
              alt="Product Thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
            />
            <Image
              src="/placeholder.svg"
              alt="Product Thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
            />
            <Image
              src="/placeholder.svg"
              alt="Product Thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
            />
            <Image
              src="/placeholder.svg"
              alt="Product Thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
            />
          </div>
        )} */}
      </div>
      <div className="grid gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{productDetails?.name}</h1>
          <p className="text-muted-foreground">
            {productDetails?.shortDescription}
          </p>
          <Badge className="text-sm">{productDetails?.category}</Badge>
        </div>
        <div className="text-4xl font-bold">${productDetails?.price}</div>
        <div>
          <h2 className="text-lg font-semibold">Select Size:</h2>
          <RadioGroup value={selectedSize} onValueChange={handleSizeChange}>
            {productDetails?.stock.map(({ size, quantity }) => (
              <div key={size} className="flex gap-2">
                <RadioGroupItem
                  id={size}
                  value={size}
                  disabled={quantity === 0}
                  className={`${
                    quantity === 0 ? "text-gray-400" : "text-black"
                  }`}
                />
                <Label htmlFor={size}>{size}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid gap-4">
          <Button size="lg" variant="outline" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            size="lg"
            className="bg-black text-white"
            variant="default"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
        <div className="grid gap-4 text-sm leading-loose">
          <p>{productDetails?.description}</p>
          <p>
            The classic crew neckline and relaxed fit provide a flattering
            silhouette, while the intricate knit pattern adds a touch of
            elegance to your wardrobe. Whether you&#39;re pairing it with your
            favorite jeans for a casual weekend look or layering it under a
            blazer for a more polished ensemble, this sweater is a versatile
            staple that will keep you feeling comfortable and confident all
            season long.
          </p>
        </div>
      </div>
    </div>
  );
}
