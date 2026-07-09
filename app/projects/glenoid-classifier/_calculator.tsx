"use client";

import { useEffect, useMemo, useState } from "react";

/* ── Model types (matches public/projects/glenoid-classifier/model.json) ──
   Each forest is a set of decision trees. Leaves hold a normalized class-
   probability vector; internal nodes hold 0. Inference averages the leaf
   vectors across trees (soft voting) and argmaxes — provably identical to the
   scikit-learn RandomForest it was exported from (verified 143/143). */
type Tree = { f: number[]; t: number[]; l: number[]; r: number[]; v: (number[] | 0)[] };
type Forest = { classes: string[]; trees: Tree[] };
type Model = {
  meta: { n_cases: number; cv_accuracy_6way: number; cv_accuracy_screen: number; trees_per_forest: number };
  features: string[];
  tier1: Forest;
  tier2: Forest;
  tier3B: Forest;
  tier3E: Forest;
};

function leafProbs(tree: Tree, x: number[]): number[] {
  let n = 0;
  while (tree.f[n] !== -2) n = x[tree.f[n]] <= tree.t[n] ? tree.l[n] : tree.r[n];
  return tree.v[n] as number[];
}
function forestPredict(fo: Forest, x: number[]) {
  const K = fo.classes.length;
  const acc = new Array(K).fill(0);
  for (const tree of fo.trees) {
    const p = leafProbs(tree, x);
    for (let k = 0; k < K; k++) acc[k] += p[k];
  }
  const tot = acc.reduce((a, b) => a + b, 0) || 1;
  let bi = 0;
  for (let k = 1; k < K; k++) if (acc[k] > acc[bi]) bi = k;
  return { label: fo.classes[bi], conf: acc[bi] / tot };
}

type Step = { tier: string; label: string; conf: number };
function classify(m: Model, x: number[]): { label: string; conf: number; path: Step[] } {
  const t1 = forestPredict(m.tier1, x);
  const path: Step[] = [{ tier: "Screen", label: t1.label, conf: t1.conf }];
  if (t1.label === "Normal") return { label: "Normal", conf: t1.conf, path };
  const t2 = forestPredict(m.tier2, x);
  path.push({ tier: "Main type", label: t2.label, conf: t2.conf });
  if (t2.label === "Normal") return { label: "Normal", conf: t1.conf * t2.conf, path };
  if (t2.label === "A") {
    path.push({ tier: "Subtype", label: "A2", conf: 1 });
    return { label: "A2", conf: t1.conf * t2.conf, path };
  }
  const t3 = forestPredict(t2.label === "B" ? m.tier3B : m.tier3E, x);
  path.push({ tier: "Subtype", label: t3.label, conf: t3.conf });
  return { label: t3.label, conf: t1.conf * t2.conf * t3.conf, path };
}

// raw-input → 6-feature vector in model.features order
function featureVector(v: Inputs): number[] {
  const subluxIndex = Math.sqrt(v.ap ** 2 + v.si ** 2);
  const areaRadius = v.area / (Math.PI * v.radius ** 2);
  return [v.version, v.inclination, v.ap, v.si, subluxIndex, areaRadius];
}

type Inputs = {
  version: number; inclination: number; ap: number; si: number; area: number; radius: number;
};

const FIELDS: { key: keyof Inputs; label: string; unit: string; min: number; max: number; step: number }[] = [
  { key: "version", label: "Version", unit: "° (− = retroverted)", min: -45, max: 25, step: 0.5 },
  { key: "inclination", label: "Inclination", unit: "°", min: -20, max: 45, step: 0.5 },
  { key: "ap", label: "AP Subluxation", unit: "", min: 20, max: 100, step: 0.5 },
  { key: "si", label: "SI Subluxation", unit: "", min: 0, max: 85, step: 0.5 },
  { key: "area", label: "Glenoid Surface Area", unit: "mm²", min: 600, max: 4300, step: 10 },
  { key: "radius", label: "Sphere Radius", unit: "mm", min: 22, max: 63, step: 0.5 },
];

