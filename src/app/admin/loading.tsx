export default function AdminLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#0F62FE]" />
        </div>
        <p className="text-sm font-medium text-[#6B7280] font-sans">
          Loading...
        </p>
      </div>
    </div>
  );
}
