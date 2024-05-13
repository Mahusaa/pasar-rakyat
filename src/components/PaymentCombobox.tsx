import React, { useState } from 'react';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { Framework } from "../interface/Framework";

interface Props {
  className?: string;
  onSelect: (selectedValue: string) => void; 
}

const frameworks : Framework[]= [
  { value: 'Cash', label: 'Cash' },
  { value: 'QRIS', label: 'QRIS' },
  { value: 'Transfer', label: 'Transfer' },
];

const PaymentCombobox: React.FC<Props> = ({className, onSelect}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className="ml-10 w-[150px] justify-between  border border-gray-300 rounded-lg focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        {value ? frameworks.find((framework) => framework.value === value)?.label : 'Metode'}
        <CaretSortIcon className="ml-2 h-4 w-4 opacity-50" />
      </Button>
      {open && (
        <div className="absolute ml-10 bottom-full left-0 z-10 w-[150px] bg-white border border-gray-300 rounded-t-md shadow-lg mb-1">
          {frameworks.map((framework) => (
            <div
              key={framework.value}
              className='relative flex items-center rounded-lg px-2 py-1.5 text-sm outline-none cursor-pointer transition-colors duration-300 text-black hover:bg-gray-100 hover:mx-px'
              onClick={() => handleSelect(framework.value)}
            >
              <span>{framework.label}</span>
              {value === framework.value && <CheckIcon className="ml-auto h-4 w-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentCombobox;