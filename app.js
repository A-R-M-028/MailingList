                //jshint esversion 6
                const express = require("express");
                const bodyParser= require ("body-parser");
                const request = require ("request");
                const https = require("https");

                const app = express();



                //for static image and text, all static inside public folder
                app.use(express.static("public"));
                //user input->need this
                app.use(bodyParser.urlencoded({extended: true}));

                // Upto that needed every time!
                app.get("/",function(req,res){
                    //for fetch 
                    res.sendFile(__dirname+"/signup.html");

                });

                app.post("/",function(req,res){
                    //for action, user input-> 
                    var firstName=req.body.fName;
                    var lastName=req.body.lName;
                    var email=req.body.eMail;
                    //see inside cli

                    console.log(firstName,lastName,email);

                    var data={
                        members: [
                            {
                                email_address: email,
                                status: "subscribed",
                                merge_field: {
                                    FNAME: firstName,
                                    LNAME:  lastName
                                }
                            }
                        ]
                    };

                    var jsonData=JSON.stringify(data);

                    const url = "https://us18.api.mailchimp.com/3.0/fac35f3a7b";
                    //fac35f3a7b


                    const options = {
                        method: "POST",
                        auth:  "A.R.M: 2d8a934fa64e890c502227767f27fd0d-us18"
                    };

                    //here we want to post data not get from api
                    const request=https.request(url,options,function(response){

                        //success and failure handle
                        if(response.statusCode==200){
                            // res.send("Successfully Subscribed!");
                            res.sendFile(__dirname+"/success.html");
                        }
                        else 
                        {
                            // res.send("Please try again!")
                            res.sendFile(__dirname+"/failure.html");
                        }
                        response.on("data",function(data){
                            console.log(JSON.parse(data));
                        });
                    });

                    request.write(jsonData);
                    request.end();
                });

                //for handle failure and send to home 
                //have to create form inside failure tag failure form-> 
                app.post("/failure", function(req,res){
                    res.redirect("/");
                });

                app.listen(3000||process.env.PORT, function(){
                    //see in server cli
                    console.log("Server is running");
                });


                /*
                api-> 2d8a934fa64e890c502227767f27fd0d-us18
                id-> fac35f3a7b
                */
            //    token-> heroku-> 39046087-ea37-41ae-b112-b74f2cc38e18
            //heroku is not now free