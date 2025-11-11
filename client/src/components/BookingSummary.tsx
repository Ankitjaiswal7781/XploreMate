import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartTypes";

const BookingSummary = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    incrementDuration,
    incrementTraveler,
    decrementDuration,
    decrementTraveler,
    removeFromTheCart,
    clearCart,
  } = useCartStore();
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.duration * ele.travelers;
  }, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 mt-20">
      <div className="flex justify-end">
        <Button variant={"link"} onClick={clearCart}>
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guide</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration(hrs)</TableHead>
            <TableHead>Travelers</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>Rs.{item.price}/hr</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementDuration(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    size={"icon"}
                    variant={"outline"}
                    className="font-bold border-none"
                  >
                    {item.duration}
                  </Button>
                  <Button
                    onClick={() => incrementDuration(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-purple hover:bg-hoverPurple"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementTraveler(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    size={"icon"}
                    variant={"outline"}
                    className="font-bold border-none"
                  >
                    {item.travelers}
                  </Button>
                  <Button
                    onClick={() => incrementTraveler(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-purple hover:bg-hoverPurple"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {item.price * item.duration * item.travelers}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  className="bg-purple hover:bg-hoverPurple"
                  onClick={() => removeFromTheCart(item._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-lg font-semibold">
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-purple hover:bg-hoverPurple"
        >
          Proceed to Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};
export default BookingSummary;
