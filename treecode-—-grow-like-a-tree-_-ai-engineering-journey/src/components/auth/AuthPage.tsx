import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  Calendar, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthPage: React.FC = () => {
  const { 
    loginWithEmail, 
    registerWithEmail, 
    loginWithGoogle,
    authLoading,
    authError,
    clearAuthError
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  // Field validation error states
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (mode === 'signup') {
      if (!username.trim()) {
        errors.username = 'Username is required.';
      } else if (username.trim().length < 2) {
        errors.username = 'Username must be at least 2 characters.';
      }

      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
      } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match.';
      }

      if (!age.trim()) {
        errors.age = 'Age is required.';
      } else {
        const numAge = parseInt(age.trim(), 10);
        if (isNaN(numAge) || numAge < 10 || numAge > 120) {
          errors.age = 'Please enter a valid age between 10 and 120.';
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email.trim(), password);
      } else {
        await registerWithEmail({
          email: email.trim(),
          pass: password,
          username: username.trim(),
          age: parseInt(age.trim(), 10),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearAuthError();
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (newMode: 'login' | 'signup') => {
    clearAuthError();
    setFieldErrors({});
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-[#080d0a] text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark Forest Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md my-8">
        {/* Brand Lockup */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/80 border border-emerald-500/40 text-emerald-400 mb-4 shadow-[0_0_30px_-5px_rgba(16,185,129,0.35)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-7" />
              <path d="m9 15 3-3 3 3" />
              <path d="m7 11 5-5 5 5" />
              <path d="m5 7 7-5 7 5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            TreeCode
          </h1>
          <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
            Grow Like a Tree · AI Engineering Journey
          </p>
        </div>

        {/* Card Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#09110c]/90 border border-emerald-900/50 shadow-2xl backdrop-blur-md">
          {/* Mode Tabs */}
          <div className="flex rounded-xl bg-[#060a08] p-1 border border-emerald-950/80 mb-6">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Global Auth Error Alert */}
          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <p className="leading-relaxed">{authError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                  Username *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Alex"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060b08] border text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                      fieldErrors.username ? 'border-rose-500' : 'border-emerald-900/40 focus:border-emerald-400'
                    }`}
                  />
                </div>
                {fieldErrors.username && (
                  <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.username}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060b08] border text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                    fieldErrors.email ? 'border-rose-500' : 'border-emerald-900/40 focus:border-emerald-400'
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060b08] border text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                    fieldErrors.password ? 'border-rose-500' : 'border-emerald-900/40 focus:border-emerald-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.password}</p>
              )}
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060b08] border text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        fieldErrors.confirmPassword ? 'border-rose-500' : 'border-emerald-900/40 focus:border-emerald-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
                    Age * <span className="text-[10px] text-zinc-500 font-normal">(Private Profile Data)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="number"
                      min={10}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 15"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060b08] border text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        fieldErrors.age ? 'border-rose-500' : 'border-emerald-900/40 focus:border-emerald-400'
                      }`}
                    />
                  </div>
                  {fieldErrors.age && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.age}</p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting || authLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to TreeCode' : 'Create My Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-emerald-950/80" />
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">or</span>
            <span className="h-px flex-1 bg-emerald-950/80" />
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || authLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#060a08] hover:bg-[#0b130e] text-zinc-200 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {/* Google G Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer info note */}
        <p className="text-center text-[11px] text-zinc-500 font-mono mt-6">
          Authorized Administrator: <span className="text-emerald-400">treepilot1212@gmail.com</span>
        </p>
      </div>
    </div>
  );
};
