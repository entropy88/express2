module.exports={
    report: async (req, res)=>{
        const refs=await req.storage.getAll(req.query);
        const refsCount=refs.length;
 
    const clasif={
       "0. Общ отдел":0,
       "1. Философия":0,
       "2. Религия":0,
       "3. Обществени науки":0,
       "5. Математика. Естествени науки":0,
       "61. Медицина":0,
       "62. Техника":0,
       "63. Селско стопанство":0,
       "64-69. Промишленост":0,
       "7. Изкуство":0,
       "793-799. Спорт":0,
       "80. Езикознание":0,
       "82. Литературознание":0,       
       "9. История":0,
       "91. География. Пътешествия":0
    }

    const rowClass=Object.keys(clasif);

    rowClass.forEach(cl=>{
 
        refs.forEach(r=>{
            if(r.classification==cl){
                clasif[cl]++;
            }
        })
    })

    

        const ctx= {
            title: "Отчет",          
            clasif,           
            refsCount            
        }

        res.render('report',ctx);
    }
}