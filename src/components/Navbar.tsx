import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, ShieldCheck, Trophy, LayoutDashboard, Info, User, LogIn } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, lessonId?: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { overallPercentage, currentUser } = useProgress();

  const navLinks = [
    { id: 'home', label: 'หน้าแรก', icon: Sparkles },
    { id: 'lessons', label: 'บทเรียน', icon: BookOpen },
    { id: 'mission', label: 'ภารกิจ AI', icon: ShieldCheck },
    { id: 'quiz', label: 'แบบทดสอบ', icon: Trophy },
    { id: 'dashboard', label: 'ความก้าวหน้า', icon: LayoutDashboard },
    { id: 'auth', label: currentUser ? 'บัญชีผู้เรียน' : 'เข้าสู่ระบบ', icon: currentUser ? User : LogIn },
    { id: 'about', label: 'เกี่ยวกับเรา', icon: Info }
  ];

  const handleLinkClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
                AI Smart Learn
              </span>
              <span className="text-[11px] font-medium text-purple-600 whitespace-nowrap leading-tight mt-0.5">
                เรียนรู้ AI ใช้อย่างฉลาด
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-purple-700 bg-purple-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Profile Indicator */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {currentUser ? (
              <button
                onClick={() => handleLinkClick('auth')}
                className={`flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border transition-all cursor-pointer ${
                  currentTab === 'auth'
                    ? 'border-purple-400 bg-purple-50 text-purple-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
                title={currentUser.email}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold truncate max-w-[120px]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleLinkClick('auth')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/80 text-purple-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-purple-600" />
                <span>เข้าสู่ระบบ</span>
              </button>
            )}

            <button
              onClick={() => handleLinkClick('dashboard')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <span className="hidden md:inline">ความคืบหน้า</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white font-mono text-[10px]">
                {overallPercentage}%
              </span>
            </button>

            <button
              onClick={() => handleLinkClick('lessons')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              เริ่มเรียนรู้
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => handleLinkClick('auth')}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs"
              >
                {currentUser.name.charAt(0)}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="เปิดเมนูหลัก"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'auth' && currentUser && (
                  <span className="ml-auto text-[11px] font-mono text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                    {currentUser.email}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 px-2">
            <span className="text-xs text-slate-500">ความก้าวหน้าการเรียนรู้:</span>
            <span className="text-xs font-bold text-purple-700 font-mono">{overallPercentage}%</span>
          </div>
        </div>
      )}
    </header>
  );
};
