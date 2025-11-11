import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/bookingType";
import { useCartStore } from "@/store/useCartStore";
import { useGuideStore } from "@/store/useGuideStore";
import { useBookingStore } from "@/store/useBookingStore";
import { Loader2 } from "lucide-react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { guide } = useGuideStore();

  useEffect(() => {
    useGuideStore.getState().getGuide();
  }, []);

  const { createCheckOutSession, loading } = useBookingStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API Implementation
    if (!guide || !guide._id) {
      console.error("Guide is not available in the store!");
      return;
    }
    try {
      const checkoutData: CheckoutSessionRequest = {
        selectedItems: cart.map((selectedItem) => ({
          serviceId: selectedItem._id,
          name: selectedItem.name,
          image: selectedItem.image,
          price: selectedItem.price.toString(),
          duration: selectedItem.duration.toString(),
          travelers: selectedItem.travelers.toString(),
        })),
        bookingDetails: input,
        guideId: guide?._id as string,
      };
      await createCheckOutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-semibold">
            Review Your Booking
          </DialogTitle>
          <DialogDescription className="text-xs">
            Double check your booking details and ensure everything is correct.
            When you are ready, hit confirm button to finalize your booking.
          </DialogDescription>
          <form
            onSubmit={checkoutHandler}
            className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
          >
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                disabled
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                type="text"
                name="contact"
                value={input.contact}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={input.address}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
              />
            </div>
            <DialogFooter className="col-span-2 pt-5">
              {loading ? (
                <Button disabled className="bg-purple hover:bg-hoverPurple">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait!
                </Button>
              ) : (
                <Button className="bg-purple hover:bg-hoverPurple">
                  Continue to Payment
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CheckoutConfirmPage;
