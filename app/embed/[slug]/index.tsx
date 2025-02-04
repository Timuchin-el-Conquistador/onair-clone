"use client";

import '@/styles/embed/index.scss'

type PageProps = {
  slug: string;
  domain: string;
};
function Embed(props: PageProps) {
  return (
    <div id="embedded-template" className="p-6">
      <div className="bg-white p-6">
        <div id="embed">
          <h3>Embed</h3>{" "}
          <div className="w-full sm:w-2/4 text-sm">
            Select an embedding type from below and follow the instructions to
            embed your link on your website or email. <u>Important</u>: if you
            change your link's address, you will need to update the embed code
            on your website or email.
          </div>{" "}
          <div id="controls">
            <select className="mt-2 h-8 !py-1 !leading-tight rounded-md items-center">
              <option value="widget">Website Widget</option>{" "}
              <option value="signature">Email Signature</option>
            </select>
          </div>{" "}
        {/*}  <div
            id="content-widget"
            className="content-container w-full sm:w-2/4 hidden"
          >
            <h3 className="mt-8">Preview</h3>{" "}
            <div className="text-sm">
              Appear on the bottom right corner of your website, expands on
              hover.
            </div>{" "}
            <div className="preview-bg">
              <iframe
                src="https://onair.io/embed/widget?slug=chinqiz&amp;color=%230056FF&amp;location=right"
                style={{ height: "60px" }}
              ></iframe>
            </div>{" "}
            <h3 className="mt-8">Instructions</h3>{" "}
            <div className="text-sm">
              Insert the code below in your website's HTML.
            </div>{" "}
            <textarea id="code" readOnly className="w-full">
              {" "}
              &lt;div id="onair-widget" data-slug="chinqiz" data-float="true"
              data-color="#0056FF" data-location="right"&gt;&lt;/div&gt;
              &lt;script src="https://onair.io/embeds/widget-v1.js"
              type="text/javascript"&gt;&lt;/script&gt;
            </textarea>
          </div>{" "}
          <div
            id="content-button"
            className="content-container mt-8 w-full sm:w-2/4 hidden"
          >
            TODO
          </div>{" "}*/}
          <div
            id="content-signature"
            className="content-container w-full sm:w-2/4"
          >
            <h3 className="mt-8">Preview</h3>{" "}
            <div className="text-sm">
              Image below dynamically changes depending on your online status.
            </div>{" "}
            <div className="preview-bg">
              <img src={props.domain + "/embed/email.png?slug=" + props.slug} />
            </div>{" "}
            <h3 className="mt-8">Instructions</h3>{" "}
            <div className="text-sm">
              Use the link below to insert the image into an email or document.
              In Gmail, select the 'Insert Photo' button, navigate to the 'Web
              Address' tab, and paste the link. Adjust image size according to
              your preferences.
            </div>{" "}
            <textarea id="code" readOnly className="w-full">
              {props.domain + "/embed/email.png?slug=" + props.slug}
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Embed;
