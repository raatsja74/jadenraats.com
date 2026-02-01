"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  AlertCircle,
  Loader,
  Globe,
  Lock,
  Smartphone,
  Zap,
  Mail,
  Target,
} from "lucide-react";

interface CheckResult {
  name: string;
  icon: React.ReactNode;
  status: "pass" | "fail" | "warning";
  message: string;
}

export function WebsiteHealthChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults(null);

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      setError("Please enter a valid URL (e.g., example.com or https://example.com)");
      return;
    }

    setLoading(true);

    // Simulate checking (in production, this would call an API)
    setTimeout(() => {
      const mockResults: CheckResult[] = [
        {
          name: "SSL Certificate",
          icon: <Lock size={20} />,
          status: "pass",
          message: "HTTPS enabled and valid",
        },
        {
          name: "Mobile Responsive",
          icon: <Smartphone size={20} />,
          status: "pass",
          message: "Mobile-friendly layout detected",
        },
        {
          name: "Page Speed",
          icon: <Zap size={20} />,
          status: "warning",
          message: "Load time ~2.4s (consider optimization)",
        },
        {
          name: "Contact Information",
          icon: <Mail size={20} />,
          status: "pass",
          message: "Contact form or email found",
        },
        {
          name: "Clear CTA",
          icon: <Target size={20} />,
          status: "pass",
          message: "Primary call-to-action visible",
        },
        {
          name: "Meta Tags",
          icon: <Globe size={20} />,
          status: "pass",
          message: "SEO metadata properly configured",
        },
      ];

      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const passCount = results?.filter((r) => r.status === "pass").length ?? 0;
  const totalCount = results?.length ?? 0;
  const score = totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 0;

  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      {/* Input Form */}
      <form onSubmit={handleCheck} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter URL (e.g., example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-cyber flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            className="btn-cyber-primary !rounded-xl px-10"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              "Check"
            )}
          </button>
        </div>
        {error && <p className="text-error-default text-sm mt-2">{error}</p>}
      </form>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="glass-card text-center py-16 border-primary/20 bg-surface dark:bg-surface-muted/50">
              <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-primary/5 border border-primary/20 shadow-glow-orange/5 mb-8">
                <span className="text-5xl font-display font-black text-primary text-glow-orange">
                  {score}%
                </span>
              </div>
              <h3 className="text-main mb-3 text-2xl font-black tracking-tight">
                {score >= 80
                  ? "Production Optimized"
                  : score >= 60
                    ? "Optimization Pending"
                    : "System Warning"}
              </h3>
              <p className="text-dim text-sm font-bold uppercase tracking-widest">
                {passCount} of {totalCount} nodes verified
              </p>
            </div>

            {/* Individual Results */}
            <div className="space-y-3">
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`glass-card flex items-start gap-6 p-8 border ${result.status === "pass"
                    ? "border-primary/20 bg-primary/5"
                    : result.status === "warning"
                      ? "border-secondary/20 bg-secondary/5"
                      : "border-red-500/20 bg-red-500/5"
                    }`}
                >
                  <div
                    className={`mt-1 ${result.status === "pass"
                      ? "text-success-default"
                      : result.status === "warning"
                        ? "text-warning-default"
                        : "text-error-default"
                      }`}
                  >
                    {result.status === "pass" ? (
                      <Check size={20} />
                    ) : result.status === "warning" ? (
                      <AlertCircle size={20} />
                    ) : (
                      <X size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-main mb-2 text-lg">{result.name}</h4>
                    <p className="text-base text-dim leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            {results.some((r) => r.status !== "pass") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card !bg-surface dark:!bg-surface-muted/30 border-border-subtle p-10 mt-10"
              >
                <h4 className="font-black text-main mb-6 flex items-center gap-3 uppercase tracking-widest text-sm">
                  <AlertCircle size={20} className="text-primary" />
                  Quick Wins
                </h4>
                <ul className="space-y-4 text-base text-dim leading-relaxed">
                  {results.find((r) => r.status === "warning") && (
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>Optimize images and defer non-critical JavaScript</span>
                    </li>
                  )}
                  {results.find((r) => r.status === "fail") && (
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>Fix critical issues before moving forward</span>
                    </li>
                  )}
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>Run lighthouse audit for detailed recommendations</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
