var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('cats.html', { root: 'public' });
});

//var nameCounter = 0;
//var idCounter = 0;

var submissions = 0;

var catsList = [];
var catsUrls = [
    "https://i.pinimg.com/originals/2e/18/ab/2e18ab3f71b73c6719b04c81625bb922.jpg",
    "https://img.buzzfeed.com/buzzfeed-static/static/2016-08/8/16/asset/buzzfeed-prod-fastlane01/sub-buzz-23973-1470687963-1.png?downsize=700:*&output-format=auto&output-quality=auto",
    "http://www.cutestpaw.com/wp-content/uploads/2011/11/To-infinity-and-beyond.jpeg",
    "https://data.whicdn.com/images/298844185/large.jpg?t=1507433077",
    "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/03/Scottish-Fold_01.jpg",
    "http://fenozi.com/wp-content/uploads/2017/04/cute-cats-4.jpg",
    "https://www.mythirtyspot.com/wp-content/uploads/2014/09/Screen-Shot-2014-09-18-at-10.19.29-PM-1024x712.png",
    "https://i.pinimg.com/originals/53/37/49/5337490ca1097befda8a3a81e0b77af4.jpg",
    "https://data.whicdn.com/images/74504318/superthumb.jpg?t=1377458794",
    "https://www.catster.com/wp-content/uploads/2016/05/catster-kitten-rescue-HERO.jpeg",
    "http://images6.fanpop.com/image/photos/33400000/Cute-Cats-cats-33440930-1280-800.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIyJByZM0cugQi0TLqha66f4yeHuvmCS262UcOTGAYNz5IhOA",
    "http://www.cutestpaw.com/wp-content/uploads/2011/11/Wuts-dis-stuf-l1.jpg",
    "https://fenozi.com/wp-content/uploads/2017/04/cute-cats-8.jpg",
    "http://cutecatsinhats.com/wp-content/uploads/2016/01/little-lion-cat.jpg",
    "http://meowaum.com/images/pics/1250/01-cute-cat-begging.png",
    "https://cdn.cnn.com/cnnnext/dam/assets/151104100359-cat-internet-super-tease.jpg",
    "http://www.icepop.com/wp-content/uploads/2018/01/13-Tumblr1.jpg",
    "https://stylearena.net/wp-content/uploads/2015/04/cute-cat-picture-wallpaper.jpg",
    "https://static.boredpanda.com/blog/wp-content/uploads/2016/04/beautiful-fluffy-cat-british-longhair-1.jpg",
    "https://media.mnn.com/assets/images/2018/07/cat_eating_fancy_ice_cream.jpg.838x0_q80.jpg",
    "https://media.mnn.com/assets/images/2015/09/sweater-sphynx-cat.jpg.653x0_q80_crop-smart.jpg",
    "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg",
    "https://i.kinja-img.com/gawker-media/image/upload/s--U2teUaC1--/c_fill,f_auto,fl_progressive,g_north,h_264,q_80,w_470/ffyyaurvt86ws4r4bpzu.jpg",
    "https://sep.yimg.com/ay/healthypetscom/doggone-cat-dog-costume-large-6.gif"
    ];





