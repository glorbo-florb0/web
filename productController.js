const productGet = (req,res) => {
    res.send("fetched garauv!");
}

const productPost = (req,res) =>{
    const productData = req.body
    console.log(req.headers);
    console.log(productData.Name);
    console.log(productData.Quantity);
    // console.log(productData.Name);
    // console.log(productData.Quantity);
    res.send("your product has been created");
};

module.exports ={
    productGet,
    productPost
}