module.exports= {
    english: async (req, res)=>{
        console.log(req.query)
        const refs=await req.storage.getAll(req.query);
        const engRefs=[];

        refs.forEach(ref => {
            if(ref.languages.toLowerCase().includes("английски")){
                engRefs.push(ref)
            }
        });
        console.log(refs)
      
        const ctx= {
            title: "Справки, съдържащи английски език ",
            engRefs,
            search: req.query.search || ''
        }

        res.render('english',ctx);
    }
};