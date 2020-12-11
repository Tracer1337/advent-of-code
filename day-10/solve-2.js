let d={},n=require("fs").readFileSync(require("path").join(__dirname, "input.txt"),"utf-8").split("\n").map(e=>parseInt(e)).sort((a,b)=>a-b)
console.log((function c(i, j) {
if (i===n.length)return j===n[n.length-1]
if (n[i]-j>3)return 0
if (!(""+i+j in d))d[""+i+j]=c(i+1,j)+c(i+1,n[i])
return d[""+i+j]
})(0,0))