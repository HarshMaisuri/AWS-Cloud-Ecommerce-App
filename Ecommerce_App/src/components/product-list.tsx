
"use client";

import { useState, useMemo, ReactNode, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Product, ProductListItem } from "@/@types/product";
import { ProductEntity } from "@/@types/entity";
import { getClientProducts } from "@/api/clientService";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

export function ProductList() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory
        ? product.category === selectedCategory
        : true;
      const sizeMatch = selectedSize.length
        ? selectedSize.some((size) =>
            product.stock
              .map(({ quantity, size }) => (quantity ? size : ""))
              .includes(size)
          )
        : true;

      const searchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && sizeMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory, selectedSize, products]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  const handleSizeChange = (size: string) => {
    console.log("size", size);

    setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((s) => s !== size)
        : [...prevSize, size]
    );
  };

  useEffect(() => {
    getClientProducts().then((res) => {
      if (res && res.data) setProducts(res.data.data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 space-y-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory}
                  // className="w-full mt-1"
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Tshirt">Tshirt</SelectItem>
                    <SelectItem value="Jacket">Jacket</SelectItem>
                    <SelectItem value="Shirt">Shirt</SelectItem>
                    <SelectItem value="Pants">Pants</SelectItem>
                    <SelectItem value="Jeans">Jeans</SelectItem>
                    <SelectItem value="Shorts">Shorts</SelectItem>
                    <SelectItem value="Dress">Dress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
                <Label>Size</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["S", "M", "L"].map((size) => (
                    <Checkbox
                      key={size}
                      checked={selectedSize.includes(size)}
                      onCheckedChange={() => handleSizeChange(size)}
                    >
                      {size}
                    </Checkbox>
                  ))}
                </div>
              </div> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <Link
              href={`/products/${product.id}`}
              className="block"
              prefetch={false}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">${product.price}</p>
                {/* <Button
                  onClick={() => handleAddToCart(product)}
                  size="sm"
                  className="mt-4 bg-gray-800 text-white"
                >
                  Add to Cart
                </Button> */}
                <div className="text-sm">{product.shortDescription}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
