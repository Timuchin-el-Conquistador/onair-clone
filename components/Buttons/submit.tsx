import '@/styles/Buttons/submit.scss'



function SubmitBtn({label}: {label:string}){


    return (
        <div className="btn">
            <button type="submit">{label}</button>
        </div>
    )
}



export default SubmitBtn