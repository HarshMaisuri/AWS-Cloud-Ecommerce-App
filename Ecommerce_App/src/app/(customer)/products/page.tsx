// app/products/page.tsx

import { ProductList } from "@/components/product-list";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/products");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <ProductList />
    </div>
  );
}
