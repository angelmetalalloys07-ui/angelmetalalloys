-- =============================================
-- TABLE: posts (blog)
-- =============================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  cover_image_public_id TEXT,
  author TEXT DEFAULT 'Angel Metal & Alloys',
  published BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT
);

-- =============================================
-- POSTS ROW LEVEL SECURITY & INDEXES
-- =============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are public" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Service role full access posts" ON posts
  USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_posts_updated_at') THEN
    CREATE TRIGGER update_posts_updated_at 
      BEFORE UPDATE ON posts 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- =============================================
-- INSERT POST 1
-- =============================================
INSERT INTO posts (
  slug,
  title,
  excerpt,
  content,
  author,
  published,
  meta_title,
  meta_description,
  cover_image
) VALUES (
  'ss-304-vs-ss-316l-pipe-fittings-grade-selection-guide',

  'SS 304 vs SS 316L Pipe Fittings: Complete Grade Selection Guide for Engineers',

  'Choosing the wrong stainless steel grade costs money, causes failures, and risks shutdowns. This definitive guide explains when to use SS 304, SS 316, SS 316L, and Duplex steel in pipe fittings — with real application examples from pharma, oil & gas, and chemical industries.',

  '# SS 304 vs SS 316L Pipe Fittings: Complete Grade Selection Guide for Engineers

**Published by Angel Metal & Alloys, Ahmedabad | Technical Resource**

---

The single most common mistake engineers make when specifying stainless steel pipe fittings is treating grade selection as an afterthought. They pick SS 304 because it is cheaper, or SS 316L because it "sounds better" — without understanding why one grade outperforms the other in specific environments. This guide eliminates that guesswork.

At Angel Metal & Alloys, we manufacture and export SS pipe fittings, flanges, and forged components from Ahmedabad to 30+ countries. Every week, our technical team answers the same question from procurement engineers across India, UAE, Singapore, and the UK: *"Which grade should I specify for this application?"*

This article gives you the engineering answer — clearly, without jargon.

---

## What Makes SS 304, SS 316, and SS 316L Different?

All three grades are austenitic stainless steels — they share the same face-centred cubic crystal structure, non-magnetic properties (when annealed), and good ductility. The differences come down to chemical composition.

### SS 304 — The Universal Grade

SS 304 contains approximately 18% chromium and 8% nickel. This is why it is also called the "18/8" grade. The chromium forms a passive oxide layer on the surface that resists oxidation and moderate corrosion.

**Chemical composition (ASTM A182):**
- Carbon: max 0.08%
- Chromium: 18.0–20.0%
- Nickel: 8.0–10.5%
- Molybdenum: None

SS 304 is the workhorse of the stainless steel industry. It handles most clean water systems, food and beverage processing lines, general chemical storage, dairy equipment, and architectural applications perfectly well. In India, the majority of hospital furniture, food processing equipment, and pharmaceutical vessel exteriors use SS 304.

### SS 316 — The Molybdenum Upgrade

SS 316 adds 2–3% molybdenum to the SS 304 formula. This single addition dramatically changes performance in aggressive environments. Molybdenum stabilises the passive oxide layer against chloride attack — the primary cause of pitting corrosion in stainless steel.

**Chemical composition (ASTM A182):**
- Carbon: max 0.08%
- Chromium: 16.0–18.0%
- Nickel: 10.0–14.0%
- Molybdenum: 2.0–3.0%

The practical result: SS 316 pipe fittings can handle seawater, marine atmospheres, chlorinated cleaning agents, dilute hydrochloric acid, sulphuric acid, and phosphoric acid — environments where SS 304 would pit and fail within months.

### SS 316L — The Weld-Safe Version

The "L" in SS 316L stands for Low carbon. The maximum carbon content drops from 0.08% to 0.03%. This matters because carbon causes a phenomenon called **sensitisation** during welding — carbon migrates to grain boundaries and forms chromium carbide, depleting the chromium available to form the protective oxide layer. The result is intergranular corrosion at weld joints.

By reducing carbon below 0.03%, SS 316L virtually eliminates sensitisation risk. This makes SS 316L the mandatory choice for any application involving site welding, multi-pass welding, or welded assemblies that cannot be solution-annealed after fabrication.

**In practice:** In India, pharmaceutical plants, dairy processing lines, and chemical reactors almost universally specify SS 316L for all welded pipe fittings and flanges. The additional cost over SS 316 is negligible compared to the risk of weld zone corrosion failures.

---

## Head-to-Head Comparison Table

| Property | SS 304 | SS 316 | SS 316L |
|---|---|---|---|
| Chromium % | 18–20 | 16–18 | 16–18 |
| Nickel % | 8–10.5 | 10–14 | 10–14 |
| Molybdenum % | None | 2–3 | 2–3 |
| Carbon % max | 0.08 | 0.08 | **0.03** |
| Corrosion resistance | Good | Excellent | Excellent |
| Chloride resistance | Moderate | High | High |
| Weldability | Good | Good | **Excellent** |
| Sensitisation risk | Low | Low | **None** |
| Cost (relative) | ₹ | ₹₹ | ₹₹ |
| ASTM Forged Fittings | A182 F304 | A182 F316 | A182 F316L |
| ASTM Butt Weld | A403 WP304 | A403 WP316 | A403 WP316L |

---

## Industry-by-Industry Selection Guide

### Pharmaceutical Industry (India — Dahej, Ankleshwar, Vapi)

**Specify: SS 316L for all process pipe fittings, flanges, and valves**

Pharmaceutical manufacturing requires high-purity piping. Clean-In-Place (CIP) and Sterilisation-In-Place (SIP) systems use hot caustic solutions and steam — both of which attack SS 304 over time. More critically, CIP chemicals often contain chlorinated compounds that cause chloride pitting in SS 304.

SS 316L is mandated by cGMP guidelines for product contact surfaces. The low carbon content ensures no contamination from sensitised weld zones, which is critical for injectable and API manufacturing lines.

*Angel Metal & Alloys supplies SS 316L butt weld fittings, flanges, and forged fittings to several pharmaceutical SEZs in Gujarat, including Dahej and Jambusar.*

### Chemical Industry (Gujarat — Ankleshwar, Nandesari, Vapi)

**Specify: SS 316L for most applications; Duplex 2205 for high-chloride and high-pressure services**

Gujarat''s chemical belt processes everything from acetic acid and caustic soda to chlorine compounds and sulphuric acid. The correct grade depends on the specific chemical and its concentration:

- Dilute sulphuric acid (< 10%): SS 316L
- Phosphoric acid: SS 316L
- Chlorine compounds or hydrochloric acid: Duplex 2205 or Hastelloy C276
- Acetic acid: SS 316L
- Caustic soda: SS 304 or SS 316L (both perform well)
- Nitric acid: SS 304 (316 performs worse in concentrated nitric acid)

### Oil & Gas Industry (ONGC Hazira, Reliance Jamnagar)

**Specify: Duplex 2205 or SS 316L depending on service**

For offshore and sour service applications containing hydrogen sulphide and CO₂, duplex stainless steel (UNS S31803) is the preferred choice. SS 316L is used for utility services, instrument tubing, and non-sour process lines.

### Dairy & Food Processing (Gujarat — Mehsana, Anand)

**Specify: SS 316L for product contact; SS 304 for structural and non-contact**

Food-grade piping requires smooth, crevice-free internal surfaces that can withstand CIP chemicals. SS 316L is standard for milk lines, fermenter connections, and heat exchanger headers. SS 304 is acceptable for water services and structural supports.

### Water Treatment Plants

**Specify: SS 304 for clean water; SS 316L for brackish or seawater**

Municipal water treatment (chlorination levels < 0.5 ppm) is well handled by SS 304. Desalination plants, coastal water treatment, or systems using aggressive chlorinated biocides should use SS 316L as the minimum, with Duplex 2205 for high-temperature services.

---

## The 5-Question Grade Selection Checklist

Before specifying any SS pipe fitting or flange, answer these five questions:

**1. Is chloride present in the fluid or environment?**
Yes → Use SS 316L minimum. High chloride (> 200 ppm) or marine environment → Duplex 2205.

**2. Will any fittings be field welded without post-weld heat treatment?**
Yes → Specify "L" grade (316L, 304L) to prevent sensitisation.

**3. Does the application involve temperature above 400°C?**
Yes → Use SS 321 (titanium-stabilised) or SS 347 (niobium-stabilised) instead — they handle high-temperature cycling without carbide precipitation.

**4. Is the fluid highly oxidising (concentrated nitric acid)?**
Yes → SS 304 or SS 310 performs better than SS 316 in this specific case.

**5. Is cost the primary constraint with benign environment?**
Yes → SS 304 is entirely appropriate and significantly more economical.

---

## Mill Test Certificate: What to Check

When procuring SS pipe fittings or flanges, always demand a Mill Test Certificate (MTC). For SS 316L, verify:

- Carbon content is listed as ≤ 0.03% (not just "316L" written without test data)
- Molybdenum is between 2.0% and 3.0%
- Heat number is traceable to the original mill
- PMI (Positive Material Identification) test report matches MTC data

At Angel Metal & Alloys, every consignment is dispatched with full MTC traceability, spectroscopy test reports, and dimensional inspection certificates.

---

## Summary: Quick Reference

| Application | Recommended Grade |
|---|---|
| General water, food, structural | SS 304 |
| Welded assemblies, general corrosive | SS 304L |
| Chemical processing, marine, CIP | SS 316L |
| Pharmaceutical process lines | SS 316L |
| High temperature > 400°C | SS 321 |
| Very high temperature / furnace | SS 310 |
| Offshore, high chloride, high pressure | Duplex 2205 |
| Extreme chloride, HCl, seawater high temp | Super Duplex 2507 |
| Hydrochloric acid, strong acids | Hastelloy C276 |

---

## Get the Right Grade for Your Project

Angel Metal & Alloys manufactures and stocks all the grades listed in this guide — from SS 304 to Super Duplex 2507 — in butt weld fittings, flanges, forged fittings, pipes, and fasteners. Our technical team in Ahmedabad provides free grade recommendation for your specific application.

**Call us:** +91 9974334455 | +91 9825003949
**Email:** angelmetalalloys@gmail.com
**WhatsApp:** +91 9974334455

*Angel Metal & Alloys, B-917 Sun West Bank, Ahmedabad – 380013, Gujarat, India*',

  'Angel Metal & Alloys — Technical Team',
  true,
  'SS 304 vs SS 316L Pipe Fittings Grade Selection Guide | Angel Metal Ahmedabad',
  'Complete engineer''s guide to choosing SS 304, SS 316, SS 316L, or Duplex for pipe fittings and flanges. Industry-specific recommendations for pharma, chemical, oil & gas. By Angel Metal & Alloys, Ahmedabad.',
  'https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779702120/Gemini_Generated_Image_6xzswf6xzswf6xzs_r4spwk.png'
) ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author = EXCLUDED.author,
  published = EXCLUDED.published,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  cover_image = EXCLUDED.cover_image;

