import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export const Input = ({
  name,
  label,
  className,
  value,
  setValue,
  ...props
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-0.5">
        <input
          name={name}
          id={name}
          className={classNames(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            className,
          )}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          {...props}
        />
      </div>
    </div>
  );
};
