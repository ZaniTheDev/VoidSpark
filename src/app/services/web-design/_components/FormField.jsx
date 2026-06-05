export function FormField({ icon, label, hint, optional, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="text-black/40">{icon}</span>
        <span className="text-sm font-medium text-black">{label}</span>
        {optional && (
          <span className="text-[10px] text-black/30 ml-1">(opsional)</span>
        )}
      </div>
      {hint && <p className="text-xs text-black/40 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}