const PRESETS: { tag: string; v: Inputs }[] = [
  { tag: "Normal", v: { version: 3.0, inclination: 12.2, ap: 33.5, si: 40.0, area: 871, radius: 31.2 } },
  { tag: "A2", v: { version: -3.3, inclination: -2.3, ap: 64.2, si: 57.0, area: 1208, radius: 27.3 } },
  { tag: "B2", v: { version: -26.5, inclination: 8.5, ap: 91.6, si: 35.6, area: 974.7, radius: 34.5 } },
  { tag: "B3", v: { version: -26.2, inclination: -7.4, ap: 85.8, si: 75.8, area: 1180.7, radius: 29.1 } },
  { tag: "E2", v: { version: 22.5, inclination: 18.1, ap: 24.3, si: 24.4, area: 915.4, radius: 29.6 } },
  { tag: "E3", v: { version: -3.1, inclination: 10.7, ap: 53.4, si: 35.3, area: 1660.5, radius: 27.6 } },
];

const WALCH: Record<string, { name: string; desc: string }> = {
  Normal: { name: "Normal", desc: "No significant glenoid erosion." },
  A2: { name: "Walch A2", desc: "Central, concentric erosion with a well-centered humeral head." },
  B2: { name: "Walch B2", desc: "Biconcave glenoid with posterior humeral-head subluxation." },
  B3: { name: "Walch B3", desc: "Advanced monoconcave posterior wear with retroversion." },
  E2: { name: "Walch E2", desc: "Superior erosion in a cuff-deficient shoulder." },
  E3: { name: "Walch E3", desc: "Advanced superior / global erosion." },
};

export function GlenoidCalculator() {
  const [model, setModel] = useState<Model | null>(null);
  const [err, setErr] = useState(false);
  const [inputs, setInputs] = useState<Inputs>(PRESETS[2].v); // default: a B2 example

  useEffect(() => {
    fetch("/projects/glenoid-classifier/model.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setModel)
      .catch(() => setErr(true));
  }, []);

  const result = useMemo(
    () => (model ? classify(model, featureVector(inputs)) : null),
    [model, inputs],
  );

  const info = result ? WALCH[result.label] ?? { name: result.label, desc: "" } : null;

  return (
    <figure className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-border px-5 py-3.5 sm:px-6">
        <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Live model · runs entirely in your browser
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        {/* Inputs */}
        <div className="border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
              Reference case:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.tag}
                type="button"
                onClick={() => setInputs(p.v)}
                className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {p.tag}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="flex items-baseline justify-between">
                  <span className="text-[13px] font-medium text-foreground/90">
                    {f.label}
                    {f.unit ? <span className="ml-1 text-faint">{f.unit}</span> : null}
                  </span>
                  <span className="font-mono text-sm tabular-nums text-accent">
                    {inputs[f.key].toFixed(f.step < 1 ? 1 : 0)}
                  </span>
                </span>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={inputs[f.key]}
                  onChange={(e) =>
                    setInputs((s) => ({ ...s, [f.key]: parseFloat(e.target.value) }))
                  }
                  className="mt-2 w-full cursor-pointer accent-[var(--accent)]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col p-5 sm:p-6">
          {err ? (
            <p className="m-auto text-sm text-muted">Could not load the model.</p>
          ) : !result || !info ? (
            <p className="m-auto font-mono text-xs text-faint">loading model…</p>
          ) : (
            <>
              <p className="eyebrow text-faint">Predicted classification</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                {info.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{info.desc}</p>

              <div className="mt-5 space-y-2.5">
                {result.path.map((s) => (
                  <div key={s.tier} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      {s.tier}
                    </span>
                    <span className="relative h-1 w-full overflow-hidden rounded-full bg-border">
                      <span
                        className="absolute left-0 top-0 h-full rounded-full bg-accent"
                        style={{ width: `${Math.round(s.conf * 100)}%` }}
                      />
                    </span>
                    <span className="text-right font-mono text-[11px] tabular-nums text-muted">
                      {s.label} · {Math.round(s.conf * 100)}%
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-auto pt-5 text-xs leading-relaxed text-faint">
                Research prototype — <strong className="text-muted">not for clinical use.</strong>{" "}
                Runs the actual trained Random Forest ({model?.meta.trees_per_forest} trees/stage) live
                on your device; no data is sent anywhere. Honest cross-validated accuracy:{" "}
                <span className="text-muted">
                  ~{Math.round((model?.meta.cv_accuracy_screen ?? 0) * 100)}% healthy-vs-diseased screen,
                  ~{Math.round((model?.meta.cv_accuracy_6way ?? 0) * 100)}% full 6-way subtype
                </span>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </figure>
  );
}
