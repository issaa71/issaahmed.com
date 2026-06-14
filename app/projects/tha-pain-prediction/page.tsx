import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  TechRow,
  StatusBadge,
  Figure,
  ComparisonTable,
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "THA Pain Prediction — Peer-Reviewed ML",
  description:
    "Peer-reviewed ML (J. Arthroplasty 2026) predicting long-term pain after hip replacement: 13 models, 513 patients, deployed as a clinician-facing calculator.",
  openGraph: {
    title: "THA Pain Prediction — Peer-Reviewed ML",
    description:
      "Peer-reviewed ML (J. Arthroplasty 2026) predicting long-term pain after hip replacement: 13 models, 513 patients, deployed as a clinician-facing calculator.",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline:
    "Predicting Long-Term Pain After Total Hip Replacement",
  sameAs: "https://doi.org/10.1016/j.arth.2026.04.023",
  author: {
    "@type": "Person",
    name: "Issa Ahmed",
  },
  isPartOf: {
    "@type": "Periodical",
    name: "The Journal of Arthroplasty",
  },
  datePublished: "2026",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CaseStudyShell
        eyebrow="Applied ML · Peer-reviewed Research"
        title="Predicting Long-Term Pain After Total Hip Replacement"
        tagline="A machine-learning pipeline that estimates a patient's expected pain score 3 and 5 years after primary total hip arthroplasty — published in The Journal of Arthroplasty and deployed as a clinician-facing calculator."
        meta="The Journal of Arthroplasty · 2026 · DOI 10.1016/j.arth.2026.04.023 · 2nd of 7 authors"
      >
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="accent">
            Published — The Journal of Arthroplasty · 2026
          </StatusBadge>
        </div>
        <a
          href="https://doi.org/10.1016/j.arth.2026.04.023"
          target="_blank"
          rel="noreferrer"
          className="glass rounded-xl p-4 group flex items-center gap-4 transition-colors hover:border-accent/40"
        >
          <Image
            src="/projects/tha-pain-prediction/journal-cover.png"
            alt="Cover of The Journal of Arthroplasty"
            width={237}
            height={298}
            className="h-24 w-auto rounded-md border border-border"
          />
          <span className="min-w-0 flex-1">
            <span className="eyebrow block text-faint">
              The Journal of Arthroplasty · open access
            </span>
            <span className="mt-1 block font-display text-lg font-semibold tracking-tight sm:text-xl">
              Machine Learning Using Preoperative Patient Factors Can Predict the
              Severity of Pain Following Primary Total Hip Arthroplasty
            </span>
            <span className="mt-1 block text-xs text-muted">
              DOI 10.1016/j.arth.2026.04.023 · 2nd of 7 authors · Read the paper
            </span>
          </span>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-faint transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <Section title="Headline">
          <MetricGrid>
            <Metric
              label="Best T3 MSE"
              value="2.70"
              hint="KNN — beats the 3.07 mean baseline; nonlinear models won at both timepoints"
              accent
            />
            <Metric
              label="Authorship"
              value="2nd of 7"
              hint="the only engineer among the MDs + PhDs — led the ML implementation end to end"
            />
            <Metric label="Patients" value="513" hint="SAFE-T prospective cohort, two academic hospitals" />
            <Metric label="Models compared" value="13" hint="linear · tree ensembles · neural nets" />
          </MetricGrid>
        </Section>

      <Section title="From the paper">
        <div className="grid gap-4 sm:grid-cols-2">
          <Figure
            src="/projects/tha-pain-prediction/paper-fig4-catboost-importances.png"
            alt="Bar charts of CatBoost top-10 feature importances at 3 and 5 years: preoperative pain-perception items, age, BMI, length of stay, and back/neck history dominate."
            caption="Figure 4 of the paper — what actually drives long-term pain in the best-performing model (CatBoost): patient-reported pain-perception items, age, BMI, and length of stay."
            width={1405}
            height={2468}
            plate
          />
          <Figure
            src="/projects/tha-pain-prediction/paper-fig1-pain-distribution.png"
            alt="Bar charts of the pain-score distribution at 3 and 5 years showing most patients report zero or near-zero pain."
            caption="Figure 1 of the paper — the heavy skew toward zero pain. This class imbalance is why headline 'accuracy' flatters the baseline, and why the study leads with MSE and buffer accuracy."
            width={1405}
            height={1605}
            plate
          />
        </div>
        <ComparisonTable
          columns={["Model", "MSE", "Buffer ±1", "Buffer ±2"]}
          rows={[
            { cells: ["KNN", "2.70", "63.4%", "83.1%"], highlight: true },
            { cells: ["XGBoost", "2.77", "59.2%", "80.3%"] },
            { cells: ["Random Forest", "2.79", "52.1%", "77.5%"] },
            { cells: ["CatBoost", "2.83", "50.7%", "85.9%"] },
            { cells: ["Linear Regression", "4.20", "42.3%", "70.4%"] },
            { cells: ["Mean baseline", "3.07", "21.1%", "90.1%"] },
          ]}
          caption="Selected rows from Table 2 of the paper — 3-year (T3) predictions on the held-out test set (n = 72). Lower MSE is better; nonlinear models beat both the mean baseline and every linear model. The baseline's high ±2 figure is the class-imbalance artifact discussed in Results. Full 13-model tables (T3 + T5) in the publication."
        />
      </Section>

      <Section title="Problem">
        <p>
          Total hip arthroplasty (THA) is one of the most successful procedures in modern
          medicine — over half a million performed annually in North America — but{" "}
          <strong>up to 23% of patients still report chronic postoperative pain</strong>,
          which contributes to higher opioid use, readmission rates, and worse overall
          outcomes. Identifying patients at higher risk of persistent pain{" "}
          <em>preoperatively</em> is a critical clinical challenge: surgeons currently
          have no validated tool to estimate this risk, and traditional regression models
          have struggled to capture the non-linear relationships that drive the outcome.
        </p>
        <p>
          The collaboration with the Holland Bone & Joint Program at Sunnybrook and the
          University of Toronto Department of Orthopaedic Surgery aimed to (1) build and
          validate ML models that predict long-term pain from preoperative patient
          factors, and (2) translate the best-performing model into a web tool that a
          clinician could use during a patient consultation.
        </p>
      </Section>

      <Section title="My role">
        <p>
          Among the seven co-authors I was the only engineer; the senior team were MDs
          and PhDs at Sunnybrook + UofT. I led the technical implementation: feature
          preprocessing and imputation, model selection and training across 13
          algorithms, hyperparameter search with cross-validation, the four-method
          feature importance pipeline, and the Streamlit calculator that surfaces the
          model in a clinically usable form.
        </p>
      </Section>

      <Section title="Approach">
        <p>
          The dataset was Cohort 1 of the prospective SAFE-T study — 513 patients
          undergoing primary unilateral THA at two large academic hospitals, with data
          collected from preoperative baseline through five years postoperatively. Pain
          was measured on a 0–10 visual analog scale at 3-year (T3) and 5-year (T5)
          follow-ups and served as the target variable.
        </p>
        <p>
          <strong>Feature engineering.</strong> 71 candidate features (60 numeric, 11
          categorical) spanning demographics, surgical variables, comorbidities, and
          patient-reported outcome measures (WOMAC and ICOAP osteoarthritis pain
          scales). Numeric features were imputed via iterative imputation to preserve
          inter-feature relationships; categorical features used most-frequent imputation.
          Continuous variables like height and weight were robust-scaled to dampen
          outliers; bounded scales were normalized to [0, 1].
        </p>
        <p>
          <strong>Model family.</strong> 13 models across three families — linear
          (logistic regression, elastic net, linear SVM, SGD), tree ensembles (decision
          tree, random forest, AdaBoost, XGBoost, CatBoost, LightGBM, KNN), and neural
          networks (scikit-learn MLP, PyTorch MLP). A mean regressor served as the
          floor-comparison baseline.
        </p>
        <p>
          <strong>Training protocol.</strong> Stratified 80/20 train/test split.
          GridSearchCV inside the training set to minimize MSE; the held-out test set
          was only touched once final hyperparameters were locked. Deep models used Adam
          with batch size 128.
        </p>
        <p>
          <strong>Feature importance.</strong> Four complementary methods (Spearman
          correlation, Kruskal–Wallis, Random Forest importance, recursive feature
          elimination) were combined via cross-validated rank aggregation to identify
          the variables that drove the top-performing models. Age, BMI, history of back
          and neck problems, and specific WOMAC / ICOAP items consistently surfaced as
          the strongest preoperative predictors.
        </p>
      </Section>

      <Section title="Results">
        <p>
          <strong>Non-linear models won decisively.</strong> CatBoost, Random Forest, and
          KNN were the top three performers across both timepoints; linear models
          (Linear Regression and Elastic Net) had higher MSE and weaker buffer accuracy
          at both T3 and T5, consistent with prior orthopedic literature showing linear
          methods struggle to capture the non-linear relationships in postoperative-pain
          data.
        </p>
        <p>
          At T3, KNN achieved the lowest MSE (2.70) followed closely by XGBoost (2.77),
          Random Forest (2.79), and CatBoost (2.83) — all beating the 3.07 mean baseline.
          CatBoost had the highest buffer-accuracy-within-±2 score at 85.9%. At T5,
          CatBoost achieved the lowest MSE (4.11), with Random Forest second (4.30).
        </p>
        <p>
          <strong>An honest caveat on the 90.1% classification accuracy.</strong> The
          paper reports 90.1% classification accuracy across the low / moderate / high
          pain categories — but this number was also reached by the mean regressor,
          reflecting the heavy class imbalance in the dataset (most patients report
          minimal or no pain at T3/T5). The more clinically meaningful signal is the MSE
          gap (2.70 vs 3.07) and the buffer accuracy spread.
        </p>
      </Section>

      <Section title="Clinical translation">
        <p>
          Feature-importance analyses guided the input set for a web-based calculator
          that estimates expected pain severity from a small number of preoperative
          inputs. The tool was built with Streamlit, deployed to Streamlit Community
          Cloud, and is the version cited in the published paper.
        </p>
      </Section>

      <Section title="Tech stack">
        <TechRow
          items={[
            "Python",
            "scikit-learn",
            "PyTorch",
            "XGBoost",
            "CatBoost",
            "LightGBM",
            "pandas",
            "NumPy",
            "Streamlit",
            "GridSearchCV",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The most interesting engineering call was recognizing that the headline
          90.1% number is partly noise — the mean baseline also hits it — and choosing
          to lead the discussion with MSE and buffer accuracy instead. Class-imbalanced
          datasets in clinical ML reward this kind of skepticism: it&apos;s easy to
          present a high accuracy number that doesn&apos;t reflect what the model
          actually learned. The future-work section of the paper flags this directly —
          stratified or ordinal modeling approaches and AUC reporting would tighten the
          claim, but only if the dichotomization doesn&apos;t worsen the imbalance.
        </p>
      </Section>
      </CaseStudyShell>
    </>
  );
}
