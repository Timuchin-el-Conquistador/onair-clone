
import Layout from '@/components/layouts/Layout';
import '@/styles/integrations/mobile.scss'

function MobileIntegration() {
  return (
    <Layout page="integrations">
    <div className="p-6">
      <div className="bg-white p-6">
        <div className="">
          <div className="mb-6 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <h3 className="text-2xl text-gray-900 pb-4">
                Mobile<span className="text-gray-400 ml-2"></span>
              </h3>
            </div>
          </div>
        </div>

        <div className="mb-12 grid max-w-4xl md:grid-cols-6 md:gap-4 md:px-12">
          <div className="text-center">
            <img
              src="/external-logos/mobile.svg"
              className="w-32 mb-4 md:mb-0"
            />
          </div>

          <div className="col-span-5 md:px-4 leading-6">
            <div id="mobile-view" className="w-xl md:ml-12">
              <div>
                <p className="mb-12">
                  Download the app to receive calls on your phone,
                  <a href="/ios" className="cursor-pointer">
                    iPhone
                  </a>{" "}
                  or
                  <a href="/android" className="cursor-pointer">
                    Android
                  </a>
                </p>
              </div>{" "}
            </div>
          </div>
        </div>

        <form
          id="integration-toolbar"
          method="post"
          action=""
          className="bg-white grid grid-cols-2 mt-24"
        >
          <div className="text-left" style={{ display: "none" }}>
            <button
              disabled
              className="btn btn-red text-lg inline-block cursor-not-allowed"
            >
              Delete
            </button>
          </div>{" "}
          <div className="text-right" style={{ display: "none" }}>
            <button className="btn btn-blue text-lg inline-block">Save</button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
    
  );
}

export default MobileIntegration;
