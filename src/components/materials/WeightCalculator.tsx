"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

type CalculatorMode = "sheet" | "pipe" | "roundbar" | "flatbar";

export default function WeightCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("pipe");
  
  // Sheet/Plate inputs
  const [sheetLength, setSheetLength] = useState<number>(1000);
  const [sheetWidth, setSheetWidth] = useState<number>(1000);
  const [sheetThickness, setSheetThickness] = useState<number>(10);
  
  // Pipe/Tube inputs
  const [pipeOD, setPipeOD] = useState<number>(114.3); // 4" NB
  const [pipeThickness, setPipeThickness] = useState<number>(6.02); // Sch 40
  const [pipeLength, setPipeLength] = useState<number>(1);
  
  // Round Bar inputs
  const [barDia, setBarDia] = useState<number>(50);
  const [barLength, setBarLength] = useState<number>(1);
  
  // Flat Bar inputs
  const [flatWidth, setFlatWidth] = useState<number>(50);
  const [flatThickness, setFlatThickness] = useState<number>(10);
  const [flatLength, setFlatLength] = useState<number>(1);

  const calculateWeight = () => {
    // Density of Stainless Steel ~ 7.93 g/cm3 for 304/316
    const density = 0.00000793; // kg/mm3
    
    switch (mode) {
      case "sheet":
        // Length(mm) x Width(mm) x Thickness(mm) x Density = kg
        return (sheetLength * sheetWidth * sheetThickness * density).toFixed(2);
      case "pipe":
        // (OD - Thickness) * Thickness * 0.0248 = kg/m (simplified standard formula)
        // Or Volume: pi * ( (OD/2)^2 - ((OD-2T)/2)^2 ) * L * density
        if (pipeOD <= pipeThickness * 2) return "0.00";
        return ((pipeOD - pipeThickness) * pipeThickness * 0.0248 * pipeLength).toFixed(2);
      case "roundbar":
        // Dia(mm) x Dia(mm) x 0.00623 = kg/m
        return (barDia * barDia * 0.00623 * barLength).toFixed(2);
      case "flatbar":
        // Width(mm) x Thickness(mm) x 0.00793 = kg/m
        return (flatWidth * flatThickness * 0.00793 * flatLength).toFixed(2);
      default:
        return "0.00";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-navy/5 border border-gray-200 overflow-hidden">
      <div className="bg-navy p-6">
        <div className="flex items-center gap-3">
          <Calculator className="text-gold" />
          <h2 className="text-white font-display font-bold text-xl">Interactive Weight Calculator</h2>
        </div>
        <p className="text-silver/60 text-sm mt-2">
          Calculate the theoretical weight of stainless steel products (Density: 7.93 g/cm³).
        </p>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "pipe", label: "Pipe & Tube" },
            { id: "sheet", label: "Sheet & Plate" },
            { id: "roundbar", label: "Round Bar" },
            { id: "flatbar", label: "Flat Bar" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as CalculatorMode)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mode === tab.id
                  ? "bg-gold text-navy"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mode === "pipe" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Outer Diameter (mm)</label>
                <input type="number" value={pipeOD} onChange={(e) => setPipeOD(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Wall Thickness (mm)</label>
                <input type="number" value={pipeThickness} onChange={(e) => setPipeThickness(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (meters)</label>
                <input type="number" value={pipeLength} onChange={(e) => setPipeLength(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
            </>
          )}

          {mode === "sheet" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (mm)</label>
                <input type="number" value={sheetLength} onChange={(e) => setSheetLength(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Width (mm)</label>
                <input type="number" value={sheetWidth} onChange={(e) => setSheetWidth(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Thickness (mm)</label>
                <input type="number" value={sheetThickness} onChange={(e) => setSheetThickness(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
            </>
          )}

          {mode === "roundbar" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Diameter (mm)</label>
                <input type="number" value={barDia} onChange={(e) => setBarDia(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (meters)</label>
                <input type="number" value={barLength} onChange={(e) => setBarLength(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
            </>
          )}

          {mode === "flatbar" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Width (mm)</label>
                <input type="number" value={flatWidth} onChange={(e) => setFlatWidth(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Thickness (mm)</label>
                <input type="number" value={flatThickness} onChange={(e) => setFlatThickness(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (meters)</label>
                <input type="number" value={flatLength} onChange={(e) => setFlatLength(Number(e.target.value))} className="form-input bg-gray-50" />
              </div>
            </>
          )}
        </div>

        {/* Result */}
        <div className="bg-gradient-to-br from-navy/5 to-steel/10 rounded-xl p-6 text-center border border-gray-200">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Estimated Weight</div>
          <div className="flex items-end justify-center gap-2">
            <span className="text-5xl font-display font-bold text-navy">{calculateWeight()}</span>
            <span className="text-xl text-gray-500 font-semibold mb-1">kg</span>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            * Note: These are theoretical weights. Actual weight may vary by ±5% due to manufacturing tolerances.
          </div>
        </div>
      </div>
    </div>
  );
}
