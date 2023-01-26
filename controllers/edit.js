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
        //   <option value="0. Общ отдел">0. Общ отдел</option>
        //     <option value="1. Философия">1. Философия</option>
        //     <option value="2. Религия">2. Религия</option>
        //     <option value="3. Обществени науки">3. Обществени науки</option>
        //     <option value="5. Математика. Естествени науки">5. Математика. Естествени науки</option>
        //     <option value="61. Медицина">61. Медицина</option>
        //     <option value="62. Техника">62. Техника</option>
        //     <option value="63. Селско стопанство">63. Селско стопанство</option>
        //     <option value="64-69. Промишленост">64-69. Промишленост</option>
        //     <option value="793-799. Спорт">793-799. Спорт</option>
        //     <option value="7. Изкуство">7. Изкуство</option>
        //     <option value="80. Езикознание">80. Езикознание</option>
        //     <option value="82. Литературознание">82. Литературознание</option>
        //     <option value="9. История">9. История</option>
        //     <option value="91. География. Пътешествия">91. География. Пътешествия</option>

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




        if (!ref) {
            res.redirect('404');
        } else {
            const ctx = {
                title: 'Редактирай справка',
                ref,
                selectedRefType,
                selectedClassif
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