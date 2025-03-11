/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";

const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is too short"),
  website: z.string().url("Invalid URL"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditUserModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {},
  });

  useEffect(() => {
    if (user) {
      reset({ ...user });
    }
  }, [user, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update your profile information below. Click "Save" to apply
            changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSave)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <Input {...register("username")} />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <Input {...register("phone")} />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Website</label>
              <Input {...register("website")} />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded bg-gray-100">
            <label className="block text-sm font-medium mb-2">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...register("address.street")} placeholder="Street" />
              <Input {...register("address.suite")} placeholder="Suite" />
              <Input {...register("address.city")} placeholder="City" />
              <Input {...register("address.zipcode")} placeholder="Zipcode" />
            </div>
          </div>

          <div className="border p-4 rounded bg-gray-100">
            <label className="block text-sm font-medium mb-2">Company</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...register("company.name")} placeholder="Company Name" />
              <Input
                {...register("company.catchPhrase")}
                placeholder="Catchphrase"
              />
              <Input
                {...register("company.bs")}
                placeholder="Business Strategy"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