/*"https://28.media.tumblr.com/tumblr_m3ddh6zWCo1qhwmnpo1_500.jpg",
"https://cdn2.thecatapi.com/images/18h.gif",
"https://24.media.tumblr.com/tumblr_lwib21FhpC1qbhms5o1_500.jpg",
"https://27.media.tumblr.com/tumblr_m1pgvd5CPM1qjahcpo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m0vz2ifv8p1qibxp4o1_500.jpg",
"https://cdn2.thecatapi.com/images/8a9.gif",
"https://24.media.tumblr.com/tumblr_m4emzz5Stc1qhwmnpo1_500.jpg",
"https://25.media.tumblr.com/qgIb8tERiohryigaI7x2z9Xfo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m38ekaqm9k1r73wdao1_250.jpg",
"https://cdn2.thecatapi.com/images/2ot.gif",
"https://cdn2.thecatapi.com/images/14s.gif",
"https://24.media.tumblr.com/tumblr_ltag8dWnUf1r27cnwo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m1joo2FHpS1qzex9io1_500.jpg",
"https://24.media.tumblr.com/ZabOTt2mpek9te16xxkkiC81o1_500.jpg",
"https://24.media.tumblr.com/tumblr_lu3tzkbMd31r4xjo2o1_r1_500.jpg",
"https://30.media.tumblr.com/tumblr_m3scc4Ktf41r73wdao1_500.jpg",
"https://25.media.tumblr.com/tumblr_lqxz1oZhTK1qbe5pxo1_500.jpg",
"https://24.media.tumblr.com/tumblr_lpfnubtA9q1qkodhmo1_500.png",
"https://25.media.tumblr.com/tumblr_lu0i0tSVnS1qbji0ro1_500.jpg",
"https://25.media.tumblr.com/qgIb8tERimby2il0x7Ipi6YOo1_250.jpg"
/*
"https://24.media.tumblr.com/tumblr_lvj1l3MOWK1qzvoypo1_500.jpg",
"https://30.media.tumblr.com/tumblr_m08k69gC5w1qzv52ko1_500.jpg",
"https://30.media.tumblr.com/IGfPvEmxXjf4kqcjx9tJwrF8o1_500.jpg",
"https://25.media.tumblr.com/tumblr_m3mtgeQAKb1r73wdao1_500.jpg",
"https://26.media.tumblr.com/tumblr_lucfha8pSp1r49uioo1_500.png",
"https://24.media.tumblr.com/tumblr_m45oc1u3ja1qhwmnpo1_500.jpg",
"https://cdn2.thecatapi.com/images/82j.gif",
"https://27.media.tumblr.com/tumblr_m1ujg3kGWU1r6b7kmo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m3g4wsfGvm1qzex9io1_500.jpg",
"https://25.media.tumblr.com/tumblr_lg1hb6lDNH1qfyzelo1_500.jpg",
"https://24.media.tumblr.com/tumblr_loh80dKiA91qbhms5o1_500.jpg",
"https://28.media.tumblr.com/tumblr_lzxpf1Z9Un1qe49wpo1_500.jpg",
"https://24.media.tumblr.com/Jjkybd3nS98hhvefck5aT2QF_500.jpg",
"https://cdn2.thecatapi.com/images/196.gif",
"https://cdn2.thecatapi.com/images/2pj.gif",
"https://cdn2.thecatapi.com/images/4ee.gif",
"https://25.media.tumblr.com/tumblr_lyho1v3N751qenqklo1_500.jpg",
"https://29.media.tumblr.com/tumblr_lr2hfveDnQ1qlp8z6o1_500.jpg",
"https://28.media.tumblr.com/tumblr_lh6zd3p7dM1qfyzelo1_500.jpg",
"https://26.media.tumblr.com/tumblr_lrfbwvsgcA1qbt33io1_400.jpg",
"https://29.media.tumblr.com/tumblr_lsw12iyr8r1qzwhyzo1_500.jpg",
"https://25.media.tumblr.com/tumblr_m38n97Id2W1qzex9io1_500.jpg",
"https://30.media.tumblr.com/tumblr_lqz9keZaCS1qjqdfao1_500.jpg",
"https://26.media.tumblr.com/tumblr_lutecoqKL41r4xjo2o1_500.jpg",
"https://30.media.tumblr.com/tumblr_lzdofmRzmM1qzv52ko1_500.png",
"https://24.media.tumblr.com/tumblr_m3cqebxQE51qenqklo1_500.jpg",
"https://30.media.tumblr.com/tumblr_krvwsxKwz51qa9hjso1_500.png",
"https://25.media.tumblr.com/tumblr_lre73uVwev1qbt33io1_500.jpg",
"https://24.media.tumblr.com/ZabOTt2mpdqnjamnsMH2wRge_500.jpg",
"https://26.media.tumblr.com/tumblr_lsiozeVv8i1qgqr63o1_500.jpg",
"https://26.media.tumblr.com/tumblr_lh6zewdMMe1qfyzelo1_500.jpg",
"https://cdn2.thecatapi.com/images/87j.gif",
"https://25.media.tumblr.com/tumblr_kp2kw2OpeZ1qzv5pwo1_500.jpg",
"https://24.media.tumblr.com/tumblr_lg1i7qhcUJ1qfyzelo1_500.jpg",
"https://25.media.tumblr.com/tumblr_m414xfTKIE1rtuomto1_500.jpg",
"https://30.media.tumblr.com/tumblr_m1n1reMAST1qzex9io1_500.jpg",
"https://26.media.tumblr.com/tumblr_m1uj3uuDkp1r6b7kmo1_500.jpg",
"https://24.media.tumblr.com/tumblr_lk040n2hAH1qij6yko1_500.jpg",
"https://24.media.tumblr.com/tumblr_m1adotNrja1qbe5pxo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m1p7vcRlMc1qb7cmlo1_500.jpg",
"https://cdn2.thecatapi.com/images/21k.gif",
"https://24.media.tumblr.com/tumblr_m2yx2t0tq61qj20xto1_500.jpg",
"https://25.media.tumblr.com/Jjkybd3nS9i6syywNnRGMJc6_500.jpg",
"https://25.media.tumblr.com/tumblr_m44w9nI50Y1qzyqubo1_500.jpg",
"https://cdn2.thecatapi.com/images/84l.gif",
"https://cdn2.thecatapi.com/images/18m.gif",
"https://24.media.tumblr.com/tumblr_m37hb1ogza1qhwmnpo1_500.jpg",
"https://25.media.tumblr.com/tumblr_lt9583w5wN1r4xjo2o1_500.jpg",
"https://24.media.tumblr.com/tumblr_m35g75N6Rp1r6b7kmo1_500.jpg",
"https://24.media.tumblr.com/tumblr_ln3tvl46lF1qbt33io1_500.jpg",
"https://25.media.tumblr.com/tumblr_kop8gyEzai1qzv5pwo1_400.jpg",
"https://24.media.tumblr.com/tumblr_lpds4kR4uj1qlyuwso1_500.jpg",
"https://25.media.tumblr.com/tumblr_lzkvxplZTx1qzex9io1_500.jpg",
"https://26.media.tumblr.com/tumblr_lvxsoxUOH11qzcxx3o1_500.png",
"https://25.media.tumblr.com/tumblr_m4442dhuBO1qhwmnpo1_500.png",
"https://25.media.tumblr.com/tumblr_m3ffwxvAGI1qhwmnpo1_500.jpg",
"https://cdn2.thecatapi.com/images/4dj.gif",
"https://cdn2.thecatapi.com/images/33.gif",
"https://25.media.tumblr.com/tumblr_lzqxrw8Bdi1qzex9io1_500.jpg",
"https://24.media.tumblr.com/tYBN1n5jFnsx54h4d20ofV2Fo1_400.jpg",
"https://24.media.tumblr.com/tumblr_lljyf3KxoA1qbe5pxo1_500.jpg",
"https://29.media.tumblr.com/Jjkybd3nSjr79tkracBq9KDUo1_500.jpg",
"https://27.media.tumblr.com/tumblr_m0j7s6VYYx1qfqm2lo1_500.jpg",
"https://25.media.tumblr.com/tumblr_m28abv5eAW1qi23vmo1_500.jpg",
"https://25.media.tumblr.com/qgIb8tERiqb5249fqgwTK4RNo1_500.jpg",
"https://cdn2.thecatapi.com/images/33g.gif",
"https://26.media.tumblr.com/tumblr_lt9kb3rxKr1qgbg0co1_500.jpg",
"https://25.media.tumblr.com/tumblr_kqagvuvXtf1qzv5pwo1_500.jpg",
"https://29.media.tumblr.com/tumblr_m2hdtxyyRh1rtuomto1_500.png",
"https://24.media.tumblr.com/tumblr_m48101DJjc1qbe5pxo1_500.jpg",
"https://24.media.tumblr.com/qgIb8tERiowwoxldpbnC9NUxo1_500.jpg",
"https://29.media.tumblr.com/tumblr_lyaa20JdXT1qfyzelo1_500.jpg",
"https://25.media.tumblr.com/tumblr_m0caoaBttH1rqvanmo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m028u4w9Ia1qjahcpo1_500.jpg",
"https://24.media.tumblr.com/tumblr_m3z6s3Ill11qjc1a7o1_500.jpg",
"https://24.media.tumblr.com/Jjkybd3nSb4y97x5oWBIHpKE_500.jpg",
"https://24.media.tumblr.com/tumblr_ltu5ieq30d1r4xjo2o1_500.jpg",
"https://cdn2.thecatapi.com/images/94l.gif",
"https://24.media.tumblr.com/qgIb8tERiouc2k300gVmz7JZo1_500.jpg",
"https://25.media.tumblr.com/tumblr_lzqy609MOX1qbqiseo1_500.png"*/
//];
var catsNames = ["Bella",
"Tigger",
"Chloe",
"Shadow",
"Luna",
"Oreo",
"Oliver",
"Kitty",
"Lucy",
"Molly",
"Jasper",
"Smokey",
"Gizmo",
"Simba",
"Tiger",
"Charlie",
"Angel",
"Jack",
"Lily",
"Peanut",
"Toby",
"Baby",
"Loki",
"Midnight",
"Milo",
"Princess",
/*"Sophie",
"Harley",
"Max",
"Missy",
"Rocky",
"Zoe",
"CoCo",
"Misty",
"Nala",
"Oscar",
"Pepper",
"Sasha",
"Buddy",
"Pumpkin",
"Kiki",
"Mittens",
"Bailey",
"Callie",
"Lucky",
"Patches",
"Simon",
"Garfield",
"George",
"Maggie",
"Sammy",
"Sebastian",
"Boots",
"Cali",
"Felix",
"Lilly",
"Phoebe",
"Sassy",
"Tucker",
"Bandit",
"Dexter",
"Fiona",
"Jake",
"Precious",
"Romeo",
"Snickers",
"Socks",
"Daisy",
"Gracie",
"Lola",
"Sadie",
"Sox",
"Casper",
"Fluffy",
"Marley",
"Minnie",
"Sweetie",
"Ziggy",
"Belle",
"Blackie",
"Chester",
"Frankie",
"Ginger",
"Muffin",
"Murphy",
"Rusty",
"Scooter",
"Batman",
"Boo",
"Cleo",
"Izzy",
"Jasmine",
"Mimi",
"Sugar",
"Cupcake",
"Dusty",
"Leo",
"Noodle",
"Panda",
"Peaches"
*/
];

