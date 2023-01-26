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

        //pass classification
  
        let selectedClassif = {
            obsht: false,
            filos: false,
            relig: false,
            obshtestven: false,
            matem: false,
            medic: false,
            tehnik: false,
            promish: false,
            selsk:false,
            sport: false,
            izkust: false,
            ezikoz: false,
            literat: false,
            istor: false,
            geogr: false
        }

        switch (ref.classification) {
            case "0. Общ отдел":
                selectedClassif.obsht = true;
                break;
            case "1. Философия":
                selectedClassif.filos = true;
                break;
            case "2. Религия":
                selectedClassif.relig = true;
                break;
            case "3. Обществени науки":
                selectedClassif.obshtestven = true;
                break;
            case "5. Математика. Естествени науки":
                selectedClassif.matem = true;
                break;
            case "61. Медицина":
                selectedClassif.medik = true;
                break;
            case "62. Техника":
                selectedClassif.tehnik= true;
                break;
            case "63. Селско стопанство":
                selectedClassif.selsk= true;
                break;
            case "64-69. Промишленост":
                selectedClassif.promish = true;
                break;
            case "793-799. Спорт":
                selectedClassif.sport= true;
                break;
            case "7. Изкуство":
                selectedClassif.izkust = true;
                break;
            case "80. Езикознание":
                selectedClassif.ezikoz= true;
                break;
            case "82. Литературознание":
                selectedClassif.literat= true;
                break;
            case "9. История":
                selectedClassif.istor = true;
                break;
            case "91. География. Пътешествия":
                selectedClassif.geogr = true;
                break;
        }

        //pass refstatus
        let selectedStatus={
            prieta:false,
            izpylnena:false,
            vzeta:false
        }

        switch(ref.refStatus){
            case ("Приета"): selectedStatus.prieta=true; break;
            case ("Изпълнена"): selectedStatus.izpylnena=true; break;
            case ("Взета"): selectedStatus.vzeta=true; break;
        }



        if (!ref) {
            res.redirect('404');
        } else {
            const ctx = {
                title: 'Редактирай справка',
                ref,
                selectedRefType,
                selectedClassif,
                selectedStatus
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