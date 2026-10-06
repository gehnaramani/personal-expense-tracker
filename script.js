const defaults=[
 {title:"College Fees",amount:4500,type:"expense",category:"Education"},
 {title:"Monthly Salary",amount:20000,type:"income",category:"Salary"},
 {title:"Food & Cafe",amount:1250,type:"expense",category:"Food"},
 {title:"Cab Ride",amount:550,type:"expense",category:"Travel"},
 {title:"Shopping",amount:1250,type:"expense",category:"Shopping"}
];
let data=JSON.parse(localStorage.getItem("spendly"))||defaults;
function render(){
 let q=document.getElementById("search").value.toLowerCase();
 let shown=data.filter(x=>(x.title+" "+x.category).toLowerCase().includes(q));
 let income=data.filter(x=>x.type==="income").reduce((a,x)=>a+x.amount,0);
 let expense=data.filter(x=>x.type==="expense").reduce((a,x)=>a+x.amount,0);
 document.getElementById("income").textContent="₹"+income.toLocaleString("en-IN");
 document.getElementById("expense").textContent="₹"+expense.toLocaleString("en-IN");
 document.getElementById("balance").textContent="₹"+(income-expense).toLocaleString("en-IN");
 document.getElementById("list").innerHTML=shown.map((x,i)=>`<div class="item"><div><strong>${x.title}</strong><small>${x.category}</small></div><span class="${x.type==="income"?"plus":"minus"}">${x.type==="income"?"+":"−"} ₹${x.amount.toLocaleString("en-IN")}</span></div>`).join("")||"<p>No transactions found.</p>";
 localStorage.setItem("spendly",JSON.stringify(data));
}
document.getElementById("form").addEventListener("submit",e=>{e.preventDefault();data.unshift({title:title.value,amount:+amount.value,type:type.value,category:category.value});e.target.reset();render()});
document.getElementById("search").addEventListener("input",render);
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("dark");
render();