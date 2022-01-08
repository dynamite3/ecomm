import express, { response } from "express"
import Product from "../models/Product.js";

const router = express.Router();


router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
    }
    catch (err) {
        res.send(err);
    }
});

// router.post("/many", async (req, res) => {
//     const newProduct = new Product(req.body);
//     try {
//       const savedProduct = await newProduct.save();
//       res.send(savedProduct);
//     } 
//     catch (err) {
//         res.send(err);
//     }
//   });

router.put("/item/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.send(updatedProduct);
    }
    catch (err) {
        res.send(err);
    }
});


router.delete("item/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send("Product has been deleted...");
    }
    catch (err) {
        res.send(err);
    }
});


// router.get("/:cat/item/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.send(product);
//     }
//     catch (err) {
//         res.send(err);
//     }
// });


router.get("/item/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    }
    catch (err) {
        res.send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const product = await Product.find();
        res.send(product);
    }
    catch (err) {
        res.send(err);
    }
});



router.get("/:type", async (req, res) => {
    const { type } = req.params
    console.log(type)
    const qCategory = req.query.category;
    try {

            let products
            products = await Product.find({ category: { $in: [type] } });
            res.send(products);
        } 
    catch (err) {
            res.send(err);
        }
    });



export { router }