const products = [
 {title:"Timeless Earth: From Matera to Ghardaïa",cat:"Fine Art",filter:"Creative",price:"$2.70",old:"$3.00",img:"https://pe56d.s3.amazonaws.com/o_1jvh9bbq01tpo13rl1q9t1r31sn1a.png",url:"https://payhip.com/b/pbgIR"},
 {title:"Timeless Citadel: Matera & Casbah",cat:"Fine Art",filter:"Creative",price:"$2.00",img:"https://pe56d.s3.amazonaws.com/o_1jvh949mklam67molf110o19r01a.png",url:"https://payhip.com/b/60kQH"},
 {title:"Fit & Delicious: Healthy Cakes for Every Goal",cat:"Healthy Living",filter:"Healthy Living",price:"$6.30",old:"$7.00",img:"https://pe56d.s3.amazonaws.com/o_1jul7i53egf22c8dn8114v12rj1c.png",url:"https://payhip.com/b/BxIX5"},
 {title:"Master Arabic Handwriting & Letters from Scratch",cat:"Arabic",filter:"Arabic",price:"FREE",free:true,img:"https://pe56d.s3.amazonaws.com/o_1js7mn4233jl164p1dvc1gd21epg1f.png",url:"https://payhip.com/b/yft3G"},
 {title:"Colorful Creatures: A Coloring Adventure",cat:"Creative",filter:"Creative",price:"$3.59",old:"$3.99",img:"https://pe56d.s3.amazonaws.com/o_1jm1il673138c134i16ulrru3am1g.png",url:"https://payhip.com/b/8gqa2"},
 {title:"Coloring Book Rabbit",cat:"Creative",filter:"Creative",price:"$1.80",old:"$2.00",img:"https://pe56d.s3.amazonaws.com/o_1jlicp7jk1ts41l4112b31kv0vio1g.png",url:"https://payhip.com/b/Dvwrg"},
 {title:"Ten Golden Tips for Excelling in Math",cat:"Math",filter:"Math",price:"$2.00",img:"https://pe56d.s3.amazonaws.com/o_1jla18uls2pmo9kft91d0on8a17.png",url:"https://payhip.com/b/XC0HE"},
 {title:"أكتبها بنجاح – Early Arabic Letters Series",cat:"Arabic",filter:"Arabic",price:"$2.70",old:"$3.00",img:"https://pe56d.s3.amazonaws.com/o_1jtemvho1185g2ha1rahj8114ui15.png",url:"https://payhip.com/b/OCSYn"},
 {title:"Math Made Easy: Addition & Subtraction (Ages 6–8)",cat:"Math",filter:"Math",price:"$1.35",old:"$1.50",img:"https://pe56d.s3.amazonaws.com/o_1jte8fs8u1fq61cp1a0s62susg1m.png",url:"https://payhip.com/b/c14Vq"},
 {title:"Master the writing of Arabic letters",cat:"Arabic",filter:"Arabic",price:"$3.55",img:"https://pe56d.s3.amazonaws.com/o_1jtemtkb010681fdg1e5u1hg1rnr15.png",url:"https://payhip.com/b/5VpCr"}
];

const grid=document.getElementById("productGrid");
const noResults=document.getElementById("noResults");
let currentFilter="All";

function render(){
 const q=document.getElementById("search").value.trim().toLowerCase();
 const visible=products.filter(p=>{
   const filterOk=currentFilter==="All" || p.filter===currentFilter || (currentFilter==="Free"&&p.free);
   const searchOk=!q || (p.title+" "+p.cat).toLowerCase().includes(q);
   return filterOk&&searchOk;
 });
 grid.innerHTML=visible.map(p=>`
  <article class="product-card">
   <a class="product-image-wrap" href="${p.url}" target="_blank" rel="noopener">
    <img class="product-image" src="${p.img}" alt="${p.title}" loading="lazy">
    <span class="badge">${p.cat.toUpperCase()}</span>
    ${p.free?'<span class="badge free-badge">♥ FREE</span>':''}
   </a>
   <div class="product-body">
    <h3>${p.title}</h3>
    <div class="price ${p.free?'free':''}">${p.price}${p.old?`<span class="old">${p.old}</span>`:""}</div>
    <a class="btn ${p.free?'btn-green':'btn-primary'}" href="${p.url}" target="_blank" rel="noopener">${p.free?"Get It Free →":"View Product →"}</a>
   </div>
  </article>`).join("");
 noResults.hidden=visible.length>0;
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 currentFilter=btn.dataset.filter;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
 render();
}));
document.querySelectorAll("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>{
 currentFilter=a.dataset.filterLink;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===currentFilter));
 setTimeout(()=>document.getElementById("products").scrollIntoView({behavior:"smooth"}),50);
 render();
}));
document.getElementById("search").addEventListener("input",render);
document.querySelector(".menu-toggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
render();
