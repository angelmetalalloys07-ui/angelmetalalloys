"use client";

import { useState } from "react";
import { updateInquiryStatus } from "@/lib/actions/product";
import { useRouter } from "next/navigation";
import { Mail, CheckCheck, Trash2, Eye } from "lucide-react";

interface Props {
  id: string;
  status: string;
  email: string;
  name: string;
}

export default function InquiryActions({ id, status, email, name }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async (newStatus: "new" | "read" | "replied" | "spam") => {
    setLoading(true);
    await updateInquiryStatus(id, newStatus);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-1">
      {status === "new" && (
        <button
          onClick={() => updateStatus("read")}
          disabled={loading}
          title="Mark as Read"
          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors disabled:opacity-50"
        >
          <Eye size={14} />
        </button>
      )}
      {status !== "replied" && (
        <button
          onClick={() => updateStatus("replied")}
          disabled={loading}
          title="Mark as Replied"
          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors disabled:opacity-50"
        >
          <CheckCheck size={14} />
        </button>
      )}
      <a
        href={`mailto:${email}?subject=Re: Your Inquiry to Angel Metal %26 Alloys&body=Dear ${name},%0A%0A`}
        className="p-1.5 rounded-lg hover:bg-gold/10 text-gold transition-colors"
        title="Reply by Email"
      >
        <Mail size={14} />
      </a>
      <button
        onClick={() => updateStatus("spam")}
        disabled={loading}
        title="Mark as Spam"
        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
