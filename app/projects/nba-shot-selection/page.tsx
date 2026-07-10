import type { Metadata } from "next";
import Link from "next/link";
import {
  SheetShell,
  Section,
  CalloutStrip,
  Callout,
  LiveBar,
  RefRow,
  Ref,
  RevBlock,
  Stamp,
  NoteBlock,
  EquipList,
  FigurePlate,
  PlaceholderPlate,
  DeepSetsDiagram,
  MetricBars,
  SpecGrid,
} from "../_components/sheet";

export const metadata: Metadata = {
  title: "NBA Shot Selection — Offline RL (audited & regrounded)",
  description:
    "An offline-RL shot-selection agent looked great (EPSA +0.246) — until a forensic audit found the metric was circular and the tracking data corrupt. After repairing the data and regrounding the reward on real shot outcomes, the retrained agent out-selects NBA shot decisions by +0.19–0.32 PPP on held-out games, plus a standalone shot-quality model (AUC 0.672 tracking-only / 0.733 with play-by-play).",
  openGraph: {
    title: "NBA Shot Selection — Offline RL (audited & regrounded)",
    description:
      "A celebrated RL shot-selection result, audited until it broke, then rebuilt on real outcomes: the regrounded agent out-selects NBA shot decisions by +0.19–0.32 PPP on held-out games.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SheetShell
      sheetNo="03"
      sheetCount="06"
      eyebrow="Reinforcement Learning · PyTorch"
      title="NBA Shot Selection — Offline RL on Real Tracking Data"
      tagline="A Dueling Deep Q-Network with a per-entity Deep Sets architecture, trained on 116,928 real NBA possessions to call shoot-or-pass. It first looked ~6× better than NBA players — then I audited it until it broke: the headline metric was circular and the data was corrupt. Repaired and regrounded on real shot outcomes, the agent now out-selects NBA shot decisions by +0.19–0.32 points-per-shot on held-out games — a genuine, honestly-scoped result."
      meta="AISE 4030 Reinforcement Learning · Western Engineering · April 2026"
      status={[
        { label: "Course project — April 2026", tone: "ink" },
        { label: "Live demo", tone: "red", pulse: true },
      ]}
    >
      <CalloutStrip className="breakout">
        <Callout
          label="Out-selects NBA by"
          value="+0.19 to +0.32"
          hint="points per shot, held-out real outcomes (19,944 shots, NBA PPP 1.023) — all 5 non-degenerate configs clear it"
          accent
        />
        <Callout
          label="Learned edge vs heuristic"
          value="~+0.06 PPP"
          hint="statistically significant over a 'shoot the best threes' rule in 4 of 5 configs (bootstrap CI excludes 0)"
        />
        <Callout
          label="Shot-quality model AUC"
          value="0.733"
          hint="standalone supervised model, with play-by-play; 0.672 from tracking features alone"
        />
        <Callout
          label="The flip"
          value="anti → out-select"
          hint="the original circular-reward agents anti-selected (−0.09) on real outcomes; the regrounded agents out-select"
        />
        <Callout
          label="Possessions trained on"
          value="116,928"
          hint="636 games · 2015-16 SportVU · repaired 'v2' substrate"
        />
        <Callout
          label="Evaluation"
          value="One-sided, held-out"
          hint="game-level split; realized PPP on shots the greedy policy would take vs NBA behavior — judges shot selection, not the pass counterfactual"
        />
      </CalloutStrip>

      <LiveBar
        href="https://nba-rl-sim.vercel.app"
        kicker="Live possession explorer · runs in your browser"
        title="Watch the agent call shoot-or-pass on real NBA possessions — then drag a defender and watch it change its mind"
        sub="held-out possessions · what-if mode · the trained network runs client-side"
      />

      <Section title="Stack & methods">
        <SpecGrid
          cols={3}
          items={[
            {
              name: "PyTorch",
              role: "the policy network, trained from scratch",
            },
            {
              name: "Deep Sets",
              role: "permutation-equivariant over 5 defenders, 4 teammates",
            },
            {
              name: "Dueling DQN",
              role: "value/advantage split, offline Q-learning",
            },
            {
              name: "SportVU tracking",
              role: "real NBA player-tracking possessions",
            },
            {
              name: "78-dim features",
              role: "per-timestep possession feature vector",
            },
            {
              name: "Parity harness",
              role: "Python↔TS features & Q-values verified",
            },
          ]}
        />
      </Section>

      {/* swap for: screen recording of the nba-rl-sim what-if mode (defender drag → Q(shoot) collapses to a pass) */}
      <PlaceholderPlate
        kind="VIDEO"
        title="Drag a defender, watch it change its mind"
        covers="screen-capture of the what-if mode — slide a defender onto the ball-handler and Q(shoot) collapses to a pass, live in the browser"
        note="≈ 55s"
      />

      <RefRow>
        <Ref
          href="https://github.com/issaa71/nba-rl-sim"
          label="Explorer source code · GitHub"
          detail="TypeScript inference engine matching the Python pipeline within 1e-6 on features and 1e-4 on Q-values — 250-vector parity suite, MIT"
        />
      </RefRow>

      <Section title="Problem">
        <p>
          Shot selection is one of the most consequential decisions in professional
          basketball — at each step of a possession the ball-handler must decide whether
          to attempt a shot or pass, conditioned on defender positioning, teammate
          availability, shot-clock pressure, and their own shooting ability. The
          question this project asks is whether a learned policy, trained on real NBA
          tracking data, can outperform the actual decisions NBA players made.
        </p>
        <p>
          This is an <strong>offline RL</strong> problem with three pathologies that
          break standard DQN: (1) the agent learns entirely from a fixed dataset and
          cannot explore, (2) the four pass actions are variable-identity — the same
          action index points to a different teammate at every timestep, depending on
          who is closest to the ball-handler — which corrupts standard Bellman backups,
          and (3) shoot is a terminal action that occurs once per episode while passes
          can occur 2–10 times, creating asymmetry that interacts destructively with
          conservative offline-RL penalties like CQL. As I&apos;d find out, the real
          adversary turned out to be a fourth pathology: a reward and an evaluation that
          quietly graded the agent against its own assumptions.
        </p>
      </Section>

      <Section title="The twist — a forensic audit that broke my own result">
        <p>
          The first version of this project produced a headline I was proud of: a
          shot-quality metric (EPSA — expected points per shot attempt above league
          average) on which the Dueling agent scored <strong>+0.273</strong> versus{" "}
          <strong>+0.044</strong> for NBA players&apos; actual choices — roughly{" "}
          <strong>6× better</strong>. It was the kind of clean, citable number that ends
          a slide deck. So I tried to break it instead.
        </p>
        <p>Two things broke:</p>
        <p>
          <strong>The metric was circular.</strong> EPSA scored shots using the same
          contest-adjusted Expected-Points-Value (EPV) proxy that the agent was{" "}
          <em>rewarded</em> on during training. The agent wasn&apos;t being measured
          against reality — it was being graded by the very function it was optimizing,
          so a high score was nearly guaranteed and couldn&apos;t falsify the policy. A
          circular metric can&apos;t be wrong, which is exactly what makes it worthless.
        </p>
        <p>
          <strong>The data was corrupt.</strong> Auditing the 78-dimensional possession
          features surfaced two silent bugs: distance-to-basket was measured to the
          wrong basket on a chunk of possessions, and the &quot;terminal&quot; state was
          the last 2 Hz tracking sample of the possession rather than the actual shot
          release. When I re-scored the celebrated agents on{" "}
          <em>real logged shot outcomes</em>, the verdict inverted: they{" "}
          <strong>anti-selected</strong> — endorsing shots that went on to score{" "}
          <em>worse</em> than the players&apos; own choices (−0.09 PPP). The 6× win was
          an artifact, top to bottom.
        </p>
        {/* RevBlock added in the redesign — the two row descriptions are the only new
            strings on this page; every fact is drawn verbatim from the prose above + tagline. */}
        <RevBlock
          context="Headline metric"
          rows={[
            {
              rev: "A",
              tone: "ink",
              description:
                "EPSA +0.273 vs +0.044 — ~6× NBA players. Circular: scored by the same EPV proxy the agent was trained on. Retired.",
              date: "APR 2026",
            },
            {
              rev: "B",
              tone: "red",
              description:
                "Regrounded on real shot outcomes: out-selects NBA shot decisions by +0.19–0.32 points per shot on held-out games.",
            },
          ]}
        />
        <div className="relative breakout">
          <FigurePlate
            src="/projects/nba-shot-selection/final-performance.png"
            alt="Bar chart of the retired shot-quality EPSA metric: random and always-shoot near zero, NBA players slightly positive, baseline DQN higher, Dueling DQN highest"
            caption="The retired headline. On the circular EPSA metric the agent looked ~6× better than NBA players (+0.273 vs +0.044) — but EPSA reused the same EPV proxy the agent was trained on, so it couldn't falsify the policy. Re-scored on real shot outcomes, these same agents anti-selected (−0.09). This chart is kept only to show what the audit threw out; the outcome-grounded results below replace it."
            width={3000}
            height={1800}
            plate
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 z-10 rotate-[-6deg]"
          >
            <Stamp tone="red">Superseded</Stamp>
          </span>
        </div>
      </Section>

      <Section title="The repair — clean data substrate + an outcome-grounded reward">
        <p>
          Rather than patch the symptom, I rebuilt the foundation. The possession
          segmenter was rewritten to re-derive the true <strong>shot-release frame</strong>{" "}
          using a direction-free nearer-basket distance — chosen over two alternative
          &quot;join&quot; fixes specifically because it is the only one that is{" "}
          <strong>leak-free</strong>. I regenerated all 636 games into a corrected
          substrate (<code>processed_possessions_v2</code>) and gated it on basketball
          sanity: shots beyond 30 ft at 4.5%, three-point rate ~30%, FG% monotonically
          decreasing with distance, and <strong>100% agreement</strong> between the
          derived made/missed flag and the play-by-play log.
        </p>
        <p>
          The reward was regrounded on reality. The circular PBRS/EPV proxy was replaced
          with <strong>real points</strong> at the logged terminal shot, minus a constant
          selectivity bar so the agent is penalized for endorsing below-average looks.
          Critically, passing earns <em>no</em> shaped teammate-EPV bonus — its value flows
          only through the Q-bootstrap from whatever terminal shot it leads to — which
          removes the last circular shortcut. Then I retrained six configurations from
          scratch on the clean data.
        </p>
      </Section>

      <Section title="Approach — Per-Entity Deep Sets architecture">
        <p>
          The variable-identity action problem is solved by scoring each teammate
          individually through a shared encoder rather than mapping Q-values to fixed
          action slots. Two shared encoders (<code>phi_defender</code> and{" "}
          <code>phi_teammate</code>) embed each of the 5 defenders and 4 teammates
          independently. Defender representations are mean-pooled into a defender-context
          vector; teammate representations are kept per-entity. The shoot head takes the
          ball-handler context + pooled defender context and outputs Q(shoot). The pass
          head is shared across teammates and outputs Q(pass_i) per teammate, ensuring
          permutation equivariance and consistent Bellman targets regardless of which
          physical player occupies slot <em>i</em>.
        </p>
        <DeepSetsDiagram label="Per-Entity Deep Sets" />
      </Section>

      <Section title="Approach — Dueling decomposition with type-aware normalization">
        <p>
          The Dueling architecture decomposes Q(s,a) = V(s) + A(s,a) − mean(A). The
          standard mean-subtraction biases the network <em>against</em> shooting when
          there are four pass actions and one shoot action — the mean is dominated by
          the pass group. The fix is type-aware advantage normalization: pass advantages
          are mean-centered within the pass group only, while the shoot advantage is
          left unnormalized.
        </p>
      </Section>

      <Section title="Approach — training details">
        <p>
          Double DQN target computation to mitigate overestimation bias. Hard target-net
          sync every 100 episodes (~570 gradient steps) rather than soft Polyak updates,
          chosen because soft updates destabilized the 450-player ID embeddings — most
          players appear rarely, so continuous small weight changes prevented the
          embedding table from converging. 100K-transition replay buffer with terminal
          oversampling to compensate for shoot-action rarity. Adam at 1e-4, Huber loss
          with gradient clipping at 1.0. Linear epsilon decay from 1.0 → 0.01 over the
          first 40K episodes; agents trained out to the full 100K.
        </p>
      </Section>

      <Section title="Results — re-evaluated on real outcomes">
        <div className="breakout">
          <MetricBars
            title="Out-selection over NBA — gap in points per shot (held-out)"
            bars={[
              { label: "NBA players (behavior baseline)", value: 0.0, display: "1.023 PPP" },
              { label: "Dueling — model reward", value: 0.206, display: "+0.206" },
              { label: "Dueling — outcome reward (100K)", value: 0.247, display: "+0.247" },
              { label: "DQN — outcome reward (100K)", value: 0.251, display: "+0.251" },
              { label: "Dueling — high selectivity bar", value: 0.324, display: "+0.324", accent: true },
            ]}
            caption="Realized points-per-shot on the shots each agent's greedy policy would take, minus NBA behavior PPP (1.023), over 19,944 held-out shots — game-level bootstrap with a select/confirm holdout. All five non-degenerate configs out-select NBA behavior (+0.19 to +0.32), a clean flip from the old circular-reward agents that anti-selected (−0.09). This is one-sided: the pass counterfactual is unobservable offline, so it judges shot selection, not pass or teammate choice."
          />
        </div>
        <p>
          The honest follow-up question: is the agent doing anything cleverer than &quot;the
          three-pointer is worth more, so shoot more threes&quot;? Most of the +0.2 gap{" "}
          <em>is</em> that three-point-value effect, which a one-line &quot;shoot the best
          threes&quot; rule also captures. But measured against that exact heuristic,{" "}
          <strong>4 of 5 configs beat it by a statistically significant margin</strong>{" "}
          (bootstrap CI excludes zero): the high-selectivity agent by +0.094, the two
          plain outcome agents by ~+0.06, the model-reward agent by +0.028; only one ties.
          So there is a real, learned shot-selection edge beyond the trivial rule — modest,
          ~+0.06 PPP, but genuine and verified.
        </p>
        <FigurePlate
          className="breakout"
          src="/projects/nba-shot-selection/decision-maps.png"
          alt="Heatmaps of learned shoot probability by court zone — high near the basket, suppressed in mid-range"
          caption="Decision maps from held-out test data — the agent concentrates shooting near the rim and on high-value threes while suppressing mid-range looks (15–30 ft, the worst EPV proposition in modern basketball), independently rediscovering modern shot-selection analytics."
          width={4769}
          height={1850}
          plate
        />
        <p>
          Selectivity, not volume, is the lever. The strongest agent (high selectivity
          bar) shoots on only <strong>13.4%</strong> of decision points — an &quot;only
          fire on elite looks&quot; policy that lifts realized PPP to 1.347 — while the
          model-reward agent shoots 38.5% at +0.206. Different points on the same
          selectivity frontier, all above the player baseline.
        </p>
        <p>
          <strong>A standalone deliverable came out of the same data.</strong> Separate
          from the RL agent, I trained a supervised <strong>shot-quality model</strong>{" "}
          that predicts make probability from the pre-shot state. It reaches{" "}
          <strong>AUC 0.672</strong> from tracking features alone and{" "}
          <strong>0.733</strong> once play-by-play context is added — a clean, verified
          model that&apos;s useful on its own as a shot-difficulty estimator.
        </p>
      </Section>

      <NoteBlock title="Honest caveats — what this is not">
        <ul className="space-y-2">
          <li>
            <strong>One-sided.</strong> The evaluation judges shot{" "}
            <em>selection</em> only — the counterfactual value of a pass is unobservable
            offline, so this is not a claim about full possession value or teammate choice.
          </li>
          <li>
            <strong>One config genuinely failed — and I kept it in the table.</strong> A
            BCQ variant collapsed to <strong>99.9% always-shoot</strong>. Empirically, its
            behavior-cloning head put ~99.9% probability on SHOOT at essentially every
            state, so the BCQ feasibility mask admitted only one action (1.00 of 5 on
            average) and hard-forced the shoot policy. An expected failure mode on this
            near-degenerate action distribution, not a reward bug.
          </li>
          <li>
            <strong>Training budget mattered, and checkpoints lied.</strong> The plain
            outcome agents only earned their significant edge once trained to the full
            100K episodes; a mid-training &quot;best-eval&quot; checkpoint — selected by the
            old circular metric — looked like a tie. Lesson burned in: evaluate converged
            weights, and never trust a checkpoint the broken metric picked.
          </li>
        </ul>
      </NoteBlock>

      <Section title="Tech stack">
        <EquipList
          items={[
            "Python",
            "PyTorch",
            "NumPy",
            "Gymnasium",
            "SportVU 2015-16",
            "pandas",
            "Matplotlib",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The two non-obvious engineering wins were the per-entity architecture and the
          type-aware advantage normalization — corrections to subtle failure modes a
          standard implementation would silently learn around. But the real lesson was
          the audit. The most dangerous result in machine learning is the one that looks
          great, and the temptation to ship a single clean headline number (like the
          90.1% accuracy I&apos;d see clinical-ML papers cite — see the{" "}
          <Link href="/projects/tha-pain-prediction">
            <em>THA Pain Prediction</em>
          </Link>{" "}
          case study for that one) is precisely when you should try hardest to falsify it.
          A metric that reuses the model&apos;s own assumptions can&apos;t be wrong, which
          is exactly why it tells you nothing.
        </p>
        <p>
          Killing my own +0.273 was the most valuable thing I did on this project. What
          survived the audit is smaller and far more defensible: on real outcomes, a
          regrounded agent that out-selects NBA shot decisions by +0.19–0.32 PPP, with a
          modest but statistically real learned edge over the best simple heuristic, plus
          a verified shot-quality model. Real, scoped, and honest — the result, not the
          hype.
        </p>
      </Section>
    </SheetShell>
  );
}
