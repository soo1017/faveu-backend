function renderExpiredOrCompletedWebpage2Faveu() {
    res.header('Content-Type', 'text/html');
    res.render('expired_landing.hbs', {'invitecard': doc.invitecard}, (err, html) => {
        if (!err) {
            res.status(200).send(html);
        } else {
            res.status(400).send('Fail to render');
        }
    });
}

module.exports = {renderExpiredOrCompletedWebpage2Faveu}