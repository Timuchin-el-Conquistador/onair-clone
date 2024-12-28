

import "@/styles/Inputs/checkbox.scss";

function Checkbox({ label, id }: { label: string; id: string }) {
  return (
    <div className="checkbox">
      <input type="checkbox" id={id} onChange={e =>{
        console.log(e.target.checked)
      }}/>      
      <div />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
