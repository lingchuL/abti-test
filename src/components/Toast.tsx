'use client';

import { createContext, useContext, useCallback, useState } from 'react';

interface ToastContextType {
  showToast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setKey(k => k + 1);
    setTimeout(() => setVisible(false), 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div
          key={key}
          className="toast fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm shadow-2xl"
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
