const fallbackSignals = (query) => ({
  marketSignals: [
    `${query} buyers expect faster validation cycles and proof of ROI.`,
    "AI-enabled productivity tools continue to expand across founder and operator workflows."
  ],
  competitorInsights: [
    "Most alternatives solve one document at a time instead of coordinating a full venture workflow.",
    "Differentiation should emphasize workflow depth, artifact quality, and investor readiness."
  ],
  industryTrends: [
    "Agentic automation is moving from chat interfaces into repeatable operating systems.",
    "Founders increasingly want local-first or private-by-design research workflows."
  ]
});

const normalizeSnippets = (items) => items
  .map((item) => item?.Text || item?.Result || item?.content || item)
  .filter(Boolean)
  .map((text) => String(text).replace(/<[^>]*>/g, "").trim())
  .filter(Boolean);

const splitSignals = (snippets, query) => {
  if (!snippets.length) return fallbackSignals(query);
  return {
    marketSignals: snippets.slice(0, 2),
    competitorInsights: snippets.slice(2, 4).length ? snippets.slice(2, 4) : snippets.slice(0, 1),
    industryTrends: snippets.slice(4, 6).length ? snippets.slice(4, 6) : snippets.slice(1, 2)
  };
};

export const getResearchSignals = async (query) => {
  if (process.env.TAVILY_API_KEY) {
    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query,
          search_depth: "basic",
          max_results: 5
        })
      });
      if (response.ok) {
        const data = await response.json();
        const snippets = normalizeSnippets(data.results || []);
        return splitSignals(snippets, query);
      }
    } catch {
      // Fall through to DuckDuckGo, then deterministic signals.
    }
  }

  try {
    const url = new URL("https://api.duckduckgo.com/");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("no_html", "1");
    url.searchParams.set("skip_disambig", "1");
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (response.ok) {
      const data = await response.json();
      const relatedTopics = (data.RelatedTopics || []).flatMap((topic) => topic.Topics || topic);
      const snippets = normalizeSnippets([
        data.AbstractText,
        data.Answer,
        ...relatedTopics
      ]);
      return splitSignals(snippets, query);
    }
  } catch {
    // Fall through to deterministic signals.
  }

  return fallbackSignals(query);
};
