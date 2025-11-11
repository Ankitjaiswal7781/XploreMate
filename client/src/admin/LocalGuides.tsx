import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { guideFormSchema, GuideFormSchema } from "@/schema/guideSchema";
import { useGuideStore } from "@/store/useGuideStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const LocalGuides = () => {
  const [input, setInput] = useState<GuideFormSchema>({
    guideName: "",
    city: "",
    country: "",
    tourDuration: 0,
    servicesTypes: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<Partial<GuideFormSchema>>({});

  const { loading, guide, updateGuide, createGuide, getGuide } = useGuideStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = guideFormSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<GuideFormSchema>);
      return;
    }
    // add Guide API Implementation
    try {
      const formData = new FormData();
      formData.append("guideName", input.guideName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("tourDuration", input.tourDuration.toString());
      formData.append("servicesTypes", JSON.stringify(input.servicesTypes));
      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
      if (guide) {
        //update
        await updateGuide(formData);
      } else {
        //create
        await createGuide(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGuide = async () => {
      await getGuide();
      setInput({
        guideName: guide.guideName || "",
        city: guide.city || "",
        country: guide.country || "",
        tourDuration:guide.tourDuration || 0,
        servicesTypes: guide.servicesTypes ? guide.servicesTypes.map((serviceType:string)=>serviceType): [],
        imageFile: undefined,
      });
    };
    fetchGuide();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10 mt-20">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Local Guides</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Guide Details */}
              <div>
                <Label>Guide Name</Label>
                <Input
                  type="text"
                  name="guideName"
                  value={input.guideName}
                  onChange={changeEventHandler}
                  placeholder="Enter your guide name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.guideName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Estimated Tour Duration (hours)</Label>
                <Input
                  type="number"
                  name="tourDuration"
                  value={input.tourDuration}
                  onChange={changeEventHandler}
                  placeholder="Enter your tour duration"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.tourDuration}
                  </span>
                )}
              </div>
              <div>
                <Label>Services Types</Label>
                <Input
                  type="text"
                  name="services"
                  value={input.servicesTypes}
                  onChange={(e) =>
                    setInput({ ...input, servicesTypes: e.target.value.split(",") })
                  }
                  placeholder="e.g. City Exploration Tours, Cultural Tours"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.servicesTypes}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload your Image</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="imageFile"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-purple hover:bg-hoverPurple">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait!
                </Button>
              ) : (
                <Button className="bg-purple hover:bg-hoverPurple">
                  {guide ? "Update Local Guide" : "Add Local Guide"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LocalGuides;
