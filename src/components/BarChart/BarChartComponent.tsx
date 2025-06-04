import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string; // Nombre de la categoría (eje X)
  value: number; // Valor asociado (eje Y)
}

interface BarChartComponentProps {
  tittle: string;
  chartData: ChartData[];
}

function BarChartComponent({tittle, chartData }: BarChartComponentProps) {
  return (
    <div className="bg-gray-100 w-86 h-64 rounded-lg m-5 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:bg-gray-800">
      <h2 className="text-center text-2xl h-auto w-auto text-black dark:text-white ">
        {tittle}
      </h2>
    <ResponsiveContainer width="95%" height={250}>
      <BarChart data={chartData} margin={{ top: 1, right: 5, left: 0, bottom: 15 }}>
        <XAxis dataKey="name" fontSize={10}/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="aqua" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
