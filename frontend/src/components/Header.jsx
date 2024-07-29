import Logo1 from '../assets/logo1.png';
import Logo2 from '../assets/logo2.png';

export default function Header() {
  return (
    <div className="flex justify-center border-b-5 border-emerald-700 items-center w-full ">
      <div className="flex justify-between items-center w-3/4 max-w-5xl ">
        <img src={Logo1} alt="Amenbank Logo" className="w-auto h-16  " />
        <h2 className="font-mono text-3xl text-center text-emerald-700 ">
          Le   Partenaire  de votre  Succès  
        </h2>
        <img src={Logo2} alt="Amenbank Logo" className=" " />
      </div>
    </div>
  );
}
