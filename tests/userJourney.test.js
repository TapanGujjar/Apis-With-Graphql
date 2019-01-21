const chai=require("chai")

const expect=chai.expect

const url="http://localhost:4000";

const request=require("supertest")(url)
var should=chai.should();
// var expect=chai.expect();
var username="tapan";
var email="intern@shopify.com";
var password="123456789";
var token="";
var products=[];
quantity=3;
outrageousQuantity=1000000;
outrageousProductId=9999999;
describe("Usertest",()=>{
    
    it("View all user ",(done)=>{
        request.post('/graphql')
        .send({operationName: null, variables: {}, query: "{ allUser { username}}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err)
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            if(res.body.data){
                res.body.data.should.have.property("allUser");
                if(res.body.data.allUser){
                    res.body.data.allUser.should.be.a("array")
                }
                
            }
            done()
        })
    });
    
    // it("Create a new User with username "+ username +" and email "+email+" and password "+password,(done)=>{
    //     request.post("/graphql")
    //     .send({"operationName":null,"variables":{},"query":"mutation {  signUp (username: \""+username+"\", email: \""+email+"\", password: \""+password+"\") { token }}"})
    //     .expect(200)
    //     .end((err,res)=>{
    //         if (err) return done(err)
    //         res.body.should.be.a("object")
    //         res.body.should.have.property("data")
    //         res.body.data.should.have.property("signUp")
    //         res.body.data.signUp.should.have.property("token")
    //         res.body.data.signUp.token.should.be.a("string")
    //         token=res.body.data.signUp.token;
    //         expect(res.body.data.signUp.token.length).to.be.greaterThan(5)
    
    //         done()
    //     }  
    //     )
    // })
    
    it("Throw  error when creating username "+username+" email "+email,done=>{
        request.post("/graphql")
        .send({"operationName":null,"variables":{},"query":"mutation {  signUp (username: \""+username+"\", email: \""+email+"\", password: \""+password+"\") { token }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.be.a("array")
            res.body.errors[0].should.have.property("message")
            done()
        })
    })
    
    it("Signing the user with login credentials "+username+" and password "+password,done=>{
        request.post("/graphql")
        .send({"operationName":null,"variables":{},"query":"mutation {  signIn (login: \""+username+"\", password: \""+password+"\") { token }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("signIn")
            // console.log(res.body.data)
            res.body.data.signIn.should.have.property("token")
            token=res.body.data.signIn.token;
            expect(res.body.data.signIn.token.length).to.be.greaterThan(10)
            done()
        })
    })
    
    it("Search all products from the product list",done=>{
        request.post("/graphql")
        .send({"operationName":null,"variables":{},"query":"{ allProducts{ id,name,inventory} }"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("allProducts")
            res.body.data.allProducts.should.be.a("array")
            res.body.data.allProducts[0].should.have.property("id")
            res.body.data.allProducts[0].should.have.property("name")
            res.body.data.allProducts[0].should.have.property("inventory")
            products=res.body.data.allProducts;
            // console.log(products)
            
            done()
        })
    })
    
    it("add a product with  and quantity "+3 +" to cart",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  addItemToCart(productId:"+ products[0].id+", quantity:"+quantity+") { purchased, items { item { id,name   }      quantity    }  }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")

            res.body.should.have.property("data")

            res.body.data.should.have.property("addItemToCart")

            res.body.data.addItemToCart.should.have.property("purchased")

            res.body.data.addItemToCart.items.should.be.a("array")

            res.body.data.addItemToCart.items[0].should.have.a.property("item")

            res.body.data.addItemToCart.items[0].should.have.a.property("quantity")

            expect(res.body.data.addItemToCart.items[0].quantity).to.equal(quantity)
            res.body.data.addItemToCart.items[0].item.should.have.a.property("id")
            expect(res.body.data.addItemToCart.items[0].item.id).to.equal(products[0].id)
            res.body.data.addItemToCart.items[0].item.should.have.a.property("name")
            expect(res.body.data.addItemToCart.items[0].item.name).to.equal(products[0].name)
            done()
        })
    })

    it("Update product quantity by 3 to 6",done=>{
        quantity=6
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  updateQuantityOnCart(productId:"+ products[0].id+", quantity:"+quantity+") { purchased, items { item { id,name   }      quantity    }  }}"})
        .end((err,res)=>{
            if(err) return done(err)
            quantity=6
            console.log("Update product="+JSON.stringify(res.body))
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("updateQuantityOnCart")
            res.body.data.updateQuantityOnCart.should.have.property("purchased")
            res.body.data.updateQuantityOnCart.items.should.be.a("array")
            res.body.data.updateQuantityOnCart.items[0].should.have.a.property("item")
            res.body.data.updateQuantityOnCart.items[0].should.have.a.property("quantity")
            expect(res.body.data.updateQuantityOnCart.items[0].quantity).to.equal(quantity)
            res.body.data.updateQuantityOnCart.items[0].item.should.have.a.property("id")
            expect(res.body.data.updateQuantityOnCart.items[0].item.id).to.equal(products[0].id)
            res.body.data.updateQuantityOnCart.items[0].item.should.have.a.property("name")
            expect(res.body.data.updateQuantityOnCart.items[0].item.name).to.equal(products[0].name)
            done()
        })
    })

    it("remove item from cart",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  removeItemFromCart(productId:"+ products[0].id+")}"})
        .end((err,res)=>{
            if(err) return done(err)
            quantity=6
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("removeItemFromCart")
            expect(res.body.data.removeItemFromCart).to.equal(true)
            done()
        })
    })

    it("throw unknown product error when product id doesnot exist while adding cart",done=>{
        
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  addItemToCart(productId:"+ outrageousProductId+", quantity:"+quantity+") { purchased, items { item { id,name   }      quantity    }  }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.be.a("array")
            res.body.errors[0].should.have.property("message")
            done()
        })
    })

    it("throw quantity greater than inventory error when adding a different product again with quantity 100000",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  addItemToCart(productId:"+ products[0].id+", quantity:"+outrageousQuantity+") { purchased, items { item { id,name   }      quantity    }  }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.be.a("array")
            res.body.errors[0].should.have.property("message")
            done()
        })
    })

    it("add a product with  and quantity "+quantity +" to cart",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  addItemToCart(productId:"+ products[0].id+", quantity:"+quantity+") { purchased, items { item { id,name   }      quantity    }  }}"})
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("addItemToCart")
            res.body.data.addItemToCart.should.have.property("purchased")
            res.body.data.addItemToCart.items.should.be.a("array")
            res.body.data.addItemToCart.items[0].should.have.a.property("item")
            res.body.data.addItemToCart.items[0].should.have.a.property("quantity")
            expect(res.body.data.addItemToCart.items[0].quantity).to.equal(quantity)
            res.body.data.addItemToCart.items[0].item.should.have.a.property("id")
            expect(res.body.data.addItemToCart.items[0].item.id).to.equal(products[0].id)
            res.body.data.addItemToCart.items[0].item.should.have.a.property("name")
            expect(res.body.data.addItemToCart.items[0].item.name).to.equal(products[0].name)
            done()
        })
    })

    it("View the cart of the user",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":" {  viewCart  { purchased, items { item { id,name   }      quantity    }  }}"})
        .end((err,res)=>{
            if(err) return done(err)
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("viewCart")
            res.body.data.viewCart.should.have.property("purchased")
            // console.log("SDSDSD="+JSON.stringify(res.body))
            expect(res.body.data.viewCart.purchased).to.equal(false)
            res.body.data.viewCart.items.should.be.a("array")
            res.body.data.viewCart.items[0].should.have.a.property("item")
            res.body.data.viewCart.items[0].should.have.a.property("quantity")
            expect(res.body.data.viewCart.items[0].quantity).to.equal(quantity)
            res.body.data.viewCart.items[0].item.should.have.a.property("id")
            expect(res.body.data.viewCart.items[0].item.id).to.equal(products[0].id)
            res.body.data.viewCart.items[0].item.should.have.a.property("name")
            expect(res.body.data.viewCart.items[0].item.name).to.equal(products[0].name)
            done()
        })
    })

    it("Purchase the cart of the user",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":"mutation {  purchaseCart { purchased, items { item { id,name   }      quantity    }  }}"})
        .end((err,res)=>{
            if(err) return done(err)
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("purchaseCart")
            res.body.data.purchaseCart.should.have.property("purchased")
            expect(res.body.data.purchaseCart.purchased).to.equal(true)
            res.body.data.purchaseCart.items.should.be.a("array")
            res.body.data.purchaseCart.items[0].should.have.a.property("item")
            res.body.data.purchaseCart.items[0].should.have.a.property("quantity")
            expect(res.body.data.purchaseCart.items[0].quantity).to.equal(quantity)
            res.body.data.purchaseCart.items[0].item.should.have.a.property("id")
            expect(res.body.data.purchaseCart.items[0].item.id).to.equal(products[0].id)
            res.body.data.purchaseCart.items[0].item.should.have.a.property("name")
            expect(res.body.data.purchaseCart.items[0].item.name).to.equal(products[0].name)
            done()
        })
    })

    it("Check if the products inventory decrease after the purchase",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":" {  viewProduct(id:"+products[0].id+") {id,name,inventory }}"})
        .end((err,res)=>{
            if(err) return done(err)
            console.log(res.body)
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("viewProduct")
            res.body.data.viewProduct.should.have.property("id")
            expect(res.body.data.viewProduct.id).to.equal(products[0].id);
            expect(res.body.data.viewProduct.inventory).to.equals(products[0].inventory-quantity)
            done()
        })
    })

    it("Get all the orders for the user",done=>{
        request.post("/graphql")
        .set("x-token",token)
        .send({"operationName":null,"variables":{},"query":" {getAllOrders{orderedItems{item{id,name},quantity}}}"})
        .end((err,res)=>{
            if(err) return done(err)
            console.log(JSON.stringify(res.body))
            res.body.should.be.a("object")

            res.body.should.have.property("data")

            res.body.data.should.have.property("getAllOrders")

            res.body.data.getAllOrders.should.have.property("orderedItems")

            res.body.data.getAllOrders.orderedItems.should.be.a("array")

            res.body.data.getAllOrders.orderedItems[0].should.have.property("item")

            res.body.data.getAllOrders.orderedItems[0].should.have.property("quantity")

            expect(res.body.data.getAllOrders.orderedItems[0].quantity).to.equal(quantity)

            res.body.data.getAllOrders.orderedItems[0].item.should.have.property("id")

            expect(res.body.data.getAllOrders.orderedItems[0].item.id).to.equal(products[0].id)


            
            done()
        })
    })
    
    
});

