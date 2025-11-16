import React, { useState, useId } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type { InputTypes } from "../types";

interface OptionType {
  label: string;
  value: string | number;
}

interface InputProps {
  label?: string;
  required?: boolean;
  type: InputTypes;
  name: string;
  options?: OptionType[];
  placeholder?: string;
  value?: string;
  onChange?: (name: string, value: string) => void;
  onSelectChange?: (name: string, value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  required = false,
  type = "text",
  name,
  options = [],
  placeholder = "",
  value = "",
  onChange,
  onSelectChange,
  className = "",
  disabled = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const renderLabel = () =>
    label && (
      <label htmlFor={id} className="font-medium text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
    );

  const emitChange = (val: string) => {
    onChange?.(name, val);
  };

  const handleNumber = (val: string) => {
    if (/^\d*$/.test(val)) {
      emitChange(val);
    }
  };

  if (type === "select") {
    return (
      <div className="flex flex-col gap-1 w-full">
        {renderLabel()}

        <select
          id={id}
          name={name}
          disabled={disabled}
          className={`border p-2 rounded-md w-full text-sm outline-blue-500 disabled:bg-gray-100 ${className}`}
          value={value}
          aria-required={required}
          aria-invalid={!!error}
          onChange={(e) => {
            const val = e.target.value;
            onSelectChange?.(name, val);
          }}
        >
          <option value="">{placeholder || "Select an option"}</option>

          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="flex flex-col gap-1 w-full">
        {renderLabel()}

        <textarea
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={`border p-2 rounded-md w-full text-sm outline-blue-500 resize-none disabled:bg-gray-100 ${className}`}
          value={value}
          aria-required={required}
          aria-invalid={!!error}
          onChange={(e) => emitChange(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {renderLabel()}

      <div className="relative w-full">
        <input
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          className={`border p-2 rounded-md w-full text-sm outline-blue-500 disabled:bg-gray-100 ${className}`}
          value={value}
          aria-required={required}
          aria-invalid={!!error}
          onChange={(e) => {
            const val = e.target.value;

            if (type === "number") return handleNumber(val);
            emitChange(val);
          }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
