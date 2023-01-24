module.exports= {
    catalog: async (req, res)=>{
        console.log(req.query)
        const refs=await req.storage.getAll(req.query);
      
        const ctx= {
            title: "Каталог",
            refs,
            search: req.query.search || ''
        }

        res.render('index',ctx);
    }
};