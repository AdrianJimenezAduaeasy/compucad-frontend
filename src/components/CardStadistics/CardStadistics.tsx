import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CardProps {
  title: string;
  chartData?: { name: string; value: number }[]; // chartData es opcional
}

function CardStadistics({ title, chartData = [] }: CardProps) { // Valor predeterminado
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-gray-100 w-54 h-64 rounded-lg m-5 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:bg-gray-800">
      <h2 className="text-center text-2xl text-black dark:text-white mt-2">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="90%"
            fill="#8884d8"
            label
            animationDuration={500}
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', border: 'none' }}
            cursor={{ fill: 'transparent' }} // Ocultar el cursor de relleno
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CardStadistics;
