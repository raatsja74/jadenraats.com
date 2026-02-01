"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Target } from "lucide-react";

export function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [setupCost, setSetupCost] = useState(500);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(50);

  const calculations = useMemo(() => {
    const monthlySavings = hoursSaved * hourlyRate;
    const yearlySavings = monthlySavings * 12;
    const totalFirstYearCost = setupCost + monthlyMaintenance * 12;
    const netFirstYear = yearlySavings - totalFirstYearCost;
    const breakEvenMonths = setupCost / (monthlySavings - monthlyMaintenance);
    const roi = ((netFirstYear - setupCost) / setupCost) * 100;

    return {
      monthlySavings,
      yearlySavings,
      totalFirstYearCost,
      netFirstYear,
      breakEvenMonths: Math.max(0, breakEvenMonths),
      roi: Math.max(-100, roi),
      isPositive: netFirstYear > 0,
    };
  }, [hoursSaved, hourlyRate, setupCost, monthlyMaintenance]);

  const metrics = [
    {
      label: "Monthly Time Saved",
      value: `${calculations.monthlySavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
      icon: Clock,
      color: "from-secondary/10 to-transparent border-secondary/20",
    },
    {
      label: "Yearly Savings",
      value: `${calculations.yearlySavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
      icon: DollarSign,
      color: "from-primary/10 to-transparent border-primary/20",
    },
    {
      label: "Break-Even Point",
      value: `${calculations.breakEvenMonths.toFixed(1)} months`,
      icon: Target,
      color: "from-dim/5 to-transparent border-border-subtle",
    },
    {
      label: "First Year ROI",
      value: `${calculations.roi.toFixed(0)}%`,
      icon: TrendingUp,
      color: calculations.isPositive
        ? "from-primary/10 to-transparent border-primary/20"
        : "from-red-500/10 to-transparent border-red-500/20",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      {/* Input Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <InputField
          label="Hours saved per week"
          value={hoursSaved}
          onChange={setHoursSaved}
          unit="hours"
          min={1}
          max={168}
        />
        <InputField
          label="Your hourly rate"
          value={hourlyRate}
          onChange={setHourlyRate}
          unit="$/hr"
          min={10}
          max={500}
          step={5}
        />
        <InputField
          label="Initial setup cost"
          value={setupCost}
          onChange={setSetupCost}
          unit="$"
          min={0}
          max={50000}
          step={100}
        />
        <InputField
          label="Monthly maintenance"
          value={monthlyMaintenance}
          onChange={setMonthlyMaintenance}
          unit="$"
          min={0}
          max={5000}
          step={10}
        />
      </div>

      {/* Results */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card bg-gradient-to-br p-8 ${metric.color}`}
              >
                <div className="flex items-start justify-between mb-8">
                  <Icon className="text-primary transition-colors" size={28} />
                </div>
                <p className="text-dim text-[10px] font-black uppercase tracking-[0.2em] mb-2">{metric.label}</p>
                <p className="font-display text-3xl font-bold text-main">
                  {metric.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Breakdown */}
      <div className="glass-card !bg-surface/50 border-border-subtle p-10 space-y-8">
        <h3 className="font-display text-2xl font-bold text-main">Year 1 Breakdown</h3>

        <div className="space-y-6">
          <BreakdownItem
            label="Annual time savings"
            value={`${calculations.monthlySavings.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} × 12`}
            total={calculations.yearlySavings}
            positive
          />
          <div className="h-px bg-border-subtle"></div>
          <BreakdownItem
            label="Setup cost"
            value={`$${setupCost.toLocaleString()}`}
            total={setupCost}
          />
          <BreakdownItem
            label="Maintenance (12 months)"
            value={`$${monthlyMaintenance.toLocaleString()} × 12`}
            total={monthlyMaintenance * 12}
          />
          <div className="h-px bg-border-subtle"></div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-main text-lg tracking-tight">Net Year 1 Benefit</span>
            <span
              className={`text-2xl font-black ${calculations.isPositive
                ? "text-primary text-glow-orange"
                : "text-red-500"
                }`}
            >
              {calculations.netFirstYear.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card !bg-surface/30 border-border-subtle mt-10 p-8"
      >
        <h4 className="font-bold text-main mb-4">Tips for accurate calculations</h4>
        <ul className="space-y-3 text-sm text-dim leading-relaxed">
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-orange shrink-0"></span>
            <span>Use realistic time savings (don't overestimate)</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-orange shrink-0"></span>
            <span>Include your fully-loaded hourly rate (salary + benefits)</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-orange shrink-0"></span>
            <span>Factor in learning curve and onboarding time</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-orange shrink-0"></span>
            <span>Set break-even as your decision threshold</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-orange shrink-0"></span>
            <span>Revisit after 3 months to validate assumptions</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max = 100,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-muted mb-4 uppercase tracking-widest">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-black/5 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="input w-24 py-1"
        />
        <span className="text-neutral-500 text-sm">{unit}</span>
      </div>
    </div>
  );
}

function BreakdownItem({
  label,
  value,
  total,
  positive = false,
}: {
  label: string;
  value: string;
  total: number;
  positive?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-main font-semibold">{label}</p>
        <p className="text-xs text-dim mt-1">{value}</p>
      </div>
      <span className={positive ? "text-primary font-bold" : "text-main font-medium"}>
        {total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
    </div>
  );
}
