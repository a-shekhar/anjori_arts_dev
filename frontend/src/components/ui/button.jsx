export function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    outline: "border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
