import { NextRequest } from "next/server";

// app/api/products/route.js
export async function GET(request: NextRequest) {
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 150 },
  ];
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
