"use client";

import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, config, duration = 5000) => {
    const newToast = {
      id: Date.now(),
      message,
      config,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-close the toast after the specified duration
    setTimeout(() => {
      removeToast(newToast.id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
