import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useData } from "@/context/data-context";
import { Loader2 } from "lucide-react";
import { UserEntity } from "@/@types/entity";

type Props = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
};
const initalFormState = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  address: "",
};

const UserForm = ({ user, setUser }: Props) => {
  const { deleteUser, createUser, updateUser } = useData();
  const [isDeleting, setIsDeleting] = useState(false);
  // const [saveLoading, setSaveLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initalFormState);

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      let { id, ...rest } = user;
      setFormData(rest);
    }

    if (user.id == undefined) {
      setIsEditing(true);
    } else {
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    // setSaveLoading(true);
    if (user.id) {
      await updateUser(user.id, formData);
    } else {
      await createUser(formData);
    }
    // setSaveLoading(false);
    setIsEditing(false);
  };
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      setFormData(initalFormState);
      setUser(null);
      // The users state in the context will be automatically updated
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsDeleting(false);
    }
  };

  console.log("f", formData);

  return (
    <div className="grid gap-2">
      <h2 className="text-2xl font-bold">
        {formData.firstName == "" ? "Create New User" : formData.firstName}
      </h2>
      <div className="mx-auto p-2 w-full">
        <div className="space-y-6">
          <div className="space-y-2"></div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  >
                    <EyeIcon />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className=" space-y-2">
            <div className="space-x-4">
              {isEditing ? (
                <Button onClick={handleSave}>
                  {/* {saveLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )} */}
                  Save
                </Button>
              ) : (
                <Button onClick={handleEdit}>Edit Form</Button>
              )}
              <Button
                disabled={isDeleting}
                onClick={handleDeleteUser}
                variant="outline"
              >
                {isDeleting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function EyeIcon() {
  return (
    <svg
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default UserForm;
