import InquiriesTable from "@/components/admin/InquiriesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads Management | Admin Portal",
};

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Leads Management</h1>
          <p className="text-gray-500 text-sm mt-1">View, filter, and manage all incoming inquiries.</p>
        </div>
      </div>

      {/* Advanced Data Table Client Component */}
      <InquiriesTable />
    </div>
  );
}
