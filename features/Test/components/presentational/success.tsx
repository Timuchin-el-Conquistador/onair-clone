import Image from "next/image";

import LinkBtn from "@/components/Buttons/link";

import Done from '@/public/Done.png'

function ResultsView({score}: {score:number}) {
  return (
    <div className="results flex flex-col justify-center items-center">
      <div className="flex flex-col justify-around items-center">
      <div className="flex flex-col justify-center items-center gap-3">
      <Image src={Done} alt=''/>
      <h1>Congrulations</h1>
      <p>Your score is {score}%</p>
      </div>



      </div>
      <div className="h-fit">
      <LinkBtn label="More tests" url="/home" />
      </div>
    </div>
  );
}



export default ResultsView