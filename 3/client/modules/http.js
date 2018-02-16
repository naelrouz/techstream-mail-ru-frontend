(() => {
  /**
   * Модуль с методами HTTP запросов
   * @module Http
   */

  class Http {
    /**
     * Выполняет GET запросы по указанному адреcу
     * @param {string} url - адес запоса
     * @param {Function} cb
     */
    static Get(url, cb) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.withCredentials = true;

      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return null;
        }
        if (xhr.status !== 200) {
          return cb(xhr, null);
        }

        const res = JSON.parse(xhr.responseText);

        cb(null, res);

        return true;
      };
      xhr.send();
    }
    static Post(url, body, cb) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.withCredentials = true;

      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return null;
        }
        if (xhr.status !== 200) {
          return cb(xhr, null);
        }

        const res = JSON.parse(xhr.responseText);

        cb(null, res);

        return true;
      };

      xhr.send(JSON.stringify(body));
    }
  }

  window.Http = Http;
})();
