export const advisorFallbacks = {
  ceo: { name: "CEO Advisor", role: "CEO", initials: "CE" },
  cto: { name: "CTO Advisor", role: "CTO", initials: "CT" },
  cfo: { name: "CFO Advisor", role: "CFO", initials: "CF" },
  cmo: { name: "CMO Advisor", role: "CMO", initials: "CM" },
  vc: { name: "VC Advisor", role: "VC", initials: "VC" }
};

export const getAdvisorMeta = (message = {}) => {
  if (message.senderId === "user") {
    return {
      name: "Founder",
      role: "Operator",
      initials: "YO"
    };
  }

  const fallback = advisorFallbacks[message.senderId] || {
    name: "Board Advisor",
    role: message.role || "Advisor",
    initials: "BA"
  };

  return {
    name: message.name || fallback.name,
    role: message.role || fallback.role,
    initials: fallback.initials
  };
};
