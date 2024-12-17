"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useData } from "@/context/data-context";
import { useEffect, useState } from "react";
import { ProductEntity, Stock } from "@/@types/entity";
import { uploadFile } from "@/api/clientService";
import axios from "axios";

type Props = {};

const initialFormData: Partial<ProductEntity> = {
  id: "",
  name: "",
  price: 0,
  category: "",
  image: "",
  images: [],
  description: "",
  shortDescription: "",
  stock: [{ size: "S", quantity: 0 }],
  status: "draft",
};

function ProductForm({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { id: paramsId } = useParams();
  const action = pathname.includes("create") ? "create" : "edit";
  const { getProductDetails, updateProduct, createProduct } = useData();
  const [files, setFiles] = useState<FileList | null>(null);
  const [productImageUrl, setProductImageUrl] = useState();

  const [formData, setFormData] =
    useState<Partial<ProductEntity>>(initialFormData);

  useEffect(() => {
    if (action === "edit") {
      getProductDetails(paramsId.toString()).then((data) => {
        console.log({data})
        setFormData(data.data);
        setProductImageUrl(data.data.image);
      });
    }
  }, [action, paramsId, getProductDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    console.log("type", type);

    setFormData((prevData) => ({
      ...prevData,
      [id]: type == "number" ? Number(value) : value,
    }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);

    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (files) {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append(`files[${i}]`, files[i]);
      }

      const response = await uploadFile(fd);
      // console.log("Response:", response);
      setProductImageUrl(response.url);
      setFormData((prevData) => ({ ...prevData, image: response.url }));
    }
  };

  const handleStockChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedStock = formData.stock.map((stock, i) =>
      i === index ? { ...stock, [field]: value } : stock
    );
    setFormData((prevData) => ({ ...prevData, stock: updatedStock }));
  };

  const addStockRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      stock: [...prevData.stock, { size: "S", quantity: 0 }],
    }));
  };

  const handleSave = async () => {
    if (paramsId) {
      const { id, ...restData } = formData;
      await updateProduct(paramsId.toString(), restData);
      router.push("/admin/products");
    } else {
      let payload = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        images: formData.images,
        description: formData.description,
        shortDescription: formData.shortDescription,
        stock: formData.stock,
        status: formData.status,
      };
      await createProduct(payload);
      router.push("/admin/products");
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Product
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              onClick={() => router.replace("/admin/products")}
              variant="outline"
              size="sm"
            >
              Discard
            </Button>
            <Button onClick={handleSave} size="sm">
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Enter the details of the product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-3 w-2/6">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      type="text"
                      className="w-full"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-32"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tshirt">Tshirt</SelectItem>
                        <SelectItem value="Jacket">Jacket</SelectItem>
                        <SelectItem value="Shirt">Shirt</SelectItem>
                        <SelectItem value="Pants">Pants</SelectItem>
                        <SelectItem value="Jeans">Jeans</SelectItem>
                        <SelectItem value="Shorts">Shorts</SelectItem>
                        <SelectItem value="Dress">Dress</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>Enter the stock information.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Size</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.stock.map((stock, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <ToggleGroup
                            type="single"
                            value={stock.size}
                            onValueChange={(value) =>
                              handleStockChange(index, "size", value)
                            }
                            variant="outline"
                          >
                            <ToggleGroupItem value="S">S</ToggleGroupItem>
                            <ToggleGroupItem value="M">M</ToggleGroupItem>
                            <ToggleGroupItem value="L">L</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`stock-${index}`} className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id={`stock-${index}`}
                            type="number"
                            value={stock.quantity}
                            onChange={(e) =>
                              handleStockChange(
                                index,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={addStockRow}
                >
                  <Upload className="h-3.5 w-3.5" />
                  Add Stock Row
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "draft" | "active" | "archived") =>
                        setFormData((prevData) => ({
                          ...prevData,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload and manage product images.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {productImageUrl && (
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-contain"
                      height="300"
                      src={
                        formData.image || productImageUrl || "/placeholder.svg"
                      }
                      width="300"
                    />
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {/* {formData.images.map((image, index) => (
                      <button key={index}>
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={image || "/placeholder.svg"}
                          width="84"
                        />
                      </button>
                    ))} */}
                    <button
                      onClick={handleSubmit}
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                    <Input
                      id="file"
                      type="file"
                      multiple
                      className="w-full cursor-pointer col-span-2"
                      onChange={handleFileInput}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Archive this product if it is no longer available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
}

export default ProductForm;
