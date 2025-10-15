import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        className="block w-full rounded-md border-0 bg-white py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
