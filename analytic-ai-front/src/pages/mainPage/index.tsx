import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import RequestSettings from "../../widgets/requestSettings";


const MainPage: React.FC = () => {
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0f1b] to-[#0a0c14] text-white">
      {/* Центрированный блок */}
      <div className="w-full max-w-md px-6 py-10 flex flex-col items-center gap-8">
        
        {/* Логотип + название */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3a3fff] to-[#7c4dff] flex items-center justify-center shadow-[0_10px_30px_rgba(124,77,255,0.35)]">
            {/* Логотип-заглушка */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M8 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">DataTools AI</h1>
            <p className="text-sm text-[#b7b7c8] mt-1">AI ассистент для аналитиков</p>
          </div>
        </div>

        {/* Кнопка Начать чат */}
        <button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3a3fff] to-[#7c4dff] text-white font-semibold text-lg shadow-[0_15px_35px_rgba(124,77,255,0.35)] hover:brightness-105 transition"
          onClick={() => navigate("/chat")}
        >
          Начать чат
        </button>

        {/* Кнопка Новинки */}
        <button
          className="w-full py-3 rounded-2xl border border-[#3a3fff] bg-[#0b0f1b]/60 text-[#b7b7c8] font-medium hover:bg-[#0b0f1b]/80 transition"
          onClick={() => setIsUpdatesOpen(true)}
        >
          Что нового
        </button>
      </div>

      {/* Окно Новинок */}
      {isUpdatesOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-end justify-center">
          <div className="w-full max-w-lg bg-[#111827] rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Новые версии</h2>
              <button
                className="text-[#b7b7c8] hover:text-white"
                onClick={() => setIsUpdatesOpen(false)}
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0b0f1b] border border-[#2b2f3b]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#b7b7c8]">Версия 1.2.0</div>
                  <div className="text-xs text-[#8b8bc1]">Новое</div>
                </div>
                <div className="mt-2 text-sm text-white">
                  Добавлен режим анализа данных в реальном времени и улучшена производительность.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0f1b] border border-[#2b2f3b]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#b7b7c8]">Версия 1.1.0</div>
                  <div className="text-xs text-[#8b8bc1]">Обновление</div>
                </div>
                <div className="mt-2 text-sm text-white">
                  Обновлен интерфейс и добавлена история запросов.
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-[#3a3fff] to-[#7c4dff] text-white font-semibold"
              onClick={() => setIsUpdatesOpen(false)}
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
