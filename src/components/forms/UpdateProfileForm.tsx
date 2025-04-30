import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components /ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components /ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components /ui/form";
import { Input } from "@/components /ui/input";
import { UpdateProfileValidation } from "@/lib/validation";
import Loader from "@/components /shared/Loader";
import {
  useGetCurrentUser,
  useUpdateAccout,
} from "@/lib/react-query/queriesAndMutations";
import { Textarea } from "../ui/textarea";
import ProfileFileUploader from "../shared/ProfileFileUploader";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: user, isPending: isUserLoading } = useGetCurrentUser();

  const { mutateAsync: updateUserAccount, isPending: isUpdatingAccount } =
    useUpdateAccout();

  console.log(user);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    // resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      ...user,
      file: user?.file || []
    },

  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
    console.log("values here ");
    console.log(values);
    console.log('trying to update')
    const updatedUser = await updateUserAccount(values);
    console.log('updated the user')
    console.log(updatedUser);

    if (!updatedUser) {
      return toast({
        title: "Profile update failed. Please try again",
      });
    }
    toast({
      title: "Profile updated successfully."
    })
    return navigate(`/profile/${user?.accountId}`)
  }

  return (
    <Form {...form}>
      <div className="max-w flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4 flex-1"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileFileUploader
                    fieldChange={field.onChange}
                    mediaUrl={user?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
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
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="shad-textarea resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="shad-button_primary flex-end">
              {isUpdatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading ...
                </div>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UpdateProfileForm;
