import "@/styles/page-header.scss";

function PageHeader({
  header,
  subheader,
}: {
  header: string;
  subheader: string;
}) {
  return (
    <div className="flex flex-col items-center page-header">
      <h1 className="page-header__header">{header}</h1>
      <p className="page-header__subheader">{subheader}</p>
    </div>
  );
}

export default PageHeader;
