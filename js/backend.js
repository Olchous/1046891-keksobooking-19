'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var makeRequest = function (onSuccess, onError, xhr) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    sent: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
