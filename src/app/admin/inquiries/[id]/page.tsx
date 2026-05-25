"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Phone, Mail, MapPin, Building2, User, FileText, 
  Clock, AlertCircle, Save, CheckCircle2, MessageSquare, Send, Plus
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [inquiry, setInquiry] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Note form state
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState("note");
  
  // Email form state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const fetchData = async () => {
    try {
      const [inqRes, actRes] = await Promise.all([
        fetch(`/api/admin/inquiries/${id}`),
        fetch(`/api/admin/inquiries/${id}/activities`)
      ]);
      const inqJson = await inqRes.json();
      const actJson = await actRes.json();
      
      setInquiry(inqJson.data);
      setActivities(actJson.data || []);
      setEmailSubject(`Quotation from Angel Metal & Alloys - Ref #${id.substring(0,6)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = async (field: string, value: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value })
      });
      if (res.ok) {
        setInquiry({ ...inquiry, [field]: value });
        // Add implicit activity
        await addActivity("system", `Changed ${field} to ${value}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const addActivity = async (type: string, content: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity_type: type, content })
      });
      if (res.ok) {
        const json = await res.json();
        setActivities([json.data, ...activities]);
        setNoteContent("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Lead Details...</div>;
  if (!inquiry) return <div className="p-10 text-center text-red-500">Lead not found.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <Link href="/admin/inquiries" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-bold text-navy">{inquiry.full_name}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
              inquiry.priority === 'high' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}>
              {inquiry.priority.toUpperCase()} PRIORITY
            </span>
            {inquiry.is_export && (
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-bold">EXPORT</span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">Lead #{id} • Received {formatDate(inquiry.created_at)}</p>
        </div>
      </div>

      {/* 3 Column Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* COL 1: Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-3 mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Full Name</div>
                  <div className="text-sm font-medium text-navy">{inquiry.full_name}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Company</div>
                  <div className="text-sm font-medium text-navy">{inquiry.company_name || "-"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Email</div>
                  <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-blue-600 hover:underline">{inquiry.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Phone</div>
                  <div className="text-sm font-medium text-navy">{inquiry.mobile}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Location</div>
                  <div className="text-sm font-medium text-navy">{inquiry.country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-3 mb-4">Management</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Status</label>
                <select 
                  value={inquiry.status}
                  onChange={(e) => handleUpdate("status", e.target.value)}
                  className="w-full form-input bg-gray-50 py-2 text-sm"
                  disabled={saving}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="won">Won Deals</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Follow-up Date</label>
                <input 
                  type="date" 
                  value={inquiry.follow_up_date ? inquiry.follow_up_date.split('T')[0] : ""}
                  onChange={(e) => handleUpdate("follow_up_date", e.target.value || null)}
                  className="w-full form-input bg-gray-50 py-2 text-sm"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Priority</label>
                <select 
                  value={inquiry.priority}
                  onChange={(e) => handleUpdate("priority", e.target.value)}
                  className="w-full form-input bg-gray-50 py-2 text-sm"
                  disabled={saving}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-3 mb-4">Requirement Details</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Product Category</div>
                <div className="text-sm font-medium text-navy">{inquiry.product_category || "Not Specified"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Quantity</div>
                <div className="text-sm font-medium text-navy">{inquiry.quantity || "Not Specified"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Notes/Specifications</div>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-1 whitespace-pre-wrap border border-gray-100">
                  {inquiry.notes || "No notes provided."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COL 2: Communication */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-3 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={`https://wa.me/${inquiry.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${inquiry.full_name}, this is regarding your inquiry with Angel Metal & Alloys...`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              >
                <MessageSquare size={24} />
                <span className="text-xs font-bold">WhatsApp</span>
              </a>
              <button 
                onClick={() => addActivity("call", "Made a phone call to customer")}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Phone size={24} />
                <span className="text-xs font-bold">Log Call</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-3 mb-4">Send Email Quote</h3>
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full form-input bg-gray-50 py-2 text-sm"
                  placeholder="Subject"
                />
              </div>
              <div>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  className="w-full form-input bg-gray-50 py-2 text-sm resize-none"
                  placeholder="Dear Sir/Madam, please find our quotation attached..."
                />
              </div>
              <button 
                onClick={() => {
                  // In a real app, this would hit an API to send via Resend
                  addActivity("email", `Sent email quote: ${emailSubject}`);
                  setEmailBody("");
                  handleUpdate("status", "quoted");
                }}
                className="w-full btn-navy py-2 text-sm flex justify-center gap-2"
              >
                <Send size={16} /> Send Email
              </button>
            </div>
          </div>
        </div>

        {/* COL 3: Activity Timeline */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-120px)] sticky top-6">
          <div className="p-6 border-b border-gray-100 flex-shrink-0">
            <h3 className="font-display font-bold text-navy">Activity Timeline</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activities.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-10">No activities recorded yet.</div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex gap-4 relative">
                  {/* Timeline Line */}
                  <div className="absolute top-8 bottom-[-24px] left-[15px] w-px bg-gray-200" />
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    act.activity_type === 'note' ? 'bg-yellow-100 text-yellow-600' :
                    act.activity_type === 'email' ? 'bg-blue-100 text-blue-600' :
                    act.activity_type === 'call' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {act.activity_type === 'note' && <FileText size={14} />}
                    {act.activity_type === 'email' && <Mail size={14} />}
                    {act.activity_type === 'call' && <Phone size={14} />}
                    {act.activity_type === 'system' && <AlertCircle size={14} />}
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-navy capitalize">{act.activity_type}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{formatDate(act.created_at)}</span>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      {act.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-start gap-2">
              <select 
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
                className="form-input py-2 px-2 text-xs bg-white w-24"
              >
                <option value="note">Note</option>
                <option value="call">Call</option>
              </select>
              <textarea 
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={2}
                className="form-input py-2 text-sm bg-white flex-1 resize-none"
                placeholder="Log a note or call details..."
              />
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => addActivity(noteType, noteContent)}
                disabled={!noteContent.trim()}
                className="btn-gold py-1.5 px-4 text-xs disabled:opacity-50"
              >
                Save Activity
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
