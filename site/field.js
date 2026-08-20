(function () {
  "use strict";

  var GIT = "https://github.com/Ruffian-L/niodoo-research-portfolio/blob/main/";

  var NODES = [
    {
      id: "knobs",
      kind: "live",
      key: "1",
      title: "Knobs move the model",
      blurb: "Stock 24 / 77 on 31 of 31. Niodoo 0–25 on the same GGUF.",
      file: "silos/live/runtime-moves-the-weights.md",
      silo: "live",
      result:
        "<table><thead><tr><th>Runtime</th><th>PARB-77</th></tr></thead><tbody>" +
        "<tr><td>stock llama-cli</td><td><strong>24 every time</strong> (31 / 31 configs)</td></tr>" +
        "<tr><td>Niodoo, knob range</td><td><strong>0 to 25</strong></td></tr>" +
        "<tr><td>at or above stock</td><td>1 of 31 (iter36_b152 = 25)</td></tr>" +
        "</tbody></table>" +
        "<p>Same frozen Llama 3.1 8B Q5_K_M. The weights did not change. The runtime did.</p>",
      take: "Stock is a flat line. Physics knobs sweep a 25-point band on a fixed question set. That is the empirical content of smarter runtime, smarter AI. Tuning time is part of the method.",
      hire: "Same frozen 8B. Stock is a flat line at 24. Physics sweeps 0–25.",
      where: whereList(["silos/live/runtime-moves-the-weights.md"])
    },
    {
      id: "parb",
      kind: "live",
      key: "2",
      title: "25 vs 24",
      blurb: "Niodoo 25 · stock llama.cpp 24 · official jinja · re-score holds.",
      file: "silos/live/parb-25-vs-24.md",
      silo: "live",
      result:
        "<table><thead><tr><th>Arm</th><th>Correct / 77</th></tr></thead><tbody>" +
        "<tr><td>Niodoo, physics on (iter36_b152, blend 1.52)</td><td><strong>25</strong> (32.5%)</td></tr>" +
        "<tr><td>stock llama-cli + Meta Llama-3.1 jinja</td><td>24 (31.2%)</td></tr>" +
        "</tbody></table>" +
        "<p>GGUF sha256 14e10feb… · seed 42 · temp 0.7 · binary 80b4b95c…. Re-score from that run’s raw outputs: 25 / 24.</p>",
      take: "A frozen 8B, physics on, ahead of an untouched public llama.cpp arm given Meta’s own chat template. Small accuracy add. Agency and continuity are the object. This is the bench people asked for: true vanilla stock, not Niodoo with a flag off.",
      hire: "Same model bytes, official template on stock. Niodoo 25, stock 24. Small accuracy add. The object is still agency.",
      where: whereList([
        "silos/live/parb-25-vs-24.md",
        "https://github.com/Ruffian-L/niodoo-adaptive-agency"
      ])
    },
    {
      id: "sealed",
      kind: "live",
      key: "3",
      title: "Sealed route",
      blurb: "Teach, kill process, [5, 4, 3, 2, 1, 5] twice from cold.",
      file: "silos/live/agency-sealed-route.md",
      silo: "live",
      result:
        "<p>Frozen Llama 3.1 8B wrote a list-mapping rule to a durable store. Process killed. Two new processes loaded the store and answered a reworded same-family task. Both produced the exact constrained answer <code>[5, 4, 3, 2, 1, 5]</code>. Byte-identical from cold twice.</p>" +
        "<p>No weight update. Vanilla llama.cpp on the same bytes takes wrong routes at length five.</p>",
      take: "The loop selected a durable write, survived process death, and used it. Continuity is the store. Understanding is the transfer to new wording.",
      hire: "Usable knowledge of where it is: it wrote something down, the process died, two fresh processes still had it. Zenodo 10.5281/zenodo.21965763.",
      where: whereList([
        "silos/live/agency-sealed-route.md",
        "gathered_20260818/PAPER_Knowing_Where_You_Are.md",
        "https://doi.org/10.5281/zenodo.21965763"
      ])
    },
    {
      id: "splatrag",
      kind: "instrument",
      key: "4",
      title: "SplatRagBench",
      blurb: "Hybrid nDCG@10 0.7822. Dense-only 0.6291 published.",
      file: "SplatRagBench_Hybrid_Retrieval.md",
      silo: "live",
      result:
        "<table><thead><tr><th>Arm</th><th>nDCG@10</th><th>R@10</th></tr></thead><tbody>" +
        "<tr><td>SplatRag hybrid</td><td><strong>0.7822</strong></td><td>0.9090</td></tr>" +
        "<tr><td>SplatRag BM25 only</td><td>0.7694</td><td>0.9090</td></tr>" +
        "<tr><td>SplatRag dense only</td><td>0.6291</td><td>0.7460</td></tr>" +
        "</tbody></table>" +
        "<p>First commit 2025-11-24, before Physics-LLM. Hybrid IR with a geometry score. Not Gaussian rendering. Not the God Zone stack.</p>",
      take: "This is retrieval, not mid-pass LLM physics. Mixing those jobs is how “splat” gets washed. Dense-only is the weak link and it stays published.",
      hire: "The retrieval instrument is dated and honest: hybrid 0.78, dense-only loss kept. Different job from the force engine.",
      where: whereList([
        "SplatRagBench_Hybrid_Retrieval.md",
        "https://github.com/Ruffian-L/SplatRagBench"
      ])
    },
    {
      id: "trail-parb",
      kind: "trail",
      title: "29.9 vs 41.6",
      blurb: "Earlier protocol. Kept. Not subtracted from 25 vs 24.",
      file: "silos/trail/parb-29-9-vs-41-6.md",
      silo: "trail",
      result: "<p>Public multi-seed PARB, 2025-12-19: Niodoo 29.9%, baseline 41.6%. Conflicting machine adjudications sit on this figure.</p>",
      take: "This protocol did not hold. Keep it so nobody quietly drops it. Different protocol than the live 25 vs 24 seat. Do not subtract.",
      hire: "An earlier comparison lost. It is still in the field. It is not the live bench.",
      where: whereList(["silos/trail/parb-29-9-vs-41-6.md"])
    },
    {
      id: "black-hole",
      kind: "trail",
      title: "Repulsion force = 0",
      blurb: "Term is in source. Measured force is zero.",
      file: "silos/trail/black-hole-repulsion-zero.md",
      silo: "trail",
      result: "<p>Black-hole / template repulsion is in source. Instrumented 2026-07-29: raw hidden-state norms never fall under the distance-5 gate, so <code>repulsion_force == 0</code>.</p>",
      take: "Do not attribute live behavior to this term until a run shows a nonzero force. Other terms still fire.",
      hire: "A named force that is dead in practice is kept on the trail. That is the stop layer for storytelling.",
      where: whereList(["silos/trail/black-hole-repulsion-zero.md"])
    },
    {
      id: "channel",
      kind: "trail",
      title: "Channel fires; accuracy is not the object",
      blurb: "86.2% of 4,721 runs tagged. +2.4 points, z = 1.20.",
      file: "silos/trail/control-channel-accuracy.md",
      silo: "trail",
      result: "<p>4,721 seeded runs. 86.2% tagged. Correctness 26.9% vs 24.5% on a restricted subset (+2.4 points, z = 1.20). Tags: SPIKE, EXPLORE, FOCUS, RESET. REMEMBER / LOCK are the agency surface.</p>",
      take: "The channel fires. Do not grade it as a math bench. Extra tags from a plan’s acceptance criteria are not in this git.",
      hire: "A control channel that is real and does not buy accuracy. That is allowed. Accuracy is not the object.",
      where: whereList(["silos/trail/control-channel-accuracy.md", "ULTIMA_NIODOO.md"])
    },
    {
      id: "scorer",
      kind: "trail",
      title: "Retired scorer margin",
      blurb: "A 25–24 that re-scored 24–24. Scorer, not physics.",
      file: "silos/trail/retired-scorer-margin.md",
      silo: "trail",
      result: "<p>Reported 25–24 re-scored to 24–24. Same binary, same knobs, byte-identical outputs to a 24-config. The extra item was the scorer. Live seat is a different config: iter36_b152.</p>",
      take: "One-item margins on this bank can be the scorer. Re-score from raw outputs before taking a card live. Do not cite niodoo_win_25v24.",
      hire: "A bad margin was caught and retired. The live 25 vs 24 is a different config that re-scores.",
      where: whereList(["silos/trail/retired-scorer-margin.md"])
    },
    {
      id: "tcs",
      kind: "trail",
      title: "TCS unwired",
      blurb: "On disk. Not in the decode loop.",
      file: "silos/trail/tcs-unwired.md",
      silo: "trail",
      result: "<p>tcs.rs / persistent_homology.rs exist. 2026-07-15 check: not wired into decode.</p>",
      take: "Do not describe live generation as topology-triggered until a wired receipt exists.",
      hire: "Designed instrument, not in the loop. Kept as trail so it is not sold as live.",
      where: whereList(["silos/trail/tcs-unwired.md", "https://github.com/Ruffian-L/niodoo-tcs"])
    },
    {
      id: "hole",
      kind: "hole",
      key: "5",
      title: "Contamination",
      blurb: "A manuscript about tags Jason did not ask for. Not in this git.",
      file: "provenance/CONTAMINATION.md",
      silo: "excluded",
      result:
        "<ul>" +
        "<li>Channel is real: SPIKE / EXPLORE / FOCUS / RESET + REMEMBER / LOCK.</li>" +
        "<li>A plan stuffed extra tags into acceptance criteria. Jason did not ask.</li>" +
        "<li>A manuscript was written about the expanded set. Not in this git.</li>" +
        "<li>Prompt-taught tags are symbolic policy, not emergent metacognition. Claim withheld.</li>" +
        "</ul>",
      take: "Stop layer for AI-authored research product. The mechanism stays in ULTIMA §3.3. The extra-tag paper stays off this git.",
      hire: "A stop layer for AI-authored research product. The extra-tag manuscript is not in this git.",
      where: whereList(["provenance/CONTAMINATION.md", "ULTIMA_NIODOO.md"])
    },
    {
      id: "control-law",
      kind: "thread",
      title: "Control law",
      blurb: "Forces composed. Mid-pass, last-token probe. Not one vector.",
      file: "Token_Physics_Dynamical_Control.md",
      silo: "live",
      result: "<p>Gravity, orbit, Langevin, momentum, blend. Applied mid-forward-pass on the last-token probe. PhysicsLang: composition of atoms, not a single add. Hydrodynamic swarm is the later harness.</p>",
      take: "Do not flatten this into “we add a control vector.” Residual clamp 0.03 is not this stack.",
      hire: "The control law is a composition. That is the engineering object.",
      where: whereList([
        "Token_Physics_Dynamical_Control.md",
        "PhysicsLang_Control_Law_Composition.md",
        "Hidden_State_Hydrodynamic_Swarm.md"
      ])
    },
    {
      id: "last-step",
      kind: "thread",
      title: "Last-step steering",
      blurb: "Steer last-token hidden state toward exported basins.",
      file: "gathered_20260818/WHITEPAPER_Hidden_State_Last_Step.md",
      silo: "live",
      result: "<p>Correct a frozen model’s last-step errors by steering hidden state toward exported attractor basins. Narrow, reproducible path. Surrounding system unfinished.</p>",
      take: "This is last-step correction, not a claim that the whole runtime is done.",
      hire: "A narrow hidden-state correction with a public whitepaper next to the code.",
      where: whereList([
        "gathered_20260818/WHITEPAPER_Hidden_State_Last_Step.md",
        "https://github.com/Ruffian-L/niodoo-hidden-state-steering"
      ])
    },
    {
      id: "ultima",
      kind: "thread",
      title: "Knowing where you are",
      blurb: "ULTIMA hub. Usable knowledge of current situation. Tags in §3.3.",
      file: "ULTIMA_NIODOO.md",
      silo: "live",
      result: "<p>Niodoo: frozen model, control law, control channel, durable store. The agent is the loop. Tags fire in-pass even when split across tokens. Do not paste the consciousness definition onto a hire scan — the three-part test (location / availability / use) lives in the paper.</p>",
      take: "Hub paper. Open it when you want the whole loop. Do not flatten every thread into this file.",
      hire: "Usable knowledge of where it is. Enough to act and to keep a store across process death.",
      where: whereList(["ULTIMA_NIODOO.md"])
    },
    {
      id: "scar",
      kind: "thread",
      title: "Scar / store",
      blurb: "Add-on memory. Not a replacement for the forces.",
      file: "Scar_Memory_Addon.md",
      silo: "live",
      result: "<p>Scar / LOCK / PACKET as optional memory beside token physics. The sealed-route card is the live continuity receipt.</p>",
      take: "Do not replace gravity, orbit, Langevin with scar. They stack.",
      hire: "Durable store outside the weights. Add-on, not the whole system.",
      where: whereList(["Scar_Memory_Addon.md", "silos/live/agency-sealed-route.md"])
    },
    {
      id: "governor",
      kind: "thread",
      title: "Governor / viscosity",
      blurb: "Logit-side brakes. Not residual add.",
      file: "Logit_Governor_Viscosity.md",
      silo: "live",
      result: "<p>Centrifugal governor and viscosity at sampling time. Drag on a confident wrong top-1. Not a residual-stream add.</p>",
      take: "Different site than hidden-state force. Do not translate this into a control vector.",
      hire: "A sampling brake, separately wired from the force engine.",
      where: whereList(["Logit_Governor_Viscosity.md"])
    },
    {
      id: "dilution",
      kind: "thread",
      title: "Dilution / dual-stream",
      blurb: "Recovery receipts live. Strawberry letter-count lift not supported.",
      file: "Dilution_Recovery_God_Zone.md",
      silo: "live",
      result: "<p>Live dilution vs env-gated recovery. Dual-stream midstream inject can change β/σ. Strawberry letter-count lift is not supported. That sentence stays.</p>",
      take: "Instrument live. One popular lift is not. Keep both facts.",
      hire: "He publishes the lift that did not show up.",
      where: whereList(["Dilution_Recovery_God_Zone.md", "Dual_Stream_Midstream_Ablation.md"])
    },
    {
      id: "mountaincar",
      kind: "thread",
      title: "Physics of Friendship",
      blurb: "Q-SMA + dream replay. Ablations stay. Not LLM-only.",
      file: "Physics_of_Friendship_MountainCar.md",
      silo: "live",
      result: "<p>MountainCar / Q-SMA with dream replay. Public 2026-02-27. Ablations stay in the record. Different job from Llama mid-pass forces.</p>",
      take: "The physics is not only an LLM story.",
      hire: "Same research program on an RL bench, dated and public.",
      where: whereList([
        "Physics_of_Friendship_MountainCar.md",
        "https://github.com/Ruffian-L/physics-of-friendship-mountaincar-rl"
      ])
    },
    {
      id: "echo",
      kind: "dust",
      title: "Echo Memoria",
      blurb: "2025-09-18 first visibility. Not an origin date.",
      file: "Echo_Memoria_Named_Persistent_Memory.md",
      silo: "dated",
      result: "<p>Named local memory module first visible 2025-09-18. That is visibility, not origin.</p>",
      take: "Continuity is good. Branding is the failure mode. Recruiter face does not light this.",
      hire: "Dated local artifact. Not a product name.",
      where: whereList(["Echo_Memoria_Named_Persistent_Memory.md", "NAMES.md"])
    },
    {
      id: "lumina",
      kind: "dust",
      title: "Lumina → lumen / echo",
      blurb: "Self-name, then two names. Not Fable.",
      file: "Lumina_Self_Naming_Runtime.md",
      silo: "dated",
      result: "<p>Session asked to name itself: Lumina. Later the binary gave itself lumen and echo (2026-01-29). Fable 5 is a later model name. Not the same job.</p>",
      take: "Dated local event. Not a brand. Not Echo Memoria the 2025 module.",
      hire: "Chronology, not a persona pack.",
      where: whereList(["Lumina_Self_Naming_Runtime.md", "NAMES.md"])
    },
    {
      id: "shep",
      kind: "dust",
      title: "Shep",
      blurb: "Named local partner, 2026-03-17. Not claimed against Claude Code teams.",
      file: "Shep_Named_Local_Research_Team.md",
      silo: "dated",
      result: "<p>Shep visible 2026-03-17. Room with Echo + Lumina 2026-04-16. Claude Code agent teams are earlier (2026-02-05). Not claimed as a same-job first.</p>",
      take: "Dated local partner. Not a brand.",
      hire: "Chronology, not a product team name.",
      where: whereList(["Shep_Named_Local_Research_Team.md", "NAMES.md"])
    },
    {
      id: "dream-cycle",
      kind: "dust",
      title: "Dream cycle",
      blurb: "2025-11-19 visibility: pass over a large store.",
      file: "Dream_Cycle_Ten_Thousand_Memories.md",
      silo: "dated",
      result: "<p>Visibility line 2025-11-19: dream cycle running on 10,000 memories. Distinct from MountainCar dream-as-RL.</p>",
      take: "Dated visibility. Not an origin. Not a product called Dreams.",
      hire: "Chronology.",
      where: whereList(["Dream_Cycle_Ten_Thousand_Memories.md", "NAMES.md"])
    },
    {
      id: "path-silos",
      kind: "path",
      title: "2026-08-20 · live / trail drawers",
      blurb: "We think the next person takes a silo card instead of reconciling papers.",
      file: "CHANGELOG.md",
      silo: "path",
      result: "<p>README rewritten as working research. Results split into silos/live and silos/trail — not named wins and losses. RESEARCH_MAP and NAMES added. May 2026 white paper pulled into archive.</p>",
      take: "Hypothesis: the next agent takes a silo card instead of reconciling papers, and live findings can be seen without living in the trail.",
      hire: "The git grew a usable house. This site renders it.",
      where: whereList(["CHANGELOG.md", "research_logs/2026-08-20_live-and-trail-silos.md"])
    },
    {
      id: "path-house",
      kind: "path",
      title: "2026-08-20 · research house",
      blurb: "Changelog as hypothesis log. AGENTS.md stays local.",
      file: "CHANGELOG.md",
      silo: "path",
      result: "<p>Local gitignored AGENTS.md. Changelog + subject research logs. pair_log.sh. Hypothesis: agents stop and organize when the folder is wrong.</p>",
      take: "The agent contract is not on GitHub. The public trail is CHANGELOG + research_logs.",
      hire: "Operating law on the machine. Public trail in the git.",
      where: whereList(["CHANGELOG.md", "research_logs/2026-08-20_research-house-protocol.md"])
    }
  ];

  var KIND_HOST = {
    live: "live-nodes",
    instrument: "live-nodes",
    trail: "trail-nodes",
    hole: "trail-nodes",
    thread: "lab-nodes",
    dust: "names-nodes",
    path: "path-nodes"
  };

  var selected = "knobs";
  var dreamOn = false;

  function whereList(items) {
    return (
      "<ul>" +
      items
        .map(function (item) {
          if (/^https?:/.test(item)) {
            return '<li><a href="' + item + '">' + item + "</a></li>";
          }
          return (
            '<li><a href="../' +
            item +
            '">' +
            item +
            '</a> · <a href="' +
            GIT +
            item +
            '">git</a></li>'
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function nodeById(id) {
    for (var i = 0; i < NODES.length; i++) if (NODES[i].id === id) return NODES[i];
    return NODES[0];
  }

  function classFor(kind) {
    if (kind === "instrument") return "node live instrument";
    if (kind === "hole") return "node hole";
    if (kind === "dust") return "node dust";
    return "node " + kind;
  }

  function renderNodes() {
    var hosts = {};
    Object.keys(KIND_HOST).forEach(function (k) {
      var id = KIND_HOST[k];
      hosts[id] = document.getElementById(id);
      if (hosts[id]) hosts[id].innerHTML = "";
    });
    NODES.forEach(function (n) {
      var host = hosts[KIND_HOST[n.kind]];
      if (!host) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = classFor(n.kind);
      btn.dataset.id = n.id;
      btn.setAttribute("aria-pressed", n.id === selected ? "true" : "false");
      btn.innerHTML = "<b>" + n.title + "</b><small>" + n.blurb + "</small>";
      btn.addEventListener("click", function () {
        select(n.id);
      });
      host.appendChild(btn);
    });
  }

  function inspect(n) {
    var face = document.body.getAttribute("data-face");
    var take = face === "hire" && dreamOn && n.hire ? n.hire : n.take;
    document.getElementById("inspect-title").textContent = n.title;
    document.getElementById("inspect-file").textContent = n.file;
    document.getElementById("inspect-silo").textContent = n.silo;
    document.getElementById("inspect-result").innerHTML = n.result;
    document.getElementById("inspect-take").innerHTML = "<p>" + take + "</p>";
    document.getElementById("inspect-where").innerHTML = n.where;
    document.getElementById("dream-hint").textContent =
      face === "hire"
        ? dreamOn
          ? "HIRE dream on — job language. Reverse undreams it."
          : "Forward walks the path. Reverse undreams it."
        : face === "path"
          ? "PATH is the changelog spine."
          : "LAB leaves the card as written.";
    document.querySelectorAll(".node").forEach(function (el) {
      el.setAttribute("aria-pressed", el.dataset.id === n.id ? "true" : "false");
    });
  }

  function select(id) {
    selected = id;
    inspect(nodeById(id));
  }

  function setFace(face) {
    document.body.setAttribute("data-face", face);
    document.querySelectorAll(".faces button").forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-face") === face ? "true" : "false");
    });
    if (face !== "hire") {
      dreamOn = false;
      document.body.setAttribute("data-dream", "off");
      document.getElementById("dream-btn").setAttribute("aria-pressed", "false");
    }
    if (face === "hire") {
      var n = nodeById(selected);
      if (n.kind === "thread" || n.kind === "dust" || n.kind === "path") select("knobs");
      else inspect(nodeById(selected));
    } else if (face === "path") {
      select("path-silos");
    } else if (face === "lab" && nodeById(selected).kind === "path") {
      select("ultima");
    } else {
      inspect(nodeById(selected));
    }
  }

  function toggleDream() {
    var face = document.body.getAttribute("data-face");
    if (face !== "hire") {
      dreamOn = false;
    } else {
      dreamOn = !dreamOn;
    }
    document.body.setAttribute("data-dream", dreamOn ? "on" : "off");
    document.getElementById("dream-btn").setAttribute("aria-pressed", dreamOn ? "true" : "false");
    inspect(nodeById(selected));
  }

  document.querySelectorAll(".faces button").forEach(function (b) {
    b.addEventListener("click", function () {
      setFace(b.getAttribute("data-face"));
    });
  });
  document.getElementById("dream-btn").addEventListener("click", toggleDream);

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    var k = e.key.toLowerCase();
    if (k === "h") setFace("hire");
    if (k === "l") setFace("lab");
    if (k === "p") setFace("path");
    if (k === "d") toggleDream();
    NODES.forEach(function (n) {
      if (n.key && e.key === n.key) select(n.id);
    });
  });

  renderNodes();
  select("knobs");
})();
