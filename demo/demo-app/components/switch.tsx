import { Switch as SwitchHeadless } from '@headlessui/react';
import classNames from 'classnames';

interface SwitchProps {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export const Switch = ({ label, value, setValue }: SwitchProps) => {
  return (
    <SwitchHeadless.Group
      as="div"
      className="flex items-center justify-between mt-2"
    >
      <span className="flex flex-grow flex-col">
        <SwitchHeadless.Label
          as="span"
          className="text-sm font-medium leading-6 text-gray-900"
          passive
        >
          {label}
        </SwitchHeadless.Label>
      </span>
      <SwitchHeadless
        checked={value}
        onChange={setValue}
        className={classNames(
          value ? 'bg-black' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </SwitchHeadless>
    </SwitchHeadless.Group>
  );
};
