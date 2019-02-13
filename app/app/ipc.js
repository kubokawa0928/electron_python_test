'use strict';
var $ = require('jquery');
const {ipcRenderer} = require('electron')

//electron によりhtmlが描画されてから実行
$(document).ready(function(){
  $("button").on('click',function(){
    var result = $('#result').val();
    pushButton(result);
  });
});

function pushButton(moji) {
  // json形式でリクエストを送信
  var data = {param: moji};
  var response = ipcRenderer.sendSync('push-button', data);
  console.log(response);
  // レスポンス結果を元にディスプレイを変更。
  $('#result').val(response);
}

