(function () {
  const form = document.querySelector("#assessmentForm");
  const fitScore = document.querySelector("#fitScore");
  const scoreBadge = document.querySelector(".score-badge");
  const programmeTitle = document.querySelector("#programmeTitle");
  const metricCards = document.querySelector("#metricCards");
  const blueprint = document.querySelector("#blueprint");
  const questions = document.querySelector("#questions");
  const maturity = document.querySelector("#maturity");
  const pipeline = document.querySelector("#pipeline");
  const architecture = document.querySelector("#architecture");
  const backlog = document.querySelector("#backlog");
  const roadmap = document.querySelector("#roadmap");
  const businessCase = document.querySelector("#businessCase");
  const governance = document.querySelector("#governance");
  const visualTitle = document.querySelector("#visualTitle");
  const visualBody = document.querySelector("#visualBody");
  const canvas = document.querySelector("#processCanvas");
  const toast = document.querySelector("#toast");

  const playbooks = {
    "Finance and Accounting": {
      programme: "Finance automation control tower",
      processExamples: ["AP invoice capture", "PO matching", "close management", "cash application"],
      stakeholders: ["CFO or Finance Director", "AP/AR process owner", "Financial controller", "ERP owner", "Internal audit lead", "Procurement lead"],
      kpis: ["Touchless invoice rate", "Cost per transaction", "First-pass match rate", "Exception ageing", "Close cycle time", "Audit evidence completeness"],
      valueLens: "working capital, close speed and cost-to-serve",
      defaultTools: ["SAP Build Process Automation", "UiPath", "Celonis", "Power Automate", "Power BI"]
    },
    "Human Resources": {
      programme: "People operations automation hub",
      processExamples: ["employee onboarding", "case management", "document collection", "policy requests"],
      stakeholders: ["CHRO or People Director", "HR operations lead", "Payroll owner", "HRIS owner", "Legal counsel", "Employee experience lead"],
      kpis: ["Time to onboard", "Case resolution SLA", "Employee effort score", "Document completion rate", "Policy exception rate", "Automation adoption"],
      valueLens: "employee experience, compliance and HR capacity release",
      defaultTools: ["ServiceNow", "Workday Extend", "Power Automate", "UiPath", "Tableau"]
    },
    "Procurement": {
      programme: "Source-to-pay automation cockpit",
      processExamples: ["supplier onboarding", "purchase requisitions", "contract intake", "PO changes"],
      stakeholders: ["CPO or Procurement Director", "Category leads", "Supplier management lead", "ERP owner", "Legal counsel", "Finance controller"],
      kpis: ["PR cycle time", "Supplier onboarding SLA", "Maverick spend", "Contract touchless rate", "Policy compliance", "Savings leakage"],
      valueLens: "spend control, cycle time and supplier experience",
      defaultTools: ["SAP Build Process Automation", "Celonis", "ServiceNow", "Workato", "Power BI"]
    },
    "Customer Operations": {
      programme: "Customer resolution automation centre",
      processExamples: ["case triage", "refund approvals", "order enquiries", "complaint handling"],
      stakeholders: ["Chief Customer Officer", "Contact centre director", "CRM owner", "Quality lead", "Risk/compliance partner", "Workforce planning lead"],
      kpis: ["First contact resolution", "Average handle time", "Customer effort score", "Backlog ageing", "Escalation rate", "Automation containment"],
      valueLens: "customer retention, service speed and queue capacity",
      defaultTools: ["ServiceNow", "Salesforce Flow", "MuleSoft", "UiPath", "Tableau"]
    },
    "IT and Service Management": {
      programme: "IT service automation command desk",
      processExamples: ["ticket classification", "access requests", "incident enrichment", "asset updates"],
      stakeholders: ["CIO or CTO", "Service desk owner", "Platform owner", "Cybersecurity lead", "Enterprise architect", "Change manager"],
      kpis: ["Mean time to resolve", "Auto-remediation rate", "Ticket deflection", "SLA breach rate", "Change failure rate", "Control compliance"],
      valueLens: "resolution speed, resilience and engineering capacity",
      defaultTools: ["ServiceNow Automation Engine", "Power Automate", "Camunda", "Azure DevOps", "Power BI"]
    },
    "Supply Chain": {
      programme: "Supply chain flow automation tower",
      processExamples: ["order promising", "shipment exceptions", "inventory reconciliation", "supplier follow-up"],
      stakeholders: ["COO or Supply Chain Director", "Planning lead", "Warehouse operations lead", "ERP owner", "Logistics partner", "Finance partner"],
      kpis: ["Perfect order rate", "Exception cycle time", "Inventory accuracy", "Expedite cost", "OTIF", "Manual touches per order"],
      valueLens: "service reliability, inventory accuracy and exception throughput",
      defaultTools: ["SAP Build Process Automation", "Celonis", "Workato", "UiPath", "Power BI"]
    },
    "Sales Operations": {
      programme: "Revenue operations automation studio",
      processExamples: ["lead routing", "quote approvals", "CRM hygiene", "contract handoff"],
      stakeholders: ["CRO or Sales Director", "Revenue operations lead", "CRM owner", "Legal counsel", "Finance partner", "Marketing operations lead"],
      kpis: ["Lead response time", "Quote turnaround", "Pipeline hygiene", "Sales cycle time", "Win-rate impact", "Rep capacity returned"],
      valueLens: "revenue velocity, deal hygiene and seller productivity",
      defaultTools: ["Salesforce Flow", "MuleSoft", "Workato", "Power Automate", "Tableau"]
    },
    "Legal and Compliance": {
      programme: "Risk and compliance automation office",
      processExamples: ["policy attestation", "contract review intake", "control testing", "regulatory evidence"],
      stakeholders: ["General Counsel", "Chief Compliance Officer", "Risk lead", "Data protection officer", "Business control owner", "Enterprise architect"],
      kpis: ["Evidence completeness", "Control test cycle time", "Issue ageing", "Review SLA", "Policy attestation rate", "Audit finding reduction"],
      valueLens: "control assurance, cycle time and risk visibility",
      defaultTools: ["ServiceNow", "Appian", "Camunda", "UiPath", "Power BI"]
    }
  };

  const colours = ["#007c78", "#f3b23c", "#f46d5f", "#6c58b5", "#357f54", "#b14a65", "#005f5d"];

  const defaultForm = new Map(Array.from(new FormData(form).entries()));
  const defaultCheckedValues = Array.from(form.querySelectorAll('input[type="checkbox"]')).reduce((acc, input) => {
    if (!acc[input.name]) acc[input.name] = [];
    if (input.checked) acc[input.name].push(input.value);
    return acc;
  }, {});

  let latestModel = null;
  let canvasFrame = 0;
  let toastTimer = null;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function number(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function money(value) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0
    }).format(value);
  }

  function compact(value) {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  function pct(value) {
    return `${Math.round(value * 100)}%`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function checkedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  }

  function getState() {
    const data = new FormData(form);
    return {
      businessFunction: data.get("businessFunction"),
      industry: data.get("industry"),
      strategicGoal: data.get("strategicGoal"),
      processName: data.get("processName") || "Target process",
      processNotes: data.get("processNotes") || "",
      monthlyVolume: number(data.get("monthlyVolume"), 0),
      avgHandleTime: number(data.get("avgHandleTime"), 1),
      teamSize: number(data.get("teamSize"), 1),
      hourlyCost: number(data.get("hourlyCost"), 35),
      errorRate: number(data.get("errorRate"), 0) / 100,
      exceptionRate: number(data.get("exceptionRate"), 0) / 100,
      annualRevenueInfluenced: number(data.get("annualRevenueInfluenced"), 0),
      ambition: data.get("ambition") || "Stabilise",
      standardisation: number(data.get("standardisation"), 3),
      dataQuality: number(data.get("dataQuality"), 3),
      systemFragmentation: number(data.get("systemFragmentation"), 3),
      complianceIntensity: number(data.get("complianceIntensity"), 3),
      sponsorStrength: number(data.get("sponsorStrength"), 3),
      changeReadiness: number(data.get("changeReadiness"), 3),
      region: data.get("region") || "United Kingdom",
      processMaturity: data.get("processMaturity") || "Defined",
      automationExperience: data.get("automationExperience") || "Pilots completed",
      operatingModel: data.get("operatingModel") || "Federated CoE",
      targetUsers: number(data.get("targetUsers"), 1),
      budgetCap: number(data.get("budgetCap"), 0),
      currentTools: data.get("currentTools") || "",
      documentationQuality: number(data.get("documentationQuality"), 3),
      integrationMaturity: number(data.get("integrationMaturity"), 3),
      decisionComplexity: number(data.get("decisionComplexity"), 3),
      customerImpact: number(data.get("customerImpact"), 3),
      backlogPressure: number(data.get("backlogPressure"), 3),
      aiTrust: number(data.get("aiTrust"), 3),
      timeline: number(data.get("timeline"), 180),
      budgetPosture: data.get("budgetPosture") || "Balanced",
      systems: checkedValues("systems"),
      painPoints: checkedValues("painPoints"),
      channels: checkedValues("channels"),
      constraints: checkedValues("constraints"),
      deliverables: checkedValues("deliverables")
    };
  }

  function buildModel(state) {
    const playbook = playbooks[state.businessFunction];
    const ambitionBoost = { Stabilise: 0.02, Scale: 0.09, Autonomous: 0.16 }[state.ambition] || 0.04;
    const maturityBoost = { "Ad hoc": -0.08, Defined: 0.02, Measured: 0.07, Optimised: 0.11 }[state.processMaturity] || 0;
    const experienceBoost = { None: -0.06, "Pilots completed": 0.01, "Departmental automations": 0.06, "Enterprise CoE": 0.1 }[state.automationExperience] || 0;
    const dataBoost = (state.dataQuality - 3) * 0.055;
    const standardBoost = (state.standardisation - 3) * 0.06;
    const documentationBoost = (state.documentationQuality - 3) * 0.03;
    const integrationBoost = (state.integrationMaturity - 3) * 0.04;
    const sponsorBoost = (state.sponsorStrength - 3) * 0.035;
    const changeBoost = (state.changeReadiness - 3) * 0.03;
    const fragmentationPenalty = (state.systemFragmentation - 3) * 0.045;
    const compliancePenalty = (state.complianceIntensity - 3) * 0.025;
    const decisionPenalty = (state.decisionComplexity - 3) * 0.03;
    const constraintPenalty = Math.max(0, state.constraints.length - 3) * 0.012;
    const exceptionPenalty = state.exceptionRate * 0.22;
    const coverage = clamp(0.49 + ambitionBoost + maturityBoost + experienceBoost + dataBoost + standardBoost + documentationBoost + integrationBoost + sponsorBoost + changeBoost - fragmentationPenalty - compliancePenalty - decisionPenalty - constraintPenalty - exceptionPenalty, 0.18, 0.88);
    const suitability = clamp(0.45 + state.standardisation * 0.08 + state.dataQuality * 0.075 + state.documentationQuality * 0.035 + state.integrationMaturity * 0.04 + state.sponsorStrength * 0.055 + state.changeReadiness * 0.045 - state.systemFragmentation * 0.045 - state.decisionComplexity * 0.025 - state.exceptionRate * 0.18, 0.16, 0.98);
    const fit = clamp(Math.round((coverage * 58) + (suitability * 42)), 18, 94);

    const annualTransactions = state.monthlyVolume * 12;
    const annualManualHours = annualTransactions * state.avgHandleTime / 60;
    const qualityFactor = clamp(1 - (state.errorRate * 0.15) - (state.exceptionRate * 0.2), 0.72, 1);
    const hoursSaved = annualManualHours * coverage * 0.76 * qualityFactor;
    const fteSaved = hoursSaved / 1760;
    const resourceSavings = hoursSaved * state.hourlyCost;
    const errorSavings = annualManualHours * state.hourlyCost * state.errorRate * clamp(0.45 + coverage, 0.45, 0.9);
    const revenueMultiplier = revenueMultiplierFor(state);
    const revenueUpside = state.annualRevenueInfluenced * revenueMultiplier * coverage * clamp(state.changeReadiness / 4.5, 0.35, 1.15);
    const annualBenefit = Math.max(0, resourceSavings + errorSavings + revenueUpside);

    const systemsFactor = clamp(state.systems.length / 5, 0.25, 1.6);
    const channelFactor = clamp(state.channels.length / 4, 0.25, 1.8);
    const complexity = clamp(
      0.34 +
      state.systemFragmentation * 0.08 +
      state.complianceIntensity * 0.055 +
      state.decisionComplexity * 0.045 +
      state.exceptionRate * 0.5 +
      systemsFactor * 0.12 +
      channelFactor * 0.015 -
      state.standardisation * 0.035 -
      state.dataQuality * 0.025 -
      state.integrationMaturity * 0.02,
      0.35,
      1.25
    );
    const budgetBase = { Lean: 42000, Balanced: 88000, Enterprise: 178000 }[state.budgetPosture] || 88000;
    const toolBase = { Lean: 22000, Balanced: 52000, Enterprise: 118000 }[state.budgetPosture] || 52000;
    const implementationBudget = budgetBase * complexity + Math.min(240000, annualTransactions * 0.7);
    const toolingBudget = toolBase * (0.7 + systemsFactor * 0.26 + state.complianceIntensity * 0.04);
    const changeBudget = Math.max(12000, (implementationBudget + toolingBudget) * (0.09 + (5 - state.changeReadiness) * 0.015));
    const runBudget = Math.max(15000, (implementationBudget + toolingBudget) * 0.13);
    const budgetMid = implementationBudget + toolingBudget + changeBudget + runBudget;
    const budgetLow = budgetMid * 0.82;
    const budgetHigh = budgetMid * 1.24;
    const budgetGap = state.budgetCap > 0 ? budgetMid - state.budgetCap : 0;
    const paybackMonths = annualBenefit > 0 ? clamp((budgetMid / annualBenefit) * 12, 1.5, 60) : 60;
    const baseTtv = 7 + complexity * 7 + (state.ambition === "Autonomous" ? 5 : state.ambition === "Scale" ? 2 : 0) + Math.max(0, 3 - state.integrationMaturity);
    const timeToValue = Math.round(clamp(baseTtv, 6, Math.min(32, state.timeline / 5.2)));
    const horizonWeeks = clamp(Math.round(state.timeline / 7), 12, 52);

    const readiness = buildReadiness(state);
    const tools = recommendTools(state, playbook, complexity);
    const projectPortfolio = buildProjectPortfolio(state, playbook, coverage, complexity);

    return {
      state,
      playbook,
      coverage,
      suitability,
      fit,
      annualTransactions,
      annualManualHours,
      hoursSaved,
      fteSaved,
      resourceSavings,
      errorSavings,
      revenueUpside,
      annualBenefit,
      complexity,
      budgetMid,
      budgetLow,
      budgetHigh,
      budgetGap,
      paybackMonths,
      timeToValue,
      horizonWeeks,
      phases: buildPhases(state, complexity, horizonWeeks),
      tools,
      pipeline: buildPipeline(state),
      risks: buildRisks(state),
      kpis: buildKpis(state, playbook),
      budgetItems: buildBudgetItems(implementationBudget, toolingBudget, changeBudget, runBudget),
      readiness,
      questionBank: buildQuestionBank(state, playbook),
      architecture: buildArchitecture(state, tools),
      projectPortfolio,
      raci: buildRaci(state),
      nextSteps: buildNextSteps(state, projectPortfolio, budgetGap)
    };
  }

  function revenueMultiplierFor(state) {
    const byGoal = {
      "Revenue acceleration": 0.018,
      "Customer experience": 0.014,
      "Scalable growth": 0.011,
      "Cycle time reduction": 0.007,
      "Risk and compliance control": 0.004,
      "Cost reduction": 0.003
    };
    const functionBoost = ["Customer Operations", "Sales Operations", "Supply Chain"].includes(state.businessFunction) ? 0.006 : 0;
    return (byGoal[state.strategicGoal] || 0.006) + functionBoost;
  }

  function buildPhases(state, complexity, horizonWeeks) {
    const stretch = complexity > 0.95 ? 1 : 0;
    const autonomous = state.ambition === "Autonomous" ? 2 : 0;
    const phases = [
      ["Discover", "Process interviews, event-log access, baseline metrics", 1, 2 + stretch, "#007c78"],
      ["Diagnose", "Process mining, task mining and automation opportunity scoring", 3 + stretch, 3 + stretch, "#f3b23c"],
      ["Design", "Future-state workflow, controls, data model and tool architecture", 6 + stretch * 2, 3 + stretch, "#6c58b5"],
      ["Build MVP", "Workflow, RPA/API automations, IDP and exception queue", 9 + stretch * 3, 4 + stretch + autonomous, "#f46d5f"],
      ["Validate", "UAT, security review, audit evidence and release controls", 13 + stretch * 4 + autonomous, 2 + stretch, "#357f54"],
      ["Pilot", "Controlled go-live, hypercare and adoption coaching", 15 + stretch * 5 + autonomous, 2, "#b14a65"],
      ["Scale", "Wave rollout, CoE playbook, KPI dashboard and backlog grooming", 17 + stretch * 5 + autonomous, Math.max(5, Math.min(10, horizonWeeks - 16)), "#005f5d"]
    ];

    return phases.map(([name, description, start, duration, colour]) => ({
      name,
      description,
      start: Math.max(1, start),
      duration: Math.max(1, Math.min(duration, 24 - start + 1)),
      colour
    }));
  }

  function recommendTools(state, playbook, complexity) {
    const toolSet = new Set(playbook.defaultTools);
    if (state.systems.includes("ERP")) toolSet.add("SAP Build Process Automation");
    if (state.systems.includes("ITSM")) toolSet.add("ServiceNow Automation Engine");
    if (state.systems.includes("Documents")) toolSet.add("ABBYY or Azure AI Document Intelligence");
    if (state.systems.includes("CRM")) toolSet.add("MuleSoft or Workato");
    if (state.systems.includes("Spreadsheets") || state.systems.includes("Email")) toolSet.add("Microsoft Power Automate");
    if (state.systemFragmentation >= 4) toolSet.add("Workato");
    if (state.complianceIntensity >= 4) toolSet.add("Camunda or Appian");
    if (state.ambition === "Autonomous") toolSet.add("OpenAI API governance layer");
    if (complexity > 0.95) toolSet.add("Enterprise architecture review board");

    return [
      {
        title: "Process intelligence",
        tools: ["Celonis", "Microsoft Process Mining", "UiPath Process Mining"],
        role: "Map variants, quantify bottlenecks and prove the automation backlog with event data."
      },
      {
        title: "Workflow and orchestration",
        tools: Array.from(toolSet).filter((tool) => /SAP|ServiceNow|Camunda|Appian|Power Automate|Salesforce/.test(tool)).slice(0, 5),
        role: "Own approvals, human-in-loop steps, SLA routing, control evidence and case status."
      },
      {
        title: "Automation execution",
        tools: ["UiPath", "Automation Anywhere", "Power Automate Desktop", "API integrations"],
        role: "Automate repetitive tasks while prioritising APIs for stable system-to-system work."
      },
      {
        title: "AI and data layer",
        tools: Array.from(toolSet).filter((tool) => /ABBYY|Azure|OpenAI|MuleSoft|Workato|Power BI|Tableau/.test(tool)).slice(0, 5),
        role: "Extract documents, enrich decisions, integrate records and monitor benefits."
      }
    ];
  }

  function buildPipeline(state) {
    return [
      {
        name: "Discover the real flow",
        owner: "Process owner + automation analyst",
        output: "Current-state map, system inventory, variant count, baseline volume and SLA data.",
        emphasis: state.painPoints.includes("Poor audit trail") ? "Add control evidence requirements from day one." : "Capture enough detail to separate standard work from exceptions."
      },
      {
        name: "Mine and prioritise",
        owner: "Process mining lead + business SMEs",
        output: "Opportunity heatmap scored by value, feasibility, risk and dependency.",
        emphasis: state.systemFragmentation >= 4 ? "Compare UI automation, API integration and workflow redesign for each candidate." : "Move high-volume deterministic work into the first build wave."
      },
      {
        name: "Design future state",
        owner: "Enterprise architect + control owner",
        output: "Target operating model, decision rules, integration pattern and exception workbench.",
        emphasis: state.complianceIntensity >= 4 ? "Define approval controls, segregation of duties and audit logging before build." : "Keep approval paths thin and outcome-focused."
      },
      {
        name: "Build the MVP",
        owner: "Automation delivery team",
        output: "Workflow, bots/API services, document extraction, alerts and KPI instrumentation.",
        emphasis: state.systems.includes("Documents") ? "Use IDP for extraction and confidence scoring before ERP or CRM posting." : "Use orchestration first and automate repeatable tasks behind it."
      },
      {
        name: "Validate and launch",
        owner: "Business owner + QA + security",
        output: "UAT sign-off, cyber approval, release pack, playbooks and hypercare queue.",
        emphasis: state.exceptionRate > 0.2 ? "Pilot with conservative thresholds until exception patterns stabilise." : "Release to a high-confidence population first, then widen."
      },
      {
        name: "Scale and optimise",
        owner: "Automation CoE",
        output: "Benefits dashboard, improvement backlog, reusable components and support model.",
        emphasis: "Review benefits monthly and retire automations that no longer match the process."
      }
    ];
  }

  function buildRisks(state) {
    const risks = [
      ["Process variance", "High variation can reduce touchless rates.", "Separate happy-path automation from exception workflows and track variant volume weekly."],
      ["Data quality", "Poor source data weakens AI extraction and routing decisions.", "Create data-readiness rules, confidence thresholds and a remediation backlog."],
      ["Change adoption", "Teams may keep parallel spreadsheets or manual workarounds.", "Nominate champions, publish role-level playbooks and include adoption KPIs in hypercare."],
      ["Control and audit", "Automation can move faster than evidence and approval design.", "Map approvals, segregation of duties, access and audit logs before build."],
      ["Bot fragility", "UI-only automations can break when enterprise screens change.", "Prefer APIs where available, use stable selectors and monitor failures with alerts."]
    ];

    if (state.complianceIntensity >= 4) {
      risks.unshift(["Regulatory exposure", "Sensitive decisions need explainability and human accountability.", "Keep humans in the loop for regulated approvals and log model inputs, outputs and overrides."]);
    }

    if (state.systemFragmentation >= 4) {
      risks.unshift(["Integration sprawl", "Too many systems can produce brittle point-to-point automations.", "Use orchestration and integration patterns with clear system-of-record ownership."]);
    }

    if (state.sponsorStrength <= 2) {
      risks.unshift(["Weak sponsorship", "Cross-functional process change may stall without executive cover.", "Secure a named sponsor, decision cadence and benefit owner before funding build waves."]);
    }

    return risks.slice(0, 6);
  }

  function buildKpis(state, playbook) {
    const common = ["Automation coverage", "Manual hours returned", "Cycle time reduction", "First-pass yield", "Exception SLA", "Automation uptime", "Benefit realised"];
    const goalKpis = {
      "Cost reduction": ["Cost per transaction", "Capacity redeployed"],
      "Cycle time reduction": ["End-to-end lead time", "Backlog age"],
      "Revenue acceleration": ["Revenue cycle time", "Conversion lift"],
      "Risk and compliance control": ["Control evidence completeness", "Audit issue ageing"],
      "Customer experience": ["Customer effort score", "First contact resolution"],
      "Scalable growth": ["Volume handled per FTE", "Reusable automation components"]
    };

    return Array.from(new Set([...playbook.kpis, ...(goalKpis[state.strategicGoal] || []), ...common])).slice(0, 12);
  }

  function buildBudgetItems(implementationBudget, toolingBudget, changeBudget, runBudget) {
    const total = implementationBudget + toolingBudget + changeBudget + runBudget;
    return [
      ["Discovery and process intelligence", implementationBudget * 0.18, "#007c78"],
      ["Solution design and controls", implementationBudget * 0.17, "#6c58b5"],
      ["Automation build and integration", implementationBudget * 0.65, "#f46d5f"],
      ["Platform and tooling", toolingBudget, "#f3b23c"],
      ["Change, training and adoption", changeBudget, "#357f54"],
      ["Run, support and optimisation", runBudget, "#b14a65"]
    ].map(([name, value, colour]) => ({ name, value, colour, pct: value / total }));
  }

  function buildReadiness(state) {
    const domains = [
      ["Process", (state.standardisation + state.documentationQuality + maturityToScore(state.processMaturity)) / 3, "Standard operating procedures, variants and handoffs"],
      ["Data", (state.dataQuality + state.documentationQuality + Math.max(1, 6 - state.exceptionRate * 12)) / 3, "Input quality, master data, field completeness and evidence"],
      ["Technology", (state.integrationMaturity + Math.max(1, 6 - state.systemFragmentation) + experienceToScore(state.automationExperience)) / 3, "Integration readiness, reusable components and platform maturity"],
      ["Controls", (Math.max(1, 6 - state.complianceIntensity) + state.aiTrust + state.documentationQuality) / 3, "Audit evidence, explainability, access and segregation of duties"],
      ["People", (state.sponsorStrength + state.changeReadiness + Math.max(1, 6 - state.customerImpact * 0.65)) / 3, "Sponsorship, change capacity and affected user readiness"],
      ["Value", (state.backlogPressure + state.customerImpact + Math.min(5, state.monthlyVolume / 1200)) / 3, "Volume, urgency, impact and business case strength"]
    ];

    return domains.map(([name, rawScore, description], index) => {
      const score = clamp(rawScore, 1, 5);
      return {
        name,
        score,
        description,
        status: score >= 4 ? "Scale-ready" : score >= 3 ? "MVP-ready" : "Needs foundation",
        colour: colours[index % colours.length]
      };
    });
  }

  function maturityToScore(value) {
    return { "Ad hoc": 1.5, Defined: 3, Measured: 4, Optimised: 5 }[value] || 3;
  }

  function experienceToScore(value) {
    return { None: 1.5, "Pilots completed": 3, "Departmental automations": 4, "Enterprise CoE": 5 }[value] || 3;
  }

  function buildQuestionBank(state, playbook) {
    const examples = playbook.processExamples.join(", ");
    return [
      {
        title: "Process discovery questions",
        questions: [
          `Which variants of ${state.processName} represent 80% of the volume?`,
          "Where does work wait for approvals, missing data or cross-team handoffs?",
          `Which steps in ${examples} are rule-based enough to automate now?`,
          "Which exceptions genuinely require judgement, and which are caused by poor data?",
          "What is the current SLA, actual cycle time and backlog ageing by queue?"
        ]
      },
      {
        title: "Data and systems questions",
        questions: [
          `Which systems are the system of record across ${state.systems.join(", ") || "the workflow"}?`,
          "Can event logs or timestamps be extracted for process mining?",
          "Which fields are mandatory, frequently missing or manually corrected?",
          `Which intake channels need normalisation: ${state.channels.join(", ") || "not yet specified"}?`,
          "Where are spreadsheets acting as unofficial databases?"
        ]
      },
      {
        title: "Controls and AI questions",
        questions: [
          "Which decisions require explicit human approval, explainability or audit evidence?",
          `Which constraints apply: ${state.constraints.join(", ") || "none selected"}?`,
          "What access model and segregation-of-duties rules must the automation respect?",
          "What confidence threshold is acceptable before AI extraction or classification posts to core systems?",
          "How will overrides, bot failures and model outputs be logged?"
        ]
      },
      {
        title: "Business case and adoption questions",
        questions: [
          `What percentage of ${state.targetUsers} affected users can move to the new process in wave one?`,
          "Which roles will be redeployed, reskilled or relieved of manual work?",
          "Which KPI owner will sign off realised savings each month?",
          "What does the sponsor need to see by week four to keep funding momentum?",
          "Which quick win would create visible confidence without locking in poor design?"
        ]
      }
    ];
  }

  function buildArchitecture(state, toolGroups) {
    const channels = state.channels.length ? state.channels.join(", ") : "Forms, email and system events";
    return {
      flow: [
        ["Intake", channels],
        ["Classify", "AI rules, IDP and case triage"],
        ["Orchestrate", "Workflow, approvals and SLA routing"],
        ["Automate", "API, RPA and decision services"],
        ["Control", "Audit logs, access and exception queue"],
        ["Integrate", state.systems.join(", ") || "Core systems"],
        ["Measure", "KPI dashboard and benefits tracking"]
      ],
      principles: [
        "Use workflow as the control layer so every automated step has an owner, SLA and evidence trail.",
        "Prefer API and event-based integration for stable systems, with RPA reserved for legacy screens and short-term bridges.",
        "Keep AI in bounded tasks first: extraction, classification, summarisation, routing and draft recommendations.",
        `Apply ${state.region} data, privacy and cyber constraints before automating regulated decisions.`
      ],
      toolGroups
    };
  }

  function buildProjectPortfolio(state, playbook, coverage, complexity) {
    const base = [
      ["Process mining baseline", "Discover", "High", "Low", "Process analyst", "Pull event logs, model variants and validate the value case."],
      ["Digital intake and triage", "MVP", "High", "Medium", "Product owner", "Consolidate channels and route requests with required data checks."],
      ["Document and data extraction", "MVP", state.systems.includes("Documents") ? "High" : "Medium", "Medium", "Automation engineer", "Extract, validate and score confidence before posting."],
      ["Approval orchestration", "MVP", state.painPoints.includes("Approval delays") ? "High" : "Medium", "Medium", "Workflow lead", "Standardise approvals, escalations and SLA evidence."],
      ["Core-system posting automation", "Scale", "High", complexity > 0.9 ? "High" : "Medium", "Integration lead", "Update ERP, CRM, HRIS or ITSM through APIs or controlled bots."],
      ["Exception workbench", "Scale", state.exceptionRate > 0.15 ? "High" : "Medium", "Medium", "Operations manager", "Give teams one queue for investigation, rework and approvals."],
      ["Benefits and KPI dashboard", "Scale", "High", "Low", "BI lead", "Track coverage, savings, cycle time, quality and adoption."],
      ["CoE playbook and reuse library", "Industrialise", coverage > 0.62 ? "High" : "Medium", "Low", "CoE lead", "Create standards, reusable components and future backlog governance."]
    ];

    return base.map((item, index) => ({
      id: `A${index + 1}`,
      name: item[0],
      wave: item[1],
      value: item[2],
      complexity: item[3],
      owner: item[4],
      description: item[5],
      priority: priorityFor(item[2], item[3], index),
      linkedProcess: playbook.processExamples[index % playbook.processExamples.length]
    }));
  }

  function priorityFor(value, complexity, index) {
    if (value === "High" && complexity !== "High") return "Priority 1";
    if (index < 4) return "Priority 2";
    return "Priority 3";
  }

  function buildRaci(state) {
    const businessLead = state.operatingModel.includes("Business") ? "A/R" : "C";
    const coeLead = state.operatingModel.includes("CoE") ? "A/R" : "R";
    return [
      ["Discovery and value case", businessLead, coeLead, "C", "C", "I"],
      ["Solution architecture", "C", "R", "A/R", "C", "I"],
      ["Controls and risk approval", "C", "C", "R", "A/R", "I"],
      ["Build and test automation", "C", "A/R", "R", "C", "I"],
      ["Change and adoption", "A/R", "R", "C", "C", "I"],
      ["Benefits tracking", "A/R", "R", "C", "C", "I"]
    ];
  }

  function buildNextSteps(state, portfolio, budgetGap) {
    const steps = [
      `Run a two-hour discovery workshop using the generated question bank for ${state.businessFunction}.`,
      `Validate baseline volume, cycle time, cost and error assumptions for ${state.processName}.`,
      `Select the first ${portfolio.filter((item) => item.priority === "Priority 1").length || 2} Priority 1 automation projects for a scoped MVP.`,
      "Confirm architecture guardrails with security, data and enterprise architecture.",
      "Nominate named owners for benefits, control sign-off, product decisions and adoption."
    ];

    if (budgetGap > 0) {
      steps.unshift(`Reduce wave-one scope or increase funding by about ${money(budgetGap)} to match the recommended mid-case budget.`);
    }

    if (state.constraints.includes("Vendor approval")) {
      steps.push("Start vendor procurement and data-processing review before detailed design.");
    }

    return steps;
  }

  function render(model) {
    latestModel = model;
    const { state, playbook } = model;

    programmeTitle.textContent = playbook.programme;
    fitScore.textContent = model.fit;
    scoreBadge.style.setProperty("--score-angle", `${model.fit * 3.6}deg`);

    metricCards.innerHTML = [
      metric("Annual benefit", money(model.annualBenefit), `${compact(model.hoursSaved)} hours returned per year`),
      metric("Resource savings", money(model.resourceSavings), `${model.fteSaved.toFixed(1)} FTE capacity equivalent`),
      metric("Revenue or risk upside", money(model.revenueUpside + model.errorSavings), playbook.valueLens),
      metric("Time to value", `${model.timeToValue} weeks`, `${Math.round(model.coverage * 100)}% expected automation coverage`),
      metric("Payback", `${model.paybackMonths.toFixed(1)} months`, `${money(model.budgetLow)} to ${money(model.budgetHigh)} budget range`)
    ].join("");

    visualTitle.textContent = `${state.ambition} ${state.businessFunction.toLowerCase()} automation`;
    visualBody.textContent = `${state.processName} should start with a measured MVP, then scale through reusable orchestration, exception handling and KPI governance. The plan targets ${pct(model.coverage)} automation coverage with a ${model.fit}/100 fit score.`;

    renderBlueprint(model);
    renderQuestions(model);
    renderMaturity(model);
    renderPipeline(model);
    renderArchitecture(model);
    renderBacklog(model);
    renderGantt(model);
    renderBusinessCase(model);
    renderGovernance(model);
    drawProcessConstellation(model);
  }

  function metric(label, value, note) {
    return `
      <article class="metric-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <p>${escapeHtml(note)}</p>
      </article>
    `;
  }

  function renderBlueprint(model) {
    const { state, playbook } = model;
    const quickWins = quickWinsFor(model);
    const dependencies = dependenciesFor(state);

    blueprint.innerHTML = `
      <article class="recommendation-card full">
        <h3>Executive recommendation</h3>
        <p><strong>${escapeHtml(playbook.programme)}</strong> should be delivered as a ${escapeHtml(state.ambition.toLowerCase())} programme for <strong>${escapeHtml(state.processName)}</strong>. The first release should automate the highest-volume happy path, route exceptions to a governed workbench and instrument benefit tracking from go-live.</p>
        <div class="tag-row">${quickWins.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card">
        <h3>Current-state diagnosis</h3>
        <p>${escapeHtml(state.processNotes)}</p>
        <p>${escapeHtml(state.monthlyVolume)} monthly transactions at ${escapeHtml(state.avgHandleTime)} minutes each creates about <strong>${compact(model.annualManualHours)}</strong> annual manual hours before rework and exceptions.</p>
      </article>
      <article class="recommendation-card">
        <h3>Target operating model</h3>
        <p>Use process intelligence to rank variants, workflow orchestration to own approvals and SLAs, automation services for repeatable steps, and an analytics layer to prove savings and adoption.</p>
        <div class="tag-row">${dependencies.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card">
        <h3>Tooling shortlist</h3>
        <p>Prioritise tools already aligned with the systems involved, then add specialist automation capabilities only where the value case justifies it.</p>
        <div class="tool-row">${model.tools.flatMap((group) => group.tools).slice(0, 12).map((tool) => `<span class="tool-pill">${escapeHtml(tool)}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card">
        <h3>Implementation stance</h3>
        <p>Target a first measurable release in <strong>${model.timeToValue} weeks</strong>, then scale through waves. Keep scope stable for the MVP and move ambiguous edge cases into a controlled exception queue.</p>
        <div class="tag-row">
          <span class="tag">Coverage ${pct(model.coverage)}</span>
          <span class="tag">Complexity ${(model.complexity * 100).toFixed(0)}/125</span>
          <span class="tag">Horizon ${model.horizonWeeks} weeks</span>
        </div>
      </article>
    `;
  }

  function quickWinsFor(model) {
    const { state } = model;
    const wins = [];
    if (state.painPoints.includes("Manual data entry")) wins.push("IDP and data capture");
    if (state.painPoints.includes("Approval delays")) wins.push("Approval orchestration");
    if (state.painPoints.includes("Poor audit trail")) wins.push("Audit trail by design");
    if (state.painPoints.includes("Backlog spikes")) wins.push("Queue triage and SLA rules");
    if (state.systems.includes("Spreadsheets")) wins.push("Spreadsheet retirement plan");
    if (state.exceptionRate > 0.15) wins.push("Exception workbench");
    if (!wins.length) wins.push("Process mining baseline", "MVP workflow", "Benefits dashboard");
    return wins.slice(0, 6);
  }

  function dependenciesFor(state) {
    const dependencies = ["Named process owner", "Event logs or operational data", "Security and access model", "Benefits owner"];
    if (state.systems.includes("ERP")) dependencies.push("ERP sandbox and API access");
    if (state.systems.includes("CRM")) dependencies.push("CRM object model");
    if (state.systems.includes("Documents")) dependencies.push("Document sample set");
    if (state.complianceIntensity >= 4) dependencies.push("Risk and audit sign-off");
    return dependencies.slice(0, 7);
  }

  function renderQuestions(model) {
    const { state } = model;
    questions.innerHTML = `
      <article class="question-card full">
        <h3>Discovery workshop pack</h3>
        <p>Use these questions to turn the intake into a structured workshop. They are tailored to ${escapeHtml(state.businessFunction)}, the selected systems, operating constraints and ${escapeHtml(state.ambition.toLowerCase())} ambition.</p>
        <div class="tag-row">
          ${state.deliverables.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
        </div>
      </article>
      ${model.questionBank.map((group) => `
        <article class="question-card">
          <h3>${escapeHtml(group.title)}</h3>
          <ul class="question-list">
            ${group.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
          </ul>
        </article>
      `).join("")}
    `;
  }

  function renderMaturity(model) {
    const average = model.readiness.reduce((sum, item) => sum + item.score, 0) / model.readiness.length;
    const topGap = model.readiness.slice().sort((a, b) => a.score - b.score)[0];
    maturity.innerHTML = `
      <article class="maturity-card full">
        <h3>Readiness scorecard</h3>
        <p>The holistic readiness average is <strong>${average.toFixed(1)}/5</strong>. The biggest enablement gap is <strong>${escapeHtml(topGap.name)}</strong>, so the roadmap should include foundation work before scaling automation too aggressively.</p>
        <div class="maturity-meter">
          ${model.readiness.map((item) => `
            <div class="maturity-row">
              <span>${escapeHtml(item.name)}</span>
              <span class="maturity-track"><span class="maturity-fill" style="--fill:${Math.round(item.score * 20)}%; --bar-color:${item.colour};"></span></span>
              <strong>${item.score.toFixed(1)}</strong>
            </div>
          `).join("")}
        </div>
      </article>
      ${model.readiness.map((item) => `
        <article class="maturity-card">
          <h3>${escapeHtml(item.name)} - ${escapeHtml(item.status)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="tag-row">
            <span class="tag">Score ${item.score.toFixed(1)}/5</span>
            <span class="tag">${escapeHtml(item.status)}</span>
          </div>
        </article>
      `).join("")}
    `;
  }

  function renderArchitecture(model) {
    architecture.innerHTML = `
      <article class="architecture-card full">
        <h3>Target automation architecture</h3>
        <p>This is the recommended platform pattern for a scalable BPA programme. It separates intake, intelligence, orchestration, execution, controls, integration and measurement so the solution can scale without losing governance.</p>
        <div class="architecture-flow">
          ${model.architecture.flow.map((node) => `
            <div class="architecture-node">
              <strong>${escapeHtml(node[0])}</strong>
              <span>${escapeHtml(node[1])}</span>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="architecture-card">
        <h3>Design principles</h3>
        <ul class="architecture-list">
          ${model.architecture.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="architecture-card">
        <h3>Tooling map</h3>
        ${model.tools.map((group) => `
          <p><strong>${escapeHtml(group.title)}:</strong> ${escapeHtml(group.role)}</p>
          <div class="tool-row">${group.tools.map((tool) => `<span class="tool-pill">${escapeHtml(tool)}</span>`).join("")}</div>
        `).join("")}
      </article>
    `;
  }

  function renderBacklog(model) {
    backlog.innerHTML = `
      <article class="backlog-card full">
        <h3>Automation project portfolio</h3>
        <p>The first portfolio mixes discovery, MVP delivery, scale work and industrialisation. Use this as the initial automation backlog before refining effort and dependency estimates with delivery teams.</p>
        <table class="backlog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Wave</th>
              <th>Value</th>
              <th>Complexity</th>
              <th>Owner</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            ${model.projectPortfolio.map((item) => `
              <tr>
                <td>${escapeHtml(item.id)}</td>
                <td><strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(item.description)}<br><span class="step-meta">${escapeHtml(item.linkedProcess)}</span></td>
                <td>${escapeHtml(item.wave)}</td>
                <td>${escapeHtml(item.value)}</td>
                <td>${escapeHtml(item.complexity)}</td>
                <td>${escapeHtml(item.owner)}</td>
                <td><span class="priority-chip">${escapeHtml(item.priority)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </article>
      <article class="backlog-card full">
        <h3>Next decision steps</h3>
        <ul class="next-step-list">
          ${model.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ul>
      </article>
    `;
  }

  function renderPipeline(model) {
    pipeline.innerHTML = model.pipeline.map((step, index) => `
      <article class="pipeline-step">
        <span class="step-number">${index + 1}</span>
        <div>
          <h3>${escapeHtml(step.name)}</h3>
          <p>${escapeHtml(step.output)}</p>
          <p><strong>Focus:</strong> ${escapeHtml(step.emphasis)}</p>
        </div>
        <div class="step-meta">${escapeHtml(step.owner)}</div>
      </article>
    `).join("");
  }

  function renderGantt(model) {
    const axis = Array.from({ length: 24 }, (_, i) => `<span>${(i + 1) % 2 === 0 ? `W${i + 1}` : ""}</span>`).join("");
    const rows = model.phases.map((phase) => `
      <div class="gantt-row">
        <div class="gantt-label">${escapeHtml(phase.name)}</div>
        <div class="gantt-bar" style="grid-column:${phase.start + 1} / span ${phase.duration}; --bar-color:${phase.colour};" title="${escapeHtml(phase.description)}">${escapeHtml(phase.duration)}w</div>
      </div>
    `).join("");

    roadmap.innerHTML = `
      <div class="gantt" aria-label="Implementation Gantt chart">
        <div class="gantt-axis"><span>Phase</span>${axis}</div>
        ${rows}
      </div>
    `;
  }

  function renderBusinessCase(model) {
    const { state } = model;
    businessCase.innerHTML = `
      <article class="business-card">
        <h3>Benefit stack</h3>
        <p>Annual benefit estimate: <strong>${money(model.annualBenefit)}</strong>. This combines resource savings, rework reduction and revenue or risk upside connected to ${escapeHtml(state.strategicGoal.toLowerCase())}.</p>
        <div class="tag-row">
          <span class="tag">Hours saved ${compact(model.hoursSaved)}</span>
          <span class="tag">FTE ${model.fteSaved.toFixed(1)}</span>
          <span class="tag">Transactions ${compact(model.annualTransactions)}</span>
        </div>
      </article>
      <article class="business-card">
        <h3>Budget and payback</h3>
        <p>Recommended funding range: <strong>${money(model.budgetLow)} to ${money(model.budgetHigh)}</strong>. Mid-case payback is <strong>${model.paybackMonths.toFixed(1)} months</strong> with disciplined scope control.</p>
        <div class="tag-row">
          <span class="tag">${escapeHtml(state.budgetPosture)} posture</span>
          <span class="tag">${escapeHtml(state.timeline)} day horizon</span>
          <span class="tag">${model.budgetGap > 0 ? `${money(model.budgetGap)} above cap` : "Within budget cap"}</span>
        </div>
      </article>
      <article class="business-card full">
        <h3>Budget allocation</h3>
        <div class="budget-stack">
          ${model.budgetItems.map((item) => `
            <div class="budget-row">
              <span>${escapeHtml(item.name)}</span>
              <span class="budget-track"><span class="budget-fill" style="--fill:${Math.round(item.pct * 100)}%; --bar-color:${item.colour};"></span></span>
              <strong>${money(item.value)}</strong>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  function renderGovernance(model) {
    const { playbook } = model;
    governance.innerHTML = `
      <article class="governance-card">
        <h3>Stakeholders</h3>
        <ul class="stakeholder-list">
          ${playbook.stakeholders.map((stakeholder) => `<li>${escapeHtml(stakeholder)}</li>`).join("")}
          <li>Automation CoE lead</li>
          <li>Data, security and integration owners</li>
        </ul>
      </article>
      <article class="governance-card">
        <h3>Risks and mitigations</h3>
        <ul class="risk-list">
          ${model.risks.map((risk) => `<li><strong>${escapeHtml(risk[0])}:</strong> ${escapeHtml(risk[1])} ${escapeHtml(risk[2])}</li>`).join("")}
        </ul>
      </article>
      <article class="governance-card full">
        <h3>Success KPIs</h3>
        <div class="kpi-row">
          ${model.kpis.map((kpi) => `<span class="kpi-pill">${escapeHtml(kpi)}</span>`).join("")}
        </div>
      </article>
      <article class="governance-card full">
        <h3>RACI operating model</h3>
        <table class="raci-table">
          <thead>
            <tr>
              <th>Workstream</th>
              <th>Business owner</th>
              <th>Automation CoE</th>
              <th>IT architecture</th>
              <th>Risk and audit</th>
              <th>Finance PMO</th>
            </tr>
          </thead>
          <tbody>
            ${model.raci.map((row) => `
              <tr>
                ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </article>
      <article class="governance-card full">
        <h3>Tool governance</h3>
        <p>Run delivery through a single automation backlog with value gates, design authority, security review, reusable components, release controls, production monitoring and monthly benefits reconciliation.</p>
        <div class="tool-row">
          ${model.tools.map((group) => `<span class="tool-pill">${escapeHtml(group.title)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function drawProcessConstellation(model) {
    if (!canvas || !model) return;
    cancelAnimationFrame(canvasFrame);

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(420, rect.width || 840);
    const height = Math.max(260, rect.height || 320);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const labels = ["Discover", "Mine", "Design", "Automate", "Govern", "Optimise"];
    const cx = width * 0.44;
    const cy = height * 0.5;
    const radius = Math.min(width, height) * 0.3;
    let tick = 0;

    function frame() {
      tick += 0.018;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillRect(0, 0, width, height);

      for (let ring = 1; ring <= 3; ring += 1) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * ring / 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 124, 120, ${0.13 - ring * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const points = labels.map((label, index) => {
        const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2 + Math.sin(tick) * 0.025;
        const confidence = clamp(model.coverage + (index % 2 === 0 ? 0.08 : -0.04), 0.25, 0.9);
        const pointRadius = radius * (0.62 + confidence * 0.38);
        return {
          label,
          x: cx + Math.cos(angle) * pointRadius,
          y: cy + Math.sin(angle) * pointRadius,
          colour: colours[index % colours.length],
          size: 7 + confidence * 8
        };
      });

      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 124, 120, 0.09)";
      ctx.fill();
      ctx.strokeStyle = "rgba(20, 33, 31, 0.42)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size + Math.sin(tick * 2) * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = point.colour;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size + 7, 0, Math.PI * 2);
        ctx.strokeStyle = `${point.colour}33`;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = "#14211f";
        ctx.font = "800 12px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + point.size + 22);
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "rgba(20,33,31,0.18)";
      ctx.stroke();
      ctx.fillStyle = "#14211f";
      ctx.font = "900 24px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(model.fit), cx, cy + 6);
      ctx.font = "800 10px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#60706b";
      ctx.fillText("FIT", cx, cy + 23);

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvasFrame = requestAnimationFrame(frame);
      }
    }

    frame();
  }

  function executiveBrief(model) {
    const { state, playbook } = model;
    return [
      "AI Disco BPA Command Centre",
      "",
      `Programme: ${playbook.programme}`,
      `Function: ${state.businessFunction}`,
      `Process: ${state.processName}`,
      `Recommendation: Deliver a ${state.ambition.toLowerCase()} automation programme with process intelligence, workflow orchestration, automation execution, exception handling and benefits governance.`,
      "",
      `Automation fit score: ${model.fit}/100`,
      `Expected automation coverage: ${pct(model.coverage)}`,
      `Time to value: ${model.timeToValue} weeks`,
      `Annual benefit estimate: ${money(model.annualBenefit)}`,
      `Resource savings: ${money(model.resourceSavings)} (${model.fteSaved.toFixed(1)} FTE equivalent)`,
      `Budget range: ${money(model.budgetLow)} to ${money(model.budgetHigh)}`,
      `Budget cap status: ${model.budgetGap > 0 ? `${money(model.budgetGap)} above cap` : "within stated cap"}`,
      `Payback: ${model.paybackMonths.toFixed(1)} months`,
      "",
      "Priority project portfolio:",
      ...model.projectPortfolio.slice(0, 6).map((item) => `- ${item.id} ${item.name} (${item.wave}, ${item.priority}): ${item.description}`),
      "",
      "Pipeline:",
      ...model.pipeline.map((step, index) => `${index + 1}. ${step.name}: ${step.output}`),
      "",
      "Readiness:",
      ...model.readiness.map((item) => `- ${item.name}: ${item.score.toFixed(1)}/5 (${item.status})`),
      "",
      "Key discovery questions:",
      ...model.questionBank.flatMap((group) => group.questions.slice(0, 2).map((question) => `- ${question}`)),
      "",
      "Stakeholders:",
      ...playbook.stakeholders.map((item) => `- ${item}`),
      "- Automation CoE lead",
      "- Data, security and integration owners",
      "",
      "Risks and mitigations:",
      ...model.risks.map((risk) => `- ${risk[0]}: ${risk[2]}`),
      "",
      "KPIs:",
      ...model.kpis.map((item) => `- ${item}`)
    ].join("\n");
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function update() {
    render(buildModel(getState()));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    update();
    document.querySelector(".output-shell").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Command plan generated.");
  });

  form.addEventListener("input", () => update());
  form.addEventListener("change", () => update());

  document.querySelector("#resetDefaults").addEventListener("click", () => {
    Array.from(form.elements).forEach((field) => {
      if (!field.name) return;
      if (field.type === "checkbox") {
        field.checked = (defaultCheckedValues[field.name] || []).includes(field.value);
      } else if (field.type === "radio") {
        field.checked = defaultForm.get(field.name) === field.value;
      } else if (defaultForm.has(field.name)) {
        field.value = defaultForm.get(field.name);
      }
    });
    update();
    showToast("Defaults restored.");
  });

  document.querySelector("#copyBrief").addEventListener("click", async () => {
    const brief = executiveBrief(latestModel || buildModel(getState()));
    try {
      await navigator.clipboard.writeText(brief);
      showToast("Executive brief copied.");
    } catch (error) {
      showToast("Copy blocked by browser settings.");
    }
  });

  document.querySelector("#downloadPlan").addEventListener("click", () => {
    const brief = executiveBrief(latestModel || buildModel(getState()));
    const blob = new Blob([brief], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-disco-bpa-command-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Plan downloaded.");
  });

  document.querySelector("#printPlan").addEventListener("click", () => window.print());

  document.querySelectorAll(".tabs button").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((button) => button.setAttribute("aria-selected", "false"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      tab.setAttribute("aria-selected", "true");
      document.querySelector(`#${tab.dataset.tab}`).classList.add("active");
    });
  });

  window.addEventListener("resize", () => drawProcessConstellation(latestModel));

  update();
}());
