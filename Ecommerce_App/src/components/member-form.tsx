"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, FormEventHandler, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/context/auth-context";
import { postLogin } from "@/api/clientService";

const formSchema = z.object({
  email: z.coerce.string().email().min(5),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  address: z.string(),
});

type Props = {};

export default function MemberForm({}: Props) {
  const { setAuthInfo } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showContactFields, setShowContactFields] = useState<boolean>(false);

  function onSubmit(
    e: FormEvent<HTMLFormElement>,
    values: z.infer<typeof formSchema>
  ) {
    // function onSubmit(e) {
    e.preventDefault();

    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    postLogin(values).then((data) => {
      const { address, id, name, email } = data.data;
      setAuthInfo(id, name, email, address);
      setShowContactFields(true);
      form.setValue("address", address);
    });
  }

  return (
    <div className=" max-w-3xl mx-auto my-5">
      <Form {...form}>
        <form
          onSubmit={(e) => onSubmit(e, form.getValues())}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {showContactFields && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your Shipping Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please confirm the address. This is where the items will be
                    delivered
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!showContactFields && (
            <Button className="w-full" type="submit">
              Fetch Contact & Shipping Details
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
