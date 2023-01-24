module.exports = {
    async edit(req, res) {
        const ref = await req.storage.getById(req.params.id);

        if (!ref) {
            res.redirect('404');
        } else {
            const ctx = {
                title: 'Редактирай справка',
                ref
            }
            res.render('edit', ctx);
        };

    },
    async post(req, res) {
        const ref = {
            title: req.body.title,
            languages: req.body.languages,
            worker: req.body.worker,
            refType: req.body.refType,
            contentUrl: req.body.contentUrl,
            recipient: req.body.recipient,
            classification: req.body.classification,
            refStatus: req.body.refStatus
        };
        try {
            console.log(ref);          
           await req.storage.edit(req.params.id, ref);
            res.redirect('/');

        } catch (err) {
            console.log(err+ "from edit.js line 33")
            res.redirect('/404');
        }
    }

  
};