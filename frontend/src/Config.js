// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  samplesEndpoint: "/samples",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

const layoutFormat = {
  Motif_Analysis: {
    layOut: [[0,1],[2]],
    plotSizes: {
      0:[600,500],
      2:[398,147],
    },
    plotTitles:{}
  },

  Motif_Analysis2: {
    layOut: [[0,1],[2, [3,4]]],
    plotSizes: {
      0:[600,500],
      2:[398,147],
    },
    plotTitles: {3:"Forward", 4:"Reverse"}
  },

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
