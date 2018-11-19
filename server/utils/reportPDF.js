const _ = require('lodash');
const jsreport = require('jsreport');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {
  setupReportPDF: (app) => {
    app.get("/pdf/summary/", function(req, res) {
      fs.readFile(path.join(__dirname, 'pdfTemplate.html'), 'utf8', function(err, data) {
        jsreport.render({
            template: {
                content: data,
                recipe: "phantom-pdf",
                engine: "handlebars",
                phantom: {
                  customPhantomJS: true
                }
            },
            data: {
              search: JSON.parse(req.query.q),
              trials: JSON.parse(req.query.data)
            }
        }).then(function(out) {
          var filename = 'ClinicalSummaryReport.pdf';
          res.setHeader('Content-Disposition', 'attachment; filename="'+filename+'"');
        	res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-type', 'application/pdf');
          out.stream.pipe(res);
        }).catch(function(err) {
          res.end(err.message);
        });
      });
    });
  }
}
