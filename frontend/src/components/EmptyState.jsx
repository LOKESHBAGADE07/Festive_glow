export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div data-testid="empty-state" className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-white px-8 py-16 text-center">
      {Icon && (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Icon size={24} className="text-ink-soft" />
        </span>
      )}
      <div>
        <h3 className="font-serif text-xl text-ink">{title}</h3>
        {description && <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  );
}
