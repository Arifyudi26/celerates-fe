/* eslint-disable @next/next/no-img-element */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { User, Props } from "@/lib/types";
import UserAPIs from "../services/UserAPIs";
import { Button } from "@/components/ui/button";
import EditUserModal from "@/components/EditUserModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Swal from "sweetalert2";
import PdfUser from "@/components/pdf/PdfUserMinimal";
import { useRouter } from "next/navigation";

export default function UsersPage({}: Props) {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await UserAPIs.getUsers();
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to fetch user data. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10"
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
                "name"
              )}`}
              alt="user-image"
            />
            <p>{row.getValue("name")} </p>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "website",
      header: "Website",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            <Button
              variant="secondary"
              className="w-full sm:w-auto rounded p-2 bg-black text-white hover:bg-black/90 text-sm"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </Button>

            <Button
              variant="secondary"
              className="w-full sm:w-auto rounded p-2 bg-blue-500 text-white hover:bg-blue-600 text-sm"
              onClick={() => router.push(`users/${row.original.id}`)}
            >
              View PDF
            </Button>

            <PDFDownloadLink
              document={<PdfUser user={row.original} />}
              fileName={`${row.original.name}-profile.pdf`}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded p-3 bg-green-500 text-white hover:bg-green-600 text-sm"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        );
      },
    },
  ];

  const handleSave = async (updatedUser: User) => {
    try {
      const response = await UserAPIs.updateUser(updatedUser.id, updatedUser);

      if (response.status === 200) {
        setIsOpen(false);

        Swal.fire({
          title: "Success!",
          text: "User data updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          loadData();
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Failed to update user:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update user data. Please try again.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Popup Edit User */}
      <EditUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />

      <PageTitle title="Users" />

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-10 bg-gray-300 rounded"></div>
          ))}
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
