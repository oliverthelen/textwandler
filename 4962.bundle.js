/*! For license information please see 4962.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunktextWandler=self.webpackChunktextWandler||[]).push([[4962],{44962:(e,n,o)=>{o.r(n),o.d(n,{conf:()=>t,language:()=>r});var t={comments:{lineComment:"'"},brackets:[["(",")"],["[","]"],["If","EndIf"],["While","EndWhile"],["For","EndFor"],["Sub","EndSub"]],autoClosingPairs:[{open:'"',close:'"',notIn:["string","comment"]},{open:"(",close:")",notIn:["string","comment"]},{open:"[",close:"]",notIn:["string","comment"]}]},r={defaultToken:"",tokenPostfix:".sb",ignoreCase:!0,brackets:[{token:"delimiter.array",open:"[",close:"]"},{token:"delimiter.parenthesis",open:"(",close:")"},{token:"keyword.tag-if",open:"If",close:"EndIf"},{token:"keyword.tag-while",open:"While",close:"EndWhile"},{token:"keyword.tag-for",open:"For",close:"EndFor"},{token:"keyword.tag-sub",open:"Sub",close:"EndSub"}],keywords:["Else","ElseIf","EndFor","EndIf","EndSub","EndWhile","For","Goto","If","Step","Sub","Then","To","While"],tagwords:["If","Sub","While","For"],operators:[">","<","<>","<=",">=","And","Or","+","-","*","/","="],identifier:/[a-zA-Z_][\w]*/,symbols:/[=><:+\-*\/%\.,]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[{include:"@whitespace"},[/(@identifier)(?=[.])/,"type"],[/@identifier/,{cases:{"@keywords":{token:"keyword.$0"},"@operators":"operator","@default":"variable.name"}}],[/([.])(@identifier)/,{cases:{$2:["delimiter","type.member"],"@default":""}}],[/\d*\.\d+/,"number.float"],[/\d+/,"number"],[/[()\[\]]/,"@brackets"],[/@symbols/,{cases:{"@operators":"operator","@default":"delimiter"}}],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"/,"string","@string"]],whitespace:[[/[ \t\r\n]+/,""],[/(\').*$/,"comment"]],string:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"C?/,"string","@pop"]]}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDk2Mi5idW5kbGUuanMiLCJtYXBwaW5ncyI6IjtxSkFTQSxJQUFJQSxFQUFPLENBQ1RDLFNBQVUsQ0FDUkMsWUFBYSxLQUVmQyxTQUFVLENBQ1IsQ0FBQyxJQUFLLEtBQ04sQ0FBQyxJQUFLLEtBQ04sQ0FBQyxLQUFNLFNBQ1AsQ0FBQyxRQUFTLFlBQ1YsQ0FBQyxNQUFPLFVBQ1IsQ0FBQyxNQUFPLFdBRVZDLGlCQUFrQixDQUNoQixDQUFFQyxLQUFNLElBQUtDLE1BQU8sSUFBS0MsTUFBTyxDQUFDLFNBQVUsWUFDM0MsQ0FBRUYsS0FBTSxJQUFLQyxNQUFPLElBQUtDLE1BQU8sQ0FBQyxTQUFVLFlBQzNDLENBQUVGLEtBQU0sSUFBS0MsTUFBTyxJQUFLQyxNQUFPLENBQUMsU0FBVSxjQUczQ0MsRUFBVyxDQUNiQyxhQUFjLEdBQ2RDLGFBQWMsTUFDZEMsWUFBWSxFQUNaUixTQUFVLENBQ1IsQ0FBRVMsTUFBTyxrQkFBbUJQLEtBQU0sSUFBS0MsTUFBTyxLQUM5QyxDQUFFTSxNQUFPLHdCQUF5QlAsS0FBTSxJQUFLQyxNQUFPLEtBRXBELENBQUVNLE1BQU8saUJBQWtCUCxLQUFNLEtBQU1DLE1BQU8sU0FDOUMsQ0FBRU0sTUFBTyxvQkFBcUJQLEtBQU0sUUFBU0MsTUFBTyxZQUNwRCxDQUFFTSxNQUFPLGtCQUFtQlAsS0FBTSxNQUFPQyxNQUFPLFVBQ2hELENBQUVNLE1BQU8sa0JBQW1CUCxLQUFNLE1BQU9DLE1BQU8sV0FFbERPLFNBQVUsQ0FDUixPQUNBLFNBQ0EsU0FDQSxRQUNBLFNBQ0EsV0FDQSxNQUNBLE9BQ0EsS0FDQSxPQUNBLE1BQ0EsT0FDQSxLQUNBLFNBRUZDLFNBQVUsQ0FBQyxLQUFNLE1BQU8sUUFBUyxPQUNqQ0MsVUFBVyxDQUFDLElBQUssSUFBSyxLQUFNLEtBQU0sS0FBTSxNQUFPLEtBQU0sSUFBSyxJQUFLLElBQUssSUFBSyxLQUV6RUMsV0FBWSxpQkFDWkMsUUFBUyxvQkFDVEMsUUFBUyx3RUFFVEMsVUFBVyxDQUNUQyxLQUFNLENBRUosQ0FBRUMsUUFBUyxlQUVYLENBQUMsdUJBQXdCLFFBRXpCLENBQ0UsY0FDQSxDQUNFQyxNQUFPLENBQ0wsWUFBYSxDQUFFVixNQUFPLGNBQ3RCLGFBQWMsV0FDZCxXQUFZLG1CQUtsQixDQUNFLHFCQUNBLENBQ0VVLE1BQU8sQ0FDTEMsR0FBSSxDQUFDLFlBQWEsZUFDbEIsV0FBWSxNQUtsQixDQUFDLFdBQVksZ0JBQ2IsQ0FBQyxNQUFPLFVBRVIsQ0FBQyxXQUFZLGFBQ2IsQ0FDRSxXQUNBLENBQ0VELE1BQU8sQ0FDTCxhQUFjLFdBQ2QsV0FBWSxlQUtsQixDQUFDLGtCQUFtQixrQkFFcEIsQ0FBQyxJQUFLLFNBQVUsWUFFbEJFLFdBQVksQ0FDVixDQUFDLGFBQWMsSUFDZixDQUFDLFVBQVcsWUFFZEMsT0FBUSxDQUNOLENBQUMsVUFBVyxVQUNaLENBQUMsV0FBWSxpQkFDYixDQUFDLE1BQU8seUJBQ1IsQ0FBQyxNQUFPLFNBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0V2FuZGxlci8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvc2Ivc2IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40OC4wKDAwMzdiMTNmYjVkMTg2ZmRmMWU3ZGY1MWE5NDE2YTJkZTJiOGM2NzApXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMvc2Ivc2IudHNcbnZhciBjb25mID0ge1xuICBjb21tZW50czoge1xuICAgIGxpbmVDb21tZW50OiBcIidcIlxuICB9LFxuICBicmFja2V0czogW1xuICAgIFtcIihcIiwgXCIpXCJdLFxuICAgIFtcIltcIiwgXCJdXCJdLFxuICAgIFtcIklmXCIsIFwiRW5kSWZcIl0sXG4gICAgW1wiV2hpbGVcIiwgXCJFbmRXaGlsZVwiXSxcbiAgICBbXCJGb3JcIiwgXCJFbmRGb3JcIl0sXG4gICAgW1wiU3ViXCIsIFwiRW5kU3ViXCJdXG4gIF0sXG4gIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogW1wic3RyaW5nXCIsIFwiY29tbWVudFwiXSB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiwgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH1cbiAgXVxufTtcbnZhciBsYW5ndWFnZSA9IHtcbiAgZGVmYXVsdFRva2VuOiBcIlwiLFxuICB0b2tlblBvc3RmaXg6IFwiLnNiXCIsXG4gIGlnbm9yZUNhc2U6IHRydWUsXG4gIGJyYWNrZXRzOiBbXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIuYXJyYXlcIiwgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgdG9rZW46IFwiZGVsaW1pdGVyLnBhcmVudGhlc2lzXCIsIG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICAvLyBTcGVjaWFsIGJyYWNrZXQgc3RhdGVtZW50IHBhaXJzXG4gICAgeyB0b2tlbjogXCJrZXl3b3JkLnRhZy1pZlwiLCBvcGVuOiBcIklmXCIsIGNsb3NlOiBcIkVuZElmXCIgfSxcbiAgICB7IHRva2VuOiBcImtleXdvcmQudGFnLXdoaWxlXCIsIG9wZW46IFwiV2hpbGVcIiwgY2xvc2U6IFwiRW5kV2hpbGVcIiB9LFxuICAgIHsgdG9rZW46IFwia2V5d29yZC50YWctZm9yXCIsIG9wZW46IFwiRm9yXCIsIGNsb3NlOiBcIkVuZEZvclwiIH0sXG4gICAgeyB0b2tlbjogXCJrZXl3b3JkLnRhZy1zdWJcIiwgb3BlbjogXCJTdWJcIiwgY2xvc2U6IFwiRW5kU3ViXCIgfVxuICBdLFxuICBrZXl3b3JkczogW1xuICAgIFwiRWxzZVwiLFxuICAgIFwiRWxzZUlmXCIsXG4gICAgXCJFbmRGb3JcIixcbiAgICBcIkVuZElmXCIsXG4gICAgXCJFbmRTdWJcIixcbiAgICBcIkVuZFdoaWxlXCIsXG4gICAgXCJGb3JcIixcbiAgICBcIkdvdG9cIixcbiAgICBcIklmXCIsXG4gICAgXCJTdGVwXCIsXG4gICAgXCJTdWJcIixcbiAgICBcIlRoZW5cIixcbiAgICBcIlRvXCIsXG4gICAgXCJXaGlsZVwiXG4gIF0sXG4gIHRhZ3dvcmRzOiBbXCJJZlwiLCBcIlN1YlwiLCBcIldoaWxlXCIsIFwiRm9yXCJdLFxuICBvcGVyYXRvcnM6IFtcIj5cIiwgXCI8XCIsIFwiPD5cIiwgXCI8PVwiLCBcIj49XCIsIFwiQW5kXCIsIFwiT3JcIiwgXCIrXCIsIFwiLVwiLCBcIipcIiwgXCIvXCIsIFwiPVwiXSxcbiAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICBpZGVudGlmaWVyOiAvW2EtekEtWl9dW1xcd10qLyxcbiAgc3ltYm9sczogL1s9Pjw6K1xcLSpcXC8lXFwuLF0rLyxcbiAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFtcbiAgICAgIC8vIHdoaXRlc3BhY2VcbiAgICAgIHsgaW5jbHVkZTogXCJAd2hpdGVzcGFjZVwiIH0sXG4gICAgICAvLyBjbGFzc2VzXG4gICAgICBbLyhAaWRlbnRpZmllcikoPz1bLl0pLywgXCJ0eXBlXCJdLFxuICAgICAgLy8gaWRlbnRpZmllcnMsIHRhZ3dvcmRzLCBhbmQga2V5d29yZHNcbiAgICAgIFtcbiAgICAgICAgL0BpZGVudGlmaWVyLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiB7IHRva2VuOiBcImtleXdvcmQuJDBcIiB9LFxuICAgICAgICAgICAgXCJAb3BlcmF0b3JzXCI6IFwib3BlcmF0b3JcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJ2YXJpYWJsZS5uYW1lXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAvLyBtZXRob2RzLCBwcm9wZXJ0aWVzLCBhbmQgZXZlbnRzXG4gICAgICBbXG4gICAgICAgIC8oWy5dKShAaWRlbnRpZmllcikvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICQyOiBbXCJkZWxpbWl0ZXJcIiwgXCJ0eXBlLm1lbWJlclwiXSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIC8vIG51bWJlcnNcbiAgICAgIFsvXFxkKlxcLlxcZCsvLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvXFxkKy8sIFwibnVtYmVyXCJdLFxuICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICBbL1soKVxcW1xcXV0vLCBcIkBicmFja2V0c1wiXSxcbiAgICAgIFtcbiAgICAgICAgL0BzeW1ib2xzLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBvcGVyYXRvcnNcIjogXCJvcGVyYXRvclwiLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImRlbGltaXRlclwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgLy8gc3RyaW5nc1xuICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCBcInN0cmluZy5pbnZhbGlkXCJdLFxuICAgICAgLy8gbm9uLXRlbWluYXRlZCBzdHJpbmdcbiAgICAgIFsvXCIvLCBcInN0cmluZ1wiLCBcIkBzdHJpbmdcIl1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy8oXFwnKS4qJC8sIFwiY29tbWVudFwiXVxuICAgIF0sXG4gICAgc3RyaW5nOiBbXG4gICAgICBbL1teXFxcXFwiXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuZXNjYXBlLmludmFsaWRcIl0sXG4gICAgICBbL1wiQz8vLCBcInN0cmluZ1wiLCBcIkBwb3BcIl1cbiAgICBdXG4gIH1cbn07XG5leHBvcnQge1xuICBjb25mLFxuICBsYW5ndWFnZVxufTtcbiJdLCJuYW1lcyI6WyJjb25mIiwiY29tbWVudHMiLCJsaW5lQ29tbWVudCIsImJyYWNrZXRzIiwiYXV0b0Nsb3NpbmdQYWlycyIsIm9wZW4iLCJjbG9zZSIsIm5vdEluIiwibGFuZ3VhZ2UiLCJkZWZhdWx0VG9rZW4iLCJ0b2tlblBvc3RmaXgiLCJpZ25vcmVDYXNlIiwidG9rZW4iLCJrZXl3b3JkcyIsInRhZ3dvcmRzIiwib3BlcmF0b3JzIiwiaWRlbnRpZmllciIsInN5bWJvbHMiLCJlc2NhcGVzIiwidG9rZW5pemVyIiwicm9vdCIsImluY2x1ZGUiLCJjYXNlcyIsIiQyIiwid2hpdGVzcGFjZSIsInN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=