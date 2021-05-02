export default Object.freeze({
  WEATHER: {
    id: 1,
    api: "http://api.weatherstack.com/current?access_key=8a3910f661c45e015711823eb5df116a",
    paramName: "query",
    information: {
      componentName: "Weather",
      configurable: true,
      materialIcon: "thermostat",
      title: "Météo",
    }
  },
  PICTURES: {
    id: 2,
    api: "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c961240fea7a5205c865fd44e0152af",
    paramName: "text",
    information: {
      componentName: "Pictures",
      configurable: true,
      materialIcon: "image",
      title: "Images"
    }
  },
  NEWS: {
    id: 3,
    api: "https://newsapi.org/v2/everything?apiKey=d8567e8a076140a08c7ee9d4a2d459fa",
    paramName: "q",
    information: {
      componentName: "News",
      configurable: true,
      materialIcon: "article",
      title: "News"
    }
  },
  MICHEL_BILLAUD_TWITTER: {
    id: 4,
    information: {
      componentName: "MichelBillaudTwitter",
      configurable: false,
      materialIcon: "person",
      title: "@MichelBillaud"
    }
  },
  CLOCK: {
    id: 5,
    information: {
      componentName: "Clock",
      configurable: false,
      materialIcon: "schedule",
      title: "Date/Heure"
    }
  }
});