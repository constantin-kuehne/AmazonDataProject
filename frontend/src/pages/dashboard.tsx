import React, { useState } from "react";
import { BarChart } from "../components/graphs/BarChart";
import { LineChart } from "../components/graphs/LineChart";
import { ScatterPlot } from "../components/graphs/ScatterPlot1";
import { ScatterPlotTwo } from "../components/graphs/ScatterPlot2";
import { Stars } from "../components/graphs/StarGraph";
import { Source as SearchProductSource } from "../components/searchbar";
import "./dashboard.css";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { Card, CardContent, Slider } from "@mui/material";

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
      <Stars searchedProduct={searchedProduct} width={1000} height={60} />
      <h4> Top 20 most voted reviews </h4>
      <p className="dash-descriptions">
        In diesem Bar Chart werden die Top 20 Reviews des gesuchten Produktes
        gezeigt. Die Balken sind nach der Anzahl an total Votes sortiert - der
        Anteil der helpful Votes wird durch eine blaue Einfärbung des Balkens
        hervorgehoben.
      </p>
      <p className="dash-descriptions">
        Dieser Chart gibt einen Überblick über die besten Reviews und wie
        hilfreich sie waren. Sie können anhand des Graphen erkennen, welche die
        entscheidenden Kommentare zu dem gesuchten Produkt sind.
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
            <CropSquareIcon className="legendicon" sx={{ m: -0.8 }} /> Amount of
            helpful votes.
          </p>
          <p className="legendcontent">
            <CropSquareIcon className="legendicontwo" sx={{ m: -0.55 }} />{" "}
            Amount of total votes.
          </p>
        </CardContent>
      </Card>
      <h4> Number of new reviews per month</h4>
      <p className="dash-descriptions">
        Dieser Line Graph zeigt die geschriebenen Reviews pro Monat.
      </p>
      <p className="dash-descriptions">
        Durch starkes Ansteigen oder Absinken der Anzahl an Reviews lassen sich
        Trends erkennen. Beispielsweise, ob ein Produkt gerade beliebt ist oder
        es ein Ersatzprodukt gibt.
      </p>
      <LineChart
        searchedProduct={searchedProduct}
        datetype={"MONTH"}
        width={1000}
        height={500}
      />
      <h4> Quality of reviews</h4>
      <p className="dash-descriptions">
        Hier wird die Qualität der Reviews dargestellt.
      </p>
      <p className="dash-descriptions">
        Hier können Sie schnell die Qualität der Kommentare des gesuchten
        Produktes mit ähnlichen Produkten vergleichen und so auch einen Schluss
        über die Glaubhaftigkeit der Kommentare treffen.
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
      <h4> Quality of the product </h4>
      <p className="dash-descriptions">
        Die Position des gesuchten Produktes soll dem User die Qualität und
        Beliebtheit des Produktes widerspiegeln
      </p>
      <p className="dash-descriptions">
        Die Position des gesuchten Produktes (orange) soll die Beliebtheit des
        Produktes widerspiegeln. Je weiter oben rechts in der Ecke sich das
        Produkt befindet, desto beliebter ist es bei anderen Kunden.
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
