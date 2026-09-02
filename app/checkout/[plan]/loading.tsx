export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-warm-white pt-20">
      <div className="max-w-2xl mx-auto px-5 py-12 lg:py-20">
        <div className="h-5 w-28 rounded bg-sage/20 animate-pulse mb-8" />
        <div className="bg-ivory rounded-3xl p-8 lg:p-10 border border-sage/30 animate-pulse">
          <div className="h-3 w-20 rounded bg-sage/30 mb-5" />
          <div className="h-10 w-72 max-w-full rounded bg-sage/20 mb-4" />
          <div className="h-4 w-64 max-w-full rounded bg-sage/20 mb-8" />
          <div className="h-14 w-full rounded-full bg-sage/25" />
        </div>
      </div>
    </div>
  );
}