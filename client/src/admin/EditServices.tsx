import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServicesFormSchema, servicesSchema } from "@/schema/servicesSchema";
import { useServiceStore } from "@/store/useServiceStore";
import { ServicesItem } from "@/types/guideType";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditServices = ({
  selectedService,
  editOpen,
  setEditOpen,
}: {
  selectedService: ServicesItem;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<ServicesFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError]=useState<Partial<ServicesFormSchema>>({});
  const {loading, editServices}=useServiceStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = servicesSchema.safeParse(input);
        if (!result.success) {
          const fieldErrors = result.error.formErrors.fieldErrors;
          setError(fieldErrors as Partial<ServicesFormSchema>);
          return;
        }
    // API Implementation
    try {
      const formData=new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if(input.image){
        formData.append("image", input.image);
      }
      await editServices(selectedService._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInput({
      name: selectedService?.name || "",
      description: selectedService?.description || "",
      price: selectedService?.price || 0,
      image: undefined,
    });
  }, [selectedService]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update your services to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter service name"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter service description"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <Label>Price in (Rs/hr)</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter service price"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <Label>Upload Service Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />
            {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-purple hover:bg-hoverPurple">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait!
              </Button>
            ) : (
              <Button className="bg-purple hover:bg-hoverPurple">Submit</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditServices;
