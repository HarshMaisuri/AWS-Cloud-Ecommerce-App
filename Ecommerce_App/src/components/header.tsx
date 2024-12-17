"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DummyLogo from "../../public/dummy-logo.jpg";
import LoginIcon from "../../public/login.svg";
import LogoutIcon from "../../public/logout.svg";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  // const firstName = window.localStorage.getItem("firstName");
  const [firstName, setFirstName] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  function handleLogout() {
    window.localStorage.clear();
    router.push("/");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFirstName = window.localStorage.getItem("firstName");
      setFirstName(storedFirstName);
    }
  }, []);
  return (
    <div className=" w-full bg-gray-100 flex justify-between px-5 gap-2 items-center">
      <div className="logo flex space-x-2">
        <Image
          className="m-3"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "100px",
          }}
          src={DummyLogo}
          width={800}
          height={800}
          alt="logo"
        />
        {/* Deham Clothing */}
      </div>
      <nav className="flex gap-4">
        <Link
          className={
            pathname.includes("products") ? "font-semibold underline" : ""
          }
          href="/products"
        >
          Products
        </Link>
        <Link
          className={pathname.includes("cart") ? "font-semibold underline" : ""}
          href="/cart"
        >
          Cart
        </Link>
        <Link
          className={
            pathname.includes("checkout") ? "font-semibold underline" : ""
          }
          href="/checkout"
        >
          Checkout
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        {firstName && <div>Hello {firstName}</div>}
        {firstName ? (
          // <Link href="/">
          <Button
            onClick={handleLogout}
            title="Logout"
            variant="outline"
            size="icon"
          >
            <Image src={LogoutIcon} width={24} height={24} alt="cart-icon" />
          </Button>
        ) : (
          // </Link>
          <Link href="/login">
            <Button title="Login" variant="outline" size="icon">
              <Image src={LoginIcon} width={24} height={24} alt="cart-icon" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
