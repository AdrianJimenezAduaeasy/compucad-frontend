import CardMenu from "../../../components/CardMenu/CardMenu";

export default function Dashboard() {
  const modulos = [
    { modulo: "Procesos", img: "/img/procesos.png", rute:"/Procesos"},
  ];

  return (
    <>
    <h1 className="text-4xl  dark:text-white">Menu principal</h1>
    <div className="flex flex-wrap justify-center md:justify-start">
      {modulos.map((modulo, index) => (
        <CardMenu key={index} title={modulo.modulo} img={modulo.img} rute={modulo.rute}/>
      ))}
    </div>
    </>
  );
}
