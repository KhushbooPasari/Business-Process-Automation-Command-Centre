(function () {
  const form = document.querySelector("#assessmentForm");
  const fitScore = document.querySelector("#fitScore");
  const scoreBadge = document.querySelector(".score-badge");
  const programmeTitle = document.querySelector("#programmeTitle");
  const metricCards = document.querySelector("#metricCards");
  const logicPanel = document.querySelector("#logicPanel");
  const blueprint = document.querySelector("#blueprint");
  const questions = document.querySelector("#questions");
  const maturity = document.querySelector("#maturity");
  const implementation = document.querySelector("#implementation");
  const pipeline = document.querySelector("#pipeline");
  const architecture = document.querySelector("#architecture");
  const backlog = document.querySelector("#backlog");
  const roadmap = document.querySelector("#roadmap");
  const businessCase = document.querySelector("#businessCase");
  const governance = document.querySelector("#governance");
  const visualTitle = document.querySelector("#visualTitle");
  const visualBody = document.querySelector("#visualBody");
  const canvas = document.querySelector("#processCanvas");
  const heroCanvas = document.querySelector("#heroCanvas");
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

  const functionProfiles = {
    "Finance and Accounting": {
      processName: "Invoice intake, approval and posting",
      notes: "Invoices arrive by email, shared inboxes and supplier portals. Teams manually extract fields, chase approvals, validate purchase orders and post records into ERP. Exceptions are handled in spreadsheets.",
      monthlyLabel: "Monthly invoices or finance records",
      monthlyHint: "Invoices, journal entries, payment requests, reconciliations or finance cases handled each month.",
      handleLabel: "Minutes per finance record",
      handleHint: "Manual time to capture, validate, approve, post and close one record.",
      teamLabel: "Finance operators impacted",
      teamHint: "AP, AR, close, controls and finance operations users touching the process.",
      valueLabel: "Annual spend, cash or revenue influenced",
      valueHint: "Spend, working capital, revenue, cash collected or risk-adjusted finance exposure touched by this flow.",
      monthlyVolume: 4200,
      avgHandleTime: 18,
      teamSize: 18,
      hourlyCost: 38,
      errorRate: 7,
      exceptionRate: 16,
      annualRevenueInfluenced: 18500000,
      systems: ["ERP", "Email", "Spreadsheets", "Documents", "BI"],
      painPoints: ["Manual data entry", "Approval delays", "Poor audit trail"],
      channels: ["Email", "Portal", "Forms", "Manual handoff"],
      defaultGoal: "Cost reduction"
    },
    "Human Resources": {
      processName: "Employee onboarding, changes and HR case resolution",
      notes: "Employee requests arrive through HR inboxes, forms and manager messages. HR teams validate eligibility, collect documents, update HRIS records, coordinate payroll and respond to status queries manually.",
      monthlyLabel: "Monthly employee requests or cases",
      monthlyHint: "Onboarding cases, employee changes, policy requests, letters, payroll queries or HR tickets.",
      handleLabel: "Minutes per employee case",
      handleHint: "Manual HR effort to validate, coordinate, update systems and close one case.",
      teamLabel: "HR users impacted",
      teamHint: "HR operations, payroll, people partners and shared services users touching the workflow.",
      valueLabel: "Annual payroll or employee-service value influenced",
      valueHint: "Payroll value, service cost, attrition exposure or employee experience value influenced by the process.",
      monthlyVolume: 950,
      avgHandleTime: 28,
      teamSize: 14,
      hourlyCost: 42,
      errorRate: 5,
      exceptionRate: 22,
      annualRevenueInfluenced: 9200000,
      systems: ["HRIS", "Email", "Documents", "Spreadsheets", "BI"],
      painPoints: ["Approval delays", "Duplicate work", "Poor audit trail", "Customer friction"],
      channels: ["Email", "Forms", "Portal", "Manual handoff"],
      defaultGoal: "Customer experience"
    },
    "Procurement": {
      processName: "Supplier onboarding, requisition approval and PO changes",
      notes: "Procurement intake comes through email, ERP requests and supplier forms. Teams validate suppliers, chase missing documents, route approvals, manage policy exceptions and update procurement systems.",
      monthlyLabel: "Monthly requisitions or supplier requests",
      monthlyHint: "Purchase requests, supplier onboarding cases, PO changes, contract intakes or sourcing requests.",
      handleLabel: "Minutes per procurement request",
      handleHint: "Manual time to validate data, route approvals, check policy and update source-to-pay systems.",
      teamLabel: "Procurement users impacted",
      teamHint: "Buyers, category managers, supplier managers, procurement operations and finance approvers.",
      valueLabel: "Annual spend influenced",
      valueHint: "Addressable spend, supplier risk exposure or contract value affected by the process.",
      monthlyVolume: 1800,
      avgHandleTime: 24,
      teamSize: 16,
      hourlyCost: 44,
      errorRate: 6,
      exceptionRate: 19,
      annualRevenueInfluenced: 32000000,
      systems: ["ERP", "Email", "Documents", "Spreadsheets", "BI"],
      painPoints: ["Approval delays", "Manual data entry", "Poor audit trail", "Backlog spikes"],
      channels: ["Portal", "Email", "Forms", "Manual handoff"],
      defaultGoal: "Cost reduction"
    },
    "Customer Operations": {
      processName: "Customer case triage, fulfilment and escalation handling",
      notes: "Customer requests arrive through CRM, support inboxes, portals and calls. Agents classify issues, search policies, update records, request approvals and escalate cases that lack clear ownership.",
      monthlyLabel: "Monthly customer cases or contacts",
      monthlyHint: "Service cases, claims, complaints, support conversations, refund requests or order enquiries.",
      handleLabel: "Minutes per customer case",
      handleHint: "Manual time to triage, resolve, escalate, update records and communicate back to the customer.",
      teamLabel: "Service users impacted",
      teamHint: "Agents, case managers, quality leads, workforce planners and escalation owners.",
      valueLabel: "Annual revenue or retention value influenced",
      valueHint: "Revenue, churn exposure, refund value, claims cost or service-value pool touched by the workflow.",
      monthlyVolume: 12500,
      avgHandleTime: 11,
      teamSize: 55,
      hourlyCost: 32,
      errorRate: 4,
      exceptionRate: 18,
      annualRevenueInfluenced: 42000000,
      systems: ["CRM", "Email", "Documents", "BI"],
      painPoints: ["Backlog spikes", "Customer friction", "Duplicate work", "Manual data entry"],
      channels: ["Portal", "Email", "Chat", "Phone", "API"],
      defaultGoal: "Customer experience"
    },
    "IT and Service Management": {
      processName: "IT ticket triage, access requests and incident enrichment",
      notes: "Requests come through ITSM, email and chat. Service desk teams categorise tickets, collect missing context, trigger approvals, provision access and enrich incidents before routing to resolver groups.",
      monthlyLabel: "Monthly tickets or service requests",
      monthlyHint: "Incidents, access requests, service catalogue items, asset updates or change tasks.",
      handleLabel: "Minutes per IT request",
      handleHint: "Manual service-desk and resolver effort before fulfilment or escalation.",
      teamLabel: "IT users impacted",
      teamHint: "Service desk, resolver groups, platform owners, identity teams and change managers.",
      valueLabel: "Annual IT service value or downtime exposure",
      valueHint: "Service cost, downtime exposure, productivity impact or engineering capacity touched by the process.",
      monthlyVolume: 6500,
      avgHandleTime: 14,
      teamSize: 32,
      hourlyCost: 48,
      errorRate: 5,
      exceptionRate: 21,
      annualRevenueInfluenced: 15000000,
      systems: ["ITSM", "Email", "Documents", "BI"],
      painPoints: ["Backlog spikes", "Approval delays", "Duplicate work", "Poor audit trail"],
      channels: ["Portal", "Email", "Chat", "API"],
      defaultGoal: "Cycle time reduction"
    },
    "Supply Chain": {
      processName: "Order exception, shipment follow-up and inventory reconciliation",
      notes: "Operational exceptions surface through ERP, warehouse systems, emails and supplier updates. Teams manually reconcile status, chase carriers, adjust inventory and inform commercial teams.",
      monthlyLabel: "Monthly orders, shipments or exceptions",
      monthlyHint: "Orders, fulfilment exceptions, shipment updates, inventory adjustments or supplier follow-ups.",
      handleLabel: "Minutes per supply-chain exception",
      handleHint: "Manual time to investigate, reconcile, coordinate and update systems.",
      teamLabel: "Operations users impacted",
      teamHint: "Planners, warehouse operations, logistics, customer operations and finance users.",
      valueLabel: "Annual inventory, order or logistics value influenced",
      valueHint: "Order value, inventory exposure, expedite cost, penalties or service-level value touched by the process.",
      monthlyVolume: 7200,
      avgHandleTime: 16,
      teamSize: 38,
      hourlyCost: 36,
      errorRate: 5,
      exceptionRate: 24,
      annualRevenueInfluenced: 55000000,
      systems: ["ERP", "Email", "Spreadsheets", "BI"],
      painPoints: ["Backlog spikes", "Duplicate work", "Manual data entry", "Customer friction"],
      channels: ["API", "Email", "Portal", "Manual handoff"],
      defaultGoal: "Cycle time reduction"
    },
    "Sales Operations": {
      processName: "Lead routing, quote approval and CRM hygiene",
      notes: "Sales operations teams route leads, check account data, chase quote approvals, update CRM fields and coordinate handoffs to legal, finance and delivery using a mix of CRM tasks and spreadsheets.",
      monthlyLabel: "Monthly leads, quotes or CRM updates",
      monthlyHint: "Leads, opportunities, quote requests, contract handoffs, campaign responses or CRM hygiene tasks.",
      handleLabel: "Minutes per revenue-ops task",
      handleHint: "Manual time to validate, route, approve, update and hand off one sales operations item.",
      teamLabel: "Revenue users impacted",
      teamHint: "Sales operations, sellers, SDRs, finance approvers, legal and marketing operations.",
      valueLabel: "Annual pipeline or revenue influenced",
      valueHint: "Pipeline, booked revenue, quote value, conversion opportunity or sales productivity value affected.",
      monthlyVolume: 3800,
      avgHandleTime: 13,
      teamSize: 28,
      hourlyCost: 45,
      errorRate: 6,
      exceptionRate: 17,
      annualRevenueInfluenced: 68000000,
      systems: ["CRM", "Email", "Documents", "Spreadsheets", "BI"],
      painPoints: ["Approval delays", "Duplicate work", "Manual data entry", "Customer friction"],
      channels: ["Portal", "Email", "Forms", "API"],
      defaultGoal: "Revenue acceleration"
    },
    "Legal and Compliance": {
      processName: "Policy attestation, contract intake and control evidence collection",
      notes: "Requests and evidence arrive through email, document repositories and ticketing tools. Teams classify obligations, request missing material, perform checks, route reviews and maintain audit evidence manually.",
      monthlyLabel: "Monthly reviews, attestations or evidence items",
      monthlyHint: "Contract intakes, policy attestations, control tests, compliance reviews or evidence requests.",
      handleLabel: "Minutes per compliance item",
      handleHint: "Manual time to classify, review, approve, evidence and close one risk or legal item.",
      teamLabel: "Risk, legal or compliance users impacted",
      teamHint: "Legal operations, compliance, risk, control owners, auditors and business reviewers.",
      valueLabel: "Annual risk exposure or contract value influenced",
      valueHint: "Contract value, regulatory exposure, control cost or risk-adjusted business value touched by the workflow.",
      monthlyVolume: 700,
      avgHandleTime: 42,
      teamSize: 12,
      hourlyCost: 62,
      errorRate: 4,
      exceptionRate: 27,
      annualRevenueInfluenced: 25000000,
      systems: ["Email", "Documents", "Spreadsheets", "ITSM", "BI"],
      painPoints: ["Poor audit trail", "Approval delays", "Manual data entry", "Duplicate work"],
      channels: ["Email", "Forms", "Portal", "Shared drive"],
      defaultGoal: "Risk and compliance control"
    }
  };

  const industryProfiles = {
    "Financial Services": { compliance: 5, aiTrust: 5, dataResidency: true, valueSuffix: " Include conduct, regulatory and customer-impact exposure.", tools: "Core banking, CRM, workflow, DMS, BI" },
    Healthcare: { compliance: 5, aiTrust: 5, dataResidency: true, valueSuffix: " Include patient safety, clinical administration and privacy impact.", tools: "EHR, PAS, CRM, document management, BI" },
    Manufacturing: { compliance: 3, aiTrust: 3, dataResidency: false, valueSuffix: " Include inventory, production, quality and supplier performance impact.", tools: "ERP, MES, WMS, supplier portals, BI" },
    "Retail and Consumer": { compliance: 3, aiTrust: 3, dataResidency: false, valueSuffix: " Include order value, returns, customer service and store operations impact.", tools: "Commerce, POS, CRM, OMS, WMS, BI" },
    Technology: { compliance: 3, aiTrust: 4, dataResidency: true, valueSuffix: " Include ARR, support operations, product workflows and engineering capacity.", tools: "CRM, ITSM, product analytics, data warehouse, BI" },
    "Energy and Utilities": { compliance: 5, aiTrust: 5, dataResidency: true, valueSuffix: " Include asset, field service, outage, safety and regulatory exposure.", tools: "ERP, EAM, GIS, field-service platforms, BI" },
    "Professional Services": { compliance: 3, aiTrust: 4, dataResidency: true, valueSuffix: " Include billable capacity, client delivery, margin and knowledge-work leverage.", tools: "PSA, CRM, DMS, project systems, BI" },
    "Public Sector": { compliance: 5, aiTrust: 5, dataResidency: true, valueSuffix: " Include citizen service, statutory obligations, grant or case-management exposure.", tools: "Case management, ERP, DMS, forms, BI" }
  };

  const colours = ["#4f46e5", "#2563eb", "#0891b2", "#059669", "#f59e0b", "#ec4899", "#6d64ff"];

  const defaultForm = new Map(Array.from(new FormData(form).entries()));
  const defaultCheckedValues = Array.from(form.querySelectorAll('input[type="checkbox"]')).reduce((acc, input) => {
    if (!acc[input.name]) acc[input.name] = [];
    if (input.checked) acc[input.name].push(input.value);
    return acc;
  }, {});

  let latestModel = null;
  let canvasFrame = 0;
  let heroFrame = 0;
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

  function setFieldValue(id, value) {
    const field = document.querySelector(`#${id}`);
    if (field && value !== undefined) field.value = value;
  }

  function setText(id, value) {
    const node = document.querySelector(`#${id}`);
    if (node && value !== undefined) node.textContent = value;
  }

  function setCheckboxGroup(name, values) {
    const selected = new Set(values || []);
    document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
      input.checked = selected.has(input.value);
    });
  }

  function applyFunctionContext(writeValues) {
    const functionName = document.querySelector("#businessFunction").value;
    const industryName = document.querySelector("#industry").value;
    const profile = functionProfiles[functionName] || functionProfiles["Finance and Accounting"];
    const industry = industryProfiles[industryName] || industryProfiles["Financial Services"];

    setText("monthlyVolumeLabel", profile.monthlyLabel);
    setText("monthlyVolumeHint", `${profile.monthlyHint} No fixed range is enforced.`);
    setText("avgHandleTimeLabel", profile.handleLabel);
    setText("avgHandleTimeHint", profile.handleHint);
    setText("teamSizeLabel", profile.teamLabel);
    setText("teamSizeHint", profile.teamHint);
    setText("annualRevenueInfluencedLabel", profile.valueLabel);
    setText("annualRevenueInfluencedHint", `${profile.valueHint}${industry.valueSuffix || ""}`);

    if (!writeValues) return;

    setFieldValue("processName", profile.processName);
    setFieldValue("processNotes", `${profile.notes} ${industry.valueSuffix || ""}`.trim());
    setFieldValue("monthlyVolume", profile.monthlyVolume);
    setFieldValue("avgHandleTime", profile.avgHandleTime);
    setFieldValue("teamSize", profile.teamSize);
    setFieldValue("hourlyCost", profile.hourlyCost);
    setFieldValue("errorRate", profile.errorRate);
    setFieldValue("exceptionRate", profile.exceptionRate);
    setFieldValue("annualRevenueInfluenced", profile.annualRevenueInfluenced);
    setFieldValue("strategicGoal", profile.defaultGoal);
    setFieldValue("currentTools", industry.tools || "");
    setFieldValue("complianceIntensity", industry.compliance || 3);
    setFieldValue("aiTrust", industry.aiTrust || 3);
    setCheckboxGroup("systems", profile.systems);
    setCheckboxGroup("painPoints", profile.painPoints);
    setCheckboxGroup("channels", profile.channels);

    const constraintDefaults = ["Cyber review", "Legacy systems", "Budget ceiling", "Model governance"];
    if (industry.dataResidency) constraintDefaults.unshift("Data residency");
    setCheckboxGroup("constraints", constraintDefaults);
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
    const implementationPlan = buildImplementationPlan(state, playbook, projectPortfolio, tools, horizonWeeks, timeToValue, complexity);
    const recommendationLogic = buildRecommendationLogic(state, {
      coverage,
      suitability,
      fit,
      complexity,
      annualBenefit,
      paybackMonths,
      timeToValue,
      budgetGap,
      readiness
    });

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
      implementationPlan,
      recommendationLogic,
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

  function buildRecommendationLogic(state, metrics) {
    const strongestReadiness = metrics.readiness.slice().sort((a, b) => b.score - a.score)[0];
    const weakestReadiness = metrics.readiness.slice().sort((a, b) => a.score - b.score)[0];
    const profile = functionProfiles[state.businessFunction] || functionProfiles["Finance and Accounting"];
    const volumeSignal = state.monthlyVolume >= profile.monthlyVolume * 1.2
      ? "high volume"
      : state.monthlyVolume <= profile.monthlyVolume * 0.45 ? "low-to-medium volume" : "typical volume";
    const exceptionSignal = state.exceptionRate >= 0.2
      ? "a material exception load"
      : state.exceptionRate >= 0.1 ? "moderate exceptions" : "a clean-enough happy path";
    const systemSignal = state.systemFragmentation >= 4
      ? "fragmented systems, so orchestration and integration governance matter more than simple bot scripts"
      : "manageable systems, so the first release can move faster";
    const controlSignal = state.complianceIntensity >= 4 || state.aiTrust >= 4
      ? "strong control and explainability requirements, so the recommendation keeps humans in the loop for sensitive decisions"
      : "lighter control intensity, so the roadmap can prioritise speed and adoption";

    return [
      {
        title: "Value trigger",
        score: `${money(metrics.annualBenefit)}/yr`,
        body: `The model saw ${volumeSignal}, ${state.avgHandleTime} minutes of manual effort per item and ${exceptionSignal}. That combination supports automation because repeatable work is large enough to release capacity and improve cycle time.`
      },
      {
        title: "Feasibility trigger",
        score: `${metrics.fit}/100 fit`,
        body: `The fit score blends process standardisation, data quality, documentation, integration maturity, sponsorship and change readiness. ${strongestReadiness.name} is the strongest readiness domain; ${weakestReadiness.name} is the area to strengthen before scaling.`
      },
      {
        title: "Architecture trigger",
        score: `${pct(metrics.coverage)} coverage`,
        body: `Because the workflow uses ${state.systems.join(", ") || "multiple enterprise systems"} and ${state.channels.join(", ") || "mixed intake channels"}, the recommendation favours process intelligence, workflow orchestration, controlled automation execution and a KPI layer.`
      },
      {
        title: "Governance trigger",
        score: `${metrics.timeToValue}w TTV`,
        body: `${systemSignal}. There are also ${state.constraints.length} selected constraints. ${controlSignal}.`
      },
      {
        title: "Funding trigger",
        score: metrics.budgetGap > 0 ? `${money(metrics.budgetGap)} gap` : "within cap",
        body: `The budget stance, complexity, tooling needs, affected users and support model create a mid-case investment profile. The roadmap therefore starts with a scoped MVP before funding broader waves.`
      }
    ];
  }

  function buildImplementationPlan(state, playbook, portfolio, tools, horizonWeeks, timeToValue, complexity) {
    const complexityTone = complexity > 0.95 ? "high-control" : complexity > 0.72 ? "balanced" : "fast-track";
    const waveOneProjects = portfolio.filter((item) => item.priority === "Priority 1").slice(0, 3);
    const waveTwoProjects = portfolio.filter((item) => item.priority !== "Priority 1").slice(0, 4);
    const toolNames = Array.from(new Set(tools.flatMap((group) => group.tools))).slice(0, 8);

    const phases = [
      {
        name: "0. Mobilise and align",
        window: "Week 0-1",
        objective: "Turn the opportunity into an owned, funded and governed programme.",
        activities: [
          "Confirm executive sponsor, benefit owner, process owner, product owner and delivery lead.",
          "Agree the business-function scope, industry constraints, risk appetite and initial value hypothesis.",
          "Create the programme charter, decision cadence, RAID log, design authority and benefits baseline approach.",
          `Lock MVP success criteria around ${state.strategicGoal.toLowerCase()}, user adoption, control evidence and measurable time-to-value.`
        ],
        deliverables: ["Programme charter", "Decision log", "Benefit hypothesis", "Stakeholder map", "Initial RAID"],
        gate: "Sponsor signs off MVP scope, decision rights, data access path and funding guardrails.",
        owners: ["Executive sponsor", "Process owner", "Automation CoE lead", "Finance PMO"]
      },
      {
        name: "1. Discover and baseline",
        window: "Week 1-3",
        objective: "Understand how the process actually runs across channels, systems and teams.",
        activities: [
          "Run workshops using the generated discovery question bank and interview frontline users, supervisors and control owners.",
          `Collect samples from ${state.channels.join(", ") || "all intake channels"} and map variants, handoffs, decisions, queues and exception reasons.`,
          "Pull event logs where available and reconcile them with SME process walkthroughs.",
          "Measure current volume, manual effort, error rate, exception ageing, SLA breaches, backlog and customer or employee impact."
        ],
        deliverables: ["Current-state map", "Baseline metrics pack", "Variant heatmap", "Data inventory", "Pain-point evidence"],
        gate: "Baseline accepted by business and finance owners; automation candidates scored by value and feasibility.",
        owners: ["Process analyst", "Business SMEs", "Data analyst", "Operations lead"]
      },
      {
        name: "2. Diagnose and prioritise",
        window: "Week 3-5",
        objective: "Create a value-ranked automation backlog with clear build patterns.",
        activities: [
          "Score each candidate by annual value, cycle-time impact, control risk, implementation effort and dependency load.",
          "Split opportunities into eliminate, standardise, workflow, API, RPA, AI extraction, decision assist and analytics patterns.",
          "Identify the first automation slice that can prove value without hiding unresolved policy or data problems.",
          `Select wave-one projects: ${waveOneProjects.map((item) => item.name).join(", ") || portfolio.slice(0, 2).map((item) => item.name).join(", ")}.`
        ],
        deliverables: ["Opportunity matrix", "Prioritised backlog", "MVP scope", "Dependency map", "Value tracking model"],
        gate: "Sponsor approves MVP backlog and confirms what will be deferred to later waves.",
        owners: ["Product owner", "CoE lead", "Finance partner", "Enterprise architect"]
      },
      {
        name: "3. Design target state",
        window: "Week 5-8",
        objective: "Define the future operating model, architecture, controls and adoption model.",
        activities: [
          "Design the target process with happy path, exception path, approval path, audit path and failure recovery path.",
          `Choose platform components from ${toolNames.join(", ")} based on existing tools, integration maturity and enterprise constraints.`,
          "Define data fields, confidence thresholds, human-in-loop rules, access model, logging and control evidence.",
          `Agree the ${state.operatingModel} operating model, support model, RACI and governance cadence.`
        ],
        deliverables: ["Future-state blueprint", "Solution architecture", "Control design", "RACI", "Adoption and training plan"],
        gate: "Architecture, cyber, data, risk and business owners approve build readiness.",
        owners: ["Enterprise architect", "Workflow lead", "Risk owner", "Change lead"]
      },
      {
        name: "4. Build MVP",
        window: `Week 8-${Math.max(12, timeToValue)}`,
        objective: "Build a measurable release that automates the high-value path and exposes exceptions.",
        activities: [
          "Configure digital intake, validation rules, routing, approvals, notifications and exception queues.",
          "Build API integrations first; use RPA for legacy screens only where APIs are unavailable or uneconomic.",
          "Add AI extraction, classification or summarisation only within confidence thresholds and with review controls.",
          "Instrument every automation with event logs, benefit measures, error monitoring, handoff reasons and adoption telemetry."
        ],
        deliverables: ["MVP workflow", "Automations and integrations", "Exception workbench", "KPI dashboard", "Runbook"],
        gate: "MVP meets functional, security, control, performance and data-quality acceptance criteria.",
        owners: ["Automation engineers", "Workflow developer", "Integration lead", "QA lead"]
      },
      {
        name: "5. Validate and pilot",
        window: `Week ${Math.max(12, timeToValue)}-${Math.max(16, timeToValue + 4)}`,
        objective: "Prove the solution in controlled production before scaling.",
        activities: [
          "Run UAT with real examples, edge cases, exception types and role-based access scenarios.",
          "Pilot with a bounded user group, queue, region, supplier group, customer segment or transaction type.",
          "Track automation coverage, cycle time, exception rate, manual overrides, quality, adoption and support tickets daily.",
          "Tune rules, thresholds, queues and training based on pilot evidence."
        ],
        deliverables: ["UAT sign-off", "Pilot report", "Control evidence pack", "Adoption heatmap", "Hypercare backlog"],
        gate: "Pilot achieves minimum KPI thresholds and no unresolved critical control or adoption issues remain.",
        owners: ["Business owner", "QA lead", "Control owner", "Hypercare manager"]
      },
      {
        name: "6. Scale and industrialise",
        window: `Week ${Math.max(16, timeToValue + 4)}-${horizonWeeks}`,
        objective: "Scale the automation safely and convert the MVP into an enterprise capability.",
        activities: [
          `Roll out wave-two projects: ${waveTwoProjects.map((item) => item.name).join(", ") || "additional backlog items selected by value gates"}.`,
          "Create reusable components, naming standards, design patterns, monitoring standards and support SLAs.",
          "Review realised benefits monthly with finance and retire manual controls made redundant by reliable automation evidence.",
          "Feed new opportunities into the CoE backlog and use dashboard data to optimise the process continuously."
        ],
        deliverables: ["Scale rollout plan", "CoE standards", "Reusable component library", "Benefits realisation pack", "Optimisation backlog"],
        gate: "Programme moves from project mode to governed run-and-improve cadence.",
        owners: ["CoE lead", "Platform owner", "Business operations lead", "Finance PMO"]
      }
    ];

    const resources = [
      ["Executive sponsor", "0.05 FTE", "Decision rights, funding, dependency escalation"],
      ["Product/process owner", "0.4 FTE", "Backlog, scope, acceptance and operating-model decisions"],
      ["Business SMEs", "0.3-0.8 FTE", "Workshops, UAT, rule validation and adoption coaching"],
      ["Process/data analyst", "0.5 FTE", "Baseline, process mining, benefit tracking and dashboard logic"],
      ["Solution architect", "0.3 FTE", "Architecture, integration pattern, controls and non-functional design"],
      ["Automation developers", "1-3 FTE", "Workflow, RPA/API, IDP, testing and production hardening"],
      ["Risk/security/data owners", "0.2 FTE", "Control sign-off, data handling, cyber review and release approval"],
      ["Change and training lead", "0.3 FTE", "Training, communications, champions and adoption measurement"]
    ];

    const workstreams = [
      ["Process and policy", "Standardise inputs, decision rules, approvals, exception codes and handoff ownership."],
      ["Data and intelligence", "Event-log access, document samples, master data checks, confidence scoring and KPI definitions."],
      ["Technology delivery", "Workflow, integration, automation execution, monitoring, environments and release management."],
      ["Controls and governance", "Audit evidence, access, segregation of duties, human-in-loop decisions and model governance."],
      ["People and adoption", "Role impact, training, change champions, communications, adoption dashboards and hypercare."],
      ["Benefits realisation", "Baseline sign-off, savings methodology, benefit owner, finance validation and monthly reporting."]
    ];

    return { complexityTone, phases, resources, workstreams };
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

    renderLogic(model);
    renderBlueprint(model);
    renderQuestions(model);
    renderMaturity(model);
    renderImplementation(model);
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

  function renderLogic(model) {
    logicPanel.innerHTML = model.recommendationLogic.map((item) => `
      <article class="logic-card">
        <span>${escapeHtml(item.title)}</span>
        <strong>${escapeHtml(item.score)}</strong>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `).join("");
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

  function renderImplementation(model) {
    const plan = model.implementationPlan;
    implementation.innerHTML = `
      <article class="implementation-card full">
        <div class="plan-head">
          <div>
            <p class="eyebrow">Detailed implementation plan</p>
            <h3>${escapeHtml(model.state.processName)}</h3>
            <p>This is a ${escapeHtml(plan.complexityTone)} delivery plan shaped by the selected business function, industry, systems, constraints, readiness, budget posture and automation ambition.</p>
          </div>
          <div class="plan-summary">
            <span>${model.horizonWeeks} weeks</span>
            <strong>${escapeHtml(model.state.operatingModel)}</strong>
            <small>${escapeHtml(model.state.industry)}</small>
          </div>
        </div>
      </article>
      <article class="implementation-card full">
        <h3>Phase-by-phase delivery plan</h3>
        <div class="phase-stack">
          ${plan.phases.map((phase) => `
            <section class="phase-card">
              <div class="phase-title">
                <div>
                  <span class="phase-window">${escapeHtml(phase.window)}</span>
                  <h4>${escapeHtml(phase.name)}</h4>
                </div>
                <strong>${escapeHtml(phase.objective)}</strong>
              </div>
              <div class="phase-columns">
                <div>
                  <h5>Activities</h5>
                  <ul>${phase.activities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                </div>
                <div>
                  <h5>Deliverables</h5>
                  <div class="tag-row">${phase.deliverables.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>
                  <h5>Gate</h5>
                  <p>${escapeHtml(phase.gate)}</p>
                  <h5>Owners</h5>
                  <div class="tool-row">${phase.owners.map((item) => `<span class="tool-pill">${escapeHtml(item)}</span>`).join("")}</div>
                </div>
              </div>
            </section>
          `).join("")}
        </div>
      </article>
      <article class="implementation-card">
        <h3>Programme workstreams</h3>
        <ul class="architecture-list">
          ${plan.workstreams.map((item) => `<li><strong>${escapeHtml(item[0])}:</strong> ${escapeHtml(item[1])}</li>`).join("")}
        </ul>
      </article>
      <article class="implementation-card">
        <h3>Resource model</h3>
        <table class="raci-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Capacity</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            ${plan.resources.map((row) => `
              <tr>
                ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </article>
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
      <article class="implementation-card full">
        <h3>Roadmap and decision gates</h3>
        <p>The roadmap is intentionally gated: each phase must create evidence before the next spend or rollout decision. This prevents automating unstable processes and keeps the implementation tied to measurable business value.</p>
        <div class="gantt" aria-label="Implementation Gantt chart">
          <div class="gantt-axis"><span>Phase</span>${axis}</div>
          ${rows}
        </div>
      </article>
      <article class="implementation-card full">
        <h3>Milestones and release gates</h3>
        <div class="roadmap-grid">
          ${model.implementationPlan.phases.map((phase) => `
            <div class="roadmap-card">
              <span>${escapeHtml(phase.window)}</span>
              <strong>${escapeHtml(phase.name)}</strong>
              <p>${escapeHtml(phase.gate)}</p>
            </div>
          `).join("")}
        </div>
      </article>
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
        ctx.font = "800 12px Plus Jakarta Sans, system-ui, sans-serif";
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
      ctx.font = "900 24px Plus Jakarta Sans, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(model.fit), cx, cy + 6);
      ctx.font = "800 10px JetBrains Mono, monospace";
      ctx.fillStyle = "#60706b";
      ctx.fillText("FIT", cx, cy + 23);

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvasFrame = requestAnimationFrame(frame);
      }
    }

    frame();
  }

  function drawHeroCanvas() {
    if (!heroCanvas) return;
    cancelAnimationFrame(heroFrame);

    const ctx = heroCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = heroCanvas.getBoundingClientRect();
    const width = Math.max(320, rect.width || 1200);
    const height = Math.max(280, rect.height || 520);
    heroCanvas.width = width * dpr;
    heroCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const nodes = Array.from({ length: 42 }, (_, index) => ({
      x: (index * 97) % width,
      y: (index * 53) % height,
      r: 1.5 + (index % 5) * 0.55,
      speed: 0.18 + (index % 6) * 0.035,
      colour: colours[index % colours.length]
    }));
    let tick = 0;

    function frame() {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(79,70,229,0.18)");
      gradient.addColorStop(0.45, "rgba(37,99,235,0.12)");
      gradient.addColorStop(1, "rgba(5,150,105,0.14)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      nodes.forEach((node, index) => {
        const x = (node.x + Math.sin(tick * (index % 5 + 1)) * 24 + tick * 20 * node.speed) % width;
        const y = node.y + Math.cos(tick * (index % 7 + 1)) * 18;
        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `${node.colour}bb`;
        ctx.fill();

        for (let other = index + 1; other < nodes.length; other += 7) {
          const ox = (nodes[other].x + tick * 18 * nodes[other].speed) % width;
          const oy = nodes[other].y + Math.sin(tick * (other % 5 + 1)) * 16;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 160) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(196,181,253,${0.12 * (1 - distance / 160)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroFrame = requestAnimationFrame(frame);
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
      "Why this recommendation was made:",
      ...model.recommendationLogic.map((item) => `- ${item.title}: ${item.body}`),
      "",
      "Implementation plan:",
      ...model.implementationPlan.phases.map((phase) => `- ${phase.name} (${phase.window}): ${phase.objective} Gate: ${phase.gate}`),
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

  document.querySelector("#businessFunction").addEventListener("change", () => {
    applyFunctionContext(true);
    update();
  });

  document.querySelector("#industry").addEventListener("change", () => {
    applyFunctionContext(true);
    update();
  });

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
    applyFunctionContext(false);
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

  window.addEventListener("resize", () => {
    drawProcessConstellation(latestModel);
    drawHeroCanvas();
  });

  applyFunctionContext(false);
  drawHeroCanvas();
  update();
}());
