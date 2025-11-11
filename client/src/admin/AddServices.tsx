import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditServices from "./EditServices";
import { ServicesFormSchema, servicesSchema } from "@/schema/servicesSchema";
import { useServiceStore } from "@/store/useServiceStore";
import { useGuideStore } from "@/store/useGuideStore";


const AddServices = () => {
  const [input, setInput] = useState<ServicesFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<any>();
  const [error, setError] = useState<Partial<ServicesFormSchema>>({});
  const {loading, createServices}=useServiceStore();
  const {guide}=useGuideStore();

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
      await createServices(formData);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div className="max-w-6xl mx-auto my-10 mt-20">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Services
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-purple hover:bg-hoverPurple">
              <Plus className="mr-1" />
              Add Services
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new Service</DialogTitle>
              <DialogDescription>
                Create a service that will make you stand out.
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
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {error && <span className="text-xs font-medium text-red-600">{error.image?.name }</span>}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled className="bg-purple hover:bg-hoverPurple">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait!
                  </Button>
                ) : (
                  <Button className="bg-purple hover:bg-hoverPurple">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {guide?.services.map((service: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={service.image}
              alt=""
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {service.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price:{" "}
                <span className="text-[#7d239b]">Rs.{service.price}/hr</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedService(service);
                setEditOpen(true);
              }}
              size={"sm"}
              className="bg-purple hover:bg-hoverPurple mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditServices
        selectedService={selectedService}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};
export default AddServices;
