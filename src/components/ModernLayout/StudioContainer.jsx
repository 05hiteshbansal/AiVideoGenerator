"use client";
import React from "react";

const StudioContainer = ({
  title,
  subtitle,
  step,
  showSplitLayout,
  leftPanel,
  rightPanel,
}) => {
  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
            {step}
          </p>
          <h1 className="font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-slate-500 md:text-base">{subtitle}</p>
        </header>

        {/* Layout */}
        {showSplitLayout ? (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left Panel - 2 columns */}
            <div className="lg:col-span-2">{leftPanel}</div>
            {/* Right Panel - 3 columns */}
            <div className="lg:col-span-3">{rightPanel}</div>
          </div>
        ) : (
          <div>{rightPanel}</div>
        )}
      </div>
    </div>
  );
};

export default StudioContainer;