for (var i = 0; i < catsUrls.length; i++) {
    catsList.push({
        id: i,
        name: catsNames[i],
        url: catsUrls[i],
        cute: 0,
        lame: 0,
        combined: 0
    });
//    console.log("added cat ", i);
}
console.log(catsList);

/*
var catsList = [{
    id: 0,
    name: 'cat 1',
    url: 'https://i.pinimg.com/originals/2e/18/ab/2e18ab3f71b73c6719b04c81625bb922.jpg',
    cute: 0,
    lame: 0
}];
*/
router.get('/getcats', function(req, res) {
    console.log("in getcats route");
    submissions += .3333333333;
    console.log("submissions: ", submissions);
    res.send(catsList);
});

router.post('/upcute', function(req, res, next) {
    console.log("in upcute route for", req.body.id);
    console.log(req.body.cute);
    catsList[req.body.id].cute += req.body.cute;
    catsList[req.body.id].combined += req.body.cute;
    res.end("{'success': 'Updated Successfully'}");
});

router.post('/uplame', function(req, res, next) {
    console.log("in uplame route for", req.body.id);
    console.log(req.body.lame);
    catsList[req.body.id].lame += req.body.lame;
    catsList[req.body.id].combined -= req.body.lame;
    res.end("{'success': 'Updated Successfully'}");
});

router.post('/addcat', function(req, res) {
    console.log("in addcat route");

});

router.post('/addapicat', function(req, res, next) {
    console.log("in addapicat route");
    console.log(req.body);
    var toAdd = {
        id: idCounter,
        name: nameCounter,
        url: req.body.url,
        cute: 0,
        lame: 0,
    };
    idCounter++;
    nameCounter++;
    catsList.push(toAdd);
    res.end("{'success' : 'Updated Successfully', 'status' : 200}");

});

module.exports = router;
