function Input({ type, value, placeholder, onChange, ...rest }) {
  return (
    <input
      className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
