"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash, Trash2, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductEntity } from "@/@types/entity";
import { useEntityData } from "@/hooks/useEntityData";
import { useData } from "@/context/data-context";

export default function AdminProductsTable() {
  const router = useRouter();
  const products = useEntityData("products") as ProductEntity[];
  const { deleteProduct } = useData();

  const handleRowClick = (id: string) => {
    router.push(`/admin/products/${id}`);
  };

  const handleCreateProduct = () => {
    router.push("/admin/products/create");
  };

  console.log("products", products);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <Button onClick={handleCreateProduct}>Create Product</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Sizes Available
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">
                <span>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                onClick={() => handleRowClick(product.id)}
                className="cursor-pointer"
              >
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product Image"
                    className="aspect-square rounded-md object-contain"
                    height="64"
                    src={product.image || "/placeholder.svg"}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "active" ? "outline" : "secondary"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${Number(product.price).toFixed(2)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.stock?.map(({ size }) => (
                    <Badge variant="outline" key={size}>
                      {size}
                    </Badge>
                  )) ?? "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.createdAt}
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    className=" hover:text-red-700"
                    width={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{products.length}</strong> of{" "}
          <strong>{products.length}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
