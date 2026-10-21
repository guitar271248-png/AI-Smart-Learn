import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { UserProfile } from '../types';
import {
  LogIn,
  UserPlus,
  Lock,
  Mail,
  User,
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  Trophy,
  BookOpen,
  ArrowRight,
  KeyRound,
  Check
} from 'lucide-react';

interface AuthPageProps {
  onNavigate: (tab: string, lessonId?: number) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile,
    resetPassword,
    quickDemoLogin,
    progress,
    overallPercentage
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin');

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('guitar271248@gmail.com');
  const [signInPassword, setSignInPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpLevel, setSignUpLevel] = useState<UserProfile['educationLevel']>('มัธยมศึกษาตอนปลาย');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editLevel, setEditLevel] = useState<UserProfile['educationLevel']>(currentUser?.educationLevel || 'อุดมศึกษา');

  // Status & feedback alerts
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!signInEmail.trim() || !signInPassword) {
      setErrorMessage('กรุณากรอกทั้งอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    const res = signInWithEmail(signInEmail, signInPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'เข้าสู่ระบบไม่สำเร็จ');
    } else {
      setSuccessMessage('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับสู่ห้องเรียน AI Smart Learn!');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword) {
      setErrorMessage('กรุณากรอกข้อมูลทุกช่องให้ครบถ้วน');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('กรุณายินยอมตามข้อตกลงและนโยบายความเป็นส่วนตัวก่อนสร้างบัญชี');
      return;
    }

    const res = signUpWithEmail(signUpName, signUpEmail, signUpPassword, signUpLevel);
    if (!res.success) {
      setErrorMessage(res.error || 'ไม่สามารถลงทะเบียนได้');
    } else {
      setSuccessMessage('สร้างบัญชีผู้เรียนสำเร็จ! บัญชีของคุณถูกเชื่อมต่อเรียบร้อยแล้ว');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!resetEmail.trim() || !newPassword) {
      setErrorMessage('กรุณากรอกอีเมลและรหัสผ่านใหม่');
      return;
    }

    const res = resetPassword(resetEmail, newPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'รีเซ็ตรหัสผ่านไม่สำเร็จ');
    } else {
      setSuccessMessage('เปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้ว! คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที');
      setActiveTab('signin');
      setSignInEmail(resetEmail);
      setSignInPassword(newPassword);
    }
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      setErrorMessage('กรุณากรอกชื่อ-นามสกุล');
      return;
    }
    updateProfile(editName, editLevel);
    setIsEditingProfile(false);
    setSuccessMessage('อัปเดตข้อมูลโปรไฟล์เรียบร้อยแล้ว');
  };

  const handleSignOut = () => {
    signOut();
    clearMessages();
  };

  // If already logged in, show User Profile Dashboard
  if (currentUser) {
    return (
      <div className="py-6 md:py-10 space-y-8 max-w-4xl mx-auto animate-fade-in">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${currentUser.avatarColor || 'from-purple-500 to-indigo-600'} text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0`}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    เข้าสู่ระบบแล้ว
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {currentUser.email}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-medium text-purple-700">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {currentUser.educationLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={() => {
                  setEditName(currentUser.name);
                  setEditLevel(currentUser.educationLevel);
                  setIsEditingProfile(!isEditingProfile);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isEditingProfile ? 'ยกเลิกแก้ไข' : 'แก้ไขโปรไฟล์'}
              </button>
              <button
                onClick={handleSignOut}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>

          {/* Edit Profile Form drawer */}
          {isEditingProfile && (
            <div className="pt-6 pb-2 space-y-4 border-b border-slate-100 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">แก้ไขข้อมูลบัญชีผู้เรียน</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ชื่อ-นามสกุล / ชื่อที่แสดง:
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ระดับการศึกษา:
                  </label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value as UserProfile['educationLevel'])}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                  >
                    <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</option>
                    <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย</option>
                    <option value="อาชีวศึกษา">อาชีวศึกษา</option>
                    <option value="อุดมศึกษา">อุดมศึกษา</option>
                    <option value="ครู/อาจารย์">ครู/อาจารย์</option>
                    <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </div>
          )}

          {/* Account Details & Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
            <div className="p-3 bg-purple-50/60 rounded-xl">
              <span className="text-[11px] text-purple-700 font-medium">ความคืบหน้ารวม</span>
              <p className="text-xl font-bold text-purple-900 font-mono mt-0.5">
                {overallPercentage}%
              </p>
            </div>
            <div className="p-3 bg-indigo-50/60 rounded-xl">
              <span className="text-[11px] text-indigo-700 font-medium">บทเรียนที่เรียนจบ</span>
              <p className="text-xl font-bold text-indigo-900 font-mono mt-0.5">
                {progress.completedLessons.length} / 4
              </p>
            </div>
            <div className="p-3 bg-blue-50/60 rounded-xl">
              <span className="text-[11px] text-blue-700 font-medium">ภารกิจนักสืบ</span>
              <p className="text-xl font-bold text-blue-900 font-mono mt-0.5">
                {progress.missionScore ? `${progress.missionScore.score} แต้ม` : 'ยังไม่เล่น'}
              </p>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl">
              <span className="text-[11px] text-emerald-700 font-medium">คะแนนแบบทดสอบ</span>
              <p className="text-xl font-bold text-emerald-900 font-mono mt-0.5">
                {progress.quizScore ? `${progress.quizScore.score}/10` : 'ยังไม่ทำ'}
              </p>
            </div>
          </div>
        </div>

        {/* Sync & Learning Hub Banner */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>ความคืบหน้าเชื่อมต่อกับบัญชีของคุณแล้ว</span>
            </div>
            <h3 className="text-xl font-bold">พร้อมสำหรับการเรียนรู้ต่อหรือยัง?</h3>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-lg">
              ทุกคะแนนการสืบคดีและการทำแบบทดสอบจะถูกบันทึกผูกไว้กับบัญชีอีเมล <strong className="text-white">{currentUser.email}</strong> ของคุณโดยอัตโนมัติ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('lessons')}
              className="px-5 py-2.5 bg-white text-purple-900 hover:bg-purple-50 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>เข้าห้องเรียนบทเรียน</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-purple-800/80 hover:bg-purple-700 text-white rounded-xl font-semibold text-xs sm:text-sm border border-purple-500/40 transition-colors cursor-pointer"
            >
              ดูสถิติในแดชบอร์ด
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If NOT logged in, show Sign In / Sign Up / Reset tabs
  return (
    <div className="py-6 md:py-10 space-y-8 max-w-2xl mx-auto animate-fade-in">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
          <LogIn className="w-4 h-4 text-purple-600" />
          <span>บัญชีผู้เรียน AI Smart Learn</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          เข้าสู่ระบบด้วยบัญชีอีเมล
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          ลงชื่อเข้าใช้เพื่อบันทึกประวัติการเรียน ผลคะแนนภารกิจนักสืบ และผลการทำแบบทดสอบเฉพาะตัวของคุณ
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center justify-center p-1 bg-slate-200/70 rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => {
            setActiveTab('signin');
            clearMessages();
          }}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'signin'
              ? 'bg-white text-purple-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          เข้าสู่ระบบ (Sign In)
        </button>
        <button
          onClick={() => {
            setActiveTab('signup');
            clearMessages();
          }}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'signup'
              ? 'bg-white text-purple-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          สมัครสมาชิกใหม่ (Sign Up)
        </button>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2.5 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-start gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{successMessage}</div>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>ที่อยู่อีเมล (Email Address):</span>
              </label>
              <input
                type="email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="เช่น yourname@gmail.com หรือ student@school.ac.th"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>รหัสผ่าน (Password):</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('reset');
                    setResetEmail(signInEmail);
                    clearMessages();
                  }}
                  className="text-[11px] text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่านของคุณ"
                  className="w-full text-xs sm:text-sm p-3 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-400"
                />
                <span>จดจำการเข้าสู่ระบบบนอุปกรณ์นี้</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>เข้าสู่ระบบด้วยอีเมล</span>
            </button>

            {/* Quick Demo Logins for user convenience */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-[11px] font-semibold text-slate-400 block text-center uppercase tracking-wider">
                หรือคลิกเพื่อเข้าสู่ระบบทดสอบทันที
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => quickDemoLogin('user')}
                  className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-left transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-bold text-purple-900 block group-hover:text-purple-700">
                    📧 guitar271248@gmail.com
                  </span>
                  <span className="text-[11px] text-purple-600">บัญชีผู้เรียนหลัก (รหัส: 123456)</span>
                </button>

                <button
                  type="button"
                  onClick={() => quickDemoLogin('student')}
                  className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-left transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-bold text-indigo-900 block group-hover:text-indigo-700">
                    🎓 student.demo@smartlearn.ac.th
                  </span>
                  <span className="text-[11px] text-indigo-600">บัญชีนักเรียนมัธยม (รหัส: demo123)</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>ชื่อ-นามสกุล หรือ ชื่อเล่น (Full Name):</span>
              </label>
              <input
                type="text"
                required
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="เช่น นภัสสร ดวงแก้ว"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>ที่อยู่อีเมล (Email Address):</span>
              </label>
              <input
                type="email"
                required
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="เช่น yourname@domain.com"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>รหัสผ่าน (Password):</span>
                </label>
                <input
                  type="password"
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>ยืนยันรหัสผ่าน:</span>
                </label>
                <input
                  type="password"
                  required
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="พิมพ์รหัสผ่านซ้ำอีกครั้ง"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>ระดับการศึกษา / บทบาท:</span>
              </label>
              <select
                value={signUpLevel}
                onChange={(e) => setSignUpLevel(e.target.value as UserProfile['educationLevel'])}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              >
                <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</option>
                <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย</option>
                <option value="อาชีวศึกษา">อาชีวศึกษา (ปวช./ปวส.)</option>
                <option value="อุดมศึกษา">อุดมศึกษา (ปริญญาตรี/โท/เอก)</option>
                <option value="ครู/อาจารย์">ครู / อาจารย์ / บุคลากรทางการศึกษา</option>
                <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-400 mt-0.5"
                />
                <span className="leading-relaxed">
                  ข้าพเจ้ายินยอมให้นำอีเมลนี้ไปใช้ในการจัดเก็บผลการเรียนรู้และสถิติตามมาตรฐานการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>สร้างบัญชีผู้เรียนใหม่</span>
            </button>
          </form>
        )}

        {activeTab === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center pb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">รีเซ็ตรหัสผ่านบัญชี</h3>
              <p className="text-xs text-slate-500">กรอกอีเมลของคุณเพื่อตั้งรหัสผ่านใหม่</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>ที่อยู่อีเมลของคุณ:</span>
              </label>
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="เช่น guitar271248@gmail.com"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>กำหนดรหัสผ่านใหม่:</span>
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/40"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  clearMessages();
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                บันทึกรหัสผ่านใหม่
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Security and Privacy Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>ปลอดภัยและเป็นส่วนตัว:</strong> บัญชีอีเมลนี้ใช้เพื่อจดจำความก้าวหน้าและการทำกิจกรรมภายในแอป AI Smart Learn เท่านั้น ไม่มีการส่งต่อข้อมูลหรือแชร์ข้อมูลไปยังบุคคลภายนอก
        </p>
      </div>
    </div>
  );
};
