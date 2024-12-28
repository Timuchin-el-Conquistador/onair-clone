"use client";
function Modal({
  submitLabel,
  cancelBtnLabel,
  closeModal,
  submit,
  modalHeader,
  display,
  children,
}: {
  submitLabel: string;
  cancelBtnLabel: string;
  closeModal: () => void;
  submit: () => void;
  modalHeader: string;
  display: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0	right-0 left-0 z-101 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-dvh	bg-black bg-opacity-50  ${
        display || "hidden"
      }`}
    >
      {/* modal -->*/}
      <div className="relative p-4 w-full max-w-2xl h-full flex flex-col justify-center">
        {/* modal content-->*/}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* modal header-->*/}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modalHeader}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* modal body-->*/}
          <div className="p-4 md:p-5 space-y-4">{children}</div>

          {/*Main footer -->*/}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={submit}
            >
              {submitLabel}
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-slate-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeModal}
            >
              {cancelBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