-- =============================================
-- INSERT POST 2
-- =============================================
INSERT INTO posts (
  slug,
  title,
  excerpt,
  content,
  author,
  published,
  meta_title,
  meta_description,
  cover_image
) VALUES (
  'asme-b16-5-flange-pressure-class-selection-guide',

  'ASME B16.5 Flange Pressure Class Guide: How to Choose Class 150, 300, 600, 900, 1500 or 2500',

  'Specifying the wrong pressure class flange is one of the most dangerous — and expensive — mistakes in piping engineering. This practical guide explains ASME B16.5 pressure classes, how temperature affects ratings, and a step-by-step selection method used by plant engineers in India and globally.',

  '# ASME B16.5 Flange Pressure Class Guide: How to Choose Class 150, 300, 600, 900, 1500 or 2500

**Published by Angel Metal & Alloys, Ahmedabad | Technical Resource**

---

A plant in Gujarat once specified Class 150 flanges on a 250 psig steam line — because someone calculated that Class 150 rated "up to 275 psi" at ambient temperature. The steam service ran at 400°F. After several thermal cycles, multiple joints began leaking. Root cause: nobody accounted for temperature de-rating. The fix required replacing hundreds of flanges across the plant.

This guide ensures you never make that mistake.

---

## What Is ASME B16.5?

ASME B16.5 is the American Society of Mechanical Engineers standard titled *Pipe Flanges and Flanged Fittings, NPS ½ through NPS 24*. It governs:

- Dimensional requirements (OD, thickness, bolt circle, bolt holes)
- Pressure-temperature ratings for 7 pressure classes
- Facing types (Raised Face, Flat Face, Ring Type Joint)
- Material groups and their allowable pressures at each temperature
- Bolt and gasket requirements

ASME B16.5 is the most widely referenced flange standard globally and is accepted by engineering specifications in India, the Middle East, Southeast Asia, Europe, and the Americas. When an Indian engineer receives a Purchase Order from a UAE refinery or a Singapore petrochemical plant, ASME B16.5 compliance is almost always required.

---

## The 7 Pressure Classes — What They Actually Mean

ASME B16.5 defines 7 pressure class designations:

**Class 150 — Class 300 — Class 400 — Class 600 — Class 900 — Class 1500 — Class 2500**

> **Critical point that engineers frequently misunderstand:** The class number is NOT a pressure value in psi or bar. Class 150 does NOT mean the flange is rated for 150 psi. The class number is a dimensionless designator that points to a pressure-temperature rating table. The actual allowable pressure depends on both the temperature AND the material group.

### Class 150 Flanges

Class 150 is the lowest and most common pressure class. At ambient temperature (-29°C to 38°C), a Class 150 SS 316L flange (Material Group 2.2 per ASME B16.5) has an allowable working pressure of approximately **19.6 bar (285 psi).**

As temperature rises, this drops significantly:
- At 100°C: ~17.7 bar
- At 200°C: ~15.1 bar
- At 300°C: ~13.2 bar
- At 400°C: ~12.1 bar

**Typical applications:** Low-pressure water lines, utility services, instrument air, cooling water, and atmospheric storage tank nozzles. Most water treatment plants and utility systems in India use Class 150.

### Class 300 Flanges

Class 300 flanges are heavier, have more bolt holes, and handle significantly higher pressures than Class 150. At ambient temperature, a Class 300 SS 316L flange is rated at approximately **51.1 bar (741 psi)** — nearly 2.5 times more than Class 150.

**Note:** Class 400 exists in ASME B16.5 but is rarely specified in modern projects. When in doubt, jump from Class 300 to Class 600.

**Typical applications:** Low-to-medium pressure process piping, steam systems below 200°C, chemical dosing lines, and general plant piping where Class 150 is marginal.

### Class 600 Flanges

Class 600 represents the transition into high-pressure territory. At ambient temperature, a Class 600 SS 316L flange is rated at approximately **102.1 bar (1480 psi).**

**Typical applications:** High-pressure steam systems, oil & gas process lines, reactor inlet/outlet connections, high-pressure chemical injection systems, and power plant main steam lines.

### Class 900 Flanges

Class 900 is used for very high-pressure services. At ambient, a Class 900 SS 316L flange handles approximately **153.2 bar (2220 psi).**

**Typical applications:** High-pressure oil & gas wellheads and manifolds, main steam lines in power boilers, high-pressure chemical reactors, and HP hydraulic systems.

### Class 1500 and Class 2500 Flanges

These are the highest pressure classes in ASME B16.5. Class 1500 flanges handle approximately **255.3 bar (3700 psi)** and Class 2500 approximately **425.5 bar (6170 psi)** at ambient for SS 316L.

Note: Class 2500 is limited to NPS ½ through NPS 12 in ASME B16.5. Larger sizes require ASME B16.47.

**Typical applications:** Subsea equipment, HP gas compressor nozzles, ultra-high-pressure chemical reactors, and critical HPHT (High Pressure High Temperature) wellhead connections.

---

## The Temperature De-Rating Effect — Never Ignore This

This is where most specification errors occur. Every material loses pressure-carrying capacity as temperature rises. The relationship is non-linear and material-specific.

### Example: SS 316L Flanges, Class 150

| Temperature | Allowable Pressure |
|---|---|
| -29°C to 38°C | 19.6 bar (285 psi) |
| 100°C | 17.7 bar (257 psi) |
| 150°C | 15.8 bar (229 psi) |
| 200°C | 15.1 bar (219 psi) |
| 300°C | 13.2 bar (191 psi) |
| 400°C | 12.1 bar (176 psi) |
| 500°C | 10.2 bar (148 psi) |

A 250°C steam line at 14 bar pressure looks safe with Class 150 at first glance — the ambient rating is 19.6 bar. But at 250°C, the allowable pressure has dropped to approximately 14.4 bar, leaving almost zero safety margin. The correct specification would be Class 300.

### ASME B16.5 Material Groups

ASME B16.5 divides flange materials into material groups. Each group has its own pressure-temperature table. The key groups relevant to Indian manufacturing:

- **Group 1.1** — Carbon Steel (A105, A350 LF2) — highest pressure capacity at ambient
- **Group 1.10** — Carbon Steel high yield (A694 F52, F60)
- **Group 2.1** — SS 304, SS 304L — moderate capacity
- **Group 2.2** — SS 316, SS 316L, SS 317, SS 321 — moderate capacity, better at temperature
- **Group 2.3** — SS 347 — good high-temperature stability
- **Group 3.1–3.4** — Nickel alloys, Inconel, Hastelloy — speciality high-temperature service

**Important:** Carbon steel A105 flanges carry significantly higher working pressure than SS 316L flanges of the same class at ambient temperature. This is why carbon steel flanges dominate in oil & gas where stainless is not required.

---

## ASME B16.5 vs DIN/EN Flanges — Can You Mix Them?

Many Indian projects involve European clients or EPC contractors who specify DIN PN flanges. The ASME and DIN systems are NOT directly interchangeable, even though approximate equivalences exist:

| ASME Class | DIN PN Equivalent |
|---|---|
| Class 150 | PN 20 |
| Class 300 | PN 50 |
| Class 600 | PN 100 |
| Class 900 | PN 150 |
| Class 1500 | PN 250 |
| Class 2500 | PN 420 |

These are approximate equivalences only. Bolt hole patterns, face-to-face dimensions, and facing dimensions differ between ASME and DIN flanges. Never bolt an ASME B16.5 flange directly to a DIN EN 1092-1 flange without verifying dimensional compatibility and pressure-temperature ratings independently for each standard.

Angel Metal & Alloys manufactures flanges to both ASME B16.5 and DIN standards — clearly marked and certified separately. Specify which standard you need in your purchase order.

---

## Step-by-Step Pressure Class Selection Method

Use this process for every new piping line:

**Step 1 — Define the design conditions**
Get the maximum operating pressure (MOP) and maximum operating temperature (MOT) from the Process Datasheet or P&ID. Add the appropriate safety factor per your company piping specification (typically 10–15% above MOP).

**Step 2 — Identify the fluid and material**
Determine the fluid being handled and select the appropriate material grade (see our SS 304 vs 316L guide). Identify the ASME B16.5 material group for your chosen grade.

**Step 3 — Look up the pressure-temperature table**
In ASME B16.5 (purchase the latest edition from ASME at asme.org), find the P-T rating table for your material group. Start with Class 150 at your design temperature.

**Step 4 — Check if Class 150 meets the requirement**
If the Class 150 allowable pressure at your design temperature exceeds your design pressure — you can use Class 150. Move to Step 6.

**Step 5 — Step up the class until you find a fit**
If Class 150 is insufficient, check Class 300. If still insufficient, check Class 600, and so on. Select the lowest class that meets or exceeds the design pressure at the design temperature.

**Step 6 — Check transient and upset conditions**
Do not only check steady-state. Steam-out conditions, thermal shock, pressure surges, and start-up/shutdown scenarios can briefly exceed steady-state pressure. Ensure the selected class handles these transients with margin.

**Step 7 — Check NPS limitation**
Class 2500 is limited to NPS 12. For larger diameters at very high pressure, check ASME B16.47 Series A or Series B.

---

## Common Errors in Flange Class Specification

**Error 1 — Treating class as direct psi rating**
Class 150 ≠ 150 psi. Always use the P-T tables for your material group at design temperature.

**Error 2 — Ignoring temperature de-rating**
The most dangerous error. Always check the P-T table at design temperature, not ambient.

**Error 3 — Mixing Class 150 and Class 300 in the same piping system**
Both flanges will physically bolt together (same bolt pattern within some NPS ranges) but the Class 150 flange limits the system. Never mix classes without documenting the design basis.

**Error 4 — Buying to ASME B16.5 but using DIN bolting**
ASME B16.5 bolt patterns require ASTM A193 B7 stud bolts with ASTM A194 2H heavy hex nuts for most classes. Using metric DIN bolts on ASME flanges is non-compliant and potentially unsafe.

**Error 5 — Not verifying facing compatibility**
Raised Face (RF) is standard for Class 150 and above in most services. Ring Type Joint (RTJ) is required for Class 600 and above in oil & gas services per most company specifications. Check the project specification.

---

## Quick Reference: Flange Class by Industry

| Industry / Service | Typical Class |
|---|---|
| Municipal water, utility air | Class 150 |
| Low pressure steam (< 10 bar) | Class 150 |
| General plant process piping | Class 150 or 300 |
| Medium pressure steam (10–50 bar) | Class 300 |
| Chemical reactor lines | Class 300 to 600 |
| High pressure steam (50–100 bar) | Class 600 |
| Oil & gas process lines | Class 300 to 900 |
| High pressure gas compressors | Class 900 to 1500 |
| HPHT wellheads, subsea | Class 1500 to 2500 |
| Boiler main steam (IBR) | Class 600 to 1500 |

---

## Angel Metal & Alloys: Certified to ASME B16.5

Angel Metal & Alloys manufactures and stocks SS flanges in all seven ASME B16.5 pressure classes, in sizes ½" NB to 24" NB, in all material grades from SS 304 to Super Duplex 2507. Every flange is dispatched with:

- Mill Test Certificate (MTC) with full chemical and mechanical traceability
- Dimensional inspection report per ASME B16.5
- PMI (Positive Material Identification) report on request
- Hydrostatic test certificate on request
- IBR certification for steam service flanges (on request)

Our experienced team can review your line list or P&ID and recommend the correct class and grade for every line — at no charge.

**Call us:** +91 9974334455 | +91 9825003949
**Email:** angelmetalalloys@gmail.com
**Request Quote:** angelmetalalloys.com/request-quote

*Angel Metal & Alloys, B-917 Sun West Bank, Opp Rajasthan Hospital, Ahmedabad – 380013, Gujarat, India. Est. 2007. Exporting to 30+ countries.*',

  'Angel Metal & Alloys — Technical Team',
  true,
  'ASME B16.5 Flange Pressure Class Selection Guide: 150 to 2500 | Angel Metal Ahmedabad',
  'Practical ASME B16.5 flange pressure class selection guide — Class 150, 300, 600, 900, 1500, 2500. Includes temperature de-rating tables, step-by-step selection method, and industry applications. By Angel Metal & Alloys, Ahmedabad.',
  'https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779702120/Gemini_Generated_Image_zb6v2azb6v2azb6v_bhjvgb.png'
) ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author = EXCLUDED.author,
  published = EXCLUDED.published,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  cover_image = EXCLUDED.cover_image;

-- =============================================
-- VERIFY INSERTION
-- =============================================
SELECT slug, title, published, LENGTH(content) as content_length 
FROM posts 
ORDER BY created_at DESC 
LIMIT 2;
