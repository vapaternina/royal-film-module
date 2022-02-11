const OPTIONS = {
  CLASSIFICATIONS: [
    { value: 0, label: "Todo público" },
    { value: 1, label: "+12 años" },
    { value: 2, label: "+14 años" },
    { value: 3, label: "+16 años" },
    { value: 4, label: "+18 años" },
  ],
  LANGUAGES: [
    { value: "espanol", label: "Español" },
    { value: "ingles", label: "Inglés" },
    { value: "portugues", label: "Portugués" },
    { value: "frances", label: "Francés" },
    { value: "aleman", label: "Alemán" },
    { value: "italiano", label: "Italiano" },
    { value: "japones", label: "Japonés" },
    { value: "coreano", label: "Coreano" },
    { value: "holandes", label: "Holandés" },
    { value: "chino", label: "Chino" },
    { value: "ruso", label: "Ruso" },
    { value: "otro", label: "Otro" },
  ],
};

const SEVERITIES = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

exports.SEVERITIES = SEVERITIES;

exports.OPTIONS = OPTIONS;
