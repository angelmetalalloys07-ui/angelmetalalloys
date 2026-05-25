"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Save, Image as ImageIcon, X, Plus, Loader2 } from "lucide-react";

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    short_description: "",
    full_description: "",
    primary_image_url: "",
    is_published: false,
    sort_order: 0,
    material_grades: [""] as string[],
    specifications: {} as Record<string, string>,
    meta_title: "",
    meta_description: "",
    ...(initialData || {}),
    keywords_string: initialData?.keywords ? initialData.keywords.join(", ") : "",
  });

  // Specifications dynamic key-value pairs
  const [specKeys, setSpecKeys] = useState<string[]>(Object.keys(formData.specifications || {}));
  const [specVals, setSpecVals] = useState<string[]>(Object.values(formData.specifications || {}));

  // Auto-generate slug from name if not edit mode or slug is empty
  useEffect(() => {
    if (!isEdit && formData.name) {
      setFormData((prev: any) => ({
        ...prev,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [formData.name, isEdit]);

  // Handle Specs
  const handleSpecChange = () => {
    const newSpecs: Record<string, string> = {};
    specKeys.forEach((k, i) => {
      if (k.trim() !== "") {
        newSpecs[k] = specVals[i] || "";
      }
    });
    setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecRow = () => {
    setSpecKeys([...specKeys, ""]);
    setSpecVals([...specVals, ""]);
  };

  const removeSpecRow = (index: number) => {
    const newKeys = [...specKeys];
    const newVals = [...specVals];
    newKeys.splice(index, 1);
    newVals.splice(index, 1);
    setSpecKeys(newKeys);
    setSpecVals(newVals);
    
    // Update formData immediately
    const newSpecs: Record<string, string> = {};
    newKeys.forEach((k, i) => {
      if (k.trim() !== "") newSpecs[k] = newVals[i] || "";
    });
    setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
  };

  const updateSpecKey = (index: number, val: string) => {
    const newKeys = [...specKeys];
    newKeys[index] = val;
    setSpecKeys(newKeys);
  };

  const updateSpecVal = (index: number, val: string) => {
    const newVals = [...specVals];
    newVals[index] = val;
    setSpecVals(newVals);
  };

  // Material Grades array
  const handleGradeChange = (index: number, val: string) => {
    const newGrades = [...formData.material_grades];
    newGrades[index] = val;
    setFormData({ ...formData, material_grades: newGrades });
  };
  
  const addGrade = () => {
    setFormData({ ...formData, material_grades: [...formData.material_grades, ""] });
  };
  
  const removeGrade = (index: number) => {
    const newGrades = [...formData.material_grades];
    newGrades.splice(index, 1);
    setFormData({ ...formData, material_grades: newGrades });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Compute specs synchronously inline to avoid race condition
    const computedSpecs: Record<string, string> = {};
    specKeys.forEach((k, i) => {
      if (k.trim() !== "") {
        computedSpecs[k] = specVals[i] || "";
      }
    });
    
    // Parse keywords
    const keywordsArray = formData.keywords_string
      ? formData.keywords_string.split(',').map((k: string) => k.trim()).filter(Boolean)
      : [];

    try {
      const url = isEdit ? `/api/admin/products/${initialData.id}` : `/api/admin/products`;
      const method = isEdit ? "PATCH" : "POST";
      
      const { keywords_string, ...restData } = formData;
      const payload = { ...restData, specifications: computedSpecs, keywords: keywordsArray };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const err = await res.json();
        alert(`Failed to save product: ${err.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">
            {isEdit ? "Edit Product" : "Create Product"}
          </h1>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-gold flex items-center gap-2 py-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Product
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-2">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Product Name</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full form-input bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Slug (URL)</label>
                <input 
                  type="text" required
                  value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full form-input bg-gray-50"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                <input 
                  type="text" required
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full form-input bg-gray-50"
                  placeholder="e.g. Butt Weld Fittings"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Sort Order (0 = first)</label>
                <input 
                  type="number"
                  value={formData.sort_order}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData({...formData, sort_order: val === '' ? 0 : parseInt(val, 10)});
                  }}
                  className="w-full form-input bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Short Description</label>
              <textarea 
                rows={2}
                value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})}
                className="w-full form-input bg-gray-50 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Description (Markdown/HTML supported)</label>
              <textarea 
                rows={6}
                value={formData.full_description} onChange={e => setFormData({...formData, full_description: e.target.value})}
                className="w-full form-input bg-gray-50 resize-y"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-display font-bold text-navy">Material Grades</h3>
              <button type="button" onClick={addGrade} className="text-gold flex items-center gap-1 text-xs font-bold hover:underline">
                <Plus size={14} /> Add Grade
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {formData.material_grades.map((grade: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={grade} onChange={e => handleGradeChange(idx, e.target.value)}
                    className="w-full form-input py-1.5 text-sm bg-gray-50"
                    placeholder="e.g. SS 304/304L"
                  />
                  <button type="button" onClick={() => removeGrade(idx)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-display font-bold text-navy">Specifications (JSON)</h3>
              <button type="button" onClick={addSpecRow} className="text-gold flex items-center gap-1 text-xs font-bold hover:underline">
                <Plus size={14} /> Add Row
              </button>
            </div>
            <div className="space-y-3">
              {specKeys.map((key, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={key} onChange={e => updateSpecKey(idx, e.target.value)}
                    onBlur={handleSpecChange}
                    className="w-1/3 form-input py-1.5 text-sm bg-gray-50"
                    placeholder="e.g. Size Range"
                  />
                  <input 
                    type="text" 
                    value={specVals[idx]} onChange={e => updateSpecVal(idx, e.target.value)}
                    onBlur={handleSpecChange}
                    className="w-2/3 form-input py-1.5 text-sm bg-gray-50"
                    placeholder="e.g. 1/2 NB to 48 NB"
                  />
                  <button type="button" onClick={() => removeSpecRow(idx)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Fields */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-2">Publishing</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={formData.is_published}
                  onChange={e => setFormData({...formData, is_published: e.target.checked})}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.is_published ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.is_published ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="font-semibold text-sm text-gray-700">
                {formData.is_published ? 'Published to Site' : 'Draft (Hidden)'}
              </div>
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-2">Primary Image</h3>
            
            {formData.primary_image_url ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
                <img src={formData.primary_image_url} alt="Product preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, primary_image_url: ""})}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded shadow hover:bg-white"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                <CldUploadWidget 
                  uploadPreset="angel-metal-products"
                  options={{ 
                    folder: 'angel-metal/products', 
                    maxFiles: 5, 
                    resourceType: 'image' 
                  }}
                  onSuccess={(result: any) => {
                    setFormData({...formData, primary_image_url: result.info.secure_url});
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 p-6">
                      <ImageIcon size={32} />
                      <span className="text-sm font-semibold text-navy">Upload via Cloudinary</span>
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            )}
            <input 
              type="text" 
              value={formData.primary_image_url} 
              onChange={e => setFormData({...formData, primary_image_url: e.target.value})}
              className="w-full form-input py-1.5 text-xs bg-gray-50"
              placeholder="Or paste URL here"
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-navy border-b border-gray-100 pb-2">SEO Metadata</h3>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">SEO Title</label>
              <input 
                type="text" 
                value={formData.meta_title} onChange={e => setFormData({...formData, meta_title: e.target.value})}
                className="w-full form-input py-1.5 text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">SEO Description</label>
              <textarea 
                rows={3}
                value={formData.meta_description} onChange={e => setFormData({...formData, meta_description: e.target.value})}
                className="w-full form-input py-1.5 text-sm bg-gray-50 resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Keywords</label>
              <input 
                type="text" 
                value={formData.keywords_string} onChange={e => setFormData({...formData, keywords_string: e.target.value})}
                className="w-full form-input py-1.5 text-sm bg-gray-50"
                placeholder="Comma separated"
              />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
