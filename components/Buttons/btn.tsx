import '@/styles/Buttons/submit.scss'



function Button({label,type, click}: {label:string,type:'button' | 'submit', click:()=> void}){


    return (
        <div className="btn" onClick={click}>
            <button type={type}>{label}</button>
        </div>
    )
}



export default Button