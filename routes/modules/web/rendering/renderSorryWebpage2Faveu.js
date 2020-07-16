
function renderSorryWebpage2Faveu(req, res, doc) {
    res.header('Content-Type', 'text/html');
    res.render('sorry_landing.hbs', {'invitecard': doc.invitecard}, (err2, html) => {
        if (!err2) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
}

module.exports = {renderSorryWebpage2Faveu}
