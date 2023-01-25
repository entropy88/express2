module.exports={
    create: (req,res)=>{
        res.render('create',{title:'Добави справка'});
    },
    post: async (req,res)=>{

        const d = new Date();
        let year = d.getFullYear();
    
        const ref={
            year:year,
            title:req.body.title,
            languages:req.body.languages,
            worker:req.body.worker,
            refType:req.body.refType,
            contentUrl:req.body.contentUrl,
            recipient:req.body.recipient,
            classification:req.body.classification,
            refStatus: req.body.refStatus
        }
        
        await req.storage.create(ref);
        res.redirect('/')
    }
};