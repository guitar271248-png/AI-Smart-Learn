/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { MissionGamePage } from './pages/MissionGamePage';
import { QuizPage } from './pages/QuizPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [targetLessonId, setTargetLessonId] = useState<number>(1);

  const handleNavigate = (tab: string, lessonId?: number) => {
    setCurrentTab(tab);
    if (lessonId) {
      setTargetLessonId(lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'lessons':
        return <LessonsPage initialLessonId={targetLessonId} onNavigate={handleNavigate} />;
      case 'mission':
        return <MissionGamePage onNavigate={handleNavigate} />;
      case 'quiz':
        return <QuizPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
        <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {renderCurrentPage()}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </ProgressProvider>
  );
}
