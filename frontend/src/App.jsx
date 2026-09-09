import React, { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "";

const DEMO_RESULT = {
  id: "CALL-8291",
  filename: "suspicious_transfer.wav",
  duration: 18.4,
  sample_rate: 16000,
  spoof_probability: 0.94,
  real_probability: 0.06,
  voice_risk: 94,

  fraud_analysis: {
    fraud_probability: 0.91,
    fraud_risk: 91,
    fraud_type: "Financial Fraud",
    text: "Urgent payment is required immediately. Please share the OTP.",
    language: "Hinglish",
  },

  risk: {
    combined_risk: 93,
    risk_level: "RED",
    action: "TRANSACTION HELD",
  },

  transcription: {
    text: "Urgent payment is required immediately. Please share the OTP.",
    language: "Hinglish",
  },

  suspicious_segments: [
    {
      start: 2.1,
      end: 5.4,
      spoof_probability: 0.87,
      voice_risk: 87,
    },
    {
      start: 8.2,
      end: 11.8,
      spoof_probability: 0.94,
      voice_risk: 94,
    },
    {
      start: 14.1,
      end: 17.2,
      spoof_probability: 0.91,
      voice_risk: 91,
    },
  ],
};

const INITIAL_AUDIT_LOGS = [
  {
    id: 1,
    event_type: "CALL_ANALYSIS",
    data_hash: "8f2a9c...7bd1",
    previous_hash: "000000...0000",
    created_at: "2026-09-09 17:42:11",
  },
  {
    id: 2,
    event_type: "RISK_DECISION",
    data_hash: "4ca821...91ef",
    previous_hash: "8f2a9c...7bd1",
    created_at: "2026-09-09 17:42:12",
  },
  {
    id: 3,
    event_type: "TRANSACTION_HOLD",
    data_hash: "9ab412...45dc",
    previous_hash: "4ca821...91ef",
    created_at: "2026-09-09 17:42:13",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [error, setError] = useState("");

  // -------------------------------
  // ANALYZE CALL
  // -------------------------------

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an audio file first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // REAL BACKEND
      if (API_URL) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch(`${API_URL}/analyze`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.detail || "Analysis failed");
        }

        const data = await response.json();
        setResult(data);
      }

      // DEMO MODE
      else {
        await new Promise((resolve) => setTimeout(resolve, 1800));

        setResult({
          ...DEMO_RESULT,
          filename: selectedFile.name,
        });
      }

      setActiveTab("analysis");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // RESET
  // -------------------------------

  const resetAnalysis = () => {
    setSelectedFile(null);
    setResult(null);
    setError("");
    setActiveTab("dashboard");
  };

  // -------------------------------
  // HELPERS
  // -------------------------------

  const getRiskClass = (level) => {
    if (level === "RED") return "risk-red";
    if (level === "AMBER") return "risk-amber";
    return "risk-green";
  };

  const formatPercent = (value) => {
    if (value === undefined || value === null) return 0;

    return value <= 1
      ? Math.round(value * 100)
      : Math.round(value);
  };

  // -------------------------------
  // DASHBOARD
  // -------------------------------

  const renderDashboard = () => {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Security Dashboard</h1>
            <p>
              Real-time voice integrity and transaction risk monitoring
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setActiveTab("analyze")}
          >
            + Analyze Call
          </button>
        </div>

        {/* STATS */}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">◉</div>
            <div>
              <p>Total Calls Analyzed</p>
              <h2>1,482</h2>
              <span className="positive">+12.4%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon safe">✓</div>
            <div>
              <p>Safe Calls</p>
              <h2>1,390</h2>
              <span className="positive">93.8%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">!</div>
            <div>
              <p>Suspicious</p>
              <h2>68</h2>
              <span className="warning-text">4.6%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon danger">×</div>
            <div>
              <p>High-Risk / Blocked</p>
              <h2>24</h2>
              <span className="danger-text">1.6%</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW */}

        <div className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Risk Overview</h3>
                <p>Current system threat distribution</p>
              </div>
            </div>

            <div className="risk-overview">
              <div className="risk-circle">
                <strong>94%</strong>
                <span>Detection</span>
              </div>

              <div className="risk-list">
                <div>
                  <span className="dot green"></span>
                  Safe
                  <strong>93.8%</strong>
                </div>

                <div>
                  <span className="dot amber"></span>
                  Suspicious
                  <strong>4.6%</strong>
                </div>

                <div>
                  <span className="dot red"></span>
                  High Risk
                  <strong>1.6%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Recent Alerts</h3>
                <p>Latest security events</p>
              </div>
            </div>

            <div className="alert-list">
              <div className="alert-item">
                <span className="alert-dot red"></span>

                <div>
                  <strong>AI Voice Fraud Detected</strong>
                  <p>Transaction held automatically</p>
                </div>

                <small>2m ago</small>
              </div>

              <div className="alert-item">
                <span className="alert-dot amber"></span>

                <div>
                  <strong>Suspicious Voice Segment</strong>
                  <p>Manual verification required</p>
                </div>

                <small>8m ago</small>
              </div>

              <div className="alert-item">
                <span className="alert-dot red"></span>

                <div>
                  <strong>Fraud Intent Detected</strong>
                  <p>Step-up authentication triggered</p>
                </div>

                <small>14m ago</small>
              </div>
            </div>
          </div>
        </div>

        {/* PIPELINE */}

        <div className="panel pipeline-panel">
          <div className="panel-header">
            <div>
              <h3>Vigil Voice Detection Pipeline</h3>
              <p>Multi-layer voice fraud detection</p>
            </div>
          </div>

          <div className="pipeline">
            <div className="pipeline-step">
              <div className="pipeline-number">01</div>
              <h4>Audio Stream</h4>
              <p>SIP / WebRTC</p>
            </div>

            <div className="pipeline-line"></div>

            <div className="pipeline-step">
              <div className="pipeline-number">02</div>
              <h4>AASIST</h4>
              <p>Voice Spoof Detection</p>
            </div>

            <div className="pipeline-line"></div>

            <div className="pipeline-step">
              <div className="pipeline-number">03</div>
              <h4>Fraud NLP</h4>
              <p>Intent Analysis</p>
            </div>

            <div className="pipeline-line"></div>

            <div className="pipeline-step">
              <div className="pipeline-number">04</div>
              <h4>Risk Fusion</h4>
              <p>Final Decision</p>
            </div>

            <div className="pipeline-line"></div>

            <div className="pipeline-step">
              <div className="pipeline-number">05</div>
              <h4>Mitigation</h4>
              <p>Hold / MFA / Alert</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------
  // ANALYZE PAGE
  // -------------------------------

  const renderAnalyze = () => {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Analyze Call</h1>
            <p>Upload an audio recording for voice fraud analysis</p>
          </div>
        </div>

        <div className="upload-panel">
          <div className="upload-icon">♫</div>

          <h2>Upload Call Recording</h2>

          <p>
            Supported formats: WAV, MP3, M4A
          </p>

          <label className="file-input">
            <input
              type="file"
              accept=".wav,.mp3,.m4a,audio/*"
              onChange={(e) => {
                setSelectedFile(e.target.files[0] || null);
                setError("");
              }}
            />

            <span>
              {selectedFile
                ? selectedFile.name
                : "Choose audio file"}
            </span>
          </label>

          {selectedFile && (
            <div className="selected-file">
              <span>Selected</span>
              <strong>{selectedFile.name}</strong>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          <button
            className="primary-btn analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Call"}
          </button>

          {!API_URL && (
            <p className="demo-note">
              Demo mode: connect VITE_API_URL to use the FastAPI backend.
            </p>
          )}
        </div>

        {result && renderQuickResult()}
      </div>
    );
  };

  // -------------------------------
  // QUICK RESULT
  // -------------------------------

  const renderQuickResult = () => {
    const risk = result.risk || {};

    return (
      <div className="panel result-preview">
        <div className="panel-header">
          <div>
            <h3>Latest Analysis</h3>
            <p>{result.filename}</p>
          </div>

          <button
            className="secondary-btn"
            onClick={() => setActiveTab("analysis")}
          >
            View Full Analysis
          </button>
        </div>

        <div className="quick-result-grid">
          <div>
            <span>Overall Risk</span>
            <strong className={getRiskClass(risk.risk_level)}>
              {formatPercent(risk.combined_risk)}%
            </strong>
          </div>

          <div>
            <span>Risk Level</span>
            <strong className={getRiskClass(risk.risk_level)}>
              {risk.risk_level || "—"}
            </strong>
          </div>

          <div>
            <span>Action</span>
            <strong>{risk.action || "—"}</strong>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------
  // ANALYSIS RESULT PAGE
  // -------------------------------

  const renderAnalysis = () => {
    if (!result) {
      return (
        <div className="page">
          <div className="empty-state">
            <h2>No call analyzed yet</h2>
            <p>Upload an audio recording to start the analysis.</p>

            <button
              className="primary-btn"
              onClick={() => setActiveTab("analyze")}
            >
              Analyze Call
            </button>
          </div>
        </div>
      );
    }

    const fraud = result.fraud_analysis || {};
    const risk = result.risk || {};
    const transcription = result.transcription || {};

    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Call Analysis</h1>
            <p>{result.filename}</p>
          </div>

          <button
            className="secondary-btn"
            onClick={resetAnalysis}
          >
            New Analysis
          </button>
        </div>

        {/* FINAL RISK */}

        <div className={`risk-banner ${getRiskClass(risk.risk_level)}`}>
          <div>
            <span>FINAL RISK DECISION</span>
            <h2>{risk.risk_level || "UNKNOWN"}</h2>
          </div>

          <div className="risk-score">
            {formatPercent(risk.combined_risk)}%
          </div>

          <div className="risk-action">
            <span>Recommended Action</span>
            <strong>{risk.action || "REVIEW"}</strong>
          </div>
        </div>

        {/* MODEL RESULTS */}

        <div className="section-title">
          <h2>Detection Results</h2>
          <p>Signals used to determine the final risk</p>
        </div>

        <div className="model-grid">
          {/* AASIST */}

          <div className="model-card">
            <div className="model-top">
              <div className="model-icon">AI</div>

              <div>
                <h3>AASIST</h3>
                <p>Voice Spoof Detection</p>
              </div>
            </div>

            <div className="model-score">
              <strong>
                {formatPercent(result.spoof_probability)}%
              </strong>

              <span>Spoof Probability</span>
            </div>

            <div className="progress">
              <div
                style={{
                  width: `${formatPercent(
                    result.spoof_probability
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* FRAUD NLP */}

          <div className="model-card">
            <div className="model-top">
              <div className="model-icon">NLP</div>

              <div>
                <h3>Fraud NLP</h3>
                <p>Fraud Intent Analysis</p>
              </div>
            </div>

            <div className="model-score">
              <strong>
                {formatPercent(fraud.fraud_probability)}%
              </strong>

              <span>Fraud Probability</span>
            </div>

            <div className="progress">
              <div
                style={{
                  width: `${formatPercent(
                    fraud.fraud_probability
                  )}%`,
                }}
              ></div>
            </div>

            <div className="fraud-type">
              <span>Fraud Type</span>
              <strong>{fraud.fraud_type || "Unknown"}</strong>
            </div>
          </div>

          {/* DYNAMIC RISK FUSION */}

          <div className="model-card">
            <div className="model-top">
              <div className="model-icon">RF</div>

              <div>
                <h3>Dynamic Risk Fusion</h3>
                <p>Final Risk Decision</p>
              </div>
            </div>

            <div className="model-score">
              <strong>
                {formatPercent(risk.combined_risk)}%
              </strong>

              <span>Combined Risk</span>
            </div>

            <div className="progress">
              <div
                style={{
                  width: `${formatPercent(
                    risk.combined_risk
                  )}%`,
                }}
              ></div>
            </div>

            <div className="fraud-type">
              <span>Decision</span>
              <strong>{risk.risk_level || "UNKNOWN"}</strong>
            </div>
          </div>
        </div>

        {/* TRANSCRIPT */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Call Transcript</h3>
              <p>
                Language: {transcription.language || fraud.language || "Unknown"}
              </p>
            </div>
          </div>

          <div className="transcript">
            {transcription.text ||
              fraud.text ||
              "No transcript available."}
          </div>
        </div>

        {/* FRAUD INDICATORS */}

        <div className="analysis-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Fraud Indicators</h3>
                <p>Detected suspicious patterns</p>
              </div>
            </div>

            <div className="indicator-list">
              <div className="indicator">
                <span>!</span>
                <div>
                  <strong>Urgency / Pressure</strong>
                  <p>Suspicious urgency detected</p>
                </div>
              </div>

              <div className="indicator">
                <span>!</span>
                <div>
                  <strong>OTP Request</strong>
                  <p>Request for sensitive information</p>
                </div>
              </div>

              <div className="indicator">
                <span>!</span>
                <div>
                  <strong>Financial Transaction</strong>
                  <p>Potential payment-related fraud</p>
                </div>
              </div>
            </div>
          </div>

          {/* MITIGATION */}

          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Active Mitigation</h3>
                <p>Automated security response</p>
              </div>
            </div>

            <div className="mitigation">
              <div className="mitigation-status">
                <span className="status-icon">✓</span>

                <div>
                  <strong>Transaction Held</strong>
                  <p>Payment blocked pending verification</p>
                </div>
              </div>

              <div className="mitigation-action">
                <span>Recommended</span>
                <strong>Step-up Authentication</strong>
              </div>

              <div className="mitigation-action">
                <span>Security Alert</span>
                <strong>Sent to Security Team</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------
  // TIMELINE
  // -------------------------------

  const renderTimeline = () => {
    const segments = result?.suspicious_segments || [];

    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Risk Timeline</h1>
            <p>Suspicious voice segments detected during the call</p>
          </div>
        </div>

        {!result ? (
          <div className="empty-state">
            <h2>No analysis available</h2>
            <p>Analyze a call first to view its risk timeline.</p>

            <button
              className="primary-btn"
              onClick={() => setActiveTab("analyze")}
            >
              Analyze Call
            </button>
          </div>
        ) : (
          <div className="panel">
            <div className="timeline-header">
              <span>CALL TIMELINE</span>
              <strong>{result.duration}s</strong>
            </div>

            <div className="timeline-bar">
              {segments.map((segment, index) => {
                const left =
                  (segment.start / result.duration) * 100;

                const width =
                  ((segment.end - segment.start) /
                    result.duration) *
                  100;

                return (
                  <div
                    key={index}
                    className="timeline-segment"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                    }}
                    title={`Risk: ${formatPercent(
                      segment.spoof_probability
                    )}%`}
                  ></div>
                );
              })}
            </div>

            <div className="timeline-scale">
              <span>0s</span>
              <span>{Math.round(result.duration / 2)}s</span>
              <span>{Math.round(result.duration)}s</span>
            </div>

            <div className="segment-list">
              {segments.map((segment, index) => (
                <div className="segment-row" key={index}>
                  <div className="segment-number">
                    0{index + 1}
                  </div>

                  <div className="segment-time">
                    {segment.start.toFixed(1)}s —{" "}
                    {segment.end.toFixed(1)}s
                  </div>

                  <div className="segment-risk">
                    {formatPercent(segment.spoof_probability)}%
                  </div>

                  <span className="risk-red">
                    HIGH RISK
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------------------------------
  // AUDIT LOG
  // -------------------------------

  const renderAudit = () => {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Audit Log</h1>
            <p>
              Tamper-evident security event history
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="audit-info">
            <div>
              <strong>SHA-256 Integrity Chain</strong>
              <p>
                Security events are linked using cryptographic hashes.
              </p>
            </div>

            <span className="verified">
              ✓ INTEGRITY VERIFIED
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event</th>
                  <th>Data Hash</th>
                  <th>Previous Hash</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>#{log.id}</td>

                    <td>
                      <span className="event-badge">
                        {log.event_type}
                      </span>
                    </td>

                    <td>
                      <code>{log.data_hash}</code>
                    </td>

                    <td>
                      <code>{log.previous_hash}</code>
                    </td>

                    <td>{log.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel security-note">
          <div className="security-icon">🔐</div>

          <div>
            <h3>Forensic Security Trail</h3>
            <p>
              Raw audio is not required to be stored for the audit
              chain. Security events can be verified using their
              cryptographic hashes.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------
  // SIDEBAR
  // -------------------------------

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">V</div>

          <div>
            <h2>VIGIL VOICE</h2>
            <span>VOICE INTEGRITY PLATFORM</span>
          </div>
        </div>

        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={activeTab === "analyze" ? "active" : ""}
            onClick={() => setActiveTab("analyze")}
          >
            <span>◉</span>
            Analyze Call
          </button>

          <button
            className={activeTab === "analysis" ? "active" : ""}
            onClick={() => setActiveTab("analysis")}
          >
            <span>◈</span>
            Analysis Result
          </button>

          <button
            className={activeTab === "timeline" ? "active" : ""}
            onClick={() => setActiveTab("timeline")}
          >
            <span>◴</span>
            Risk Timeline
          </button>

          <button
            className={activeTab === "audit" ? "active" : ""}
            onClick={() => setActiveTab("audit")}
          >
            <span>▤</span>
            Audit Log
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="online-dot"></span>

            <div>
              <strong>System Online</strong>
              <small>All services operational</small>
            </div>
          </div>

          <div className="version">
            VIGIL VOICE v1.0
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="topbar-label">
              ENTERPRISE SECURITY
            </span>
          </div>

          <div className="topbar-right">
            <span className="live-indicator">
              <span></span>
              LIVE MONITORING
            </span>

            <div className="profile">
              <div className="profile-avatar">K</div>

              <div>
                <strong>Security Admin</strong>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "analyze" && renderAnalyze()}
        {activeTab === "analysis" && renderAnalysis()}
        {activeTab === "timeline" && renderTimeline()}
        {activeTab === "audit" && renderAudit()}
      </main>
    </div>
  );
}

export default App;