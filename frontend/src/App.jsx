import { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a08;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
  }

  .page {
    min-height: 100vh;
    width: 100vw;
    background: #0a0a08;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Noise overlay ── */
  .page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 100;
  }

  /* ── NAV ── */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 60px;
    border-bottom: 1px solid rgba(232,228,220,0.06);
    backdrop-filter: blur(12px);
    background: rgba(10,10,8,0.7);
  }

  .nav-logo {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.25);
  }

  .nav-links {
    display: flex;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    color: rgba(232,228,220,0.5);
    text-decoration: none;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.5px;
    transition: color 0.3s;
  }

  .nav-links a:hover { color: #e8e4dc; }

  .nav-cta {
    background: #c8f06e;
    color: #0a0a08;
    border: none;
    padding: 10px 24px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: background 0.3s, transform 0.2s;
  }

  .nav-cta:hover { background: #d4f580; transform: scale(1.03); }

  /* ── HERO ── */
  .hero {
    padding: 180px 60px 100px;
    position: relative;
    border-bottom: 1px solid rgba(232,228,220,0.06);
  }

  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 3px;
    color: rgba(232,228,220,0.35);
    text-transform: uppercase;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: rgba(232,228,220,0.25);
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(56px, 8vw, 110px);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -3px;
    color: #e8e4dc;
    max-width: 900px;
  }

  .hero-title em {
    font-style: italic;
    color: #c8f06e;
  }

  .hero-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 60px;
    flex-wrap: wrap;
    gap: 30px;
  }

  .hero-desc {
    font-size: 15px;
    line-height: 1.8;
    color: rgba(232,228,220,0.45);
    max-width: 440px;
    font-weight: 300;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(200,240,110,0.3);
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 12px;
    color: #c8f06e;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .hero-badge-dot {
    width: 6px;
    height: 6px;
    background: #c8f06e;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }

  /* ── SECTION WRAPPER ── */
  .section {
    padding: 80px 60px;
    border-bottom: 1px solid rgba(232,228,220,0.06);
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(232,228,220,0.08);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 700;
    letter-spacing: -1px;
    color: #e8e4dc;
    margin-bottom: 48px;
    line-height: 1.1;
  }

  /* ── CONTROL PANEL ── */
  .control-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(232,228,220,0.06);
    border: 1px solid rgba(232,228,220,0.06);
    border-radius: 20px;
    overflow: hidden;
  }

  .control-cell {
    background: #0e0e0c;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .control-cell-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 8px;
  }

  .input-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .inp {
    flex: 1;
    min-width: 140px;
    padding: 14px 18px;
    background: rgba(232,228,220,0.04);
    border: 1px solid rgba(232,228,220,0.1);
    border-radius: 12px;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s, background 0.3s;
  }

  .inp::placeholder { color: rgba(232,228,220,0.2); }
  .inp:focus {
    border-color: rgba(200,240,110,0.4);
    background: rgba(200,240,110,0.04);
  }

  .btn {
    padding: 14px 28px;
    border-radius: 12px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
    white-space: nowrap;
  }

  .btn:hover { transform: translateY(-1px); opacity: 0.9; }
  .btn:active { transform: translateY(0); }

  .btn-put {
    background: #c8f06e;
    color: #0a0a08;
  }

  .btn-get {
    background: rgba(232,228,220,0.08);
    color: #e8e4dc;
    border: 1px solid rgba(232,228,220,0.12);
  }

  .btn-delete {
    background: rgba(239,68,68,0.12);
    color: #f87171;
    border: 1px solid rgba(239,68,68,0.2);
  }

  /* ── METRICS ── */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(232,228,220,0.06);
    border: 1px solid rgba(232,228,220,0.06);
    border-radius: 20px;
    overflow: hidden;
  }

  .metric-cell {
    background: #0e0e0c;
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }

  .metric-cell:hover { background: #111110; }

  .metric-cell::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, #c8f06e, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .metric-cell:hover::after { transform: scaleX(1); }

  .metric-lbl {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.3);
    margin-bottom: 16px;
  }

  .metric-val {
    font-family: 'Playfair Display', serif;
    font-size: 56px;
    font-weight: 900;
    color: #e8e4dc;
    line-height: 1;
    letter-spacing: -2px;
    transition: color 0.3s;
  }

  .metric-cell:hover .metric-val { color: #c8f06e; }

  /* ── NODES ── */
  .nodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1px;
    background: rgba(232,228,220,0.06);
    border: 1px solid rgba(232,228,220,0.06);
    border-radius: 20px;
    overflow: hidden;
  }

  .node-card {
    background: #0e0e0c;
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }

  .node-card:hover { background: #111110; }

  .node-index {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.2);
    margin-bottom: 8px;
  }

  .node-name {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #e8e4dc;
    letter-spacing: -1px;
    margin-bottom: 28px;
    line-height: 1;
  }

  .node-empty {
    font-size: 13px;
    color: rgba(232,228,220,0.2);
    font-style: italic;
    letter-spacing: 0.5px;
  }

  .cache-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(232,228,220,0.06);
    font-size: 13px;
    transition: padding 0.2s;
  }

  .cache-row:last-child { border-bottom: none; }

  .cache-key {
    color: rgba(232,228,220,0.45);
    font-weight: 300;
    font-family: 'DM Sans', monospace;
  }

  .cache-val {
    color: #c8f06e;
    font-weight: 500;
    background: rgba(200,240,110,0.08);
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 12px;
  }

  .node-glow {
    position: absolute;
    top: -60px; right: -60px;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(200,240,110,0.07), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* ── TOAST ── */
  .toast {
    position: fixed;
    top: 32px;
    right: 32px;
    z-index: 999;
    background: #0e0e0c;
    border: 1px solid rgba(232,228,220,0.12);
    padding: 16px 28px;
    border-radius: 14px;
    font-size: 14px;
    color: #e8e4dc;
    font-weight: 400;
    animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 24px 60px rgba(0,0,0,0.5);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 0.2px;
  }

  .toast-accent {
    width: 6px; height: 6px;
    background: #c8f06e;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-12px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── FOOTER ── */
  .footer {
    padding: 60px 60px 50px;
    border-top: 1px solid rgba(232,228,220,0.06);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: end;
  }

  .footer-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -2px;
    color: #e8e4dc;
    line-height: 1;
    margin-bottom: 12px;
  }

  .footer-name em { font-style: italic; color: #c8f06e; }

  .footer-tagline {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.25);
  }

  .footer-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .footer-contact-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(232,228,220,0.25);
  }

  .footer-email {
    font-size: 15px;
    color: #c8f06e;
    text-decoration: none;
    font-weight: 400;
    letter-spacing: 0.3px;
    transition: opacity 0.2s;
  }

  .footer-email:hover { opacity: 0.7; }

  .footer-copy {
    font-size: 11px;
    color: rgba(232,228,220,0.15);
    letter-spacing: 0.5px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    .nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .hero { padding: 120px 24px 60px; }
    .section { padding: 60px 24px; }
    .control-grid { grid-template-columns: 1fr; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .footer { padding: 32px 24px; flex-direction: column; gap: 12px; text-align: center; }
  }
`;

export default function App() {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [result, setResult] = useState("");
  const [metrics, setMetrics] = useState({});
  const [cacheState, setCacheState] = useState({});

  const showMessage = (message) => {
    setResult(message);
    setTimeout(() => setResult(""), 2500);
  };

  const insertData = async () => {
    try {
      await fetch(`https://distributed-cache-simulator.onrender.com/put?key=${keyInput}&value=${valueInput}`, { method: "POST" });
      showMessage("Data inserted successfully");
      setKeyInput(""); setValueInput("");
      fetchMetrics(); fetchCacheState();
    } catch { showMessage("Insert failed"); }
  };

  const getData = async () => {
    try {
      const response = await fetch(`https://distributed-cache-simulator.onrender.com/${searchKey}`);
      const data = await response.json();
      showMessage(data.value !== undefined ? `Value: ${data.value}` : "Key not found");
      fetchMetrics(); fetchCacheState();
    } catch { showMessage("Request failed"); }
  };

  const deleteData = async () => {
    try {
      const response = await fetch(`https://distributed-cache-simulator.onrender.com/delete/${searchKey}`, { method: "DELETE" });
      const data = await response.json();
      showMessage(data.message || "Deleted");
      fetchMetrics(); fetchCacheState();
    } catch { showMessage("Delete failed"); }
  };
  const clearCache = async () => {

  try {

    const response = await fetch(
      "https://distributed-cache-simulator.onrender.com/clear",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    showMessage(data.message);

    fetchMetrics();
    fetchCacheState();

  } catch {

    showMessage("Clear failed");
  }
};

  const fetchMetrics = async () => {
    try {
      const r = await fetch("https://distributed-cache-simulator.onrender.com/metrics");
      setMetrics(await r.json());
    } catch {}
  };

  const fetchCacheState = async () => {
    try {
      const r = await fetch("https://distributed-cache-simulator.onrender.com/cache-state");
      setCacheState(await r.json());
    } catch {}
  };

  useEffect(() => {
    fetchMetrics(); fetchCacheState();
    const interval = setInterval(() => { fetchMetrics(); fetchCacheState(); }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="page">

        {/* Toast */}
        {result && (
          <div className="toast">
            <div className="toast-accent" />
            {result}
          </div>
        )}

        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">Cache Engine</div>
          <ul className="nav-links">
            <li><a href="#">System</a></li>
            <li><a href="#">Nodes</a></li>
            <li><a href="#">Metrics</a></li>
            <li><a href="#">Docs</a></li>
          </ul>
          <button
                className="nav-cta"
                  onClick={clearCache}
                          >
                      Clear All
                      </button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <p className="hero-eyebrow">Distributed Systems / Cache Engine</p>
          <h1 className="hero-title">
            Distributed<br />
            <em>Cache</em><br />
            Simulator
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              Real-time distributed caching engine implementing LRU eviction,
              hash-based routing, live metrics, and node visualization.
            </p>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Engine Live
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="section">
          <p className="section-label">Cache Controls</p>
          <div className="control-grid">

            <div className="control-cell">
              <p className="control-cell-label">Insert Record</p>
              <div className="input-row">
                <input
                  className="inp"
                  placeholder="Key"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />
                <input
                  className="inp"
                  placeholder="Value"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-put" onClick={insertData}>PUT →</button>
              </div>
            </div>

            <div className="control-cell">
              <p className="control-cell-label">Query Record</p>
              <div className="input-row">
                <input
                  className="inp"
                  placeholder="Search key"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
              <div className="input-row">
                <button className="btn btn-get" onClick={getData}>GET →</button>
                <button className="btn btn-delete" onClick={deleteData}>DELETE</button>
              </div>
            </div>

          </div>
        </section>

        {/* Metrics */}
        <section className="section">
          <p className="section-label">Live Metrics</p>
          <div className="metrics-grid">
            {["requests", "hits", "misses", "evictions"].map((key) => (
              <div className="metric-cell" key={key}>
                <p className="metric-lbl">{key}</p>
                <p className="metric-val">{metrics[key] ?? 0}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nodes */}
        <section className="section">
          <p className="section-label">Distributed Nodes</p>
          <h2 className="section-title">Active Cache Nodes</h2>
          <div className="nodes-grid">
            {Object.entries(cacheState).length === 0 ? (
              <div className="node-card">
                <p className="node-empty">No nodes connected</p>
              </div>
            ) : (
              Object.entries(cacheState).map(([nodeName, items], i) => (
                <div className="node-card" key={nodeName}>
                  <div className="node-glow" />
                  <p className="node-index">Node {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="node-name">{nodeName}</h3>
                  {items.length === 0 ? (
                    <p className="node-empty">Empty</p>
                  ) : (
                    items.map((item, idx) => (
                      <div className="cache-row" key={idx}>
                        <span className="cache-key">{item.key}</span>
                        <span className="cache-val">{item.value}</span>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div>
            <p className="footer-name">Hemanth<br /><em>Nelli</em></p>
            <p className="footer-tagline">Distributed Cache Simulator</p>
          </div>
          <div className="footer-right">
            <p className="footer-contact-label">Get in touch</p>
            <a className="footer-email" href="mailto:hemanthnelli1@gmail.com">
              hemanthnelli1@gmail.com
            </a>
            <p className="footer-copy">© 2026 — Built & designed by Hemanth Nelli</p>
          </div>
        </footer>

      </div>
    </>
  );
}
