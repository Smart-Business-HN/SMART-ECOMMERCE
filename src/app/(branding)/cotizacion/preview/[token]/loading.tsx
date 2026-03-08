export default function QuotationPreviewLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto animate-pulse">
        {/* Status banner skeleton */}
        <div className="rounded-t-lg px-6 py-3 bg-gray-100 border border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-40" />
        </div>

        <div className="bg-white shadow-sm border border-t-0 border-gray-200 rounded-b-lg">
          {/* Header skeleton */}
          <div className="p-6 border-b border-gray-100">
            <div className="h-8 bg-gray-200 rounded w-72 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-44" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>
          </div>

          {/* Customer skeleton */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-64 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-48" />
          </div>

          {/* Table skeleton */}
          <div className="p-6 space-y-3">
            <div className="h-10 bg-gray-200 rounded w-full" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-100 rounded w-full" />
            ))}
          </div>

          {/* Summary skeleton */}
          <div className="px-6 pb-6 flex justify-end">
            <div className="w-72 space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
