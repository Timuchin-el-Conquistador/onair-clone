"use client";

import "@/styles/spinner/pulse.scss";

function CardSkeletonPulse() {
  return (
    <div className="index-card item-overflow-visible relative skeleton-wrapper">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
}
function TableSkeletonPulse() {
  return (
    <>
      <div className="mt-4 mb-12 mx-0 sm:mx-0 sm:hidden">
        <ul className="rounded-lg mt-2 divide-y divide-gray-200 overflow-hidden shadow">
          <div className="block px-4 py-4 bg-white hover:bg-gray-50">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
        </ul>
      </div>
      <div id="sessions" className="mb-6 mx-0 sm:mx-0 hidden sm:block">
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <td>Visitor</td>
                <td>Duration</td>
                <td className="hidden lg:table-cell">Link</td>
                <td className="hidden lg:table-cell">Since</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="truncate">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
                <td className="truncate">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
                <td className="hidden lg:table-cell truncate">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
                <td className="hidden lg:table-cell truncate">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
                <td className="text-left truncate">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
                <td>
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export { CardSkeletonPulse, TableSkeletonPulse };
