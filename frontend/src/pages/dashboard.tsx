import React, { useState } from "react";
import { BarChart } from "../components/graphs/BarChart";
import { LineChart } from "../components/graphs/LineChart";
import { ScatterPlot } from "../components/graphs/ScatterPlot1";
import { ScatterPlotTwo } from "../components/graphs/ScatterPlot2";
import { Source as SearchProductSource } from "../components/searchbar";
import "./dashboard.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { Card, CardContent, Paper, Slider } from "@mui/material";

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  const [sizeScatterPlot1, setSizeScatterPlot1] = useState<number>(100);

  const [sizeScatterPlot2, setSizeScatterPlot2] = useState<number>(100);
  return (
    //All Charts + Descriptions and Legends

    <div>
      <h4> Top 20 most voted reviews </h4>
      <p className="dash-descriptions">
        In diesem Bar Chart werden die Top 20 der meistbewerteten Reviews
        gezeigt. Die Balken sind nach der Anzahl an total Votes sortiert - der
        Anteil der helpful Votes wird durch eine andere Sättigung der Farbe
        hervorgehoben.
      </p>
      <p className="dash-descriptions">
        Dieser Chart gibt einen Überblick über die besten Reviews und wie
        hilfreich sie waren. Je höher die Anzahl der Bewertungen, desto geringer
        ist die Wahrscheinlichkeit, dass es sich um ein gefälschtes Review
        handelt.
      </p>
      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />
      <Card
        variant={"outlined"}
        sx={{ width: 300, height: 150, mx: 75, border: "2px solid #0288d1" }}
        className="legendbox"
      >
        <CardContent className="legendcard">
          <p className="dash-legend">Legende:</p>
          <p className="legendcontent">
            {" "}
            <CropSquareIcon className="legendicon" sx={{ m: -0.8 }} /> Amount of
            helpful votes.
          </p>
          <p className="legendcontent">
            {" "}
            <CropSquareIcon className="legendicontwo" sx={{ m: -0.55 }} />{" "}
            Amount of total votes.
          </p>
        </CardContent>
      </Card>
      <h4> Number of reviews per month</h4>
      <p className="dash-descriptions">
        Dieser Line Graph zeigt die pro Monat geschriebenen Reviews über den
        Verlauf der Zeit. Die Zeitachse beginnt in dem Monat, in dem das erste
        Review geschrieben wurde, meist der Monat, in dem das Produkt auf den
        Markt kam.{" "}
      </p>
      <p className="dash-descriptions">
        Durch starkes Ansteigen oder Absinken der Anzahl an Reviews lassen sich
        Trends erkennen. Beispielsweise, ob ein Produkt gerade beliebt ist oder
        ob es ein Ersatzprodukt gibt.{" "}
      </p>
      <LineChart
        searchedProduct={searchedProduct}
        datetype={"MONTH"}
        width={1000}
        height={500}
      />
      <h4> Amount of helpful votes</h4>
      <p className="dash-descriptions">
        Hier werden die Qualität der Reviews dargestellt. Auf der x-Achse wird
        der prozentuale Anteil der helpful Votes an den total Votes, auf der
        y-Achse wird wieder die Anzahl an Reviews gezeigt.{" "}
      </p>
      <p className="dash-descriptions">
        Das gesuchte Produkt wird auch hier durch einen orangen Punkt
        gekennzeichnet. Die anderen Punkte, die der Scatter plot darstellt, sind
        wieder die 100 ähnlichsten Produkte derselben Kategorie.{" "}
      </p>
      <br />
      <p className="dash-descriptions">Amount of similar products</p>
      <Slider
        aria-label="size"
        defaultValue={100}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={200}
        sx={{ width: "50vw" }}
        onChange={(event: Event, newValue: number | number[]) =>
          setSizeScatterPlot1(newValue as number)
        }
      />
      <ScatterPlot
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
        size={sizeScatterPlot1}
      />
      <h4> Star-rating & amount of reviews </h4>
      <p className="dash-descriptions">
        Dieser Scatter Plot zeigt auf der x-Achse die durchschnittliche Anzahl
        an Sternebewertungen (0-5). Auf der y-Achse wird angezeigt, wie viele
        Reviews das Produkt insgesamt hat.{" "}
      </p>
      <p className="dash-descriptions">
        Das gesuchte Produkt wird durch einen orangen Punkt gekennzeichnet. Die
        anderen Punkte, sind die 100 ähnlichsten Produkte derselben Kategorie.{" "}
      </p>
      <p className="dash-descriptions">
        Die Position des gesuchten Produktes (orange) soll die Beliebtheit des
        Produktes widerspiegeln. Je weiter oben rechts in der Ecke sich das
        Produkt befindet, desto beliebter ist es bei anderen Kunden.{" "}
      </p>
      <br />
      <p className="dash-descriptions">Amount of similar products</p>
      <Slider
        aria-label="size"
        defaultValue={100}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={200}
        sx={{ width: "50vw" }}
        onChange={(event: Event, newValue: number | number[]) =>
          setSizeScatterPlot2(newValue as number)
        }
      />
      <ScatterPlotTwo
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
        size={sizeScatterPlot2}
      />
    </div>
  );
};
