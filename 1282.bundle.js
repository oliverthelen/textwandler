/*! For license information please see 1282.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunktextWandler=self.webpackChunktextWandler||[]).push([[1282],{61282:(e,s,t)=>{t.r(s),t.d(s,{conf:()=>n,language:()=>r});var n={comments:{lineComment:"#"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"'",close:"'",notIn:["string"]},{open:'"',close:'"',notIn:["string"]},{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"}]},r={defaultToken:"",tokenPostfix:".rq",brackets:[{token:"delimiter.curly",open:"{",close:"}"},{token:"delimiter.parenthesis",open:"(",close:")"},{token:"delimiter.square",open:"[",close:"]"},{token:"delimiter.angle",open:"<",close:">"}],keywords:["add","as","asc","ask","base","by","clear","construct","copy","create","data","delete","desc","describe","distinct","drop","false","filter","from","graph","group","having","in","insert","limit","load","minus","move","named","not","offset","optional","order","prefix","reduced","select","service","silent","to","true","undef","union","using","values","where","with"],builtinFunctions:["a","abs","avg","bind","bnode","bound","ceil","coalesce","concat","contains","count","datatype","day","encode_for_uri","exists","floor","group_concat","hours","if","iri","isblank","isiri","isliteral","isnumeric","isuri","lang","langmatches","lcase","max","md5","min","minutes","month","now","rand","regex","replace","round","sameterm","sample","seconds","sha1","sha256","sha384","sha512","str","strafter","strbefore","strdt","strends","strlang","strlen","strstarts","struuid","substr","sum","timezone","tz","ucase","uri","uuid","year"],ignoreCase:!0,tokenizer:{root:[[/<[^\s\u00a0>]*>?/,"tag"],{include:"@strings"},[/#.*/,"comment"],[/[{}()\[\]]/,"@brackets"],[/[;,.]/,"delimiter"],[/[_\w\d]+:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])*/,"tag"],[/:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/,"tag"],[/[$?]?[_\w\d]+/,{cases:{"@keywords":{token:"keyword"},"@builtinFunctions":{token:"predefined.sql"},"@default":"identifier"}}],[/\^\^/,"operator.sql"],[/\^[*+\-<>=&|^\/!?]*/,"operator.sql"],[/[*+\-<>=&|\/!?]/,"operator.sql"],[/@[a-z\d\-]*/,"metatag.html"],[/\s+/,"white"]],strings:[[/'([^'\\]|\\.)*$/,"string.invalid"],[/'$/,"string.sql","@pop"],[/'/,"string.sql","@stringBody"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"$/,"string.sql","@pop"],[/"/,"string.sql","@dblStringBody"]],stringBody:[[/[^\\']+/,"string.sql"],[/\\./,"string.escape"],[/'/,"string.sql","@pop"]],dblStringBody:[[/[^\\"]+/,"string.sql"],[/\\./,"string.escape"],[/"/,"string.sql","@pop"]]}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTI4Mi5idW5kbGUuanMiLCJtYXBwaW5ncyI6IjtxSkFTQSxJQUFJQSxFQUFPLENBQ1RDLFNBQVUsQ0FDUkMsWUFBYSxLQUVmQyxTQUFVLENBQ1IsQ0FBQyxJQUFLLEtBQ04sQ0FBQyxJQUFLLEtBQ04sQ0FBQyxJQUFLLE1BRVJDLGlCQUFrQixDQUNoQixDQUFFQyxLQUFNLElBQUtDLE1BQU8sSUFBS0MsTUFBTyxDQUFDLFdBQ2pDLENBQUVGLEtBQU0sSUFBS0MsTUFBTyxJQUFLQyxNQUFPLENBQUMsV0FDakMsQ0FBRUYsS0FBTSxJQUFLQyxNQUFPLEtBQ3BCLENBQUVELEtBQU0sSUFBS0MsTUFBTyxLQUNwQixDQUFFRCxLQUFNLElBQUtDLE1BQU8sT0FHcEJFLEVBQVcsQ0FDYkMsYUFBYyxHQUNkQyxhQUFjLE1BQ2RQLFNBQVUsQ0FDUixDQUFFUSxNQUFPLGtCQUFtQk4sS0FBTSxJQUFLQyxNQUFPLEtBQzlDLENBQUVLLE1BQU8sd0JBQXlCTixLQUFNLElBQUtDLE1BQU8sS0FDcEQsQ0FBRUssTUFBTyxtQkFBb0JOLEtBQU0sSUFBS0MsTUFBTyxLQUMvQyxDQUFFSyxNQUFPLGtCQUFtQk4sS0FBTSxJQUFLQyxNQUFPLE1BRWhETSxTQUFVLENBQ1IsTUFDQSxLQUNBLE1BQ0EsTUFDQSxPQUNBLEtBQ0EsUUFDQSxZQUNBLE9BQ0EsU0FDQSxPQUNBLFNBQ0EsT0FDQSxXQUNBLFdBQ0EsT0FDQSxRQUNBLFNBQ0EsT0FDQSxRQUNBLFFBQ0EsU0FDQSxLQUNBLFNBQ0EsUUFDQSxPQUNBLFFBQ0EsT0FDQSxRQUNBLE1BQ0EsU0FDQSxXQUNBLFFBQ0EsU0FDQSxVQUNBLFNBQ0EsVUFDQSxTQUNBLEtBQ0EsT0FDQSxRQUNBLFFBQ0EsUUFDQSxTQUNBLFFBQ0EsUUFFRkMsaUJBQWtCLENBQ2hCLElBQ0EsTUFDQSxNQUNBLE9BQ0EsUUFDQSxRQUNBLE9BQ0EsV0FDQSxTQUNBLFdBQ0EsUUFDQSxXQUNBLE1BQ0EsaUJBQ0EsU0FDQSxRQUNBLGVBQ0EsUUFDQSxLQUNBLE1BQ0EsVUFDQSxRQUNBLFlBQ0EsWUFDQSxRQUNBLE9BQ0EsY0FDQSxRQUNBLE1BQ0EsTUFDQSxNQUNBLFVBQ0EsUUFDQSxNQUNBLE9BQ0EsUUFDQSxVQUNBLFFBQ0EsV0FDQSxTQUNBLFVBQ0EsT0FDQSxTQUNBLFNBQ0EsU0FDQSxNQUNBLFdBQ0EsWUFDQSxRQUNBLFVBQ0EsVUFDQSxTQUNBLFlBQ0EsVUFDQSxTQUNBLE1BQ0EsV0FDQSxLQUNBLFFBQ0EsTUFDQSxPQUNBLFFBR0ZDLFlBQVksRUFDWkMsVUFBVyxDQUNUQyxLQUFNLENBRUosQ0FBQyxtQkFBb0IsT0FFckIsQ0FBRUMsUUFBUyxZQUVYLENBQUMsTUFBTyxXQUVSLENBQUMsYUFBYyxhQUNmLENBQUMsUUFBUyxhQUVWLENBQUMsa0ZBQW1GLE9BQ3BGLENBQUMsMEVBQTJFLE9BRTVFLENBQ0UsZ0JBQ0EsQ0FDRUMsTUFBTyxDQUNMLFlBQWEsQ0FBRVAsTUFBTyxXQUN0QixvQkFBcUIsQ0FBRUEsTUFBTyxrQkFDOUIsV0FBWSxnQkFLbEIsQ0FBQyxPQUFRLGdCQUNULENBQUMsc0JBQXVCLGdCQUN4QixDQUFDLGtCQUFtQixnQkFFcEIsQ0FBQyxjQUFlLGdCQUVoQixDQUFDLE1BQU8sVUFFVlEsUUFBUyxDQUNQLENBQUMsa0JBQW1CLGtCQUVwQixDQUFDLEtBQU0sYUFBYyxRQUNyQixDQUFDLElBQUssYUFBYyxlQUNwQixDQUFDLGtCQUFtQixrQkFFcEIsQ0FBQyxLQUFNLGFBQWMsUUFDckIsQ0FBQyxJQUFLLGFBQWMsbUJBR3RCQyxXQUFZLENBQ1YsQ0FBQyxVQUFXLGNBQ1osQ0FBQyxNQUFPLGlCQUNSLENBQUMsSUFBSyxhQUFjLFNBR3RCQyxjQUFlLENBQ2IsQ0FBQyxVQUFXLGNBQ1osQ0FBQyxNQUFPLGlCQUNSLENBQUMsSUFBSyxhQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dFdhbmRsZXIvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3NwYXJxbC9zcGFycWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40OC4wKDAwMzdiMTNmYjVkMTg2ZmRmMWU3ZGY1MWE5NDE2YTJkZTJiOGM2NzApXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMvc3BhcnFsL3NwYXJxbC50c1xudmFyIGNvbmYgPSB7XG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiI1wiXG4gIH0sXG4gIGJyYWNrZXRzOiBbXG4gICAgW1wie1wiLCBcIn1cIl0sXG4gICAgW1wiW1wiLCBcIl1cIl0sXG4gICAgW1wiKFwiLCBcIilcIl1cbiAgXSxcbiAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiwgbm90SW46IFtcInN0cmluZ1wiXSB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbXCJzdHJpbmdcIl0gfSxcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfVxuICBdXG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogXCIucnFcIixcbiAgYnJhY2tldHM6IFtcbiAgICB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIucGFyZW50aGVzaXNcIiwgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgdG9rZW46IFwiZGVsaW1pdGVyLnNxdWFyZVwiLCBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiwgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiB9XG4gIF0sXG4gIGtleXdvcmRzOiBbXG4gICAgXCJhZGRcIixcbiAgICBcImFzXCIsXG4gICAgXCJhc2NcIixcbiAgICBcImFza1wiLFxuICAgIFwiYmFzZVwiLFxuICAgIFwiYnlcIixcbiAgICBcImNsZWFyXCIsXG4gICAgXCJjb25zdHJ1Y3RcIixcbiAgICBcImNvcHlcIixcbiAgICBcImNyZWF0ZVwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiZGVsZXRlXCIsXG4gICAgXCJkZXNjXCIsXG4gICAgXCJkZXNjcmliZVwiLFxuICAgIFwiZGlzdGluY3RcIixcbiAgICBcImRyb3BcIixcbiAgICBcImZhbHNlXCIsXG4gICAgXCJmaWx0ZXJcIixcbiAgICBcImZyb21cIixcbiAgICBcImdyYXBoXCIsXG4gICAgXCJncm91cFwiLFxuICAgIFwiaGF2aW5nXCIsXG4gICAgXCJpblwiLFxuICAgIFwiaW5zZXJ0XCIsXG4gICAgXCJsaW1pdFwiLFxuICAgIFwibG9hZFwiLFxuICAgIFwibWludXNcIixcbiAgICBcIm1vdmVcIixcbiAgICBcIm5hbWVkXCIsXG4gICAgXCJub3RcIixcbiAgICBcIm9mZnNldFwiLFxuICAgIFwib3B0aW9uYWxcIixcbiAgICBcIm9yZGVyXCIsXG4gICAgXCJwcmVmaXhcIixcbiAgICBcInJlZHVjZWRcIixcbiAgICBcInNlbGVjdFwiLFxuICAgIFwic2VydmljZVwiLFxuICAgIFwic2lsZW50XCIsXG4gICAgXCJ0b1wiLFxuICAgIFwidHJ1ZVwiLFxuICAgIFwidW5kZWZcIixcbiAgICBcInVuaW9uXCIsXG4gICAgXCJ1c2luZ1wiLFxuICAgIFwidmFsdWVzXCIsXG4gICAgXCJ3aGVyZVwiLFxuICAgIFwid2l0aFwiXG4gIF0sXG4gIGJ1aWx0aW5GdW5jdGlvbnM6IFtcbiAgICBcImFcIixcbiAgICBcImFic1wiLFxuICAgIFwiYXZnXCIsXG4gICAgXCJiaW5kXCIsXG4gICAgXCJibm9kZVwiLFxuICAgIFwiYm91bmRcIixcbiAgICBcImNlaWxcIixcbiAgICBcImNvYWxlc2NlXCIsXG4gICAgXCJjb25jYXRcIixcbiAgICBcImNvbnRhaW5zXCIsXG4gICAgXCJjb3VudFwiLFxuICAgIFwiZGF0YXR5cGVcIixcbiAgICBcImRheVwiLFxuICAgIFwiZW5jb2RlX2Zvcl91cmlcIixcbiAgICBcImV4aXN0c1wiLFxuICAgIFwiZmxvb3JcIixcbiAgICBcImdyb3VwX2NvbmNhdFwiLFxuICAgIFwiaG91cnNcIixcbiAgICBcImlmXCIsXG4gICAgXCJpcmlcIixcbiAgICBcImlzYmxhbmtcIixcbiAgICBcImlzaXJpXCIsXG4gICAgXCJpc2xpdGVyYWxcIixcbiAgICBcImlzbnVtZXJpY1wiLFxuICAgIFwiaXN1cmlcIixcbiAgICBcImxhbmdcIixcbiAgICBcImxhbmdtYXRjaGVzXCIsXG4gICAgXCJsY2FzZVwiLFxuICAgIFwibWF4XCIsXG4gICAgXCJtZDVcIixcbiAgICBcIm1pblwiLFxuICAgIFwibWludXRlc1wiLFxuICAgIFwibW9udGhcIixcbiAgICBcIm5vd1wiLFxuICAgIFwicmFuZFwiLFxuICAgIFwicmVnZXhcIixcbiAgICBcInJlcGxhY2VcIixcbiAgICBcInJvdW5kXCIsXG4gICAgXCJzYW1ldGVybVwiLFxuICAgIFwic2FtcGxlXCIsXG4gICAgXCJzZWNvbmRzXCIsXG4gICAgXCJzaGExXCIsXG4gICAgXCJzaGEyNTZcIixcbiAgICBcInNoYTM4NFwiLFxuICAgIFwic2hhNTEyXCIsXG4gICAgXCJzdHJcIixcbiAgICBcInN0cmFmdGVyXCIsXG4gICAgXCJzdHJiZWZvcmVcIixcbiAgICBcInN0cmR0XCIsXG4gICAgXCJzdHJlbmRzXCIsXG4gICAgXCJzdHJsYW5nXCIsXG4gICAgXCJzdHJsZW5cIixcbiAgICBcInN0cnN0YXJ0c1wiLFxuICAgIFwic3RydXVpZFwiLFxuICAgIFwic3Vic3RyXCIsXG4gICAgXCJzdW1cIixcbiAgICBcInRpbWV6b25lXCIsXG4gICAgXCJ0elwiLFxuICAgIFwidWNhc2VcIixcbiAgICBcInVyaVwiLFxuICAgIFwidXVpZFwiLFxuICAgIFwieWVhclwiXG4gIF0sXG4gIC8vIGRlc2NyaWJlIHRva2Vuc1xuICBpZ25vcmVDYXNlOiB0cnVlLFxuICB0b2tlbml6ZXI6IHtcbiAgICByb290OiBbXG4gICAgICAvLyByZXNvdXJjZSBpbmRpY2F0b3JzXG4gICAgICBbLzxbXlxcc1xcdTAwYTA+XSo+Py8sIFwidGFnXCJdLFxuICAgICAgLy8gc3RyaW5nc1xuICAgICAgeyBpbmNsdWRlOiBcIkBzdHJpbmdzXCIgfSxcbiAgICAgIC8vIGxpbmUgY29tbWVudFxuICAgICAgWy8jLiovLCBcImNvbW1lbnRcIl0sXG4gICAgICAvLyBzcGVjaWFsIGNoYXJzIHdpdGggc3BlY2lhbCBtZWFuaW5nXG4gICAgICBbL1t7fSgpXFxbXFxdXS8sIFwiQGJyYWNrZXRzXCJdLFxuICAgICAgWy9bOywuXS8sIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgLy8gKHByZWZpeGVkKSBuYW1lXG4gICAgICBbL1tfXFx3XFxkXSs6KFxcLig/PVtcXHdfXFwtXFxcXCVdKXxbOlxcd18tXXxcXFxcWy1cXFxcX34uISQmJygpKissOz0vPyNAJV18JVthLWZcXGRdW2EtZlxcZF0pKi8sIFwidGFnXCJdLFxuICAgICAgWy86KFxcLig/PVtcXHdfXFwtXFxcXCVdKXxbOlxcd18tXXxcXFxcWy1cXFxcX34uISQmJygpKissOz0vPyNAJV18JVthLWZcXGRdW2EtZlxcZF0pKy8sIFwidGFnXCJdLFxuICAgICAgLy8gaWRlbnRpZmllcnMsIGJ1aWx0aW5GdW5jdGlvbnMgYW5kIGtleXdvcmRzXG4gICAgICBbXG4gICAgICAgIC9bJD9dP1tfXFx3XFxkXSsvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGtleXdvcmRzXCI6IHsgdG9rZW46IFwia2V5d29yZFwiIH0sXG4gICAgICAgICAgICBcIkBidWlsdGluRnVuY3Rpb25zXCI6IHsgdG9rZW46IFwicHJlZGVmaW5lZC5zcWxcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImlkZW50aWZpZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIC8vIG9wZXJhdG9yc1xuICAgICAgWy9cXF5cXF4vLCBcIm9wZXJhdG9yLnNxbFwiXSxcbiAgICAgIFsvXFxeWyorXFwtPD49JnxeXFwvIT9dKi8sIFwib3BlcmF0b3Iuc3FsXCJdLFxuICAgICAgWy9bKitcXC08Pj0mfFxcLyE/XS8sIFwib3BlcmF0b3Iuc3FsXCJdLFxuICAgICAgLy8gc3ltYm9sXG4gICAgICBbL0BbYS16XFxkXFwtXSovLCBcIm1ldGF0YWcuaHRtbFwiXSxcbiAgICAgIC8vIHdoaXRlc3BhY2VzXG4gICAgICBbL1xccysvLCBcIndoaXRlXCJdXG4gICAgXSxcbiAgICBzdHJpbmdzOiBbXG4gICAgICBbLycoW14nXFxcXF18XFxcXC4pKiQvLCBcInN0cmluZy5pbnZhbGlkXCJdLFxuICAgICAgLy8gbm9uLXRlcm1pbmF0ZWQgc2luZ2xlLXF1b3RlZCBzdHJpbmdcbiAgICAgIFsvJyQvLCBcInN0cmluZy5zcWxcIiwgXCJAcG9wXCJdLFxuICAgICAgWy8nLywgXCJzdHJpbmcuc3FsXCIsIFwiQHN0cmluZ0JvZHlcIl0sXG4gICAgICBbL1wiKFteXCJcXFxcXXxcXFxcLikqJC8sIFwic3RyaW5nLmludmFsaWRcIl0sXG4gICAgICAvLyBub24tdGVybWluYXRlZCBzaW5nbGUtcXVvdGVkIHN0cmluZ1xuICAgICAgWy9cIiQvLCBcInN0cmluZy5zcWxcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9cIi8sIFwic3RyaW5nLnNxbFwiLCBcIkBkYmxTdHJpbmdCb2R5XCJdXG4gICAgXSxcbiAgICAvLyBzaW5nbGUtcXVvdGVkIHN0cmluZ3NcbiAgICBzdHJpbmdCb2R5OiBbXG4gICAgICBbL1teXFxcXCddKy8sIFwic3RyaW5nLnNxbFwiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbLycvLCBcInN0cmluZy5zcWxcIiwgXCJAcG9wXCJdXG4gICAgXSxcbiAgICAvLyBkb3VibGUtcXVvdGVkIHN0cmluZ3NcbiAgICBkYmxTdHJpbmdCb2R5OiBbXG4gICAgICBbL1teXFxcXFwiXSsvLCBcInN0cmluZy5zcWxcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cIi8sIFwic3RyaW5nLnNxbFwiLCBcIkBwb3BcIl1cbiAgICBdXG4gIH1cbn07XG5leHBvcnQge1xuICBjb25mLFxuICBsYW5ndWFnZVxufTtcbiJdLCJuYW1lcyI6WyJjb25mIiwiY29tbWVudHMiLCJsaW5lQ29tbWVudCIsImJyYWNrZXRzIiwiYXV0b0Nsb3NpbmdQYWlycyIsIm9wZW4iLCJjbG9zZSIsIm5vdEluIiwibGFuZ3VhZ2UiLCJkZWZhdWx0VG9rZW4iLCJ0b2tlblBvc3RmaXgiLCJ0b2tlbiIsImtleXdvcmRzIiwiYnVpbHRpbkZ1bmN0aW9ucyIsImlnbm9yZUNhc2UiLCJ0b2tlbml6ZXIiLCJyb290IiwiaW5jbHVkZSIsImNhc2VzIiwic3RyaW5ncyIsInN0cmluZ0JvZHkiLCJkYmxTdHJpbmdCb2R5Il0sInNvdXJjZVJvb3QiOiIifQ==