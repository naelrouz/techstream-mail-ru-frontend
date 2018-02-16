(() => {
  const {Block} = window;

  class Form extends Block {
    constructor(fields) {
      const el = document.createElement('form');
      super(el);

      fields.forEach(
        function (field) {
          const f = Block.Create('input', field.classes, field.attributes);
          this.append(f);
        }.bind(this),
      );
    }

    serialize() {
      const form = this.el;

      if (!form || form.nodeName !== "FORM") {
        return;
      }

      const obj = {};
      for (let i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === '') {
          continue;
        }
        switch (form.elements[i].nodeName) {
          case 'INPUT':
            switch (form.elements[i].type) {
              case 'text':
              case 'hidden':
              case 'password':
              case 'button':
              case 'reset':
              case 'submit':
                obj[form.elements[i].name] = encodeURIComponent(
                  form.elements[i].value,
                );
                break;
              case 'checkbox':
              case 'radio':
                if (form.elements[i].checked) {
                  obj[form.elements[i].name] = encodeURIComponent(
                    form.elements[i].value,
                  );
                }
                break;
              case 'file':
                break;
            }
            break;
          case 'TEXTAREA':
            obj[form.elements[i].name] = encodeURIComponent(
              form.elements[i].value,
            );
            break;
          case 'SELECT':
            switch (form.elements[i].type) {
              case 'select-one':
                obj[form.elements[i].name] = encodeURIComponent(
                  form.elements[i].value,
                );
                break;
              case 'select-multiple':
                for (
                  let j = form.elements[i].options.length - 1;
                  j >= 0;
                  j = j - 1
                ) {
                  if (form.elements[i].options[j].selected) {
                    obj[form.elements[i].name] = encodeURIComponent(
                      form.elements[i].options[j].value,
                    );
                  }
                }
                break;
            }
            break;
          case 'BUTTON':
            switch (form.elements[i].type) {
              case 'reset':
              case 'submit':
              case 'button':
                obj[form.elements[i].name] = encodeURIComponent(
                  form.elements[i].value,
                );
                break;
            }
            break;
        }
      }
      return obj;
    }

    onSubmit(cb) {
      this.el.addEventListener(
        'submit',
        function (e) {
          e.preventDefault();

          const formdata = this.serialize();
          // const elements = this.el.elements;
          //
          // console.log('formdata: ', formdata);
          //
          // for (let name in elements) {
          //   console.log('name: ', name);
          //   formdata[name] = elements[name].value;
          // }

          cb(formdata);
        }.bind(this),
      );
    }

    reset() {
      this.el.reset();
    }
  }

  window.Form = Form;
})();
