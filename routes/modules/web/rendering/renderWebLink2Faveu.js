var {assignRandomOrder2Competitors} = require('./../../../modules/general/assignRandomOrder2Competitors');

function renderWebLink2Faveu(req, res, doc) {

    var renderingVariable = assignRandomOrder2Competitors(doc);
    var renderingLink = 'email_landing' + (doc.numofcompetitors + 1) + '.hbs';

    res.header('Content-Type', 'text/html');
    res.render(renderingLink, renderingVariable, (err, html) => {
        if (!err) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
}

module.exports = {renderWebLink2Faveu};
