import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, UserProfile, StoredUserAccount } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  currentUser: UserProfile | null;
  markLessonComplete: (lessonId: number) => void;
  isLessonCompleted: (lessonId: number) => boolean;
  saveMissionScore: (score: number, totalPossible: number, rank: string) => void;
  saveQuizScore: (score: number, total: number) => void;
  resetProgress: () => void;
  overallPercentage: number;
  signInWithEmail: (email: string, password: string) => { success: boolean; error?: string };
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
    educationLevel: UserProfile['educationLevel']
  ) => { success: boolean; error?: string };
  signOut: () => void;
  updateProfile: (name: string, educationLevel: UserProfile['educationLevel']) => boolean;
  resetPassword: (email: string, newPassword: string) => { success: boolean; error?: string };
  quickDemoLogin: (emailVariant?: 'student' | 'user') => void;
}

const STORAGE_KEY = 'ai_smart_learn_progress_v1';
const ACCOUNTS_STORAGE_KEY = 'ai_smart_learn_accounts_v1';
const SESSION_STORAGE_KEY = 'ai_smart_learn_session_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  missionScore: null,
  quizScore: null
};

const INITIAL_ACCOUNTS: StoredUserAccount[] = [
  {
    id: 'user_guitar',
    email: 'guitar271248@gmail.com',
    passwordHash: '123456',
    name: 'กัญญ์วรา ศรีพงษ์ (กีตาร์)',
    educationLevel: 'อุดมศึกษา',
    avatarColor: 'from-purple-500 to-indigo-600',
    joinedDate: '21 ต.ค. 2569',
    lastLoginDate: 'วันนี้',
    progress: {
      completedLessons: [1, 2],
      missionScore: {
        score: 80,
        totalPossible: 120,
        rank: 'นักสืบชำนาญการรู้เท่าทัน AI (Senior Detective)',
        date: '21 ต.ค. 2569'
      },
      quizScore: {
        score: 9,
        total: 10,
        percentage: 90,
        date: '21 ต.ค. 2569'
      }
    }
  },
  {
    id: 'user_student_demo',
    email: 'student.demo@smartlearn.ac.th',
    passwordHash: 'demo123',
    name: 'สมเกียรติ มุ่งมั่นเรียนรู้',
    educationLevel: 'มัธยมศึกษาตอนปลาย',
    avatarColor: 'from-blue-500 to-teal-500',
    joinedDate: '15 ต.ค. 2569',
    lastLoginDate: 'เมื่อวานนี้',
    progress: {
      completedLessons: [1],
      missionScore: null,
      quizScore: null
    }
  }
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load accounts
  const [accounts, setAccounts] = useState<StoredUserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_ACCOUNTS;
  });

  // Current logged in user profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        return JSON.parse(session);
      }
    } catch {
      // fallback
    }
    return null;
  });

  // Progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    // If a session exists, load that account's progress
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        const user = JSON.parse(session) as UserProfile;
        const savedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        const accList: StoredUserAccount[] = savedAccounts ? JSON.parse(savedAccounts) : INITIAL_ACCOUNTS;
        const target = accList.find((a) => a.id === user.id || a.email.toLowerCase() === user.email.toLowerCase());
        if (target && target.progress) {
          return target.progress;
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors and fallback
    }
    return defaultProgress;
  });

  // Sync accounts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch {
      // ignore
    }
  }, [accounts]);

  // Sync session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Sync progress to localStorage & account
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

      if (currentUser) {
        setAccounts((prevAccounts) =>
          prevAccounts.map((acc) =>
            acc.id === currentUser.id ? { ...acc, progress } : acc
          )
        );
      }
    } catch {
      // Ignore storage errors
    }
  }, [progress, currentUser]);

  const markLessonComplete = (lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  };

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId);
  };

  const saveMissionScore = (score: number, totalPossible: number, rank: string) => {
    setProgress((prev) => ({
      ...prev,
      missionScore: {
        score,
        totalPossible,
        rank,
        date: new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    }));
  };

  const saveQuizScore = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    setProgress((prev) => ({
      ...prev,
      quizScore: {
        score,
        total,
        percentage,
        date: new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (currentUser) {
        setAccounts((prevAccounts) =>
          prevAccounts.map((acc) =>
            acc.id === currentUser.id ? { ...acc, progress: defaultProgress } : acc
          )
        );
      }
    } catch {
      // Ignore
    }
  };

  // Sign In with email and password
  const signInWithEmail = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const target = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!target) {
      return {
        success: false,
        error: 'ไม่พบบัญชีอีเมลนี้ในระบบ กรุณาตรวจสอบการสะกดหรือลงทะเบียนสมัครสมาชิกใหม่'
      };
    }

    if (target.passwordHash !== password) {
      return {
        success: false,
        error: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง หรือกดรีเซ็ตรหัสผ่าน'
      };
    }

    const userProfile: UserProfile = {
      id: target.id,
      email: target.email,
      name: target.name,
      educationLevel: target.educationLevel,
      avatarColor: target.avatarColor,
      joinedDate: target.joinedDate,
      lastLoginDate: 'วันนี้'
    };

    setCurrentUser(userProfile);
    setProgress(target.progress || defaultProgress);

    // Update lastLoginDate in accounts
    setAccounts((prev) =>
      prev.map((a) => (a.id === target.id ? { ...a, lastLoginDate: 'วันนี้' } : a))
    );

    return { success: true };
  };

  // Sign Up with email
  const signUpWithEmail = (
    name: string,
    email: string,
    password: string,
    educationLevel: UserProfile['educationLevel']
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        success: false,
        error: 'อีเมลนี้ถูกลงทะเบียนไว้ในระบบแล้ว กรุณาเข้าสู่ระบบด้วยอีเมลนี้'
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษรเพื่อความปลอดภัย'
      };
    }

    const colors = [
      'from-purple-500 to-indigo-600',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-600',
      'from-violet-500 to-fuchsia-600',
      'from-pink-500 to-rose-600'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newAccount: StoredUserAccount = {
      id: `user_${Date.now()}`,
      email: cleanEmail,
      passwordHash: password,
      name: name.trim(),
      educationLevel,
      avatarColor: randomColor,
      joinedDate: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      lastLoginDate: 'วันนี้',
      progress: progress.completedLessons.length > 0 ? progress : defaultProgress
    };

    setAccounts((prev) => [...prev, newAccount]);

    const userProfile: UserProfile = {
      id: newAccount.id,
      email: newAccount.email,
      name: newAccount.name,
      educationLevel: newAccount.educationLevel,
      avatarColor: newAccount.avatarColor,
      joinedDate: newAccount.joinedDate,
      lastLoginDate: newAccount.lastLoginDate
    };

    setCurrentUser(userProfile);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const updateProfile = (name: string, educationLevel: UserProfile['educationLevel']) => {
    if (!currentUser) return false;

    const updatedProfile: UserProfile = {
      ...currentUser,
      name: name.trim(),
      educationLevel
    };

    setCurrentUser(updatedProfile);
    setAccounts((prev) =>
      prev.map((a) => (a.id === currentUser.id ? { ...a, name: name.trim(), educationLevel } : a))
    );
    return true;
  };

  const resetPassword = (email: string, newPassword: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const target = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!target) {
      return {
        success: false,
        error: 'ไม่พบบัญชีอีเมลนี้ในระบบ'
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        error: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
      };
    }

    setAccounts((prev) =>
      prev.map((a) => (a.email.toLowerCase() === cleanEmail ? { ...a, passwordHash: newPassword } : a))
    );

    return { success: true };
  };

  const quickDemoLogin = (variant: 'student' | 'user' = 'user') => {
    const targetEmail = variant === 'user' ? 'guitar271248@gmail.com' : 'student.demo@smartlearn.ac.th';
    const pwd = variant === 'user' ? '123456' : 'demo123';
    signInWithEmail(targetEmail, pwd);
  };

  // Overall percentage calculation:
  // 4 lessons = 50% (12.5% each)
  // Mission completed = 25%
  // Quiz completed = 25%
  const lessonContribution = (progress.completedLessons.length / 4) * 50;
  const missionContribution = progress.missionScore ? 25 : 0;
  const quizContribution = progress.quizScore ? 25 : 0;
  const overallPercentage = Math.min(100, Math.round(lessonContribution + missionContribution + quizContribution));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        currentUser,
        markLessonComplete,
        isLessonCompleted,
        saveMissionScore,
        saveQuizScore,
        resetProgress,
        overallPercentage,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateProfile,
        resetPassword,
        quickDemoLogin
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
