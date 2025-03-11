/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import PdfUserMinimal from "@/components/pdf/PdfUserMinimal";
import PdfUserModern from "@/components/pdf/PdfUserModern";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import UserAPIs from "@/app/services/UserAPIs";
import { User } from "@/lib/types";
import Swal from "sweetalert2";

function ViewUserPDF() {
  const router = useRouter();
  const param = useParams();

  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await UserAPIs.getDetailUsers(Number(param.id));
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to fetch user details. Please try again later.",
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

  const getTemplate = () => {
    switch (selectedTemplate) {
      case "minimal":
        return <PdfUserMinimal user={data} />;
      case "modern":
        return <PdfUserModern user={data} />;
      default:
        return <PdfUserMinimal user={data} />;
    }
  };

  const generatePDF = async () => {
    if (!data) return;
    setGenerating(true);

    const doc = getTemplate();
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfBlobUrl(url);

    setTimeout(() => {
      setGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    generatePDF();
  }, [selectedTemplate, data]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-lg font-bold">User PDF Preview</h1>

      {loading ? (
        // Skeleton loader while fetching data
        <div className="animate-pulse w-full max-w-lg h-96 bg-gray-300 rounded-md"></div>
      ) : (
        <>
          {/* Dropdown for selecting the PDF template */}
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="minimal">Minimal Template</option>
            <option value="modern">Modern Template</option>
          </select>

          {/* Display PDF preview or loading effect */}
          {generating ? (
            <div className="animate-pulse w-full max-w-lg h-96 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              Generating PDF...
            </div>
          ) : pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              width="100%"
              height="600px"
              className="border rounded-md"
            ></iframe>
          ) : (
            <div className="text-center text-red-500">Failed to load PDF.</div>
          )}
        </>
      )}

      {/* Back button to navigate to the users list */}
      <div className="flex justify-center items-center mt-2">
        <Button
          variant="secondary"
          className="rounded p-2 bg-red-500 text-white hover:bg-red-600 text-sm"
          onClick={() => router.push("/users")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default ViewUserPDF;
