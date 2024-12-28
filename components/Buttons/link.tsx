import "@/styles/Buttons/link-btn.scss";

import Link from "next/link";

function LinkBtn({ url, label }: { url:string,label: string }) {
  return (
    <div className="btn">
      <Link href={url} className="w-full flex justify-center items-center ">{label}</Link>
    </div>
  );
}

export default LinkBtn;
