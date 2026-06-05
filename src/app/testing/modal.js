"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Mail, Lock, Eye, EyeOff, Loader2, Layers } from "lucide-react";

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Fake API request
    await new Promise((res) => setTimeout(res, 2000));

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="px-7 py-3.5 rounded-2xl bg-[#007AFF] text-white text-[15px] font-semibold tracking-tight shadow-lg shadow-blue-400/30 transition-all duration-200 hover:bg-[#0066DD] hover:shadow-xl hover:shadow-blue-400/40 active:scale-95 active:shadow-md select-none">
          Sign In
        </button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent
        className={[
          "w-full max-w-[400px] p-0 overflow-hidden",
          "rounded-3xl border border-black/[0.06] dark:border-white/[0.08]",
          "bg-white/72 dark:bg-zinc-900/80",
          "backdrop-blur-[40px] saturate-180",
          "shadow-2xl shadow-black/20 dark:shadow-black/60",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=closed]:zoom-out-95 duration-300",
        ].join(" ")}
      >
        <div className="px-8 pb-8 pt-6">
          {/* Header */}
          <DialogHeader className="items-center text-center mb-8">
            <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#007AFF] flex items-center justify-center shadow-lg shadow-blue-400/25">
              <Layers size={22} color="white" strokeWidth={2.2} />
            </div>

            <DialogTitle className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Sign in to Prism
            </DialogTitle>

            <p className="mt-1.5 text-[14px] text-zinc-500 dark:text-zinc-400 font-normal">
              Welcome back. Enter your details below.
            </p>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className={`${inputCls} pr-11`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#007AFF] cursor-pointer"
                />

                <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                className="text-[13px] text-[#007AFF] dark:text-[#0A84FF] font-medium hover:underline transition-all"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={[
                "w-full py-3.5 rounded-xl text-white text-[15px] font-semibold tracking-tight",
                "flex items-center justify-center gap-2.5 mb-5",
                "transition-all duration-200 select-none",
                loading
                  ? "bg-[#007AFF] opacity-80 cursor-not-allowed"
                  : "bg-[#007AFF] shadow-md shadow-blue-400/25 hover:bg-[#0066DD] hover:shadow-lg hover:shadow-blue-400/35 active:scale-[0.98] active:shadow-sm",
              ].join(" ")}
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center mb-5">
              <div className="flex-1 h-px bg-black/[0.08] dark:bg-white/[0.08]" />

              <span className="mx-3 text-[12px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                or continue with
              </span>

              <div className="flex-1 h-px bg-black/[0.08] dark:bg-white/[0.08]" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full py-3 rounded-xl border border-black/[0.09] dark:border-white/[0.1] flex items-center justify-center gap-3 text-[14.5px] font-medium text-zinc-700 dark:text-zinc-200 transition-all duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:border-black/[0.16] dark:hover:border-white/[0.18] active:scale-[0.98] select-none"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[12.5px] text-zinc-400 dark:text-zinc-500 mt-5">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-[#007AFF] dark:text-[#0A84FF] font-medium hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const inputCls = [
  "w-full pl-10 pr-4 py-3 rounded-xl",
  "text-[14.5px] text-zinc-900 dark:text-zinc-100 font-normal",
  "bg-black/[0.04] dark:bg-white/[0.06]",
  "border border-black/[0.09] dark:border-white/[0.1]",
  "placeholder-zinc-400 dark:placeholder-zinc-500",
  "transition-all duration-200",
  "focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-blue-500/20",
].join(" ");

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />

      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
