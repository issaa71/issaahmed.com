import type { Metadata } from "next";
import Link from "next/link";
import {
  SheetShell,
  Section,
  Callout,
  CalloutStrip,
  EquipList,
  FigurePlate,
  FlowDiagram,
  NoteBlock,
  SpecGrid,
} from "../_components/sheet";
import { GlenoidCalculator } from "./_calculator";

export const metadata: Metadata = {
  title: "Glenoid Morphology Classifier — Clinical ML",
  description:
    "A three-tier machine-learning pipeline that maps CT-derived shoulder measurements onto the Walch glenoid classification — with the real trained model running live in your browser.",
  openGraph: {
    title: "Glenoid Morphology Classifier — Clinical ML",
    description:
      "A hierarchical ML classifier (XGBoost + Random Forest + SVM) for Walch glenoid types, running live in your browser. Healthy-vs-diseased screen ~91% (AUC 0.98).",
    type: "article",
  },
};

export default function Page() {
  return (
    <SheetShell
      sheetNo="04"
      sheetCount="06"
      eyebrow="Clinical ML · Shoulder Orthopedics"
      title="Glenoid Morphology Classifier"
      tagline="A three-tier machine-learning pipeline that maps CT-derived shoulder measurements onto the Walch glenoid classification — the framework surgeons use to plan shoulder-replacement surgery. The trained model runs live, right here in your browser."
      meta="Solo project · 143 cases · Walch A/B/E types · Random Forest · runs client-side"
      status={[
        { label: "Live in-browser tool", tone: "red", pulse: true },
        { label: "Research prototype — not for clinical use", tone: "ink" },
      ]}
    >
      <CalloutStrip cols={4}>
        <Callout
          label="Healthy vs. diseased"
          value="~91%"
          hint="Normal-vs-Pathologic screen, AUC 0.98 — the robust, reproducible result"
          accent
        />
        <Callout label="Labelled cases" value="143" hint="all six Walch classes represented" />
        <Callout label="Walch classes" value="6" hint="Normal, A2, B2, B3, E2, E3" />
        <Callout
          label="Full 6-way (honest)"
          value="~63%"
          hint="end-to-end cross-validated; vs the report's 84% per-tier number — see Results"
        />
      </CalloutStrip>

      <Section title="Stack & methods">
        <SpecGrid
          cols={3}
          items={[
            {
              name: "Hierarchical classifier",
              role: "three tiers: normal → type → subtype",
            },
            {
              name: "Model comparison",
              role: "rf, svm, xgboost, logistic — best per tier",
            },
            {
              name: "scikit-learn",
              role: "training and cross-validation",
            },
            {
              name: "6 CT-derived inputs",
              role: "version, inclination, subluxation, area, radius",
            },
            {
              name: "Feature engineering",
              role: "subluxation index and area-to-radius ratio",
            },
            {
              name: "TypeScript inference",
              role: "trained model runs in-browser, no server",
            },
          ]}
        />
      </Section>

      <div id="calculator" className="scroll-mt-24">
        <Section title="Try it — live Walch classifier">
          <p>
            This is the actual trained model, exported to run entirely in your browser — no server, no
            upload, nothing leaves your device. Drag the six CT-derived measurements (or load a
            reference case) and watch it walk the hierarchy: healthy-vs-diseased first, then the main
            erosion type, then the subtype.
          </p>
          <div className="breakout">
            <GlenoidCalculator />
          </div>
        </Section>
      </div>

      <Section title="Problem">
        <p>
          The <strong>Walch classification</strong> is the standard framework orthopedic surgeons use
          to describe how a glenoid — the shoulder&apos;s socket — has eroded and deformed in
          arthritis, and it directly drives how a shoulder replacement is planned. Assigning a Walch
          type is normally a manual, expertise-dependent read of a CT scan. This project asks a
          narrower, tractable question: can a small set of quantitative, CT-derived measurements be
          mapped automatically onto the Walch types?
        </p>
        <p>
          It pairs naturally with my{" "}
          <Link href="/projects/tha-pain-prediction">peer-reviewed hip-arthroplasty work</Link> as a
          second musculoskeletal-ML piece — same instinct of turning clinical measurements into a
          decision-support tool.
        </p>
      </Section>

      <Section title="My role">
        <p>
          Solo work. I built the data preparation and feature engineering, the three-tier model stack,
          and two delivery front-ends — a Streamlit web app and a terminal tool. For this portfolio I
          went a step further and re-exported the trained model to run natively in the browser above,
          so the classifier isn&apos;t just described — it&apos;s runnable.
        </p>
      </Section>

      <Section title="Approach">
        <FlowDiagram
          label="Hierarchical classifier"
          steps={[
            { label: "6 inputs", sub: "CT-derived" },
            { label: "Engineer features", sub: "clinical ratios" },
            { label: "Tier 1", sub: "normal? · AUC 0.98" },
            { label: "Tier 2", sub: "type A / B / E" },
            { label: "Tier 3", sub: "subtype" },
            { label: "Walch type", sub: "+ confidence", accent: true },
          ]}
          caption="Each tier has its own model, and the running confidence is the product of the tier probabilities — so the tool reports how sure it is, not just a label. It mirrors how a clinician reasons down the Walch tree."
        />
        <p>
          The classifier is <strong>hierarchical</strong>. Tier 1 separates Normal from Pathologic
          glenoids. Tier 2 assigns the main type among A, B, and E. Tier 3 resolves the subtype — B2
          vs B3, E2 vs E3, with A mapping directly to A2 (the only A subtype in the data). I compared
          Random Forests, SVMs, XGBoost, and logistic regression at each tier and kept the strongest
          per stage.
        </p>
        <p>
          <strong>Domain-grounded feature engineering.</strong> From four measured inputs — version,
          inclination, and anterior-posterior / superior-inferior subluxation — plus glenoid surface
          area and sphere radius, the pipeline derives a subluxation index and an area-to-radius ratio.
          Encoding subluxation and version as vectors and ratios, rather than raw numbers, hands the
          models the geometry a surgeon actually reads off the scan. An ANOVA confirmed subluxation and
          version were the most discriminative measurements (F ≈ 40, p &lt; 1e-18).
        </p>
        <FigurePlate
          src="/projects/glenoid-classifier/feature-importance-tier1.png"
          alt="Horizontal bar chart of Tier-1 feature importances: version highest, then the engineered area-to-radius ratio, then AP and SI subluxation."
          caption="What drives the healthy-vs-diseased screen: version leads, followed by the engineered area-to-radius ratio and the subluxation measures — confirming the geometry the feature engineering was built around."
          width={1000}
          height={600}
          plate
        />
      </Section>

      <Section title="Results — and an honest look at the numbers">
        <p>
          The strongest, most reproducible result is the <strong>healthy-vs-diseased screen</strong>:
          Normal vs Pathologic reaches <strong>~91% accuracy with an AUC of 0.98</strong>. That&apos;s
          the tier I trust most, and it&apos;s the one a triage tool would lean on.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FigurePlate
            src="/projects/glenoid-classifier/roc-tier1.png"
            alt="ROC curve for the Tier-1 Normal-vs-Pathologic classifier, area under the curve 0.98."
            caption="Tier 1 — Normal vs Pathologic. AUC 0.98: the healthy-vs-diseased screen separates cleanly, and this reproduces under proper cross-validation."
            width={640}
            height={480}
            plate
          />
          <FigurePlate
            src="/projects/glenoid-classifier/confusion-matrix.png"
            alt="Six-by-six confusion matrix of the tiered classifier across A2, B2, B3, E2, E3, and Normal — strong diagonal, confusion concentrated between B2/B3 and E2/E3."
            caption="The full 6-way confusion matrix from the report — 120/143 correct (83.9%). Normal is perfect and the errors cluster where they should clinically: B2↔B3 and E2↔E3."
            width={1200}
            height={800}
            plate
          />
        </div>
        <NoteBlock title="Per-tier 84% vs. end-to-end 63% — the honest read">
          My report headlines <strong>83.9%</strong> overall, and that number is real — it&apos;s the{" "}
          <em>per-tier</em> accuracy, where each stage is scored on the cases that truly belong to it
          (the confusion matrix above). But when the tiers actually <em>chain</em> in a live tool — Tier
          1&apos;s prediction, not the ground truth, decides whether Tier 2 even runs — early misroutes
          cascade, and a proper end-to-end cross-validation lands at <strong>~63%</strong> on the full
          6-way task. Both are legitimate; they measure different things. The calculator above runs the
          honest end-to-end version, which is why its confidence is candid about the harder subtype
          calls. It&apos;s the same &quot;pick the metric that reflects what was actually learned&quot;
          discipline I bring to my{" "}
          <Link href="/projects/tha-pain-prediction">hip-pain</Link> and{" "}
          <Link href="/projects/nba-shot-selection">NBA</Link> models.
        </NoteBlock>
        <FigurePlate
          src="/projects/glenoid-classifier/model-comparison.png"
          alt="Bar chart comparing flat classifiers on main-type vs detailed-type accuracy; detailed-type is markedly lower, motivating the tiered approach."
          caption="Why tier at all: a single flat classifier tops out around 78% on main types and ~64% on the full detailed types. Breaking the problem into staged decisions is what makes the healthy-vs-diseased screen so strong."
          width={640}
          height={480}
          plate
        />
      </Section>

      <Section title="Tech stack">
        <EquipList
          items={[
            "Python",
            "scikit-learn",
            "Random Forest",
            "XGBoost",
            "SVM",
            "pandas · NumPy",
            "Streamlit",
            "TypeScript (in-browser inference)",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          Two things I&apos;m proud of here. The structure: a hierarchical classifier that decomposes a
          hard six-way problem into the same normal → type → subtype decisions a clinician makes, each
          stage matched to a model that suits it. And the honesty: catching that the headline 84% is a
          per-tier number, reporting the ~63% a deployed tool actually achieves, and then shipping that
          deployed tool so anyone can poke at it. A small dataset (143 cases, some subtypes under 20
          examples) is a real limit — but naming the limits, and making the model checkable, is the
          point.
        </p>
      </Section>
    </SheetShell>
  );
}
