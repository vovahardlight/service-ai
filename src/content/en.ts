export const content = {
  nav: [{ label: "Solutions", href: "#solutions" }, { label: "How it works", href: "#how-it-works" }, { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" }],
  solutions: [
    { id: "A", icon: "scan-search", title: "Lead generation & web intelligence", headline: "Find the right opportunities automatically.", text: "Discover and qualify potential customers using the signals that matter to your business.", example: "A workflow finds matching companies, checks their websites for relevant opportunities, and organizes qualified leads in one place.", flow: ["Discover", "Analyze", "Qualify", "Organize", "Deliver"], size: "wide", visual: "leads" },
    { id: "B", icon: "clapperboard", title: "Content & social workflows", headline: "Make content easier to publish.", text: "Prepare, adapt, and organize digital content across your publishing workflow.", example: "Raw video becomes platform-ready clips with captions and publishing details, subject to platform access.", tags: ["Video", "Captions", "Scheduling"], size: "regular", visual: "content" },
    { id: "C", icon: "messages-square", title: "AI assistants & communication", headline: "Put your business knowledge to work.", text: "Help customers get useful answers while your team stays focused on the conversations that need them.", example: "An assistant answers from approved company information, captures inquiries, and passes qualified leads to your CRM.", tags: ["Website", "WhatsApp", "Telegram"], size: "regular", visual: "assistant" },
    { id: "D", icon: "briefcase-business", title: "Specialized professional tools", headline: "Software shaped around your profession.", text: "Create practical tools for workflows that generic products do not cover well.", example: "For example, a patent workflow can organize applications, compare source information, and track review status. Professional judgment stays with people.", tags: ["Documents", "Research", "Review"], size: "regular", visual: "documents" },
    { id: "E", icon: "database-zap", title: "Data processing & integrations", headline: "Connect systems. Make information useful.", text: "Bring scattered data together, standardize it, and move it into the tools your team already uses.", example: "Collect information from multiple sources, classify documents, create reports, and sync the results to connected systems.", tags: ["APIs", "Reports", "Dashboards"], size: "regular", visual: "data" },
    { id: "F", icon: "sparkles", title: "Your custom challenge", headline: "Have a process that doesn't fit anywhere?", text: "Tell us what gets in the way. We'll explore whether a custom digital tool is a practical answer.", example: "Every project starts with your workflow, not a predefined package.", cta: "Discuss your idea", size: "wide", visual: "custom" }
  ],
  steps: [
    { icon: "messages-square", title: "Discover", text: "We learn about your business, current processes, and the tasks you want to improve.", list: ["Initial discussion", "Workflow analysis", "Feasibility assessment"] },
    { icon: "clipboard-list", title: "Plan", text: "We shape a practical solution and agree how it should work before development begins.", list: ["Solution proposal", "Integrations & scope", "Estimated budget & timeline"] },
    { icon: "code-xml", title: "Build", text: "We develop the tool, connect required services, and check that it works as agreed.", list: ["Development", "Integrations", "Testing"] },
    { icon: "rocket", title: "Launch & improve", text: "We deploy the solution and provide the agreed handover, documentation, and support.", list: ["Deployment", "Clear handover", "Optional next steps"] }
  ],
  faqs: [
    ["What if I don't know exactly what needs to be automated?", "You don't need a technical specification. Explain what you do today, what takes too much time, or what you want to improve. We'll help explore practical options."],
    ["Can you work with the software we already use?", "Often, yes. Existing systems can sometimes be connected through APIs, webhooks, or other interfaces. Feasibility depends on available access and technical capabilities."],
    ["How much does a custom solution cost?", "Cost depends on the workflow, features, integrations, and project scope. We agree on the proposed solution, deliverables, and price before development."],
    ["How long does development take?", "Timing depends on complexity and scope. We often recommend starting with a focused MVP rather than building a large system at once."],
    ["Who owns the developed software?", "Ownership, source-code delivery, documentation, licensing, and third-party dependencies are agreed before work starts."]
  ]
} as const;
