import React from "react";

export default function About(){
    return(
      <div>
      <h4>Bar chart </h4>
      <br/>
          <ul>
              <li>Top 20 Reviews des gesuchten Produktes mit den meisten Bewertungen.  </li>
              <li>In diesem Bar Chart werden die Top 20 der meistbewerteten Reviews gezeigt. Die Balken sind nach der Anzahl an total Votes sortiert - der Anteil der helpful Votes wird durch eine andere Sättigung der Farbe hervorgehoben</li>
              <li>Dieser Chart soll dem User eine Übersicht über die besten Reviews geben, wie hilfreich sie waren oder auch nicht. Umso mehr positive Bewertungen ein Review hat, desto mehr kann man davon ausgehen, dass es sich nicht um ein gefälschtes Review handelt.  </li>

          </ul>
      </div>

    );



}
