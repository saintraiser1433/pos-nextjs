'use client';

import { AlertContextType } from '@/types';
import React, { createContext, useContext, useState } from 'react';



const AlertContext = createContext({} as AlertContextType);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('Are you absolutely sure?');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const openAlert = ({
    message,
    title,
    onConfirm,
  }: {
    message: string;
    title?: string;
    onConfirm: () => void;
  }) => {
    setMessage(message);
    if (title) setTitle(title);
    setOnConfirm(() => () => {
      onConfirm();
      setOpen(false); // close after confirmation
    });
    setOpen(true);
  };

  const closeAlert = () => setOpen(false);

  return (
    <AlertContext.Provider
      value={{ open, message, title, onConfirm, openAlert, closeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
