import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/UserForm";
import { useEntityData } from "@/hooks/useEntityData";
import { UserEntity } from "@/@types/entity";

type Props = {};

function UsersTable({}: Props) {
  const [selectedUser, setSelectedUser] = useState<Partial<UserEntity>>();
  const users = useEntityData("users") as UserEntity[];
  console.log("users", users);

  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8 lg:grid lg:grid-cols-[1fr_400px]">
      <div className="border shadow-sm rounded-lg p-2">
        <Table>
          <TableHeader className="w-full">
            <div className="w-full flex justify-between">
              <div className="text-lg font-semibold mx-2">Users</div>
            </div>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              {/* <TableHead className="hidden md:table-cell">Orders</TableHead> */}
              {/* <TableHead className="text-right">Total Spent</TableHead> */}
              <TableHead className="hidden sm:table-cell">Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length != 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`cursor-pointer ${
                    selectedUser?.id === user.id ? "bg-muted/20" : ""
                  }`}
                >
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.contactNumber}
                  </TableCell>
                  {/* <TableCell className="hidden md:table-cell">
                  {user.orders}
                </TableCell> */}
                  {/* <TableCell className="text-right">${user.totalSpent}</TableCell> */}
                  <TableCell className="hidden sm:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View user</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>NO DATA</TableRow>
            )}
          </TableBody>
          {/* <TableFooter className="">
            <Button variant="secondary" onClick={() => setSelectedUser({})}>
              Create User
            </Button>
          </TableFooter> */}
        </Table>
      </div>
      {selectedUser && (
        <div className="border shadow-sm rounded-lg p-6 lg:col-span-1">
          <div className="grid gap-6">
            <UserForm user={selectedUser} setUser={setSelectedUser} />
          </div>
        </div>
      )}
    </main>
  );
}

export default UsersTable;
