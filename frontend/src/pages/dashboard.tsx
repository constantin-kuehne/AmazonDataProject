import React from "react";
import { BarChart } from "../components/graphs/BarChart";
import { LineChart } from "../components/graphs/LineChart";
import { ScatterPlot } from "../components/graphs/ScatterPlot1";
import { ScatterPlotTwo } from "../components/graphs/ScatterPlot2";
import { Source as SearchProductSource } from "../components/searchbar";
import "./dashboard.css"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  return (
    <div>
      <h4> Top 20 most voted reviews </h4>
        <p className="dash-descriptions"> In diesem Bar Chart werden die Top 20 der meistbewerteten Reviews gezeigt. Die Balken sind nach der Anzahl an total Votes sortiert - der Anteil der helpful Votes wird durch eine andere Sättigung der Farbe hervorgehoben. </p>
        <p className="dash-descriptions"> Dieser Chart gibt einen Überblick über die besten Reviews und wie hilfreich sie waren. Je höher die Anzahl der Bewertungen, desto geringer ist die Wahrscheinlichkeit, dass es sich um ein gefälschtes Review handelt.</p>
        <p className="dash-legend"> Legende: <FiberManualRecordIcon className="legendicon" sx={{m: -0.8}}/> Amount of helpful-Votes  <FiberManualRecordIcon className="legendicontwo" sx={{m: -0.5}}/> Amount of Votes </p>

      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />

      <h4> Number of reviews per month</h4>
        <p className="dash-descriptions">Dieser Line Graph zeigt die pro Monat geschriebenen Reviews über den Verlauf der Zeit. Die Zeitachse beginnt in dem Monat, in dem das erste Review geschrieben wurde, meist der Monat, in dem das Produkt auf den Markt kam.  </p>
        <p className="dash-descriptions">Durch starkes Ansteigen oder Absinken der Anzahl an Reviews lassen sich Trends erkennen. Beispielsweise, ob ein Produkt gerade beliebt ist oder ob es ein Ersatzprodukt gibt. </p>
      <LineChart
        searchedProduct={searchedProduct}
        datetype={"MONTH"}
        width={1000}
        height={500}
      />
      <h4> Amount of helpful votes</h4>
        <p className="dash-descriptions">Hier werden die Qualität der Reviews dargestellt. Auf der x-Achse wird der prozentuale Anteil der helpful Votes an den total Votes, auf der y-Achse wird wieder die Anzahl an Reviews gezeigt. </p>
        <p className="dash-descriptions">Das gesuchte Produkt wird auch hier durch einen orangen Punkt gekennzeichnet. Die anderen Punkte, die der Scatter plot darstellt, sind wieder die 100 ähnlichsten Produkte derselben Kategorie. </p>
      <ScatterPlot
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
      />
      <h4> Star-rating & amount of reviews  </h4>
        <p className="dash-descriptions">Dieser Scatter Plot zeigt auf der x-Achse die durchschnittliche Anzahl an Sternebewertungen (0-5). Auf der y-Achse wird angezeigt, wie viele Reviews das Produkt insgesamt hat.  </p>
        <p className="dash-descriptions">Das gesuchte Produkt wird durch einen orangen Punkt gekennzeichnet. Die anderen Punkte, sind die 100 ähnlichsten Produkte derselben Kategorie.  </p>
        <p className="dash-descriptions">Die Position des gesuchten Produktes (orange) soll die Beliebtheit des Produktes widerspiegeln. Je weiter oben rechts in der Ecke sich das Produkt befindet, desto beliebter ist es bei anderen Kunden. </p>
      <ScatterPlotTwo
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
      />
    </div>
  );
};
