module.exports = {
    async edit(req, res) {
        const ref = await req.storage.getById(req.params.id);

        //to pass type selected value

        let selectedRefType = {
            bt: false,
            mt: false,
            phd: false,
            oth: false
        }

        //  "Бакалавърска дипломна работа", "Магистърска дипломна работа","Дисертация","Друго"


        switch (ref.refType) {
            case "Бакалавърска дипломна работа":
                selectedRefType.bt = true;
                break;
            case "Магистърска дипломна работа":
                selectedRefType.mt = true;
                break;
            case "Дисертация":
                selectedRefType.phd = true;
                break;
            case "Друго":
                selectedRefType.oth = true;
                break;
        }

        console.log('selected ref type: '+ selectedRefType.bt + selectedRefType.mt+ selectedRefType.phd + selectedRefType.oth)



        if (!ref) {
            res.redirect('404');
        } else {
            const ctx = {
                title: 'Редактирай справка',
                ref,
                selectedRefType
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
            console.log(err + "from edit.js line 33")
            res.redirect('/404');
        }
    }


};