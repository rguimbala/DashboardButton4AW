// ==UserScript==
// @name        Buttons UI
// @namespace   Violentmonkey Scripts
// @match       https://itsm.services.sap/*
// @grant       none
// @version     1.0
// @author      I843865
// @description 1/20/2021, 4:04:08 PM
//@run-at      document-start
// ==/UserScript==
   
   
   
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
   
function pollDOM() {
  
  
  var list2 = null;
  //console.log(document.getElementsByClassName('list2_body'));

  if(document.getElementById("gsft_main") == null){
    //console.log("null aham");
    
    list2 = document.getElementsByClassName('list2_body');
  }else{
    //console.log("null aham");
    list2 = document.getElementById("gsft_main").contentWindow.document.getElementsByClassName('list2_body');

  }

  var arr = Array.from(list2);
  //console.log(list2);

  if (arr.length != 0) {

    var lista = arr[0].childNodes;
    //console.log(lista);


    for (var i = 0; i < lista.length; ++i) {

      var btn = document.createElement("BUTTON");   // Create a <button> element
      btn.innerHTML = "AW";
      btn.classList.add('AW');
      btn.id = 'btn' + i;




      var son = lista[i];
      //console.log("son - na parte do link");
      //console.log(son.getElementsByClassName('linked formlink'));

      var arr2 = son.getElementsByClassName('linked formlink');

      if (arr2[0] != undefined) {
        
        var wil;

        wil = arr2[0].href;
        //console.log(wil);

        var sid = wil.substr(60, 32);


        //var url = wil.href.toString();
        //console.log(url);
        //var sid = url.substr(62,32);

        btn.onclick = function () {

          var number = this.id;
          var interation = number.substr(3, number.length - 3);

          var now = lista[interation];
          var end = now.getElementsByClassName('linked formlink');
          //console.log(now);
          //console.log("sysid");
          var href = end[0].href;
          
          var number2 = href.lastIndexOf("sys_id=") + 7;

          var sid = href.substr(number2, 32);
          if (href.search('sn_customerservice_case.do') == -1) {

            

              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  var text = this.responseText;
                  var number = text.lastIndexOf("NOW.sysId")  + 13; 
                  //console.log(number);
                  //console.log(text.substr(number,32));
                  window.open('https://itsm.services.sap/now/workspace/agent/record/sn_customerservice_case/' + text.substr(number,32));
                  
                }
              };

              xhttp.open("GET", end[0].href, true);
              xhttp.send();

              //window.open('https://sap.service-now.com/now/workspace/agent/full-search/' + end[0].innerHTML);

            
            
          } else {
            window.open('https://itsm.services.sap/now/workspace/agent/record/sn_customerservice_case/' + sid);
          }
        };

        //btn.onclick = 'window.open(\'https://itsm.services.sap/now/workspace/agent/record/sn_customerservice_case/' + sid;


        //console.log(son.childNodes[2].class);
        if (son.childNodes[1].lastChild.innerHTML != 'AW') {
          son.childNodes[1].appendChild(btn);
        }
        //console.log(son.childNodes[2].lastChild.innerHTML);
      }
    }



  } else {
    setTimeout(pollDOM, 300);
    //console.log("not now1"); // try again in 300 milliseconds
  }
}


var url_antiga = null;

function checkURL() {

  pollDOM();
  setTimeout(checkURL, 300);

}

checkURL();
  
/******/ })()


