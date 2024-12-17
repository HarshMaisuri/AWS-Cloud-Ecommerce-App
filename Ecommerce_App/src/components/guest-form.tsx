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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { signupApi } from "@/api/clientService";
import { useAuth } from "@/context/auth-context";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.coerce.string().email().min(5),
  contactNumber: z.string().length(10),
  address: z.string(),
  password: z.string(),
});

type Props = {};

export default function GuestForm({}: Props) {
  const router = useRouter();
  const { setAuthInfo } = useAuth();
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [otpValue, setOtpValue] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      address: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const res = await signupApi(values);
    if (res && res.data) {
      // Type guard to ensure res is not void and has data
      const { address, id, name, email } = res.data.data;
      setAuthInfo(id, name, email, address);
      setShowButton(false);
    } else {
      console.error("Signup failed. Response is invalid.");
      // Handle the case where signupApi did not return a valid response
    }

    // setShowOtpDialog(true);
  }

  function submitOtp() {
    // let orderId = "58da9d80-ee4b-49af-a9a5-db2bfec978dd";
    // router.push(`/orders/${orderId}`);
  }
  return (
    <div className=" max-w-3xl mx-auto my-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your First Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Last Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Your Contact Number"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
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
                  This is where the items will be delivered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {showButton && (
            <Dialog open={showOtpDialog}>
              <DialogTrigger asChild>
                <div>
                  <Button className="w-full" type="submit">
                    Confirm Address and Contact Details
                  </Button>
                  {/* <div>Click here to receive OTP on email</div> */}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Enter One-Time Password</DialogTitle>
                  <DialogDescription>
                    Weve sent a one-time password to your registered email
                    address. Please enter the code below to verify your
                    identity.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <InputOTP maxLength={6} pattern="^[0-9]+$">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <Button onClick={submitOtp}>Verify</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </form>
      </Form>
    </div>
  );
}
