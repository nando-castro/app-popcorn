

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, subtitle }: EmptyStateProps) {
return (
<div className="p-6 text-center bg-white rounded-2xl border">
<Icon className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
<div className="font-medium">{title}</div>
<div className="text-sm text-neutral-500">{subtitle}</div>
</div>
)
}