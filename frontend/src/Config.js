// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  siteAvailability: "public",
  samplesEndpoint: "/samples",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

module.exports = {
  settings: settings
};
