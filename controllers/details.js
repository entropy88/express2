module.exports={
    details: async (req, res)=>{
        const ref= await req.storage.getById(req.params.id);
        if (ref==undefined){
            res.redirect('/404')
        } else{
                      const ctx= {
                title: 'Подробности',
                ref
            }
      
        res.render('details', ctx);
        }
    }
};