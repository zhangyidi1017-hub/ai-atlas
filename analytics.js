(() => {
  const config = window.ANALYTICS_CONFIG || {};
  if (!config.enabled || !config.supabaseUrl || !config.supabaseAnonKey) return;

  const SESSION_KEY = "ai-atlas-sid";

  function sessionId() {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  }

  function logVisit({ view = "" } = {}) {
    const url = `${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/visits`;
    const body = JSON.stringify({
      session_id: sessionId(),
      view: String(view || ""),
      path: `${location.pathname}${location.search}`,
      referrer: (document.referrer || "").slice(0, 500),
      user_agent: (navigator.userAgent || "").slice(0, 240),
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${config.supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      body,
      keepalive: true,
    }).catch(() => {});
  }

  window.AIAnalytics = { logVisit };
})();
