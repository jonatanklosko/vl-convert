import{regressionLoess as z,sampleCurve as R,regressionConstant as U,regressionLinear as j,regressionLog as D,regressionExp as M,regressionPow as N,regressionQuad as P,regressionPoly as I}from"/-/vega-statistics@v1.9.0-Qw8CjSQVQOg2M6VMgsme/dist=es2020,mode=imports,min/optimized/vega-statistics.js";import{Transform as w,ingest as x}from"/-/vega-dataflow@v5.7.5-asKYS4gpPLMPf64pSozt/dist=es2020,mode=imports,min/optimized/vega-dataflow.js";import{inherits as L,accessorName as f,hasOwnProperty as Q,error as F,extent as T}from"/-/vega-util@v1.17.2-LUfkDhormMyfWqy3Ts6U/dist=es2020,mode=imports,min/optimized/vega-util.js";function k(e,r){var t=[],p=function(l){return l(i)},u,o,a,i,n,s;if(r==null)t.push(e);else for(u={},o=0,a=e.length;o<a;++o)i=e[o],n=r.map(p),s=u[n],s||(u[n]=s=[],s.dims=n,t.push(s)),s.push(i);return t}function b(e){w.call(this,null,e)}b.Definition={type:"Loess",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"bandwidth",type:"number",default:.3},{name:"as",type:"string",array:!0}]},L(b,w,{transform(e,r){const t=r.fork(r.NO_SOURCE|r.NO_FIELDS);if(!this.value||r.changed()||e.modified()){const p=r.materialize(r.SOURCE).source,u=k(p,e.groupby),o=(e.groupby||[]).map(f),a=o.length,i=e.as||[f(e.x),f(e.y)],n=[];u.forEach(s=>{z(s,e.x,e.y,e.bandwidth||.3).forEach(l=>{const d={};for(let m=0;m<a;++m)d[o[m]]=s.dims[m];d[i[0]]=l[0],d[i[1]]=l[1],n.push(x(d))})}),this.value&&(t.rem=this.value),this.value=t.add=t.source=n}return t}});const E={constant:U,linear:j,log:D,exp:M,pow:N,quad:P,poly:I},V=(e,r)=>e==="poly"?r:e==="quad"?2:1;function O(e){w.call(this,null,e)}O.Definition={type:"Regression",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"string",default:"linear",values:Object.keys(E)},{name:"order",type:"number",default:3},{name:"extent",type:"number",array:!0,length:2},{name:"params",type:"boolean",default:!1},{name:"as",type:"string",array:!0}]},L(O,w,{transform(e,r){const t=r.fork(r.NO_SOURCE|r.NO_FIELDS);if(!this.value||r.changed()||e.modified()){const p=r.materialize(r.SOURCE).source,u=k(p,e.groupby),o=(e.groupby||[]).map(f),a=e.method||"linear",i=e.order==null?3:e.order,n=V(a,i),s=e.as||[f(e.x),f(e.y)],l=E[a],d=[];let m=e.extent;Q(E,a)||F("Invalid regression method: "+a),m!=null&&(a==="log"&&m[0]<=0&&(r.dataflow.warn("Ignoring extent with values <= 0 for log regression."),m=null)),u.forEach(g=>{const C=g.length;if(C<=n){r.dataflow.warn("Skipping regression with more parameters than data points.");return}const h=l(g,e.x,e.y,i);if(e.params){d.push(x({keys:g.dims,coef:h.coef,rSquared:h.rSquared}));return}const S=m||T(g,e.x),q=c=>{const y={};for(let v=0;v<o.length;++v)y[o[v]]=g.dims[v];y[s[0]]=c[0],y[s[1]]=c[1],d.push(x(y))};a==="linear"||a==="constant"?S.forEach(c=>q([c,h.predict(c)])):R(h.predict,S,25,200).forEach(q)}),this.value&&(t.rem=this.value),this.value=t.add=t.source=d}return t}});export{b as loess,O as regression};export default null;
