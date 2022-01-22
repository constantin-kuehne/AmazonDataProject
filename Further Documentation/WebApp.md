# Technical Details about ADP Search

###Infos
* React
  * webapp written in Typescript, HTML, CSS & D3.js
* MUI
  * Styling, Theming & Components
* Express Server 
  * handling various queries through APIs on the Elastic Database
* Data Visualization with D3.js
  * implemented in a dashboard (MUI Component Box, Div, Card, etc.)
* Elastic
  * Elastic database & Kibana Dashboard
### Structure
* Backend
  * elastic queries
  * routes
  * .env - Elastic Credentials
* Frontend
  * components
    * graphs -> D3 Visualizations
    * Appbar
    * Footer
    * Searchbar
    * Searchoptions 
  * pages
    * about
    * dashboard
  * App File
  * Index File
* Further Documentation
* Official Readme

We used different ways to apply styles to our webapp:
* CSS -> seperate css files for every section (about, dashboard) mixed with MUI style props
* MUI MakeStyles -> used in tsx files to apply styles directly to a MUI component
### Backend
#### Data & Data Handling
* Elastic 
#### Server
* Express Server 
#### APIs

/:ASIN

/:ASIN/number-reviews/:DATETYPE

/:ASIN/number-reviews

// star bar
/:ASIN/star-rating

/:ASIN/total-votes

/:ASIN/helpful-votes

// scatter plot
/:ASIN/info

// bar chart helpful votes total votes review headline
/:ASIN/reviews-votes

// same as one up but more info
/:ASIN/reviews

// scatter plot
/:ASIN/votes-similar-products

###
### Frontend
* React written in Typescript
#### MUI
* Material UI Themes, Components, Icons & Animation
#### Components
* Appbar
* Searchbar
* Pages (Dashboard, About)
* Animations

#### D3 Implementation
* Transscripting tsx to jsx
* Implementing Charts into a div using a D3 Wrapper


#### Libraries
* MUI( Styles,Themes,Icons,...)
* D3 (Scope, Geo, Bar,...)
* React (React-Dom,...)
