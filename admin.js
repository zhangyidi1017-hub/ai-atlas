(() => {
  const config = window.ANALYTICS_CONFIG || {};
  const loginPanel = document.getElementById("loginPanel");
  const dashboardPanel = document.getElementById("dashboardPanel");
  const loginForm = document.getElementById("loginForm");
  const loginMsg = document.getElementById("loginMsg");
  const dashMsg = document.getElementById("dashMsg");
  const statsGrid = document.getElementById("statsGrid");
  const visitsBody = document.getElementById("visitsBody");

  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    loginMsg.textContent = "请先在 analytics-config.js 中配置 Supabase URL 与 anon key。";
    loginMsg.classList.add("error");
    return;
  }

  const supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  function fmtTime(iso) {
    return new Date(iso).toLocaleString("zh-CN", { hour12: false });
  }

  function shortRef(ref) {
    if (!ref) return "—";
    try {
      const u = new URL(ref);
      return u.hostname;
    } catch {
      return ref.slice(0, 40);
    }
  }

  function renderStats(rows) {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const todayRows = rows.filter((r) => new Date(r.created_at).getTime() >= dayAgo);
    const sessions = new Set(todayRows.map((r) => r.session_id));
    const byView = {};
    for (const row of todayRows) {
      const key = row.view || "(unknown)";
      byView[key] = (byView[key] || 0) + 1;
    }
    const topView = Object.entries(byView).sort((a, b) => b[1] - a[1])[0];

    statsGrid.innerHTML = [
      { label: "近 24h 访问", value: todayRows.length },
      { label: "近 24h 会话", value: sessions.size },
      { label: "总记录数", value: rows.length },
      { label: "热门页面", value: topView ? `${topView[0]} (${topView[1]})` : "—" },
    ]
      .map(
        (s) => `
        <div class="admin-stat">
          <div class="admin-stat-label">${s.label}</div>
          <div class="admin-stat-value">${s.value}</div>
        </div>`
      )
      .join("");
  }

  function renderTable(rows) {
    visitsBody.innerHTML = rows
      .map(
        (row) => `
        <tr>
          <td>${fmtTime(row.created_at)}</td>
          <td>${row.view || "—"}</td>
          <td>${row.path || "—"}</td>
          <td>${shortRef(row.referrer)}</td>
          <td>${(row.session_id || "").slice(0, 8)}…</td>
        </tr>`
      )
      .join("");
  }

  async function loadDashboard() {
    dashMsg.textContent = "加载中…";
    const { data, error } = await supabase
      .from("visits")
      .select("id,session_id,view,path,referrer,created_at")
      .order("created_at", { ascending: false })
      .limit(300);

    if (error) {
      dashMsg.textContent = `读取失败：${error.message}`;
      dashMsg.classList.add("error");
      return;
    }

    dashMsg.textContent = `最近 ${data.length} 条记录`;
    dashMsg.classList.remove("error");
    renderStats(data);
    renderTable(data);
  }

  function showDashboard() {
    loginPanel.hidden = true;
    dashboardPanel.hidden = false;
    loadDashboard();
  }

  function showLogin() {
    loginPanel.hidden = false;
    dashboardPanel.hidden = true;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMsg.textContent = "登录中…";
    loginMsg.classList.remove("error");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      loginMsg.textContent = error.message;
      loginMsg.classList.add("error");
      return;
    }

    loginMsg.textContent = "";
    showDashboard();
  });

  document.getElementById("refreshBtn").addEventListener("click", loadDashboard);
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    showLogin();
  });

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) showDashboard();
  });
})();
