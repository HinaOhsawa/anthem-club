import Flag from "react-world-flags";
import country from "../data/country.json";
import type { Question } from "../types/questions";

const regionOrder = [
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
];

// regionごとに国をグループ化するヘルパー関数
const groupByRegion = (countries: Question[]) => {
  return countries.reduce<Record<string, Question[]>>((acc, curr) => {
    if (!acc[curr.region]) acc[curr.region] = [];
    acc[curr.region].push(curr);
    return acc;
  }, {});
};

export default function CountryList() {
  const grouped = groupByRegion(country);

  return (
    <div className="mx-auto py-4">
      <p className="text-lg font-bold">
        以下{country.length}カ国の中から出題されます
      </p>
      {regionOrder.map((region) => {
        const countries = grouped[region];
        if (!countries) return null; // その地域に国がなければスキップ

        return (
          <section key={region} className="mb-6">
            <h2 className="text-xl text-left font-semibold mb-2">{region}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {countries.map((item: Question) => (
                <div
                  key={item.code}
                  className="p-3 bg-orange-100 rounded text-center"
                >
                  <p className="text-sm font-bold mb-2">{item.display_name}</p>
                  <Flag className="m-auto h-20 shadow-md" code={item.code} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
