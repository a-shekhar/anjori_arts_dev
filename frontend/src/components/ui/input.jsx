export function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...props}
      />
    </div>
  );
}
