export function Button({ children, variant = "primary", ...props }) {
  const base = "rounded-lg px-4 py-2 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  };
  return <button className={`${base} ${variants[variant]}`} {...props}>{children}</button>;
}
